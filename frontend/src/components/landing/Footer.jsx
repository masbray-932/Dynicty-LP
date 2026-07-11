import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Loader2 } from "lucide-react";
import { submitNewsletter } from "@/lib/api";
import { toast } from "sonner";
import { FOOTER } from "@/constants/testIds";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubscribe = async (e) => {
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
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Fitur", href: "#features" },
        { label: "Template", href: "#templates" },
        { label: "Cara Kerja", href: "#cara-kerja" },
        { label: "Harga", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Tentang Kami", href: "#" },
        { label: "Karir", href: "#" },
        { label: "Kontak", href: "#" },
        { label: "Reseller Program", href: "#pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", to: "/blog" },
        { label: "Dokumentasi", href: "#" },
        { label: "Status", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "Cookies", to: "/privacy" },
        { label: "SLA", href: "#" },
      ],
    },
  ];

  return (
    <footer
      data-testid={FOOTER.root}
      className="relative bg-[hsl(var(--dyn-bg-1))] border-t border-white/10"
    >
      <div className="dyn-container py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <BrandLogo size={28} />
            <p className="mt-4 text-sm text-white/60 max-w-sm">
              Platform All-in-One untuk membangun website e-commerce modern.
              Dipercaya UMKM, brand owner, agency, dan reseller di seluruh Indonesia.
            </p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-white/40">
              BUILD • GROW • EMPOWER
            </div>

            <form onSubmit={onSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-sm">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Anda"
                required
                data-testid={FOOTER.newsletterInput}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              <Button
                type="submit"
                disabled={submitting}
                data-testid={FOOTER.newsletterSubmit}
                className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Langganan"}
              </Button>
            </form>
            <p className="mt-2 text-[11px] text-white/40">Tanpa spam. Unsubscribe kapan saja.</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-white text-sm font-semibold">{col.title}</div>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          className="text-sm text-white/55 hover:text-white transition-colors"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-sm text-white/55 hover:text-white transition-colors"
                          onClick={(e) => {
                            if (l.href?.startsWith("#") && l.href.length > 1) {
                              e.preventDefault();
                              document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} Dynicty. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
