import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FINAL_CTA } from "@/constants/testIds";
import { ctaHref } from "@/lib/cta";
import { useRevealClass } from "@/hooks/useInView";

const FinalCta = () => {
  const r = useRevealClass();
  return (
    <section
      data-testid={FINAL_CTA.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div
          ref={r.ref}
          style={r.style}
          className={`${r.className} relative overflow-hidden rounded-3xl dyn-brand-gradient-bg-2 p-8 sm:p-14 text-center`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white">
              BUILD • GROW • EMPOWER
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Saatnya punya <span className="underline decoration-white/50 decoration-2 underline-offset-4">rumah brand Anda sendiri.</span>
            </h2>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              Marketplace membantu Anda ditemukan. Dynicty membantu brand Anda dimiliki. Pelajari lebih lanjut tentang paket yang paling cocok untuk bisnis Anda.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={ctaHref({ source: "final-cta" })}>
                <Button
                  size="lg"
                  data-testid={FINAL_CTA.cta}
                  className="bg-white text-[#0A0B1F] hover:bg-white/90 h-12 px-6"
                >
                  Hubungi Kami
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href="#cara-kerja"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#cara-kerja")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white hover:text-white/90 text-sm font-medium underline underline-offset-4"
              >
                Pelajari Cara Kerja →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
