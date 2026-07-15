import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FINAL_CTA } from "@/constants/testIds";
import CtaLink from "@/components/landing/CtaLink";
import useContact from "@/hooks/useContact";
import { useRevealClass } from "@/hooks/useInView";

const FinalCta = () => {
  const r = useRevealClass();
  const { ctaHref } = useContact();
  return (
    <section
      data-testid={FINAL_CTA.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div
          ref={r.ref}
          style={r.style}
          className={`${r.className} relative overflow-hidden rounded-[28px] p-10 sm:p-16 text-center border border-white/10`}
        >
          {/* Layered gradient background */}
          <div className="absolute inset-0 dyn-brand-gradient-bg-2" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_55%)] pointer-events-none" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.28),transparent_55%)] pointer-events-none" aria-hidden />
          <div className="absolute inset-0 dyn-noise pointer-events-none" aria-hidden />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.18] border border-white/25 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur">
              BUILD • GROW • EMPOWER
            </div>
            <h2 className="mt-6 text-[34px] sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
              Saatnya punya <span className="underline decoration-white/50 decoration-2 underline-offset-[8px]">rumah brand Anda sendiri.</span>
            </h2>
            <p className="mt-5 text-white/90 max-w-2xl mx-auto text-[16px] leading-relaxed">
              Ceritakan kebutuhan bisnis Anda. Tim Dynicty akan membantu memilih paket dan mendampingi proses setup sampai toko siap online.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <CtaLink to={ctaHref({ source: "final-cta" })}>
                <Button
                  size="lg"
                  data-testid={FINAL_CTA.cta}
                  className="bg-white text-[#0A0B1F] hover:bg-white/95 h-12 px-7 rounded-xl font-semibold shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
                >
                  Konsultasi Gratis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CtaLink>
              <a
                href="#onboarding"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#onboarding")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white hover:text-white/95 text-[14px] font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white/80"
              >
                Lihat Proses Onboarding →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
