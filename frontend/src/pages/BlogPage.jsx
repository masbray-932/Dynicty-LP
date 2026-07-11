import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitNewsletter } from "@/lib/api";
import { Loader2, Mail } from "lucide-react";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Format email tidak valid.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitNewsletter({ email });
      toast.success(res?.message || "Berhasil berlangganan.");
      setEmail("");
    } catch {
      toast.error("Gagal berlangganan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO
        title="Blog Dynicty — Segera Hadir"
        description="Blog Dynicty segera hadir. Berlangganan untuk mendapat update perdana."
        url="https://dynicty.com/blog"
      />
      <Navbar />
      <main className="dyn-container py-20 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70">
          <Mail className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
          Blog <span className="dyn-brand-gradient-text">Dynicty</span>
        </h1>
        <p className="mt-4 text-white/60 max-w-lg mx-auto">
          Kami sedang menyiapkan artikel-artikel bermanfaat seputar e-commerce, growth,
          dan operasional brand modern. Daftarkan email Anda untuk mendapat update pertama.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@brand.com"
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Berlangganan"}
          </Button>
        </form>

        <div className="mt-10">
          <Link to="/" className="text-blue-300 hover:text-white text-sm">← Kembali ke Beranda</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
