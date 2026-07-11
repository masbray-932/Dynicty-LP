import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { submitFreeTrial } from "@/lib/api";
import { MODAL } from "@/constants/testIds";

const initialState = { nama: "", email: "", bisnis: "", telepon: "", paket: "", honeypot: "" };

const TryFreeModal = ({ open, onOpenChange, defaultPaket = "" }) => {
  const [form, setForm] = useState({ ...initialState, paket: defaultPaket });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.nama || form.nama.trim().length < 2) e.nama = "Nama minimal 2 karakter";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.bisnis || form.bisnis.trim().length < 2) e.bisnis = "Nama bisnis wajib diisi";
    if (!/^[+0-9\s()-]{6,20}$/.test(form.telepon)) e.telepon = "Nomor telepon tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await submitFreeTrial(form);
      setSuccess(true);
      toast.success(res?.message || "Terima kasih! Tim kami akan menghubungi Anda.");
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Terjadi kesalahan. Silakan coba lagi.";
      toast.error(typeof msg === "string" ? msg : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (v) => {
    if (!v) {
      // reset when closing
      setTimeout(() => {
        setForm({ ...initialState, paket: defaultPaket });
        setSuccess(false);
        setErrors({});
      }, 200);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid={MODAL.root}
        className="sm:max-w-lg bg-[hsl(var(--dyn-bg-1))] border border-white/10 text-white"
      >
        <DialogHeader>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
            <Sparkles className="h-3.5 w-3.5" />
            Coba Gratis 14 Hari
          </div>
          <DialogTitle className="text-2xl font-semibold text-white">
            Mulai bangun brand Anda hari ini
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Isi data singkat berikut. Tim kami akan menghubungi Anda maksimal 1x24 jam untuk aktivasi akun trial.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <div className="h-14 w-14 rounded-full dyn-brand-gradient-bg flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold">Data Anda berhasil dikirim!</h4>
            <p className="text-white/60 text-sm max-w-sm">
              Terima kasih, {form.nama.split(" ")[0] || "Sobat Dynicty"}. Tim onboarding kami akan menghubungi Anda melalui email
              atau WhatsApp dalam 1x24 jam.
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-2 dyn-brand-gradient-bg text-white border-0"
            >
              Tutup
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="nama" className="text-white/80">Nama Lengkap</Label>
              <Input
                id="nama"
                data-testid={MODAL.nama}
                value={form.nama}
                onChange={(e) => set("nama", e.target.value)}
                placeholder="Contoh: Andi Wijaya"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                autoComplete="name"
              />
              {errors.nama && <p className="text-xs text-red-400">{errors.nama}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input
                id="email"
                data-testid={MODAL.email}
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="nama@brand.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="bisnis" className="text-white/80">Nama Bisnis / Brand</Label>
              <Input
                id="bisnis"
                data-testid={MODAL.bisnis}
                value={form.bisnis}
                onChange={(e) => set("bisnis", e.target.value)}
                placeholder="Contoh: Sinar Telur"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              {errors.bisnis && <p className="text-xs text-red-400">{errors.bisnis}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="telepon" className="text-white/80">Nomor WhatsApp</Label>
              <Input
                id="telepon"
                data-testid={MODAL.telepon}
                type="tel"
                value={form.telepon}
                onChange={(e) => set("telepon", e.target.value)}
                placeholder="+62 812 3456 7890"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                autoComplete="tel"
              />
              {errors.telepon && <p className="text-xs text-red-400">{errors.telepon}</p>}
            </div>

            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) => set("honeypot", e.target.value)}
              className="absolute -left-[9999px] h-0 w-0"
              aria-hidden="true"
            />

            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitting}
                data-testid={MODAL.submit}
                className="w-full dyn-brand-gradient-bg text-white border-0 hover:opacity-90 h-11"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Mengirim...
                  </>
                ) : (
                  <>Kirim & Mulai Trial</>
                )}
              </Button>
              <p className="text-[11px] text-white/40 mt-2 text-center">
                Dengan mengirim, Anda menyetujui Kebijakan Privasi & Ketentuan Layanan Dynicty.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TryFreeModal;
