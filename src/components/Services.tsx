"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";
import { Camera, DoorOpen, Phone, Building2, Server, Network, Monitor, Check, ArrowRight, X } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cameras: Camera,
  cabling: Network,
  intercom: DoorOpen,
  voip: Phone,
  orbis: Building2,
  it: Server,
  web: Monitor,
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
  const [orbisOpen, setOrbisOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "go-to-contact") {
        setOrbisOpen(false);
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (!orbisOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOrbisOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [orbisOpen]);

  const cameras = items.find((i) => i.id === "cameras")!;
  const orbis = items.find((i) => i.id === "orbis")!;
  const rest = items.filter((i) => i.id !== "cameras" && i.id !== "orbis");

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 lg:py-28 bg-brand-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="services-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        {/* Featured: Cameras + Orbis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FeaturedCard
            item={cameras}
            image="/Assets/surv2.png"
            tone="blue"
            actions={
              <a
                href="#contact"
                className="group/btn inline-flex items-center gap-2 bg-brand-blue hover:bg-[#25b4e8] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                {t("quoteCta")}
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            }
          />
          <FeaturedCard
            item={orbis}
            image="/Assets/tv_orbis.png"
            tone="steel"
            actions={
              <>
                <button
                  type="button"
                  onClick={() => setOrbisOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-mist hover:bg-white text-brand-dark font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  {t("orbisLearnMore")}
                  <ArrowRight size={15} />
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/85 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  {t("quoteCta")}
                </a>
              </>
            }
          />
        </div>

        {/* Remaining services as a spec list */}
        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-white/55 mb-2">{t("listTitle")}</h3>
          <ul className="border-t border-white/10">
            {rest.map((item) => {
              const Icon = iconMap[item.id] || Server;
              return (
                <li
                  key={item.id}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="md:col-span-4 lg:col-span-3 flex items-start gap-3.5 min-w-0">
                    <span className="mt-0.5 shrink-0 text-brand-blue">
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h4 className="font-display text-lg font-bold text-white leading-snug">{item.title}</h4>
                  </div>
                  <p className="md:col-span-8 lg:col-span-5 text-white/70 text-[15px] leading-relaxed min-w-0">
                    {item.description}
                  </p>
                  <ul className="md:col-start-5 md:col-span-8 lg:col-start-auto lg:col-span-4 flex flex-wrap gap-1.5 content-start min-w-0">
                    {item.features.map((f) => (
                      <li
                        key={f}
                        className="font-mono text-[11px] tracking-wide text-white/75 border border-white/10 rounded px-2 py-1"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {orbisOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setOrbisOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="orbis-modal-title"
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] bg-brand-darker rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-brand-darker">
              <span id="orbis-modal-title" className="text-sm font-semibold text-white/80">
                {t("orbisModalTitle")}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOrbisOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src="https://orbis.dtxsolution.com/portfolio.php"
              className="w-full h-[calc(100%-49px)]"
              title="Orbis Portfolio"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function FeaturedCard({
  item,
  image,
  tone,
  actions,
}: {
  item: ServiceItem;
  image: string;
  tone: "blue" | "steel";
  actions: React.ReactNode;
}) {
  const Icon = iconMap[item.id] || Server;
  const isBlue = tone === "blue";
  const base = isBlue ? "#182855" : "#132433";

  return (
    <article
      className={`relative rounded-xl overflow-hidden flex flex-col ring-1 ${
        isBlue ? "ring-brand-blue/30" : "ring-brand-mist/20"
      }`}
      style={{ backgroundColor: base }}
    >
      {/* Image band */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 hover:scale-[1.03]">
          <Image src={image} alt="" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 30%, ${base})` }}
        />
        {item.badge && (
          <span
            className={`absolute top-4 left-4 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded ${
              isBlue ? "bg-brand-blue text-white" : "bg-brand-mist text-brand-dark"
            }`}
          >
            {item.badge}
          </span>
        )}
      </div>

      <div className="relative p-7 lg:p-9 pt-2 lg:pt-3 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <Icon size={24} strokeWidth={1.6} className={isBlue ? "text-brand-blue" : "text-brand-mist"} aria-hidden="true" />
          <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
        </div>
        <p className="text-white/75 leading-relaxed mb-6 text-[15px]">{item.description}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
          {item.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/80">
              <Check size={14} className={`mt-0.5 shrink-0 ${isBlue ? "text-brand-blue" : "text-brand-mist"}`} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3">{actions}</div>
      </div>
    </article>
  );
}
