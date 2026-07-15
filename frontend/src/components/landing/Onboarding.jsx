import React from "react";
import { CheckCircle2, MessageCircle, Settings2, Rocket } from "lucide-react";
import { useRevealClass } from "@/hooks/useInView";

const steps = [
  {
    icon: CheckCircle2,
    title: "Pilih Paket",
    desc: "Bandingkan Starter, Growth, dan Enterprise sesuai kebutuhan bisnis Anda.",
  },
  {
    icon: MessageCircle,
    title: "Konsultasi",
    desc: "Tim Dynicty membantu memastikan paket, domain, dan fitur yang Anda pilih sudah tepat.",
  },
  {
    icon: Settings2,
    title: "Setup Toko",
    desc: "Kami mendampingi proses setup awal, branding, dan persiapan toko sebelum diluncurkan.",
  },
  {
    icon: Rocket,
    title: "Go Live",
    desc: "Setelah pengecekan selesai, toko siap online dan mulai digunakan untuk berjualan.",
  },
];

const OnboardingStep = ({ step, index, delay }) => {
  const r = useRevealClass(delay);
  const Icon = step.icon;

  return (
    <div ref={r.ref} style={r.style} className={`${r.className} dyn-card p-6`}>
      <div className="flex items-center justify-between gap-4">
        <div className="h-11 w-11 rounded-xl dyn-brand-gradient-bg-2 flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(139,92,246,0.5)]">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-[18px] font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-[14px] dyn-body">{step.desc}</p>
    </div>
  );
};

const Onboarding = () => (
  <section id="onboarding" className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section">
    <div className="dyn-container">
      <div className="text-center max-w-2xl mx-auto">
        <div className="dyn-eyebrow">Proses Onboarding</div>
        <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
          Dari pilih paket hingga toko siap online,
          <span className="dyn-brand-gradient-text"> Anda tidak berjalan sendiri.</span>
        </h2>
        <p className="mt-4 text-white/70">
          Aktivasi dilakukan melalui proses konsultasi dan setup agar konfigurasi toko sesuai kebutuhan bisnis Anda.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {steps.map((step, index) => (
          <OnboardingStep key={step.title} step={step} index={index} delay={index * 70} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[13px] text-white/65">
        <span>✓ Konsultasi awal tanpa biaya</span>
        <span>✓ Didampingi sampai siap digunakan</span>
        <span>✓ Pilihan paket dan biaya transparan</span>
      </div>
    </div>
  </section>
);

export default Onboarding;
