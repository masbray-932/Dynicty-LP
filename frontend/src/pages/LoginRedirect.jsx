import React, { useEffect } from "react";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ExternalLink } from "lucide-react";

export default function LoginRedirect() {
  useEffect(() => {
    // In production this would forward to app.dynicty.com
    // For preview environment, we simply show a friendly info page.
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO
        title="Masuk — Dynicty"
        description="Login Dynicty tersedia di app.dynicty.com"
        url="https://dynicty.com/login"
        noindex
      />
      <Navbar />
      <main className="dyn-container py-24 text-center">
        <div className="inline-flex"><BrandLogo size={32} /></div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold">Masuk ke Dashboard</h1>
        <p className="mt-3 text-white/60 max-w-md mx-auto">
          Dashboard Dynicty tersedia di <span className="text-white">app.dynicty.com</span>. Klik
          tombol di bawah untuk melanjutkan ke halaman login.
        </p>
        <a
          href="https://app.dynicty.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg dyn-brand-gradient-bg text-white px-5 py-3 hover:opacity-90 transition-opacity"
        >
          Buka app.dynicty.com
          <ExternalLink className="h-4 w-4" />
        </a>
      </main>
      <Footer />
    </div>
  );
}
