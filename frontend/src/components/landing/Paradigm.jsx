import React from "react";
import { Store, Home } from "lucide-react";
import { PARADIGM } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const Paradigm = () => {
  const r1 = useRevealClass(0);
  const r2 = useRevealClass(100);

  return (
    <section
      id="paradigma"
      data-testid={PARADIGM.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div ref={r1.ref} style={r1.style} className={`${r1.className} lg:col-span-7`}>
            <div className="dyn-eyebrow">Bukan Marketplace vs Website</div>
            <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
              <span className="dyn-brand-gradient-text">Marketplace</span> membantu Anda ditemukan.
              <br />
              <span className="dyn-brand-gradient-text">Dynicty</span> membantu brand Anda dimiliki.
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl text-base sm:text-lg">
              Marketplace tetap membantu mendapatkan pelanggan baru. Dynicty membantu membangun channel penjualan dan brand milik Anda sendiri — sehingga pelanggan bisa kembali langsung ke toko Anda.
            </p>
          </div>

          <div
            ref={r2.ref}
            style={r2.style}
            className={`${r2.className} lg:col-span-5 relative`}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="grid grid-cols-2 gap-3 items-stretch">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <div className="mx-auto h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Store className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-white/50">Marketplace</div>
                  <div className="mt-1 text-sm text-white/85">Kolam pelanggan baru</div>
                </div>
                <div className="rounded-xl border border-white/15 bg-gradient-to-br from-blue-500/15 to-purple-500/15 p-4 text-center">
                  <div className="mx-auto h-10 w-10 rounded-lg dyn-brand-gradient-bg flex items-center justify-center">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-white/60">Website Anda</div>
                  <div className="mt-1 text-sm text-white">Rumah brand Anda</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/60">
                <span className="h-px w-8 bg-white/20" />
                Pelanggan berpindah ke rumah brand Anda
                <span className="h-px w-8 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Paradigm;
