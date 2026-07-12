import React, { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[hsl(var(--dyn-bg-0))]/85 border-b border-white/[0.07] shadow-[0_1px_0_0_rgba(255,255,255,0.04),0_10px_30px_-20px_rgba(0,0,0,0.7)]"
          : "bg-[hsl(var(--dyn-bg-0))]/40 border-b border-transparent"
      } backdrop-blur-xl backdrop-saturate-150`}
    >
      <div className="dyn-container flex h-20 lg:h-[88px] items-center justify-between gap-4">
        <Link
          to="/"
          data-testid={NAV.logo}
          className="flex items-center pl-1 lg:pl-2 group"
          aria-label="Dynicty — Beranda"
        >
          <span className="block">
            <BrandLogo
              height={0}
              className="h-9 sm:h-10 lg:h-12 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Menu utama">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={item.testId}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className="relative text-[13.5px] text-white/70 hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center pr-1">
          <Link to="/kontak">
            <Button
              data-testid={NAV.ctaContact}
              className="dyn-cta-primary h-10 px-5 text-[13.5px] rounded-lg"
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[hsl(var(--dyn-bg-1))] border-l border-white/10 text-white w-[86vw] sm:w-96"
            >
              <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
              <div className="flex flex-col gap-6 mt-2">
                <BrandLogo height={0} className="h-9 w-auto" />
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                      className="px-3 py-3 rounded-lg text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <Link to="/kontak" onClick={() => setOpen(false)}>
                  <Button className="w-full dyn-cta-primary h-11">Hubungi Kami</Button>
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
