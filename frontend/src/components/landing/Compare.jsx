import React from "react";
import { Check, X, Minus } from "lucide-react";
import { COMPARE } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const rows = [
  { label: "Kepemilikan brand",              a: { icon: Minus, text: "Terbatas identitas platform" },      b: { icon: Check, text: "Brand dengan tampilan sendiri" } },
  { label: "Data pelanggan",                 a: { icon: Minus, text: "Sebagian terbatas oleh platform" },  b: { icon: Check, text: "Kelola pelanggan di dashboard Anda" } },
  { label: "Komisi & biaya",                 a: { icon: X,     text: "Komisi + biaya layanan per transaksi" }, b: { icon: Check, text: "Tidak ada komisi marketplace atas transaksi di website Anda*" } },
  { label: "Kontrol tampilan",               a: { icon: Minus, text: "Terbatas template platform" },       b: { icon: Check, text: "Kustomisasi tampilan lebih fleksibel" } },
  { label: "Ketergantungan algoritma",       a: { icon: X,     text: "Tinggi" },                             b: { icon: Check, text: "Berkurang" } },
  { label: "Kredibilitas brand",             a: { icon: Minus, text: "Dibatasi listing platform" },         b: { icon: Check, text: "Website resmi = kredibilitas lebih tinggi" } },
  { label: "Follow-up pelanggan",            a: { icon: Minus, text: "Terbatas" },                          b: { icon: Check, text: "Anda bisa follow-up langsung" } },
  { label: "Total kontrol bisnis",           a: { icon: Minus, text: "Lebih rendah" },                     b: { icon: Check, text: "Anda pemimpinnya" } },
];

const iconClass = (Icon) => {
  if (Icon === Check) return "text-emerald-300";
  if (Icon === X)     return "text-red-300";
  return "text-white/45";
};

const Compare = () => {
  const r = useRevealClass();
  return (
    <section
      id="perbandingan"
      data-testid={COMPARE.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Perbandingan</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Kombinasi paling kuat: <span className="dyn-brand-gradient-text">Marketplace + Website Anda Sendiri.</span>
          </h2>
        </div>

        <div ref={r.ref} style={r.style} className={`${r.className} mt-10 overflow-hidden rounded-2xl border border-white/10`}>
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.03]">
            <div className="px-4 py-3 text-xs uppercase tracking-widest text-white/50">Aspek</div>
            <div className="px-4 py-3 text-xs uppercase tracking-widest text-white/50 border-l border-white/10">Hanya Marketplace</div>
            <div className="px-4 py-3 text-xs uppercase tracking-widest text-white border-l border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              Marketplace + Dynicty
            </div>
          </div>

          {/* Rows */}
          {rows.map((row) => {
            const AI = row.a.icon;
            const BI = row.b.icon;
            return (
              <div key={row.label} className="grid grid-cols-3 border-t border-white/10 text-sm">
                <div className="px-4 py-3 text-white/85">{row.label}</div>
                <div className="px-4 py-3 border-l border-white/10 text-white/70 flex items-start gap-2">
                  <AI className={`h-4 w-4 mt-0.5 shrink-0 ${iconClass(AI)}`} />
                  <span>{row.a.text}</span>
                </div>
                <div className="px-4 py-3 border-l border-white/10 text-white flex items-start gap-2 bg-gradient-to-r from-blue-500/[0.04] to-purple-500/[0.04]">
                  <BI className={`h-4 w-4 mt-0.5 shrink-0 ${iconClass(BI)}`} />
                  <span>{row.b.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-white/40">
          *Biaya payment gateway dan layanan pihak ketiga dapat berlaku sesuai metode yang digunakan.
        </p>
      </div>
    </section>
  );
};

export default Compare;
