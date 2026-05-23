import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-white/[0.06] bg-brand-darker/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/Assets/logo_2025_Icon.png"
                alt="DTX Solution"
                width={32}
                height={32}
              />
              <span className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-[17px] tracking-tight" style={{ color: "#e8edf5" }}>DTX</span>
                <span className="font-sans font-light text-[9px] tracking-[0.2em] uppercase" style={{ color: "#4D7B9A" }}>Solution</span>
              </span>
            </div>
            <p className="text-white/30 text-sm">{t("tagline")}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/dtx.solution/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/[0.04] text-white/40 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/dtx.solution85"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/[0.04] text-white/40 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <span>© {new Date().getFullYear()} DTX Solution. {t("rights")}</span>
          <div className="flex gap-5">
            <a href={`/${locale}/privacy`} className="hover:text-white/50 transition-colors">
              {t("links.privacy")}
            </a>
            <a href={`/${locale}/terms`} className="hover:text-white/50 transition-colors">
              {t("links.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
