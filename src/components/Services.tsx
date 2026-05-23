"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Camera, PhoneCall, Building2, Server, Network, Monitor, Check, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cameras: Camera,
  cabling: Network,
  intercom: PhoneCall,
  orbis: Building2,
  it: Server,
  web: Monitor,
};

const cardImageMap: Record<string, string> = {
  web: "/Assets/coding.png",
  cabling: "/Assets/cabling.jpg",
  intercom: "/Assets/Intercom.png",
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

  const cameras = items.find((i) => i.id === "cameras")!;
  const orbis = items.find((i) => i.id === "orbis")!;
  const rest = items.filter((i) => i.id !== "cameras" && i.id !== "orbis");

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

        {/* Top row: Cameras + Orbis */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Security Cameras */}
          <div
            className="rounded-2xl overflow-hidden border border-brand-blue/25 bg-gradient-to-br from-brand-navy via-[#0f1f40] to-brand-dark relative group hover:border-brand-blue/40 transition-all duration-300 flex flex-col"
            style={{ boxShadow: "0 0 60px rgba(14,168,225,0.07)" }}
          >
            <div className="absolute inset-0 opacity-[0.22] group-hover:opacity-[0.45] transition-opacity duration-500">
              <Image src="/Assets/Surveillance.jpg" alt="" fill className="object-cover object-center" sizes="50vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/20" />
            <div className="absolute inset-0 bg-gradient-to-l from-brand-dark/80 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

            <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-brand-blue/20 text-brand-blue">
                  <Camera size={26} strokeWidth={1.5} />
                </div>
                <span className="bg-brand-blue/20 text-brand-blue border border-brand-blue/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {cameras.badge}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">{cameras.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6 text-sm">{cameras.description}</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {cameras.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <Check size={13} className="text-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25 text-sm group/btn w-fit"
              >
                Get a Free Quote
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Orbis */}
          <div
            className="rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-[#1a1030] via-[#140d28] to-brand-dark relative group hover:border-purple-500/35 transition-all duration-300 flex flex-col"
            style={{ boxShadow: "0 0 60px rgba(168,85,247,0.05)" }}
          >
            <div className="absolute inset-0 opacity-[0.20] group-hover:opacity-[0.42] transition-opacity duration-500">
              <Image src="/Assets/tv_orbis.png" alt="" fill className="object-cover object-center" sizes="50vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1030] via-[#1a1030]/90 to-[#1a1030]/20" />
            <div className="absolute inset-0 bg-gradient-to-l from-brand-dark/80 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

            <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-purple-500/15 text-purple-300">
                  <Building2 size={26} strokeWidth={1.5} />
                </div>
                <span className="bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                  {orbis.badge}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">{orbis.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6 text-sm">{orbis.description}</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {orbis.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <Check size={13} className="text-purple-400/70 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 text-sm group/btn w-fit"
              >
                Get a Free Quote
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: remaining services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((item) => {
            const Icon = iconMap[item.id] || Server;

            return (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-brand-darker hover:border-white/[0.15] transition-all duration-300 group hover:-translate-y-1 flex flex-col"
              >
                {cardImageMap[item.id] && (
                  <div className="relative h-36 w-full overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={cardImageMap[item.id]}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-darker" />
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
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
