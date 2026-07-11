import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  CreditCard,
  LayoutTemplate,
  PenTool,
  Rocket,
  Wand2,
  Palette,
  Globe,
  SlidersHorizontal,
  Search,
  Megaphone,
} from "lucide-react";
import { FEATURES } from "@/constants/testIds";

const features = [
  { icon: Layers, title: "Multi Tenant", desc: "Kelola banyak brand dari satu platform terpusat dengan isolasi data yang aman." },
  { icon: Sparkles, title: "White Label Penuh", desc: "Rebrand seluruh platform — logo, warna, domain, hingga email tanpa jejak Dynicty." },
  { icon: LayoutTemplate, title: "Template Engine", desc: "Puluhan template siap pakai untuk setiap kategori bisnis modern." },
  { icon: PenTool, title: "Template Designer", desc: "Editor visual drag & drop untuk custom section, layout, dan konten." },
  { icon: Rocket, title: "Deployment Otomatis", desc: "Website live dalam hitungan menit lewat deployment engine kami." },
  { icon: Wand2, title: "Provisioning Engine", desc: "Onboard tenant baru otomatis — database, environment, dan resource siap." },
  { icon: CreditCard, title: "Subscription Engine", desc: "Kelola paket, upgrade, dan tagihan pelanggan dengan cerdas." },
  { icon: Palette, title: "Branding Engine", desc: "Ganti tema, warna, dan aset brand tanpa sentuh baris kode." },
  { icon: Globe, title: "Domain Binding", desc: "Sambungkan custom domain sendiri dengan SSL gratis otomatis." },
  { icon: SlidersHorizontal, title: "Feature Package", desc: "Aktifkan / matikan fitur per tenant sesuai kebutuhan dan paket harga." },
  { icon: Search, title: "SEO Ready", desc: "Meta tags, sitemap, dan schema built-in agar brand mudah ditemukan." },
  { icon: Megaphone, title: "Marketing Tools", desc: "Kampanye, kupon, dan integrasi payment/shipping tersedia langsung." },
];

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.45 }}
    data-testid={FEATURES.card}
    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-white/20 transition-colors"
  >
    <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
      <div className="absolute inset-0 rounded-xl dyn-brand-gradient-bg opacity-0 group-hover:opacity-20 transition-opacity blur-lg" />
      <Icon className="h-5 w-5 text-white relative" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{desc}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section
      id="features"
      data-testid={FEATURES.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] dyn-section"
    >
      <div className="dyn-container">
        <div className="max-w-2xl">
          <div className="dyn-eyebrow">Kenapa Dynicty</div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Semua yang Anda butuhkan untuk
            <br />
            <span className="dyn-brand-gradient-text">membangun brand modern</span>.
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg max-w-xl">
            Dynicty menggabungkan engine kelas enterprise — template, subscription, deployment, dan branding — dalam satu platform yang mudah dipakai.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
