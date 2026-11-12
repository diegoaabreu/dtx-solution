"use client";

import { useTranslations } from "next-intl";
import { Award, MapPin, Wrench, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const trustIcons = [Award, MapPin, Wrench, ShieldCheck];

type TrustItem = { title: string; description: string };
type Stat = { value: string; label: string };

export default function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as TrustItem[];
  const stats = t.raw("stats") as Stat[];
  const towns = t.raw("towns") as string[];

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28 bg-brand-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="about-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        {/* Stats */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="py-7 sm:px-8 first:sm:pl-0">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60 mb-2">{s.label}</dt>
              <dd className="font-display text-4xl lg:text-5xl font-bold text-white tabular">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Reasons */}
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
            {items.map((item, i) => {
              const Icon = trustIcons[i] || Award;
              return (
                <li key={item.title} className="min-w-0">
                  <Icon size={22} strokeWidth={1.6} className="text-brand-blue mb-3" aria-hidden="true" />
                  <h3 className="font-display font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-white/70 text-[15px] leading-relaxed">{item.description}</p>
                </li>
              );
            })}
          </ul>

          {/* Service area */}
          <div className="lg:col-span-5 rounded-xl bg-brand-panel ring-1 ring-white/10 p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-brand-blue mb-3 flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              {t("areaTitle")}
            </h3>
            <p className="text-white/75 text-[15px] leading-relaxed mb-5">{t("areaNote")}</p>
            <ul className="flex flex-wrap gap-1.5">
              {towns.map((town, i) => (
                <li
                  key={town}
                  className={`text-sm px-2.5 py-1 rounded ${
                    i === 0 ? "bg-brand-blue text-white font-semibold" : "bg-white/[0.06] text-white/80"
                  }`}
                >
                  {town}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
