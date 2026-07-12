import React from "react";
import { ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TEMPLATES } from "@/constants/testIds";
import { TEMPLATES_LIST } from "@/constants/plans";
import { useRevealClass } from "@/hooks/useInView";

const accentMap = {
  amber:    "from-amber-500/40 to-orange-500/25",
  pink:     "from-pink-500/40 to-purple-500/25",
  rose:     "from-rose-500/40 to-fuchsia-500/25",
  red:      "from-red-500/40 to-orange-600/25",
  emerald:  "from-emerald-500/40 to-teal-500/25",
  sky:      "from-sky-500/40 to-indigo-500/25",
  lime:     "from-lime-500/40 to-emerald-600/25",
  violet:   "from-violet-500/40 to-indigo-600/25",
};

const StorefrontIllustration = ({ accent }) => (
  <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent] || accentMap.sky}`}>
    <svg viewBox="0 0 400 240" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="60" width="320" height="150" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
      <rect x="56" y="78" width="80" height="10" rx="3" fill="rgba(255,255,255,0.7)" />
      <rect x="148" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="196" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="244" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="304" y="74" width="40" height="18" rx="6" fill="rgba(255,255,255,0.9)" />
      <rect x="56" y="104" width="180" height="90" rx="8" fill="rgba(255,255,255,0.18)" />
      <rect x="246" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
      <rect x="298" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="246" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="298" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
    </svg>
  </div>
);

const TemplateCard = ({ t, delay }) => {
  const r = useRevealClass(delay);
  const available = t.status === "available";
  return (
    <article
      ref={r.ref}
      style={r.style}
      data-testid={TEMPLATES.card}
      className={`${r.className} group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <StorefrontIllustration accent={t.accent} />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dyn-bg-1))] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur border border-white/15 text-[10px] uppercase tracking-widest px-2 py-1 text-white/85">
          {t.category}
        </span>
        {!available && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-yellow-400/15 border border-yellow-300/25 text-[10px] uppercase tracking-widest px-2 py-1 text-yellow-100">
            <Clock className="h-3 w-3" />
            Segera Hadir
          </span>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-3.5">
        <div>
          <div className="font-semibold text-white text-sm">{t.name}</div>
          <div className="text-xs text-white/50">{available ? "Tersedia" : "Belum tersedia"}</div>
        </div>
        {available ? (
          <Link to="/kontak?src=template">
            <Button
              size="sm"
              variant="outline"
              data-testid={TEMPLATES.preview}
              className="h-8 bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
            >
              Preview
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        ) : (
          <button
            disabled
            aria-disabled="true"
            data-testid={TEMPLATES.preview}
            className="h-8 px-3 rounded-md text-xs border border-white/10 bg-white/[0.02] text-white/35 cursor-not-allowed"
          >
            Preview
          </button>
        )}
      </div>
    </article>
  );
};

const TemplateShowcase = () => {
  return (
    <section
      id="template"
      data-testid={TEMPLATES.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container">
        <div className="max-w-2xl">
          <div className="dyn-eyebrow">Template</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Dynicty sedang menyiapkan template untuk <span className="dyn-brand-gradient-text">berbagai kategori bisnis.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base max-w-xl">
            Sinar Telur tersedia sebagai template resmi pertama. Template kategori lainnya sedang kami siapkan.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES_LIST.map((t, i) => (
            <TemplateCard key={t.name} t={t} delay={(i % 3) * 60} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
