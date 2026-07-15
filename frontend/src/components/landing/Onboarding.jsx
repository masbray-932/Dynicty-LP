import React from "react";
import { CheckCircle2, MessageCircle, Settings2, Rocket, ArrowRight } from "lucide-react";
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
    <div ref={r.ref} style={r.style} className={`${r.className} dyn-timeline-step group`}>
      <div className="relative flex items-center gap-4 lg:block">
        <div className="relative z-10 h-12 w-12 shrink-0 rounded-2xl border border-white/15 bg-[hsl(var(--dyn-bg-2))] flex items-center justify-center shadow-[0_12px_30px_-12px_rgba(109,94,247,0.7)] transition-colors group-hover:border-blue-400/35">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="lg:mt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            Langkah {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 text-[18px] font-semibold text-white">{step.title}</h3>
        </div>
      </div>
      <p className="mt-3 pl-16 text-[14px] dyn-body lg:pl-0">{step.desc}</p>
      {index < steps.length - 1 ? (
        <ArrowRight className="dyn-timeline-arrow hidden lg:block" aria-hidden="true" />
      ) : null}
    </div>
  );
};

const Onboarding = () => (
  <section id="onboarding" className="relative overflow-hidden bg-[hsl(var(--dyn-bg-1))] dyn-section dyn-section-divider">
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.045] blur-3xl" />
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

      <div className="dyn-timeline mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0">
        {steps.map((step, index) => (
          <OnboardingStep key={step.title} step={step} index={index} delay={index * 70} />
        ))}
      </div>

      <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] text-white/65">
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Konsultasi awal tanpa biaya</span>
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Didampingi sampai siap digunakan</span>
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Pilihan paket dan biaya transparan</span>
      </div>
    </div>
  </section>
);

export default Onboarding;
