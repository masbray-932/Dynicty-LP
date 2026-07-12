import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/constants/testIds";
import { PRICING_PLANS } from "@/constants/plans";
import { ctaHref } from "@/lib/cta";
import { useRevealClass } from "@/hooks/useInView";

const PlanCard = ({ plan, delay }) => {
  const r = useRevealClass(delay);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={PRICING.card}
      className={`${r.className} relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
      </div>
      <div className="mt-3">
        <span className="text-2xl sm:text-3xl font-semibold text-white">{plan.priceDisplay}</span>
      </div>
      <p className="mt-2 text-sm text-white/65">{plan.tagline}</p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/85">
            <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full dyn-brand-gradient-bg shrink-0">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link to={ctaHref({ paket: plan.name, source: "pricing" })} className="mt-6 block">
        <Button
          data-testid={PRICING.cta}
          className="h-11 w-full text-sm dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
        >
          {plan.ctaLabel}
        </Button>
      </Link>
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
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Paket untuk <span className="dyn-brand-gradient-text">setiap tahap bisnis.</span>
          </h2>
          <p className="mt-4 text-white/65">
            Harga resmi akan segera diumumkan. Untuk informasi lebih lanjut mengenai paket dan onboarding, silakan hubungi tim kami.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <PlanCard key={plan.key} plan={plan} delay={i * 80} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/45 max-w-2xl mx-auto">
          Harga belum termasuk pajak yang berlaku. Biaya payment gateway dan layanan pihak ketiga dapat berlaku sesuai metode yang digunakan. Fitur per paket dapat berubah seiring pengembangan produk.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
