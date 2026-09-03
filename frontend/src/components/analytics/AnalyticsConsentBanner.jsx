import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CONSENT, useAnalyticsConsent } from "@/context/AnalyticsConsentContext";

export default function AnalyticsConsentBanner() {
  const { consent, accept, reject } = useAnalyticsConsent();
  if (consent !== CONSENT.UNKNOWN) return null;

  return (
    <aside
      role="dialog"
      aria-label="Pilihan privasi analitik"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[hsl(var(--dyn-bg-1))]/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:flex sm:items-center sm:gap-5"
      data-testid="analytics-consent-banner"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">Pilihan privasi Anda</p>
        <p className="mt-1 text-xs leading-5 text-white/65 sm:text-sm">
          Kami menggunakan analitik dan teknologi pemasaran hanya setelah Anda menyetujuinya. Pelajari di{" "}
          <Link to="/privacy" className="text-blue-300 underline underline-offset-2 hover:text-white">
            Kebijakan Privasi
          </Link>.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0">
        <Button type="button" variant="outline" onClick={reject} className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
          Tolak
        </Button>
        <Button type="button" onClick={accept} className="dyn-cta-primary">
          Terima
        </Button>
      </div>
    </aside>
  );
}
