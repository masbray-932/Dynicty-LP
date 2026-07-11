import React from "react";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Trusted from "@/components/landing/Trusted";
import Features from "@/components/landing/Features";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white overflow-x-hidden">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <Trusted />
        <Features />
        <TemplateShowcase />
        <HowItWorks />
        <FeatureShowcase />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
