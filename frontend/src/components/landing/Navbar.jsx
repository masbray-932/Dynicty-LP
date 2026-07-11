import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV } from "@/constants/testIds";
import TryFreeModal from "@/components/landing/TryFreeModal";

const navItems = [
  { label: "Home", href: "#home", testId: NAV.linkHome },
  { label: "Fitur", href: "#features", testId: NAV.linkFeatures },
  { label: "Template", href: "#templates", testId: NAV.linkTemplates },
  { label: "Cara Kerja", href: "#cara-kerja", testId: NAV.linkHowItWorks },
  { label: "Harga", href: "#pricing", testId: NAV.linkPricing },
  { label: "FAQ", href: "#faq", testId: NAV.linkFaq },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollTo = (href) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        data-testid={NAV.root}
        className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--dyn-bg-0))]/70 backdrop-blur-xl"
      >
        <div className="dyn-container flex h-16 items-center justify-between">
          <a
            href="#home"
            data-testid={NAV.logo}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <BrandLogo size={28} />
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
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
            <Link
              to="/blog"
              data-testid={NAV.linkBlog}
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Blog
              <span className="text-[10px] rounded-full border border-white/15 px-1.5 py-0.5 text-white/60">
                Segera
              </span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                data-testid={NAV.login}
                className="text-white/80 hover:text-white hover:bg-white/5"
              >
                <LogIn className="h-4 w-4 mr-1.5" />
                Masuk
              </Button>
            </Link>
            <Button
              size="sm"
              data-testid={NAV.tryFree}
              onClick={() => setModalOpen(true)}
              className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90 transition-opacity shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
            >
              Coba Gratis
            </Button>
          </div>

          {/* Mobile */}
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
                  <BrandLogo size={26} />
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(item.href);
                        }}
                        className="px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                    <Link
                      to="/blog"
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Blog (Segera)
                    </Link>
                  </nav>
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                        <LogIn className="h-4 w-4 mr-2" />
                        Masuk
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setOpen(false);
                        setModalOpen(true);
                      }}
                      className="w-full dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
                    >
                      Coba Gratis
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <TryFreeModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default Navbar;
