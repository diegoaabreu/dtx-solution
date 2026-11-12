"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";

type Step = { title: string; description: string };

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="process" aria-labelledby="process-title" className="py-20 lg:py-28 bg-brand-darker border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="process-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Connecting line through the step markers (desktop) */}
          <div aria-hidden="true" className="hidden lg:block absolute top-[11px] left-0 right-0 h-px bg-white/15" />

          {steps.map((step, i) => (
            <li key={step.title} className="relative min-w-0">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative z-10 w-6 h-6 rounded-full bg-brand-darker ring-2 ring-brand-blue flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" aria-hidden="true" />
                </span>
                <span className="relative z-10 bg-brand-darker pr-3 font-mono text-xs tracking-[0.18em] text-brand-blue tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/70 text-[15px] leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
