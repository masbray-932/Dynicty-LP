import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
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
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section dyn-section-divider"
    >
      <div className="dyn-container">
        <div
          ref={r.ref}
          style={r.style}
          className={`${r.className} dyn-final-cta relative overflow-hidden rounded-[24px] sm:rounded-[30px] px-5 py-11 sm:p-16 lg:px-20 lg:py-20 text-center border border-white/10`}
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
            <h2 className="mt-6 text-[32px] sm:text-4xl lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Saatnya punya <span className="underline decoration-white/50 decoration-2 underline-offset-[8px]">rumah brand Anda sendiri.</span>
            </h2>
            <p className="mt-5 text-white/90 max-w-2xl mx-auto text-[16px] leading-relaxed">
              Ceritakan kebutuhan bisnis Anda. Tim Dynicty akan membantu memilih paket dan mendampingi proses setup sampai toko siap online.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-white/80">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />Konsultasi tanpa biaya</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />Pendampingan setup</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />Biaya transparan</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <CtaLink to={ctaHref({ source: "final-cta" })} trackingContext={{ source: "final-cta" }}>
                <Button
                  size="lg"
                  data-testid={FINAL_CTA.cta}
                  className="w-full sm:w-auto bg-white text-[#0A0B1F] hover:bg-white/95 h-[50px] px-7 rounded-xl font-semibold shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
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
