import React from "react";
import {
  Building2,
  Globe2,
  MessageCircle,
  CreditCard,
  Truck,
  Palette,
} from "lucide-react";
import { useRevealClass } from "@/hooks/useInView";

const capabilities = [
  { icon: Building2, title: "Multi Tenant SaaS", desc: "Satu fondasi platform untuk mengelola pertumbuhan bisnis." },
  { icon: Globe2, title: "Custom Domain", desc: "Bangun identitas digital dengan domain bisnis sendiri." },
  { icon: MessageCircle, title: "WhatsApp Integration", desc: "Permudah komunikasi dan notifikasi aktivitas toko." },
  { icon: CreditCard, title: "Payment Gateway", desc: "Terima pembayaran online melalui integrasi Midtrans." },
  { icon: Truck, title: "Shipping Integration", desc: "Dukung proses pengiriman dan operasional pesanan." },
  { icon: Palette, title: "White Label Ready", desc: "Hadirkan toko dengan branding yang terasa milik Anda." },
];

const TrustCapabilities = () => {
  const r = useRevealClass(40);

  return (
    <section
      aria-labelledby="trust-capabilities-title"
      className="relative bg-[hsl(var(--dyn-bg-0))] pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="dyn-container">
        <div
          ref={r.ref}
          style={r.style}
          className={`${r.className} dyn-trust-panel relative overflow-hidden rounded-[24px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
          <div className="grid gap-7 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
            <div className="max-w-sm">
              <div className="dyn-eyebrow">Fondasi Platform</div>
              <h2
                id="trust-capabilities-title"
                className="mt-3 text-[24px] sm:text-[28px] font-semibold leading-tight text-white"
              >
                Infrastruktur digital untuk bisnis yang ingin tumbuh serius.
              </h2>
              <p className="mt-3 text-[14px] dyn-body">
                Kapabilitas inti yang membantu toko Anda tampil profesional dan siap dikembangkan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {capabilities.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="dyn-trust-item group">
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-300 transition-colors group-hover:border-blue-400/30 group-hover:bg-blue-400/10">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/55">{desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustCapabilities;
