"use client";

import { useTranslations } from "next-intl";
import { Award, MapPin, Wrench, ShieldCheck } from "lucide-react";

const trustIcons = [Award, MapPin, Wrench, ShieldCheck];

type TrustItem = {
  title: string;
  description: string;
};

export default function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as TrustItem[];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-navy/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <div>
            <div className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4">
              <div className="w-8 h-px bg-brand-blue/50" />
              {t("title")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 text-balance">
              {t("title")}
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">{t("subtitle")}</p>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              <div>
                <div className="font-display text-3xl font-bold text-brand-blue">10+</div>
                <div className="text-white/40 text-sm mt-1">Years Experience</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-brand-blue">50k+</div>
                <div className="text-white/40 text-sm mt-1">Endpoints Managed</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-brand-blue">100%</div>
                <div className="text-white/40 text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = trustIcons[i] || Award;
              return (
                <div
                  key={item.title}
                  className="bg-brand-darker/80 border border-white/[0.07] rounded-xl p-5 hover:border-brand-blue/20 transition-colors duration-300 group"
                >
                  <div className="inline-flex p-2.5 rounded-lg bg-brand-blue/10 text-brand-blue mb-4 group-hover:bg-brand-blue/15 transition-colors">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
