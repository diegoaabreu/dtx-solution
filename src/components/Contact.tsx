"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const t = useTranslations("contact");
  const services = t.raw("services") as string[];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-28 bg-brand-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="contact-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-brand-panel ring-1 ring-white/10 rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">{t("infoTitle")}</h3>
<address className="not-italic space-y-4">
                <a
                  href="mailto:diego@dtxsolution.com"
                  className="flex items-center gap-3 text-white/75 hover:text-brand-blue transition-colors text-sm group"
                >
                  <Mail size={16} className="shrink-0 group-hover:text-brand-blue" />
                  diego@dtxsolution.com
                </a>
                <a
                  href="tel:+18579999922"
                  className="flex items-center gap-3 text-white/75 hover:text-brand-blue transition-colors text-sm group"
                >
                  <Phone size={16} className="shrink-0" />
                  (857) 999-9922
                </a>
                <p className="flex items-center gap-3 text-white/75 text-sm">
                  <MapPin size={16} className="shrink-0" aria-hidden="true" />
                  Reading, MA — Greater Boston Area
                </p>
              </address>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/60 text-xs mb-3">{t("follow")}</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/dtx.solution/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.05] text-white/70 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/dtx.solution85"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.05] text-white/70 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy ring-1 ring-brand-blue/25 rounded-xl p-6">
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-brand-blue font-semibold">{t("estimateStrong")}</span>{" "}
                {t("estimateRest")}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-brand-panel ring-1 ring-white/10 rounded-xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-white/70 font-medium mb-2">{t("name")}</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-brand-dark/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-brand-blue focus:bg-white/[0.06] transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-white/70 font-medium mb-2">{t("email")}</label>
                  <input
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-dark/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-brand-blue focus:bg-white/[0.06] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs text-white/70 font-medium mb-2">{t("phone")}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-brand-dark/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-brand-blue focus:bg-white/[0.06] transition-all"
                    placeholder="(617) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-xs text-white/70 font-medium mb-2">{t("service")}</label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-brand-dark/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-blue focus:bg-white/[0.06] transition-all"
                  >
                    <option value="" className="bg-brand-darker">{t("select")}</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-brand-darker">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-white/70 font-medium mb-2">{t("message")}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-brand-dark/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-brand-blue focus:bg-white/[0.06] transition-all resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="bg-red-500/10 border border-red-500/30 rounded-lg px-5 py-3.5 text-red-300 text-sm">
                  {t("error")}
                </p>
              )}

              {status === "success" ? (
                <div role="status" className="bg-green-500/10 border border-green-500/30 rounded-lg px-5 py-3.5 text-green-300 text-sm font-medium">
                  {t("success")}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-[#25b4e8] disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200"
                >
                  {status === "sending" ? (
                    t("sending")
                  ) : (
                    <>
                      <Send size={16} />
                      {t("submit")}
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
