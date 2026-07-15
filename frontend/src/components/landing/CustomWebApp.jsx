import React from "react";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CUSTOM_WEB } from "@/constants/testIds";
import { CUSTOM_WEB_APP } from "@/constants/plans";
import CtaLink from "@/components/landing/CtaLink";
import useContact from "@/hooks/useContact";
import { useRevealClass } from "@/hooks/useInView";

const CustomWebApp = () => {
  const r = useRevealClass();
  const { whatsappUrl, ctaHref } = useContact();
  const href =
    (CUSTOM_WEB_APP.waMessage && whatsappUrl(CUSTOM_WEB_APP.waMessage)) ||
    ctaHref({ paket: "Custom Web App", source: "custom-web-app" });

  return (
    <section
      id="custom-web-app"
      data-testid={CUSTOM_WEB.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section pt-0"
    >
      <div className="dyn-container">
        <div
          ref={r.ref}
          style={r.style}
          className={`${r.className} relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[hsl(var(--dyn-bg-1))] via-[hsl(var(--dyn-bg-1))] to-[hsl(var(--dyn-bg-0))] p-8 lg:p-12 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.6)]`}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.35), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.32), transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/12 bg-white/[0.03] text-[11px] uppercase tracking-[0.2em] text-white/70">
                <Layers className="h-3.5 w-3.5" />
                Solusi Custom
              </div>

              <h2 className="mt-4 text-[30px] sm:text-[38px] lg:text-[46px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
                {CUSTOM_WEB_APP.title}{" "}
                <span className="dyn-brand-gradient-text">
                  untuk kebutuhan bisnis khusus.
                </span>
              </h2>

              <p className="mt-4 text-white/70 max-w-xl leading-relaxed">
                {CUSTOM_WEB_APP.description}
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {CUSTOM_WEB_APP.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] text-white/85"
                  >
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full dyn-brand-gradient-bg shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-7 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Harga
                </div>
                <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                  <span
                    className="text-[26px] sm:text-[30px] font-semibold text-white tracking-tight"
                    data-testid="custom-web-app-price"
                  >
                    {CUSTOM_WEB_APP.priceDisplay}
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-white/60 leading-relaxed">
                  Setiap proyek custom dinilai berdasarkan lingkup, integrasi,
                  dan timeline. Tim kami akan menyiapkan proposal yang sesuai
                  dengan kebutuhan Anda.
                </p>
                <CtaLink to={href} className="mt-6 block">
                  <Button
                    data-testid={CUSTOM_WEB.cta}
                    className="h-12 w-full text-[14px] dyn-cta-primary rounded-xl"
                  >
                    {CUSTOM_WEB_APP.ctaLabel}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomWebApp;
