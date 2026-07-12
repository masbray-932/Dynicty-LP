import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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

const SECTION_IDS = ["home", "fitur", "template", "cara-kerja", "harga", "faq"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers = [];
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most-visible section in viewport upper half
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
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
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-[hsl(var(--dyn-bg-0))]/85 border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(139,92,246,0.06),0_20px_50px_-30px_rgba(0,0,0,0.7)]"
          : "bg-[hsl(var(--dyn-bg-0))]/45 border-b border-white/[0.04]"
      } backdrop-blur-2xl backdrop-saturate-150`}
    >
      {/* Subtle ambient tint band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.35) 30%, rgba(139,92,246,0.35) 70%, transparent 100%)",
          opacity: scrolled ? 0.6 : 0,
          transition: "opacity 300ms",
        }}
      />

      <div className="mx-auto max-w-[80rem] pl-6 pr-4 sm:px-10 lg:px-14 flex h-[76px] md:h-[84px] lg:h-[92px] items-center justify-between gap-4">
        <Link
          to="/"
          data-testid={NAV.logo}
          className="flex items-center group shrink-0 ml-1 lg:ml-2"
          aria-label="Dynicty — Beranda"
        >
          <span className="block">
            <BrandLogo
              height={0}
              className="h-11 md:h-12 lg:h-[52px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-[0_2px_10px_rgba(109,94,247,0.25)]"
            />
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-9" aria-label="Menu utama">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={item.label}
                href={item.href}
                data-testid={item.testId}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-[14px] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
                {/* Active underline (gradient) */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 mx-auto h-[2px] rounded-full transition-all duration-300 ease-out ${
                    isActive ? "opacity-100 w-8" : "opacity-0 w-0"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, #60a5fa, #8a7cff, #b28cff)",
                    boxShadow: isActive ? "0 0 12px rgba(139,92,246,0.55)" : "none",
                  }}
                />
                {/* Hover underline (subtle) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 -bottom-0.5 mx-auto h-px w-0 bg-white/25 transition-all duration-300 [.group\/link:hover_&]:w-full"
                />
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center pl-2">
          <Link
            to="/kontak"
            data-testid={NAV.ctaContact}
            className="nav-cta group relative inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
            style={{
              background:
                "linear-gradient(#0b0d24, #0b0d24) padding-box, linear-gradient(96deg, #3b82f6, #6d5ef7 55%, #8b5cf6) border-box",
              border: "1px solid transparent",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px -12px rgba(109,94,247,0.55), 0 0 0 0 rgba(139,92,246,0)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(80% 120% at 20% 0%, rgba(59,130,246,0.28), transparent 60%), radial-gradient(80% 120% at 100% 100%, rgba(139,92,246,0.28), transparent 60%)",
              }}
            />
            <Mail className="h-4 w-4 relative" />
            <span className="relative">Hubungi Kami</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
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
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-center justify-center pt-4 pb-5">
                  <BrandLogo height={0} className="h-14 w-auto object-contain drop-shadow-[0_2px_12px_rgba(109,94,247,0.3)]" />
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const id = item.href.replace("#", "");
                    const isActive = activeId === id;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                        aria-current={isActive ? "page" : undefined}
                        className={`px-3 py-3 rounded-lg transition-colors text-[15px] ${
                          isActive
                            ? "text-white bg-white/[0.06] border border-white/[0.08]"
                            : "text-white/85 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
                <Link
                  to="/kontak"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl text-white text-[14px] font-medium"
                  style={{
                    background:
                      "linear-gradient(#0b0d24, #0b0d24) padding-box, linear-gradient(96deg, #3b82f6, #6d5ef7 55%, #8b5cf6) border-box",
                    border: "1px solid transparent",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px -12px rgba(109,94,247,0.55)",
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Hubungi Kami
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
