"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Camera, PhoneCall, Building2, Server, Network, Check, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cameras: Camera,
  cabling: Network,
  intercom: PhoneCall,
  orbis: Building2,
  it: Server,
};

const cardImageMap: Record<string, string> = {
  intercom: "/Assets/Intercom.png",
  orbis: "/Assets/tv_orbis.png",
  it: "/Assets/datacenter.png",
};

type ServiceItem = {
  id: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
};

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  const featured = items.find((i) => i.id === "cameras")!;
  const rest = items.filter((i) => i.id !== "cameras");

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-darker/40 to-brand-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4">
            <div className="w-8 h-px bg-brand-blue/50" />
            {t("title")}
            <div className="w-8 h-px bg-brand-blue/50" />
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Featured: Security Cameras — full width */}
        <div className="mb-6 rounded-2xl overflow-hidden border border-brand-blue/25 bg-gradient-to-br from-brand-navy via-[#0f1f40] to-brand-dark relative group hover:border-brand-blue/40 transition-all duration-300"
          style={{ boxShadow: "0 0 60px rgba(14,168,225,0.07)" }}>

          {/* Background image */}
          <div className="absolute inset-0 opacity-[0.18] overflow-hidden rounded-2xl">
            <Image
              src="/Assets/Surveillance.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-brand-blue/20 text-brand-blue">
                  <Camera size={28} strokeWidth={1.5} />
                </div>
                <span className="bg-brand-blue/20 text-brand-blue border border-brand-blue/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {featured.badge}
                </span>
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">{featured.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{featured.description}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25 text-sm group/btn"
              >
                Get a Free Quote
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </div>
            <div className="flex items-center">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full">
                {featured.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                    <Check size={15} className="text-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Rest: 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((item) => {
            const Icon = iconMap[item.id] || Server;
            const isOrbis = item.id === "orbis";

            return (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-brand-darker hover:border-white/[0.15] transition-all duration-300 group hover:-translate-y-1 flex flex-col"
              >
                {/* Card image if available */}
                {cardImageMap[item.id] && (
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={cardImageMap[item.id]}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-darker" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                {isOrbis && item.badge && (
                  <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                    {item.badge}
                  </div>
                )}

                <div className="inline-flex p-2.5 rounded-xl mb-4 bg-white/[0.05] text-white/50 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors duration-300 w-fit">
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed mb-4 flex-1">{item.description}</p>

                <ul className="space-y-1.5 mt-auto">
                  {item.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                      <Check size={11} className="text-brand-steel/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
