"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Shield, MapPin } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-dark" />

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: "url('/Assets/Surveillance.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark" />

      <div className="absolute inset-0 bg-hero-glow" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,168,225,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,168,225,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-navy/60 border border-brand-blue/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <MapPin size={13} className="text-brand-blue" />
          <span className="text-sm text-white/70 font-medium">{t("badge")}</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-balance">
          <span className="text-white">{t("headline")}</span>
          <br />
          <span className="text-brand-blue">{t("headlineAccent")}</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/55 leading-relaxed mb-10 text-balance">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-0.5"
          >
            <Shield size={18} />
            {t("cta")}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/5"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
            <span>Residential & Commercial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
            <span>MCSE Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
            <span>Code Compliant Installation</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
      </div>
    </section>
  );
}
