import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DTX Solution | Smart Security & IT Solutions",
  description:
    "Professional installation of security cameras, intercom systems, structured cabling, and Microsoft IT infrastructure for residential and commercial clients in Greater Boston.",
  keywords: "security cameras, intercom systems, structured cabling, Orbis, IT services, Microsoft, Boston, Reading MA",
  icons: {
    icon: "/Assets/logo_2025_Icon.png",
    apple: "/Assets/logo_2025_Icon.png",
  },
  openGraph: {
    title: "DTX Solution | Smart Security & IT Solutions",
    description: "Professional security and IT solutions for Greater Boston.",
    siteName: "DTX Solution",
    locale: "en_US",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} font-sans bg-brand-dark text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
