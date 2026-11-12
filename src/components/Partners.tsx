"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";

const clients = [
  { name: "United Properties Inc", src: "/Assets/unitedProperties.png" },
  { name: "Eastport Real Estate Services", src: "/Assets/eastport.jpg" },
  { name: "Housing Families", src: "/Assets/housingfamilies.png" },
];

const vendors: Logo[] = [
  { name: "Microsoft", src: "/Assets/microsoft.png" },
  { name: "Cisco", src: "/Assets/cisco.png" },
  { name: "Ubiquiti", src: "/Assets/ubiquiti.png" },
  { name: "Uniview (UNV)", src: "/Assets/unv.png" },
  { name: "LTS", src: "/Assets/LTS.png" },
  { name: "Asterisk", src: "/Assets/asterisk.png", h: "h-12" },
  { name: "Yealink", src: "/Assets/yealink.png", h: "h-7" },
  { name: "Grandstream", src: "/Assets/grandstream.png" },
];

/** Optional per-logo height to balance visual weight (wordmarks vs. icon+text marks). */
type Logo = { name: string; src: string; h?: string };

function LogoRow({ logos, cols }: { logos: Logo[]; cols: string }) {
  return (
    <ul className={`grid ${cols} gap-px bg-line/10 rounded-xl overflow-hidden ring-1 ring-line/10`}>
      {logos.map((l) => (
        <li key={l.name} className="bg-white flex items-center justify-center px-6 py-7">
          <Image
            src={l.src}
            alt={l.name}
            width={180}
            height={60}
            className={`${l.h ?? "h-10"} w-auto max-w-full object-contain grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300`}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section aria-labelledby="partners-title" className="theme-light bg-canvas-alt py-20 lg:py-28 border-t border-line/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="partners-title" eyebrow={t("eyebrow")} title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />

        <div className="flex flex-col gap-10">
          <LogoRow logos={clients} cols="grid-cols-1 sm:grid-cols-3" />
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/65 mb-3">{t("techTitle")}</h3>
            <LogoRow logos={vendors} cols="grid-cols-2 sm:grid-cols-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
