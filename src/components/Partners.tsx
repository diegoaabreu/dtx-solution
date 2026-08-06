"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const clients = [
  { name: "United Properties Inc", src: "/Assets/unitedProperties.png" },
  { name: "Eastport Real Estate Services", src: "/Assets/eastport.jpg" },
  { name: "Housing Families", src: "/Assets/housingfamilies.png" },
  { name: "LTS", src: "/Assets/LTS.png" },
  { name: "Ubiquiti", src: "/Assets/ubiquiti.png" },
  { name: "Cisco", src: "/Assets/cisco.png" },
];

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clients & Partners */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4">
            <div className="w-8 h-px bg-brand-blue/50" />
            {t("clientsTitle")}
            <div className="w-8 h-px bg-brand-blue/50" />
          </div>
          <p className="text-white/50 max-w-xl mx-auto">{t("clientsSubtitle")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-xl px-8 py-6 flex items-center justify-center hover:scale-[1.03] transition-transform duration-300 shadow-lg shadow-black/20"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={180}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
