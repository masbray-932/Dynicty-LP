import React from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Palette, ToggleRight, Rocket } from "lucide-react";
import { HOW } from "@/constants/testIds";

const steps = [
  {
    icon: LayoutTemplate,
    title: "Pilih Template",
    desc: "Mulai dari puluhan template modern sesuai kategori bisnis Anda.",
  },
  {
    icon: Palette,
    title: "Atur Branding",
    desc: "Ganti logo, warna, tipografi, dan sambungkan domain sendiri.",
  },
  {
    icon: ToggleRight,
    title: "Aktifkan Fitur",
    desc: "Pilih paket & modul yang dibutuhkan — POS, CRM, Marketing, AI.",
  },
  {
    icon: Rocket,
    title: "Deploy & Jualan",
    desc: "Website langsung live. Anda tinggal fokus jualan dan berkembang.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="cara-kerja"
      data-testid={HOW.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Cara Kerja</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Website siap dalam <span className="dyn-brand-gradient-text">4 langkah</span>.
          </h2>
          <p className="mt-4 text-white/60">
            Setup cepat tanpa perlu ngoding — semua sudah otomatis oleh engine Dynicty.
          </p>
        </div>

        <div className="mt-14 relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  data-testid={HOW.step}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="relative flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl dyn-brand-gradient-bg-2 flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(139,92,246,0.55)]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.24em] text-white/45">
                      Langkah {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
