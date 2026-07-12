import React from "react";
import * as Icons from "lucide-react";
import { FEATURES } from "@/constants/testIds";
import { FEATURE_CARDS, PLAN_LABEL, minPlanForCard, PLAN_KEYS } from "@/constants/plans";
import { useRevealClass } from "@/hooks/useInView";

const planClass = {
  [PLAN_KEYS.STARTER]:    "bg-emerald-500/12 text-emerald-200 border-emerald-400/25",
  [PLAN_KEYS.GROWTH]:     "bg-blue-500/12 text-blue-200 border-blue-400/25",
  [PLAN_KEYS.ENTERPRISE]: "bg-purple-500/12 text-purple-200 border-purple-400/25",
};

const FeatureCard = ({ card, delay }) => {
  const r = useRevealClass(delay);
  const Icon = Icons[card.icon] || Icons.Sparkles;
  const plan = minPlanForCard(card);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={FEATURES.card}
      className={`${r.className} group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-white/20 transition-colors`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <div className="absolute inset-0 rounded-xl dyn-brand-gradient-bg opacity-0 group-hover:opacity-20 transition-opacity blur-lg" />
          <Icon className="h-5 w-5 text-white relative" />
        </div>
        <span
          className={`inline-flex items-center rounded-full border text-[10px] uppercase tracking-widest px-2 py-0.5 ${planClass[plan]}`}
          title={`Tersedia mulai paket ${PLAN_LABEL[plan]}`}
        >
          {PLAN_LABEL[plan]}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{card.title}</h3>
      <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{card.desc}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section
      id="fitur"
      data-testid={FEATURES.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="max-w-2xl">
          <div className="dyn-eyebrow">Fitur untuk Kelola Toko Anda</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            <span className="dyn-brand-gradient-text">Semua yang Anda butuhkan</span> untuk menjalankan toko online.
          </h2>
          <p className="mt-4 text-white/65 text-base sm:text-lg max-w-xl">
            Fitur yang praktis dan business-first — dibuat khusus untuk kebutuhan UMKM dan seller di Indonesia. Setiap fitur ditandai dengan paket minimum yang membukanya.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {FEATURE_CARDS.map((c, i) => (
            <FeatureCard key={c.title} card={c} delay={(i % 4) * 50} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
