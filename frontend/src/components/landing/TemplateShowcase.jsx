import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { TEMPLATES } from "@/constants/testIds";

const templates = [
  {
    name: "Sinar Telur",
    category: "Grocery & UMKM",
    accent: "from-amber-500/40 to-orange-500/30",
    icon: "🥚",
    illustration: "grocery",
  },
  {
    name: "Amara Fashion",
    category: "Fashion",
    accent: "from-pink-500/40 to-purple-500/30",
    icon: "👗",
    illustration: "fashion",
  },
  {
    name: "Lumi Beauty",
    category: "Beauty & Skincare",
    accent: "from-rose-500/40 to-fuchsia-500/30",
    icon: "💄",
    illustration: "beauty",
  },
  {
    name: "Kopi Kita",
    category: "Food & Beverage",
    accent: "from-amber-700/40 to-yellow-600/30",
    icon: "☕",
    illustration: "fnb",
  },
  {
    name: "Volt Store",
    category: "Electronics",
    accent: "from-sky-500/40 to-indigo-500/30",
    icon: "💻",
    illustration: "electronics",
  },
  {
    name: "Rumah Indah",
    category: "Home Living",
    accent: "from-emerald-500/40 to-teal-500/30",
    icon: "🛋️",
    illustration: "home",
  },
  {
    name: "Motoworks",
    category: "Automotive",
    accent: "from-red-500/40 to-orange-600/30",
    icon: "🍽️",
    illustration: "auto",
  },
  {
    name: "UrbanFit",
    category: "Sports & Athleisure",
    accent: "from-lime-500/40 to-emerald-600/30",
    icon: "🏃",
    illustration: "sports",
  },
  {
    name: "Vaporium",
    category: "Vape & Lifestyle",
    accent: "from-violet-500/40 to-indigo-600/30",
    icon: "💨",
    illustration: "vape",
  },
];

const Illustration = ({ type, accent }) => (
  <div className={`absolute inset-0 bg-gradient-to-br ${accent}`}>
    <svg viewBox="0 0 400 240" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`store-${type}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Storefront frame */}
      <rect x="40" y="60" width="320" height="150" rx="12" fill={`url(#store-${type})`} stroke="rgba(255,255,255,0.18)" />
      {/* Nav bar */}
      <rect x="56" y="78" width="80" height="10" rx="3" fill="rgba(255,255,255,0.7)" />
      <rect x="148" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="196" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="244" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="304" y="74" width="40" height="18" rx="6" fill="rgba(255,255,255,0.9)" />
      {/* Hero rectangle */}
      <rect x="56" y="104" width="180" height="90" rx="8" fill="rgba(255,255,255,0.18)" />
      {/* Card grid */}
      <rect x="246" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
      <rect x="298" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="246" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="298" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
    </svg>
  </div>
);

const TemplateShowcase = () => {
  return (
    <section
      id="templates"
      data-testid={TEMPLATES.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="dyn-eyebrow">Template Showcase</div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Pilih template.
              <br />
              <span className="dyn-brand-gradient-text">Sesuaikan brand.</span> Live.
            </h2>
            <p className="mt-4 text-white/60 text-base max-w-xl">
              Puluhan template modern siap pakai untuk berbagai kategori bisnis, semua bisa
              dikustomisasi via Template Designer.
            </p>
          </div>
          <Button
            variant="outline"
            className="self-start sm:self-end bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
            onClick={() => {
              const el = document.querySelector("#pricing");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Lihat Semua Template
            <ArrowUpRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              data-testid={TEMPLATES.card}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Illustration type={t.illustration} accent={t.accent} />
                {/* Gloss */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dyn-bg-1))] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur border border-white/15 text-[10px] uppercase tracking-widest px-2 py-1 text-white/80">
                  {t.category}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-white/50">Responsive • SEO Ready</div>
                </div>
                <button
                  data-testid={TEMPLATES.preview}
                  className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
                  onClick={() => {
                    const el = document.querySelector("#pricing");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Preview
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
