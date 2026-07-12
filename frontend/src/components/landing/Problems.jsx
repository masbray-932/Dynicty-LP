import React from "react";
import { Percent, Lock, UserX, Layers } from "lucide-react";
import { PROBLEMS } from "@/constants/testIds";
import { useRevealClass } from "@/hooks/useInView";

const problems = [
  { icon: Percent, title: "Komisi dan biaya layanan",
    desc: "Setiap penjualan di marketplace dipotong komisi dan biaya layanan. Semakin besar volume, semakin besar biaya yang keluar." },
  { icon: Lock, title: "Aturan platform bisa berubah",
    desc: "Algoritma, penalti, hingga kebijakan promosi bisa berubah kapan saja — di luar kendali Anda." },
  { icon: UserX, title: "Data pelanggan terbatas",
    desc: "Sebagian data pelanggan tidak Anda miliki sepenuhnya. Follow-up dan hubungan jangka panjang jadi lebih sulit." },
  { icon: Layers, title: "Brand terlihat serupa",
    desc: "Di listing marketplace, sulit menampilkan keunikan brand Anda dibandingkan kompetitor." },
];

const ProblemCard = ({ icon: Icon, title, desc, delay }) => {
  const r = useRevealClass(delay);
  return (
    <div
      ref={r.ref}
      style={r.style}
      data-testid={PROBLEMS.card}
      className={`${r.className} dyn-glass dyn-glass-hover rounded-2xl p-5`}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{desc}</p>
    </div>
  );
};

const Problems = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="masalah"
      data-testid={PROBLEMS.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container">
        <div className="max-w-2xl">
          <div className="dyn-eyebrow">Tantangan Seller Marketplace</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Anda kerja keras. Tapi sebagian besar hasilnya... <span className="dyn-brand-gradient-text">belum sepenuhnya milik Anda.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base sm:text-lg max-w-xl">
            Marketplace membantu Anda menemukan pelanggan baru. Namun brand, hubungan pelanggan, dan sebagian dari setiap transaksi tetap dipegang oleh platform mereka.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} {...p} delay={i * 60} />
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => scrollTo("#solusi")}
            className="text-sm text-blue-300 hover:text-white transition-colors underline underline-offset-4"
          >
            Lihat cara Dynicty membantu →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problems;
