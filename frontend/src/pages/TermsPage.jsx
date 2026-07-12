import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO title="Syarat & Ketentuan — Dynicty" description="Syarat dan ketentuan layanan Dynicty." url="https://dynicty.com/terms" noindex />
      <Navbar />
      <main className="dyn-container py-16 lg:py-24 max-w-3xl">
        <div className="dyn-eyebrow">Legal</div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Syarat & Ketentuan</h1>
        <p className="mt-4 text-white/65">Dengan menggunakan layanan Dynicty, Anda setuju untuk terikat pada syarat dan ketentuan berikut.</p>
        <div className="mt-8 space-y-6 text-sm text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-semibold">1. Layanan</h2>
            <p className="mt-2">Dynicty menyediakan platform untuk membantu UMKM dan seller marketplace memiliki toko online sendiri.</p>
          </section>
          <section>
            <h2 className="text-white text-lg font-semibold">2. Penggunaan yang Diperbolehkan</h2>
            <p className="mt-2">Anda dilarang menggunakan platform untuk aktivitas melanggar hukum, spam, atau distribusi konten berbahaya.</p>
          </section>
          <section>
            <h2 className="text-white text-lg font-semibold">3. Kontak</h2>
            <p className="mt-2">Untuk pertanyaan lebih lanjut, silakan hubungi kami melalui halaman <Link to="/kontak" className="underline">Kontak</Link>.</p>
          </section>
        </div>
        <div className="mt-10">
          <Link to="/" className="text-blue-300 hover:text-white text-sm">← Kembali ke Beranda</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
