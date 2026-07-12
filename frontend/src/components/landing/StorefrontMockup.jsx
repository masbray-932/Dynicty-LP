import React from "react";

// Storefront tenant mockup — what a CONSUMER sees on a Dynicty-powered shop.
// This is NOT an admin/platform-owner dashboard. Custom SVG + HTML only.
const StorefrontMockup = () => {
  return (
    <div className="relative w-full aspect-[16/11] rounded-2xl border border-white/10 bg-[hsl(var(--dyn-bg-2))]/70 backdrop-blur-xl overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.65)]">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/10 bg-white/[0.03]">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-4 flex-1 max-w-md mx-auto rounded-md bg-white/[0.05] border border-white/10 h-5 flex items-center px-2">
          <span className="text-[10px] text-white/50 tracking-wider">brand-anda.com</span>
        </div>
      </div>

      {/* Storefront body */}
      <div className="p-4 h-[calc(100%-2.25rem)] flex flex-col gap-3">
        {/* Storefront nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md dyn-brand-gradient-bg" />
            <div className="text-white/85 text-xs font-semibold tracking-wide">BRAND ANDA</div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/50">
            <span>Beranda</span>
            <span>Produk</span>
            <span>Tentang</span>
            <span>Kontak</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40">Rp 0</span>
            <div className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero product */}
        <div className="relative flex-1 rounded-xl overflow-hidden border border-white/10"
             style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(139,92,246,0.35))" }}>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <div className="max-w-[55%]">
              <div className="text-[10px] uppercase tracking-widest text-white/70">Koleksi Baru</div>
              <div className="mt-1 text-white text-base sm:text-lg font-semibold leading-tight">Produk unggulan brand Anda</div>
              <div className="mt-2 text-[10px] text-white/60">Deskripsi singkat produk unggulan Anda.</div>
              <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-white/95 text-[10px] px-2 py-1 font-semibold text-[#0A0B1F]">Belanja Sekarang</div>
            </div>
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-white/25 border border-white/25" />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-2">
          {[0,1,2].map((i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 flex flex-col gap-1">
              <div className="aspect-square rounded-md bg-gradient-to-br from-white/10 to-white/[0.02]" />
              <div className="h-1.5 w-3/4 rounded bg-white/15" />
              <div className="h-1.5 w-1/2 rounded bg-white/10" />
              <div className="mt-1 h-3 w-16 rounded dyn-brand-gradient-bg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorefrontMockup;
