import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/brand/BrandLogo";
import { FOOTER } from "@/constants/testIds";

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const columns = [
    {
      title: "Produk",
      links: [
        { label: "Fitur", href: "#fitur" },
        { label: "Template", href: "#template" },
        { label: "Cara Kerja", href: "#cara-kerja" },
        { label: "Harga", href: "#harga" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Perusahaan",
      links: [
        { label: "Kontak", to: "/kontak" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
      ],
    },
  ];

  return (
    <footer
      data-testid={FOOTER.root}
      className="relative bg-[hsl(var(--dyn-bg-1))] border-t border-white/10"
    >
      <div className="dyn-container py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <BrandLogo height={0} className="h-10 w-auto object-contain" />
            <p className="mt-4 text-sm text-white/65 max-w-sm">
              Dynicty membantu UMKM dan seller marketplace membangun toko online
              profesional dengan branding sendiri.
            </p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
              BUILD • GROW • EMPOWER
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                            e.preventDefault();
                            scrollTo(l.href);
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

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Dynicty. Semua hak dilindungi.
          </div>
          <div className="text-xs text-white/35">
            Marketplace membantu Anda ditemukan. Dynicty membantu brand Anda dimiliki.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
