import React from "react";
import { Home, Palette, Heart } from "lucide-react";
import { SOLUTION } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const pillars = [
  { icon: Home, title: "Website Anda Sendiri",
    desc: "Toko online dengan tampilan profesional yang bisa disesuaikan penuh dengan brand Anda." },
  { icon: Palette, title: "Brand Anda Sendiri",
    desc: "Logo, warna, teks, dan foto produk — semuanya bisa dikustom agar mencerminkan brand Anda." },
  { icon: Heart, title: "Pelanggan Anda Sendiri",
    desc: "Kelola pelanggan langsung di dashboard Anda. Bangun hubungan jangka panjang dengan mereka." },
];

const PillarCard = ({ icon: Icon, title, desc, delay }) => {
  const r = useRevealClass(delay);
  return (
    <div
      ref={r.ref}
      style={r.style}
      className={`${r.className} dyn-card p-6`}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl dyn-brand-gradient-bg-2 shadow-[0_10px_24px_-8px_rgba(139,92,246,0.5),inset_0_1px_0_rgba(255,255,255,0.18)]">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-5 text-[19px] font-semibold text-white tracking-tight">{title}</h3>
      <p className="mt-2 text-[14.5px] dyn-body leading-relaxed">{desc}</p>
    </div>
  );
};

const Solution = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="solusi"
      data-testid={SOLUTION.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="dyn-eyebrow">Kenalkan Dynicty</div>
          <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Toko online Anda sendiri —
            <br />
            <span className="dyn-brand-gradient-text">dengan branding sendiri, tanpa perlu ngoding.</span>
          </h2>
          <p className="mt-4 text-white/70">
            Pilih template. Sesuaikan branding. Kelola produk dan pesanan dari satu tempat. Semuanya mudah digunakan, bahkan untuk yang baru pertama kali punya website.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} delay={i * 80} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => scrollTo("#cara-kerja")}
            className="text-sm text-blue-300 hover:text-white transition-colors underline underline-offset-4"
          >
            Lihat langkah-langkahnya ↓
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solution;
