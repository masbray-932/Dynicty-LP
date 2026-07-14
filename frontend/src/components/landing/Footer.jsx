import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import useContact from "@/hooks/useContact";
import { FOOTER } from "@/constants/testIds";

const Footer = () => {
  const { email, address, hasWhatsApp, whatsappUrl, mailtoUrl } = useContact();
  const waHref = whatsappUrl();
  const mailHref = mailtoUrl("Halo Dynicty");

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

            {/* Contact block — driven by Platform Settings API */}
            <ul
              data-testid="footer-contact-block"
              className="mt-6 space-y-2.5 text-sm"
            >
              {hasWhatsApp && waHref ? (
                <li>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="footer-whatsapp-link"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    <span>Chat WhatsApp</span>
                  </a>
                </li>
              ) : null}
              {mailHref ? (
                <li>
                  <a
                    href={mailHref}
                    data-testid="footer-email-link"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                  </a>
                </li>
              ) : null}
              {address ? (
                <li className="inline-flex items-center gap-2 text-white/55" data-testid="footer-address">
                  <MapPin className="h-4 w-4" />
                  <span>{address}</span>
                </li>
              ) : null}
            </ul>
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
