import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TryFreeModal from "@/components/landing/TryFreeModal";
import Sparkle from "@/components/landing/Sparkle";
import { FINAL_CTA } from "@/constants/testIds";

const FinalCta = () => {
  const [open, setOpen] = useState(false);
  return (
    <section
      data-testid={FINAL_CTA.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="relative overflow-hidden rounded-3xl dyn-brand-gradient-bg-2 p-8 sm:p-14 text-center">
          {/* Sparkles */}
          <div className="absolute top-4 left-6"><Sparkle size={12} /></div>
          <div className="absolute top-10 right-8"><Sparkle size={16} /></div>
          <div className="absolute bottom-6 left-1/3"><Sparkle size={9} /></div>
          <div className="absolute bottom-10 right-14"><Sparkle size={12} /></div>

          {/* overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white">
              Build • Grow • Empower
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Build Your Brand Today.
            </h2>
            <p className="mt-3 text-white/85 max-w-xl mx-auto">
              Gabung dengan ratusan brand modern Indonesia yang sudah mempercayakan
              e-commerce mereka pada Dynicty.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                data-testid={FINAL_CTA.button}
                onClick={() => setOpen(true)}
                className="bg-white text-[#0A0B1F] hover:bg-white/90 h-12 px-6"
              >
                Coba Gratis 14 Hari
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/95 hover:text-white text-sm font-medium underline underline-offset-4"
              >
                Lihat Paket Harga
              </a>
            </div>
            <div className="mt-4 text-xs text-white/80">
              Tanpa kartu kredit • Setup 10 menit • Siap white label
            </div>
          </motion.div>
        </div>
      </div>

      <TryFreeModal open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default FinalCta;
