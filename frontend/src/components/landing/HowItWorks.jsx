import React from "react";
import { LayoutTemplate, Palette, Package, Store } from "lucide-react";
import { HOW } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const steps = [
  { icon: LayoutTemplate, title: "Pilih Template",
    desc: "Mulai dari template yang cocok dengan kategori bisnis Anda." },
  { icon: Palette, title: "Sesuaikan Branding",
    desc: "Ganti logo, warna, dan konten agar sesuai dengan brand Anda." },
  { icon: Package, title: "Tambahkan Produk",
    desc: "Upload produk Anda beserta harga, deskripsi, dan foto." },
  { icon: Store, title: "Kelola Toko Anda",
    desc: "Terima pesanan, kelola pelanggan, dan pantau performa dari dashboard." },
];

const Step = ({ icon: Icon, title, desc, index, delay }) => {
  const r = useRevealClass(delay);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={HOW.step}
      className={`${r.className} relative rounded-2xl border border-white/10 bg-white/[0.03] p-5`}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl dyn-brand-gradient-bg-2 flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(139,92,246,0.55)]">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-xs uppercase tracking-[0.24em] text-white/45">
          Langkah {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-white/65">{desc}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section
      id="cara-kerja"
      data-testid={HOW.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Cara Kerja</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Toko online Anda siap dalam <span className="dyn-brand-gradient-text">beberapa langkah sederhana.</span>
          </h2>
          <p className="mt-4 text-white/65">
            Kalau Anda sudah terbiasa menggunakan aplikasi sehari-hari, Anda pasti bisa menggunakan Dynicty.
          </p>
        </div>

        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((s, i) => (
              <Step key={s.title} {...s} index={i} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
