import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import StorefrontMockup from "@/components/landing/StorefrontMockup";
import { HERO } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const Hero = () => {
  const r1 = useRevealClass(0);
  const r2 = useRevealClass(80);
  const r3 = useRevealClass(160);
  const r4 = useRevealClass(220);
  const r5 = useRevealClass(120);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid={HERO.section}
      className="relative overflow-hidden bg-[hsl(var(--dyn-bg-0))]"
    >
      <div className="pointer-events-none absolute inset-0 dyn-hero-glow" />
      <div className="pointer-events-none absolute inset-0 dyn-noise" />

      <div className="dyn-container relative pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div
              ref={r1.ref}
              style={r1.style}
              className={`${r1.className} inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/80`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              BUILD • GROW • EMPOWER
            </div>

            <h1
              ref={r2.ref}
              style={r2.style}
              data-testid={HERO.headline}
              className={`${r2.className} mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]`}
            >
              <span className="dyn-text-gradient">Punya toko sendiri.</span>
              <br />
              <span className="dyn-text-gradient">Punya brand sendiri.</span>
              <br />
              <span className="dyn-brand-gradient-text">Punya masa depan sendiri.</span>
            </h1>

            <p
              ref={r3.ref}
              style={r3.style}
              className={`${r3.className} mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl`}
            >
              Dynicty membantu UMKM dan seller marketplace membangun toko online
              profesional dengan branding sendiri — tanpa perlu memahami coding
              atau mengelola hosting.
            </p>

            <div
              ref={r4.ref}
              style={r4.style}
              className={`${r4.className} mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3`}
            >
              <Button
                size="lg"
                data-testid={HERO.primaryCta}
                onClick={() => scrollTo("#template")}
                className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90 h-12 px-6 text-sm shadow-[0_12px_30px_-8px_rgba(139,92,246,0.55)]"
              >
                Lihat Contoh Toko
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid={HERO.secondaryCta}
                onClick={() => scrollTo("#cara-kerja")}
                className="h-12 px-6 text-sm bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
              >
                <PlayCircle className="h-4 w-4 mr-1.5" />
                Pelajari Cara Kerja
              </Button>
            </div>

            <div className="mt-6 text-xs text-white/50">
              Untuk info paket dan onboarding,{" "}
              <Link to="/kontak" className="underline underline-offset-2 text-white/75 hover:text-white">
                hubungi tim Dynicty
              </Link>.
            </div>
          </div>

          <div
            ref={r5.ref}
            style={r5.style}
            className={`${r5.className} lg:col-span-6 relative`}
          >
            <div className="absolute -inset-6 -z-10 rounded-[28px] dyn-brand-gradient-bg-2 opacity-25 blur-2xl" />
            <StorefrontMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
