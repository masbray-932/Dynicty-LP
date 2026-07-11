import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TryFreeModal from "@/components/landing/TryFreeModal";
import { PRICING } from "@/constants/testIds";

const plans = [
  {
    key: "starter",
    name: "Starter",
    price: "Rp 199rb",
    period: "/bulan",
    tagline: "UMKM baru mulai jualan online.",
    features: [
      "1 Website Aktif",
      "Template Engine (all templates)",
      "Domain custom (bawa sendiri)",
      "Payment Gateway lokal",
      "Email support",
    ],
    highlighted: false,
    cta: "Coba Gratis",
  },
  {
    key: "growth",
    name: "Growth",
    price: "Rp 499rb",
    period: "/bulan",
    tagline: "Brand yang siap scale ke level berikutnya.",
    features: [
      "3 Website / Multi Outlet",
      "Template Designer (drag & drop)",
      "Subscription & Feature Package",
      "Marketing Automation & Kupon",
      "Priority support 12/7",
    ],
    highlighted: true,
    badge: "Paling Populer",
    cta: "Mulai Growth",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "Agency, distributor, dan white label reseller.",
    features: [
      "Unlimited Website & Tenant",
      "White Label Penuh (tanpa branding Dynicty)",
      "Deployment engine terisolasi",
      "SLA & dedicated onboarding",
      "Custom integration & API",
    ],
    highlighted: false,
    cta: "Hubungi Sales",
  },
];

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultPaket, setDefaultPaket] = useState("");

  const openModal = (planName) => {
    setDefaultPaket(planName);
    setModalOpen(true);
  };

  return (
    <section
      id="pricing"
      data-testid={PRICING.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Harga Transparan</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Paket untuk setiap <span className="dyn-brand-gradient-text">tahap bisnis</span>.
          </h2>
          <p className="mt-4 text-white/60">
            Coba gratis 14 hari. Upgrade, downgrade, atau batalkan kapan pun tanpa hidden fee.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={PRICING.card}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                p.highlighted
                  ? "border-white/25 bg-white/[0.05] shadow-[0_1px_0_rgba(255,255,255,0.08),0_40px_120px_-20px_rgba(139,92,246,0.35)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{ padding: 1 }}>
                  <div className="h-full w-full rounded-2xl dyn-brand-gradient-bg opacity-40" style={{ WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }} />
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                {p.highlighted && (
                  <Badge
                    data-testid={PRICING.popular}
                    className="dyn-brand-gradient-bg text-white border-0 gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    {p.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-3xl sm:text-4xl font-semibold text-white">{p.price}</span>
                <span className="text-white/50 text-sm mb-1.5">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-white/60">{p.tagline}</p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full dyn-brand-gradient-bg">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                data-testid={PRICING.cta}
                onClick={() => openModal(p.name)}
                className={`mt-6 h-11 w-full text-sm ${
                  p.highlighted
                    ? "dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
                    : "bg-white/5 hover:bg-white/10 border border-white/15 text-white"
                }`}
              >
                {p.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Harga belum termasuk PPN. Butuh paket khusus reseller/agency? <button onClick={() => openModal("Enterprise")} className="underline underline-offset-2 text-white/70 hover:text-white">Hubungi tim kami</button>.
        </p>
      </div>

      <TryFreeModal open={modalOpen} onOpenChange={setModalOpen} defaultPaket={defaultPaket} />
    </section>
  );
};

export default Pricing;
