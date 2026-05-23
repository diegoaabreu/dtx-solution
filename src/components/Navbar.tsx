"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";

const localeNames: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇺🇸", label: "EN" },
  pt: { flag: "🇧🇷", label: "PT" },
  es: { flag: "🇪🇸", label: "ES" },
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <Image
            src="/Assets/logo_2025_Icon.png"
            alt="DTX Solution icon"
            width={34}
            height={34}
            className="transition-transform duration-300 group-hover:scale-105 shrink-0"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display font-extrabold text-[17px] tracking-tight text-brand-navy" style={{ color: "#e8edf5" }}>
              DTX
            </span>
            <span className="font-sans font-light text-[9px] tracking-[0.2em] uppercase" style={{ color: "#4D7B9A" }}>
              Solution
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-white/5"
            >
              <span className="text-base leading-none">{localeNames[locale].flag}</span>
              <span className="font-medium">{localeNames[locale].label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-brand-darker border border-white/10 rounded-lg shadow-xl overflow-hidden">
                {["en", "pt", "es"].map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors flex items-center gap-2.5 ${
                      l === locale ? "text-brand-blue font-semibold" : "text-white/70"
                    }`}
                  >
                    <span className="text-base leading-none">{localeNames[l].flag}</span>
                    {l === "en" ? "English" : l === "pt" ? "Português" : "Español"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25"
          >
            {t("cta")}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/70 hover:text-white p-1.5"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-darker/98 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white py-2.5 text-sm font-medium border-b border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-brand-blue text-white text-sm font-semibold px-4 py-3 rounded-lg text-center"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
