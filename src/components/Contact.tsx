"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Instagram, Facebook, Mail, Phone } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

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
      setStatus("idle");
      alert("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-darker/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4">
            <div className="w-8 h-px bg-brand-blue/50" />
            {t("title")}
            <div className="w-8 h-px bg-brand-blue/50" />
          </div>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-brand-darker border border-white/[0.07] rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">Contact Info</h3>
<address className="not-italic space-y-4">
                <a
                  href="mailto:diego@dtxsolution.com"
                  className="flex items-center gap-3 text-white/50 hover:text-brand-blue transition-colors text-sm group"
                >
                  <Mail size={16} className="shrink-0 group-hover:text-brand-blue" />
                  diego@dtxsolution.com
                </a>
                <a
                  href="tel:+18578290077"
                  className="flex items-center gap-3 text-white/50 hover:text-brand-blue transition-colors text-sm group"
                >
                  <Phone size={16} className="shrink-0" />
                  (857) 829-0077
                </a>
                <p className="flex items-center gap-3 text-white/50 text-sm">
                  <span className="shrink-0 w-4 text-center">📍</span>
                  Reading, MA — Greater Boston Area
                </p>
              </address>

              <div className="mt-6 pt-6 border-t border-white/[0.07]">
                <p className="text-white/30 text-xs mb-3">Follow us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/dtx.solution/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.05] text-white/50 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/dtx.solution85"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.05] text-white/50 hover:bg-brand-blue/15 hover:text-brand-blue transition-all duration-200"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-navy to-brand-blue/10 border border-brand-blue/20 rounded-2xl p-6">
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="text-brand-blue font-semibold">Free on-site estimates</span> for all
                installations in the Greater Boston area.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-brand-darker border border-white/[0.07] rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">{t("name")}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.06] transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">{t("email")}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.06] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">{t("phone")}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.06] transition-all"
                    placeholder="(617) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">{t("service")}</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.06] transition-all"
                  >
                    <option value="" className="bg-brand-darker">Select...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-brand-darker">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 font-medium mb-2">{t("message")}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.06] transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {status === "success" ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-3.5 text-green-400 text-sm font-medium">
                  {t("success")}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25"
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
