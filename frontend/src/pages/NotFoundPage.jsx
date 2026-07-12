import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO title="404 — Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak ditemukan." noindex />
      <Navbar />
      <main className="dyn-container py-24 text-center">
        <div className="dyn-eyebrow">Error 404</div>
        <h1 className="mt-3 text-5xl sm:text-6xl font-semibold"><span className="dyn-brand-gradient-text">Halaman tidak ditemukan.</span></h1>
        <p className="mt-4 text-white/65">Sepertinya link yang Anda ikuti sudah kadaluarsa atau salah alamat.</p>
        <Link to="/" className="mt-8 inline-flex rounded-lg dyn-brand-gradient-bg px-5 py-3 hover:opacity-90 text-white">Kembali ke Beranda</Link>
      </main>
      <Footer />
    </div>
  );
}
