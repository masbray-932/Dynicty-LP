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
      className="relative overflow-hidden bg-[hsl(var(--dyn-bg-0))] isolate"
    >
      {/* Depth layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dyn-hero-glow" />
      <div aria-hidden className="pointer-events-none absolute inset-0 dyn-hero-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 dyn-noise" />

      {/* Corner orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.45), rgba(59,130,246,0))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[560px] w-[560px] rounded-full blur-3xl opacity-55"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(139,92,246,0))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-14%] left-1/3 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(closest-side, rgba(109,94,247,0.35), rgba(109,94,247,0))" }}
      />

      <div className="dyn-container relative pt-16 pb-24 lg:pt-28 lg:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <div
              ref={r1.ref}
              style={r1.style}
              className={`${r1.className} inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] backdrop-blur`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]" />
              <span className="dyn-aurora font-medium">BUILD • GROW • EMPOWER</span>
            </div>

            <h1
              ref={r2.ref}
              style={r2.style}
              data-testid={HERO.headline}
              className={`${r2.className} mt-6 text-[42px] sm:text-6xl lg:text-[68px] font-semibold tracking-tight leading-[1.02]`}
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
              className={`${r3.className} mt-6 text-[17px] sm:text-lg dyn-body max-w-xl`}
            >
              Dynicty membantu UMKM dan seller marketplace membangun toko online
              profesional dengan branding sendiri — tanpa perlu memahami coding
              atau mengelola hosting.
            </p>

            <div
              ref={r4.ref}
              style={r4.style}
              className={`${r4.className} mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3`}
            >
              <Button
                size="lg"
                data-testid={HERO.primaryCta}
                onClick={() => scrollTo("#template")}
                className="dyn-cta-primary h-12 px-7 text-[14.5px] rounded-xl"
              >
                Lihat Contoh Toko
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                data-testid={HERO.secondaryCta}
                onClick={() => scrollTo("#cara-kerja")}
                className="dyn-cta-secondary h-12 px-6 text-[14.5px] rounded-xl hover:text-white"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Pelajari Cara Kerja
              </Button>
            </div>

            <div className="mt-7 text-[13px] text-white/55">
              Untuk info paket dan onboarding,{" "}
              <Link to="/kontak" className="underline underline-offset-[6px] decoration-white/25 text-white/80 hover:text-white hover:decoration-white/60 transition">
                hubungi tim Dynicty
              </Link>.
            </div>
          </div>

          <div
            ref={r5.ref}
            style={r5.style}
            className={`${r5.className} lg:col-span-6 relative`}
          >
            <div className="dyn-mockup-frame">
              <div className="dyn-mockup-glow" aria-hidden />
              <div className="dyn-mockup">
                <StorefrontMockup />
              </div>
              <div className="dyn-mockup-reflection" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
