import React from "react";
import { motion } from "framer-motion";
import DashboardMockup from "@/components/landing/DashboardMockup";
import { DEVICES } from "@/constants/testIds";
import { Check, Zap, ShieldCheck, Layers } from "lucide-react";

const PhoneMockup = () => (
  <div className="relative w-[190px] h-[380px] rounded-[36px] border border-white/15 bg-[hsl(var(--dyn-bg-2))] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black/70" />
    <div className="absolute inset-2 rounded-[30px] bg-[hsl(var(--dyn-bg-1))] p-3 flex flex-col gap-2 mt-6">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-white/20" />
        <div className="h-6 w-6 rounded-full bg-white/10" />
      </div>
      <div className="aspect-[16/10] rounded-xl dyn-brand-gradient-bg-2 opacity-80" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-16 rounded-lg bg-white/[0.06] border border-white/10" />
        <div className="h-16 rounded-lg bg-white/[0.06] border border-white/10" />
      </div>
      <div className="h-10 rounded-lg dyn-brand-gradient-bg" />
      <div className="grid grid-cols-3 gap-1.5">
        <div className="h-12 rounded-md bg-white/[0.04] border border-white/5" />
        <div className="h-12 rounded-md bg-white/[0.04] border border-white/5" />
        <div className="h-12 rounded-md bg-white/[0.04] border border-white/5" />
      </div>
    </div>
  </div>
);

const TabletMockup = () => (
  <div className="relative w-[280px] h-[210px] rounded-2xl border border-white/15 bg-[hsl(var(--dyn-bg-2))] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden p-2">
    <div className="h-full w-full rounded-xl bg-[hsl(var(--dyn-bg-1))] p-2 flex gap-2">
      <div className="w-16 rounded-lg bg-white/[0.04] border border-white/5" />
      <div className="flex-1 grid grid-rows-3 gap-1.5">
        <div className="rounded-md bg-white/[0.08]" />
        <div className="rounded-md dyn-brand-gradient-bg opacity-70" />
        <div className="rounded-md bg-white/[0.06]" />
      </div>
    </div>
  </div>
);

const FeatureShowcase = () => {
  return (
    <section
      id="device-showcase"
      data-testid={DEVICES.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section overflow-hidden"
    >
      <div className="absolute -top-40 right-[-10%] w-[900px] h-[560px] rounded-full opacity-25 blur-3xl dyn-brand-gradient-bg-2 pointer-events-none" />
      <div className="dyn-container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="dyn-eyebrow">Satu Platform, Semua Perangkat</div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Kelola bisnis dari mana saja — <span className="dyn-brand-gradient-text">desktop, tablet, atau mobile</span>.
            </h2>
            <p className="mt-4 text-white/60">
              Dashboard responsive dengan performa cepat. Tim Anda tetap produktif meski
              sedang di kantor, gudang, atau di jalan.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                { icon: Zap, text: "Real-time analytics untuk order, revenue, dan conversion." },
                { icon: Layers, text: "Manajemen multi-brand & multi-outlet dari satu login." },
                { icon: ShieldCheck, text: "Keamanan enterprise-grade dengan role & permission." },
                { icon: Check, text: "Update fitur otomatis tanpa maintenance dari sisi Anda." },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.text} className="flex items-start gap-3 text-white/75">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                      <Icon className="h-3.5 w-3.5 text-blue-300" />
                    </span>
                    <span className="text-sm leading-relaxed">{f.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <DashboardMockup />
              <div className="absolute -bottom-10 -left-6 hidden md:block dyn-float">
                <PhoneMockup />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden md:block dyn-float-delayed">
                <TabletMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
