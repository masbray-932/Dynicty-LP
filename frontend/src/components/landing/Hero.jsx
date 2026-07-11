import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles, ShoppingBag, TrendingUp } from "lucide-react";
import DashboardMockup from "@/components/landing/DashboardMockup";
import TryFreeModal from "@/components/landing/TryFreeModal";
import Sparkle from "@/components/landing/Sparkle";
import { HERO } from "@/constants/testIds";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="home"
      data-testid={HERO.section}
      className="relative overflow-hidden bg-[hsl(var(--dyn-bg-0))]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 dyn-hero-glow" />
      <div className="pointer-events-none absolute inset-0 dyn-noise" />

      {/* Sparkles */}
      <div className="pointer-events-none absolute top-24 left-[8%] hidden md:block">
        <Sparkle size={14} />
      </div>
      <div className="pointer-events-none absolute top-40 right-[10%] hidden md:block">
        <Sparkle size={10} />
      </div>
      <div className="pointer-events-none absolute bottom-32 left-[45%] hidden md:block">
        <Sparkle size={8} />
      </div>

      <div className="dyn-container relative pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              White Label E-Commerce SaaS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              data-testid={HERO.headline}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
            >
              <span className="dyn-text-gradient">Platform All-in-One</span>
              <br />
              untuk <span className="dyn-brand-gradient-text">Bisnis Modern</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl"
            >
              Bangun, kelola, dan scale website e-commerce Anda dengan platform SaaS white label
              lengkap — Template Engine, Multi Tenant, Subscription, Deployment otomatis, dan Domain Binding — dalam satu ekosistem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/50"
            >
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              Build
              <span className="h-1 w-1 rounded-full bg-indigo-400" />
              Grow
              <span className="h-1 w-1 rounded-full bg-purple-400" />
              Empower
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button
                size="lg"
                data-testid={HERO.tryFree}
                onClick={() => setModalOpen(true)}
                className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90 h-12 px-6 text-sm shadow-[0_12px_30px_-8px_rgba(139,92,246,0.55)]"
              >
                Coba Gratis 14 Hari
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid={HERO.demo}
                onClick={() => {
                  const el = document.querySelector("#device-showcase");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-12 px-6 text-sm bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
              >
                <PlayCircle className="h-4 w-4 mr-1.5" />
                Lihat Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex items-center gap-2 text-xs text-white/50"
            >
              <span className="inline-flex h-5 items-center px-1.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] uppercase tracking-wider">
                Live
              </span>
              Tanpa kartu kredit • Setup dalam 10 menit • Siap white label
            </motion.div>
          </div>

          {/* Mockup */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-6 -z-10 rounded-[28px] dyn-brand-gradient-bg-2 opacity-25 blur-2xl" />
              <DashboardMockup />

              {/* Floating card - Orders */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute -bottom-6 -left-6 sm:-left-10 dyn-glass rounded-xl px-3 py-2.5 flex items-center gap-3 min-w-[190px] dyn-float"
              >
                <div className="h-9 w-9 rounded-lg dyn-brand-gradient-bg flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Pesanan Baru</div>
                  <div className="font-semibold text-sm text-white">+184 hari ini</div>
                </div>
              </motion.div>

              {/* Floating card - Growth */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="absolute -top-6 -right-2 sm:-right-8 dyn-glass rounded-xl px-3 py-2.5 flex items-center gap-3 dyn-float-delayed"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Revenue MoM</div>
                  <div className="font-semibold text-sm text-white">+38%</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <TryFreeModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default Hero;
