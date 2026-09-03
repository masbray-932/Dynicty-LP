import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CONSENT, useAnalyticsConsent } from "@/context/AnalyticsConsentContext";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  const { consent, accept, reject } = useAnalyticsConsent();
  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO pageKey="privacy" />
      <Navbar />
      <main className="dyn-container py-16 lg:py-24 max-w-3xl">
        <div className="dyn-eyebrow">Legal</div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Kebijakan Privasi</h1>
        <p className="mt-4 text-white/65">
          Dynicty menghormati privasi Anda. Halaman ini menjelaskan bagaimana kami mengumpulkan,
          menggunakan, dan melindungi informasi yang Anda berikan saat menggunakan situs dan layanan kami.
        </p>
        <div className="mt-8 space-y-6 text-sm text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-semibold">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mt-2">Kami mengumpulkan data yang Anda kirim melalui form kontak (nama, bisnis, email/WA, pesan) serta data teknis (IP, user agent) untuk keperluan keamanan dan analitik.</p>
          </section>
          <section>
            <h2 className="text-white text-lg font-semibold">2. Penggunaan Data</h2>
            <p className="mt-2">Data digunakan untuk merespons pertanyaan Anda, memberikan informasi paket, dan meningkatkan layanan. Kami tidak menjual data Anda ke pihak ketiga.</p>
          </section>
          <section>
            <h2 className="text-white text-lg font-semibold">3. Analitik dan pemasaran</h2>
            <p className="mt-2">
              Dengan persetujuan Anda, kami dapat menggunakan PostHog untuk memahami penggunaan situs dan Meta Pixel untuk mengukur efektivitas kampanye. Teknologi ini tidak dimuat untuk tujuan tersebut sebelum Anda memilih “Terima”. Anda dapat mengubah pilihan dengan tombol di bawah; perubahan berlaku segera dan disimpan pada browser ini.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" onClick={accept} className="dyn-cta-primary">Terima analitik</Button>
              <Button type="button" size="sm" variant="outline" onClick={reject} className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">Tolak analitik</Button>
              <span className="text-xs text-white/45">Pilihan saat ini: {consent === CONSENT.ACCEPTED ? "diterima" : consent === CONSENT.REJECTED ? "ditolak" : "belum dipilih"}.</span>
            </div>
          </section>
          <section>
            <h2 className="text-white text-lg font-semibold">4. Kontak</h2>
            <p className="mt-2">Untuk pertanyaan seputar privasi, silakan hubungi kami melalui halaman <Link to="/kontak" className="underline">Kontak</Link>.</p>
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
