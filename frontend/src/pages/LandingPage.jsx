import React from "react";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Paradigm from "@/components/landing/Paradigm";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import Features from "@/components/landing/Features";
import Compare from "@/components/landing/Compare";
import Pricing from "@/components/landing/Pricing";
import AddOns from "@/components/landing/AddOns";
import CustomWebApp from "@/components/landing/CustomWebApp";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white overflow-x-hidden">
      <SEO pageKey="home" />
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Paradigm />
        <Solution />
        <HowItWorks />
        <TemplateShowcase />
        <Features />
        <Compare />
        <Pricing />
        <AddOns />
        <CustomWebApp />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
