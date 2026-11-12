"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";

const clients = [
  { name: "United Properties Inc", src: "/Assets/unitedProperties.png" },
  { name: "Eastport Real Estate Services", src: "/Assets/eastport.jpg" },
  { name: "Housing Families", src: "/Assets/housingfamilies.png" },
  { name: "LTS", src: "/Assets/LTS.png" },
];

const vendors = [
  { name: "Ubiquiti", src: "/Assets/ubiquiti.png" },
  { name: "Cisco", src: "/Assets/cisco.png" },
];

function LogoRow({ logos, cols }: { logos: { name: string; src: string }[]; cols: string }) {
  return (
    <ul className={`grid ${cols} gap-px bg-slate-200 rounded-xl overflow-hidden ring-1 ring-white/10`}>
      {logos.map((l) => (
        <li key={l.name} className="bg-white flex items-center justify-center px-6 py-7">
          <Image
            src={l.src}
            alt={l.name}
            width={180}
            height={60}
            className="h-10 w-auto max-w-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section aria-labelledby="partners-title" className="py-20 lg:py-28 bg-brand-darker border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="partners-title" eyebrow={t("eyebrow")} title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-8 min-w-0">
            <LogoRow logos={clients} cols="grid-cols-2 sm:grid-cols-4" />
          </div>
          <div className="lg:col-span-4 min-w-0">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 mb-3">{t("techTitle")}</h3>
            <LogoRow logos={vendors} cols="grid-cols-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
