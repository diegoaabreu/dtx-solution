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
  const regions = t.raw("regions") as string[];

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
          <ul className="lg:col-span-7 self-start grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
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

            <ServiceMap
              labels={{
                boston: t("mapLabels.boston"),
                reading: t("mapLabels.reading"),
                ring: t("mapLabels.ring"),
                inner: t("mapLabels.inner"),
                ocean: t("mapLabels.ocean"),
              }}
            />

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {regions.map((r) => (
                <li key={r} className="text-sm px-2.5 py-1 rounded bg-white/[0.06] text-white/80">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/60">
              <a href="#contact" className="text-brand-blue hover:underline underline-offset-4">
                {t("areaAsk")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type MapLabels = { boston: string; reading: string; ring: string; inner: string; ocean: string };

/** Schematic (not to scale) of eastern Massachusetts: the I-495 ring around Boston, Reading HQ marked. */
function ServiceMap({ labels }: { labels: MapLabels }) {
  const ring = "M 240 10 C 160 10 70 55 62 125 C 56 185 140 228 232 230";
  return (
    <svg
      viewBox="0 0 300 240"
      role="img"
      aria-label={`${labels.ring} — ${labels.boston}, ${labels.reading}`}
      className="w-full max-w-full h-auto rounded-lg bg-brand-dark/60 font-mono"
    >
      {/* Covered area */}
      <path d={`${ring} L 300 230 L 300 10 Z`} className="fill-brand-blue/10" />
      {/* Ocean (drawn over the area so the coast cuts it) */}
      <path
        d="M 245 0 L 250 30 C 270 40 285 55 270 70 C 255 80 240 95 232 112 C 226 122 222 128 232 140 C 245 160 255 185 268 215 L 275 240 L 300 240 L 300 0 Z"
        className="fill-brand-navy/70 stroke-white/20"
        strokeWidth="1"
      />
      {/* I-95 / 128 */}
      <path
        d="M 237 98 C 200 98 160 105 160 130 C 160 155 195 168 228 165"
        fill="none"
        className="stroke-white/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* I-495 */}
      <path d={ring} fill="none" className="stroke-brand-blue" strokeWidth="2.5" strokeLinecap="round" />

      {/* Points */}
      <circle cx="226" cy="125" r="3.5" className="fill-white" />
      <circle cx="212" cy="80" r="9" className="fill-brand-blue/25" />
      <circle cx="212" cy="80" r="4" className="fill-brand-blue" />

      {/* Labels */}
      <g fontSize="10" letterSpacing="0.5">
        <text x="219" y="129" textAnchor="end" className="fill-white">{labels.boston}</text>
        <text x="200" y="84" textAnchor="end" className="fill-brand-blue" fontWeight="700">{labels.reading}</text>
        <text x="14" y="129" className="fill-brand-blue" fontWeight="700">{labels.ring}</text>
        <text x="98" y="152" className="fill-white/55" fontSize="9">{labels.inner}</text>
        <text x="296" y="104" textAnchor="end" className="fill-white/45" fontSize="9" fontStyle="italic">{labels.ocean}</text>
      </g>
    </svg>
  );
}
