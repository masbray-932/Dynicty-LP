import React from "react";
import { Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADDONS } from "@/constants/testIds";
import { ADDON_ITEMS } from "@/constants/plans";
import CtaLink from "@/components/landing/CtaLink";
import useContact from "@/hooks/useContact";
import { useRevealClass } from "@/hooks/useInView";

/**
 * Compute an add-on CTA href — prefers the add-on-specific WhatsApp
 * message when a phone number is configured, otherwise falls back
 * to the internal /kontak page.
 */
const useAddonHref = (addon) => {
  const { whatsappUrl, ctaHref } = useContact();
  const specific = addon.waMessage ? whatsappUrl(addon.waMessage) : null;
  return specific || ctaHref({ paket: addon.name, source: "addon" });
};

const AddonCard = ({ addon, delay }) => {
  const r = useRevealClass(delay);
  const href = useAddonHref(addon);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={ADDONS.card}
      data-addon={addon.key}
      className={`${r.className} dyn-card p-6 flex flex-col`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold text-white tracking-tight">
            {addon.name}
          </h3>
        </div>
        <span
          aria-hidden
          className="h-8 w-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/70 shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
        <span
          className="text-[22px] font-semibold text-white tracking-tight"
          data-testid="addon-price"
        >
          {addon.priceDisplay}
        </span>
        <span className="text-[12.5px] text-white/55">{addon.pricePeriod}</span>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ul className="mt-4 space-y-2.5 flex-1">
        {addon.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[13.5px] text-white/85"
          >
            <span className="mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/10 border border-white/15 shrink-0">
              <Check className="h-2.5 w-2.5 text-white/85" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CtaLink to={href} trackingContext={{ source: "addon", addon: addon.name }} className="mt-6 block">
        <Button
          data-testid={ADDONS.cta}
          variant="outline"
          className="h-10 w-full text-[13px] rounded-xl bg-white/[0.02] border-white/15 text-white hover:bg-white/[0.06] hover:border-white/25"
        >
          {addon.ctaLabel}
        </Button>
      </CtaLink>
    </div>
  );
};

const AddOns = () => {
  return (
    <section
      id="addons"
      data-testid={ADDONS.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section pt-0"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Add-On Premium</div>
          <h2 className="mt-3 text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.08] text-white">
            Aktifkan fitur tambahan sesuai{" "}
            <span className="dyn-brand-gradient-text">kebutuhan bisnis Anda.</span>
          </h2>
          <p className="mt-4 text-white/70">
            Perluas kemampuan toko Anda tanpa pindah platform — mulai dari
            integrasi pengiriman, notifikasi, hingga program loyalitas. Add-on
            bersifat opsional dan tidak termasuk otomatis di dalam paket utama.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {ADDON_ITEMS.map((addon, i) => (
            <AddonCard key={addon.key} addon={addon} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOns;
