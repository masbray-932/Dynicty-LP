import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/constants/testIds";
import { PRICING_PLANS } from "@/constants/plans";
import CtaLink from "@/components/landing/CtaLink";
import useContact from "@/hooks/useContact";
import { useRevealClass } from "@/hooks/useInView";

/**
 * Resolve the correct CTA href for a plan.
 * Order: paket-specific WhatsApp message (if the platform WA number is set)
 *        → generic ctaHref (WhatsApp with default paket message)
 *        → internal /kontak fallback (both handled by useContact).
 */
const usePlanCtaHref = (plan) => {
  const { whatsappUrl, ctaHref } = useContact();
  const specific = plan.waMessage ? whatsappUrl(plan.waMessage) : null;
  return specific || ctaHref({ paket: plan.name, source: "pricing" });
};

const PlanCard = ({ plan, delay }) => {
  const r = useRevealClass(delay);
  const href = usePlanCtaHref(plan);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={PRICING.card}
      data-plan={plan.key}
      className={[
        r.className,
        "dyn-card p-7 flex flex-col relative",
        plan.highlighted
          ? "ring-1 ring-inset ring-[hsl(var(--dyn-brand-mid))]/30 shadow-[0_20px_60px_-20px_rgba(109,94,247,0.45)]"
          : "",
      ].join(" ")}
    >
      {plan.highlighted ? (
        <span
          data-testid="pricing-popular-badge"
          className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] dyn-brand-gradient-bg text-white shadow-[0_8px_24px_-8px_rgba(109,94,247,0.65)]"
        >
          <Sparkles className="h-3 w-3" />
          Paling Populer
        </span>
      ) : null}

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          {plan.name}
        </h3>
      </div>

      <div className="mt-4 flex items-baseline gap-1.5 flex-wrap">
        <span
          className="text-[26px] sm:text-[30px] font-semibold text-white tracking-tight"
          data-testid="pricing-plan-price"
        >
          {plan.priceDisplay}
        </span>
        {plan.pricePeriod ? (
          <span className="text-[13px] text-white/55">{plan.pricePeriod}</span>
        ) : null}
      </div>
      <p className="mt-2 text-[14px] dyn-body">{plan.tagline}</p>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <ul className="mt-5 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[14px] text-white/85"
          >
            <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full dyn-brand-gradient-bg shrink-0 shadow-[0_4px_10px_-4px_rgba(109,94,247,0.6)]">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.notes ? (
        <p className="mt-4 text-[12px] text-white/50 leading-relaxed border-t border-white/10 pt-4">
          {plan.notes}
        </p>
      ) : null}

      <CtaLink to={href} className="mt-7 block">
        <Button
          data-testid={PRICING.cta}
          className={[
            "h-11 w-full text-[13.5px] rounded-xl",
            plan.highlighted ? "dyn-cta-primary" : "dyn-cta-primary",
          ].join(" ")}
        >
          {plan.ctaLabel}
        </Button>
      </CtaLink>
    </div>
  );
};

const Pricing = () => {
  return (
    <section
      id="harga"
      data-testid={PRICING.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Harga</div>
          <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Paket untuk{" "}
            <span className="dyn-brand-gradient-text">setiap tahap bisnis.</span>
          </h2>
          <p className="mt-4 text-white/70">
            Pilih paket yang sesuai dengan skala bisnis Anda. Semua paket
            berlaku per tahun, dapat diaktifkan langsung setelah pembayaran.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <PlanCard key={plan.key} plan={plan} delay={i * 80} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/45 max-w-2xl mx-auto">
          Harga belum termasuk pajak yang berlaku. Biaya payment gateway dan
          layanan pihak ketiga dapat berlaku sesuai metode yang digunakan.
          Fitur per paket dapat berubah seiring pengembangan produk.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
