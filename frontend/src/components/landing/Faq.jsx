import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/constants/testIds";

const items = [
  { q: "Saya belum pernah bikin website. Apakah bisa pakai Dynicty?",
    a: "Dynicty dirancang agar mudah digunakan bahkan bagi yang belum pernah bikin website. Anda tinggal memilih template, menyesuaikan branding, dan menambahkan produk." },
  { q: "Apakah saya harus menutup toko Shopee/TikTok Shop/Tokopedia saya?",
    a: "Tidak. Marketplace tetap tempat penting untuk menemukan pelanggan baru. Dynicty membantu Anda memiliki channel penjualan sendiri sebagai pelengkap." },
  { q: "Apa saja yang bisa saya kelola di Dynicty?",
    a: "Anda bisa mengelola produk, kategori, pesanan, pelanggan, banner promosi, laporan penjualan, dan pengaturan toko dari satu dashboard." },
  { q: "Apakah Dynicty mengambil komisi dari setiap penjualan?",
    a: "Dynicty tidak mengambil komisi marketplace atas transaksi di website Anda. Biaya payment gateway dan layanan pihak ketiga dapat berlaku sesuai metode yang digunakan." },
  { q: "Apakah saya bisa mengubah tampilan template?",
    a: "Ya. Anda bisa menyesuaikan branding — logo, warna, teks, dan foto produk — sesuai brand Anda." },
  { q: "Metode pembayaran apa saja yang tersedia?",
    a: "Untuk paket yang mendukung pembayaran online, Dynicty terintegrasi dengan Midtrans. Metode lainnya akan ditambahkan seiring pengembangan produk." },
  { q: "Bagaimana kalau saya butuh integrasi dengan sistem lain?",
    a: "Paket Enterprise menyediakan integrasi Jubelio, marketplace, dan akses API untuk kebutuhan integrasi lanjutan." },
  { q: "Bagaimana cara mulai menggunakan Dynicty?",
    a: "Silakan hubungi tim kami melalui halaman kontak untuk informasi paket dan proses onboarding lebih lanjut." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

const Faq = () => {
  return (
    <section
      id="faq"
      data-testid={FAQ.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section"
    >
      <div className="dyn-container max-w-3xl">
        <div className="text-center">
          <div className="dyn-eyebrow">Pertanyaan Umum</div>
          <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Masih bertanya-tanya? <span className="dyn-brand-gradient-text">Kami jawab.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              data-testid={FAQ.item}
              className="dyn-card px-5"
            >
              <AccordionTrigger className="text-left text-white hover:no-underline text-[15.5px] py-5 font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="dyn-body text-[14.5px] leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  );
};

export default Faq;
