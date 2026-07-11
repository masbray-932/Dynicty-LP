import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants/testIds";

const items = [
  {
    q: "Apakah Dynicty bisa full white label tanpa branding Dynicty?",
    a: "Ya. Paket Enterprise memungkinkan Anda menghilangkan seluruh jejak Dynicty — logo, domain, email, dashboard — sehingga terlihat seratus persen brand Anda sendiri.",
  },
  {
    q: "Berapa lama sampai website siap dipakai?",
    a: "Rata-rata setup memakan waktu 10–30 menit. Deployment Engine kami akan menyiapkan environment, template, dan domain otomatis.",
  },
  {
    q: "Apakah bisa pakai domain sendiri?",
    a: "Tentu. Anda cukup mengarahkan DNS ke server Dynicty. SSL akan diterbitkan otomatis lewat Domain Binding engine.",
  },
  {
    q: "Apakah ada Template Designer drag & drop?",
    a: "Ya. Setiap section, layout, dan blok konten bisa Anda modifikasi lewat visual editor tanpa perlu ngoding.",
  },
  {
    q: "Bagaimana sistem Subscription & Feature Package bekerja?",
    a: "Subscription Engine mengatur billing dan siklus paket. Feature Package memungkinkan Anda mengaktifkan/menonaktifkan modul per tenant, cocok untuk agency & reseller.",
  },
  {
    q: "Apakah bisa multi akun untuk tim?",
    a: "Ya. Anda bisa menambahkan anggota tim dengan role & permission granular — admin, staff, marketing, finance, dsb.",
  },
  {
    q: "Apakah ada dukungan onboarding untuk agency/reseller?",
    a: "Ya. Paket Enterprise mencakup dedicated onboarding, technical assistance, dan playbook white label reseller.",
  },
];

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
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Masih ragu? <span className="dyn-brand-gradient-text">Kami jawab</span>.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              data-testid={FAQ.item}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4"
            >
              <AccordionTrigger className="text-left text-white hover:no-underline text-base py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/65 text-sm leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
