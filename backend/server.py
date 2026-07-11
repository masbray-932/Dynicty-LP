from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Dynicty API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# =========================
# Utility: current UTC iso
# =========================
def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id() -> str:
    return str(uuid.uuid4())


PHONE_RE = re.compile(r"^[+0-9\s()-]{6,20}$")


# =========================
# Models
# =========================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=_new_id)
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# --- Leads models ---
class FreeTrialLeadIn(BaseModel):
    nama: str = Field(min_length=2, max_length=100)
    email: EmailStr
    bisnis: str = Field(min_length=2, max_length=120)
    telepon: str = Field(min_length=6, max_length=20)
    paket: Optional[str] = Field(default=None, max_length=40)
    honeypot: Optional[str] = Field(default="", max_length=100)

    @field_validator("telepon")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        if not PHONE_RE.match(v):
            raise ValueError("Nomor telepon tidak valid")
        return v


class NewsletterIn(BaseModel):
    email: EmailStr
    honeypot: Optional[str] = Field(default="", max_length=100)


class ContactIn(BaseModel):
    nama: str = Field(min_length=2, max_length=100)
    email: EmailStr
    pesan: str = Field(min_length=5, max_length=2000)
    honeypot: Optional[str] = Field(default="", max_length=100)


class LeadResponse(BaseModel):
    id: str
    ok: bool = True
    message: str


class StatsResponse(BaseModel):
    websites_created: int
    active_tenants: int
    deployments: int
    customers: int


# =========================
# Base routes
# =========================
@api_router.get("/")
async def root():
    return {"message": "Dynicty API is live", "tagline": "BUILD • GROW • EMPOWER"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "ok", "time": _now_iso()}
    except Exception as e:  # pragma: no cover
        raise HTTPException(status_code=503, detail=str(e))


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# =========================
# Leads endpoints
# =========================
def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@api_router.post("/leads/free-trial", response_model=LeadResponse)
async def create_free_trial(payload: FreeTrialLeadIn, request: Request):
    # honeypot spam check
    if payload.honeypot:
        # silently accept but discard
        return LeadResponse(id=_new_id(), message="Terima kasih! Tim kami akan menghubungi Anda.")

    doc = {
        "id": _new_id(),
        "nama": payload.nama.strip(),
        "email": payload.email.lower().strip(),
        "bisnis": payload.bisnis.strip(),
        "telepon": payload.telepon.strip(),
        "paket": (payload.paket or "").strip() or None,
        "ip": _client_ip(request),
        "created_at": _now_iso(),
        "source": "landing_page",
    }
    await db.free_trial_leads.insert_one(doc)
    return LeadResponse(id=doc["id"], message="Terima kasih! Tim kami akan menghubungi Anda dalam 1x24 jam.")


@api_router.post("/leads/newsletter", response_model=LeadResponse)
async def subscribe_newsletter(payload: NewsletterIn, request: Request):
    if payload.honeypot:
        return LeadResponse(id=_new_id(), message="Berhasil berlangganan.")

    email = payload.email.lower().strip()
    existing = await db.newsletter_subscriptions.find_one({"email": email})
    if existing:
        return LeadResponse(id=existing.get("id", _new_id()), message="Email Anda sudah terdaftar.")

    doc = {
        "id": _new_id(),
        "email": email,
        "ip": _client_ip(request),
        "created_at": _now_iso(),
    }
    await db.newsletter_subscriptions.insert_one(doc)
    return LeadResponse(id=doc["id"], message="Berhasil berlangganan newsletter Dynicty.")


@api_router.post("/leads/contact", response_model=LeadResponse)
async def create_contact(payload: ContactIn, request: Request):
    if payload.honeypot:
        return LeadResponse(id=_new_id(), message="Pesan Anda telah kami terima.")

    doc = {
        "id": _new_id(),
        "nama": payload.nama.strip(),
        "email": payload.email.lower().strip(),
        "pesan": payload.pesan.strip(),
        "ip": _client_ip(request),
        "created_at": _now_iso(),
    }
    await db.contact_leads.insert_one(doc)
    return LeadResponse(id=doc["id"], message="Pesan Anda telah kami terima. Tim Dynicty akan segera merespons.")


@api_router.get("/leads/stats", response_model=StatsResponse)
async def get_stats():
    """Public stats counters. Seeded with realistic baseline + dynamic count of leads."""
    try:
        websites = await db.free_trial_leads.count_documents({})
    except Exception:
        websites = 0
    try:
        subs = await db.newsletter_subscriptions.count_documents({})
    except Exception:
        subs = 0
    # Baseline seeded values so counters look meaningful from day 1.
    return StatsResponse(
        websites_created=1240 + websites,
        active_tenants=380 + max(0, websites // 2),
        deployments=5620 + websites * 3,
        customers=980 + subs + max(0, websites),
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def _startup():
    # ensure indexes
    try:
        await db.newsletter_subscriptions.create_index("email", unique=True)
        await db.free_trial_leads.create_index("email")
        await db.contact_leads.create_index("created_at")
    except Exception as e:  # pragma: no cover
        logger.warning(f"Index creation warning: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
