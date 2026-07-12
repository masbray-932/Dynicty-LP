import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/brand/BrandLogo";
import { NAV } from "@/constants/testIds";

const navItems = [
  { label: "Home",       href: "#home",       testId: NAV.linkHome },
  { label: "Fitur",      href: "#fitur",      testId: NAV.linkFeatures },
  { label: "Template",   href: "#template",   testId: NAV.linkTemplates },
  { label: "Cara Kerja", href: "#cara-kerja", testId: NAV.linkHowItWorks },
  { label: "Harga",      href: "#harga",      testId: NAV.linkPricing },
  { label: "FAQ",        href: "#faq",        testId: NAV.linkFaq },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid={NAV.root}
      className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--dyn-bg-0))]/75 backdrop-blur-xl"
    >
      <div className="dyn-container flex h-16 items-center justify-between">
        <Link
          to="/"
          data-testid={NAV.logo}
          className="flex items-center"
          aria-label="Dynicty — Beranda"
        >
          <BrandLogo height={30} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Menu utama">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={item.testId}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link to="/kontak">
            <Button
              size="sm"
              data-testid={NAV.ctaContact}
              className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90 transition-opacity shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                data-testid={NAV.mobileMenu}
                aria-label="Buka menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[hsl(var(--dyn-bg-1))] border-l border-white/10 text-white w-[85vw] sm:w-96"
            >
              <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
              <div className="flex flex-col gap-6 mt-4">
                <BrandLogo height={28} />
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item.href);
                      }}
                      className="px-3 py-3 rounded-lg text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <Link to="/kontak" onClick={() => setOpen(false)}>
                  <Button className="w-full dyn-brand-gradient-bg text-white border-0 hover:opacity-90">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
