"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const t = useTranslations("hero");
  const specs = t.raw("specs") as string[];
  const now = useClock();

  const date = now
    ? `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    : "----------";
  const time = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--";

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      {/* Faint blueprint grid, top-left only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_70%_60%_at_20%_30%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,168,225,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,168,225,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-mist mb-6 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-brand-blue" aria-hidden="true" />
            {t("badge")}
          </p>

          <h1 className="font-display text-[2.75rem] sm:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight mb-6 text-balance">
            <span className="text-white">{t("headline")}</span>{" "}
            <span className="text-brand-blue">{t("headlineAccent")}</span>
          </h1>

          <p className="max-w-xl text-lg text-white/70 leading-relaxed mb-9">{t("subheadline")}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-[#25b4e8] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200"
            >
              {t("cta")}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium px-6 py-3.5 rounded-lg border border-white/15 hover:border-white/30 transition-colors duration-200"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          {/* Spec strip */}
          <ul className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
            {specs.map((s) => (
              <li key={s} className="font-mono text-[11px] uppercase tracking-wider text-white/60 leading-snug">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Camera feed */}
        <div className="lg:col-span-6 min-w-0">
          <figure className="relative rounded-xl overflow-hidden bg-brand-panel ring-1 ring-white/10 shadow-2xl shadow-black/50">
            <div className="relative aspect-[16/10] w-full max-w-full">
              <Image
                src="/Assets/hero-lobby.jpg"
                alt="Security camera view of an apartment building lobby"
                fill
                priority
                className="object-cover object-center saturate-[0.9]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-brand-navy/15 mix-blend-multiply" />
              {/* Darken top/bottom edges so the HUD reads over the chairs and ceiling */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-brand-dark/35 via-transparent via-30% to-brand-dark/45"
              />
              <div aria-hidden="true" className="absolute inset-0 scanlines" />
              <div aria-hidden="true" className="absolute inset-3 sm:inset-4 feed-corners opacity-80" />

              {/* HUD */}
              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between font-mono text-[10px] sm:text-xs tracking-wider text-white tabular">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex items-center gap-2 bg-brand-dark/70 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                    {t("feed.rec")}
                  </span>
                  <span className="bg-brand-dark/70 px-2 py-1 rounded">{t("feed.cam")}</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="bg-brand-dark/70 px-2 py-1 rounded">{t("feed.location")}</span>
                  <span className="bg-brand-dark/70 px-2 py-1 rounded" suppressHydrationWarning>
                    {date} {time}
                  </span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
