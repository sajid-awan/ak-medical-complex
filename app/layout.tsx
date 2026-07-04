import type { Metadata } from "next";
import { DM_Sans, Nunito } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Karim Medical Complex — Minchinabad",
  description:
    "Al-Karim Medical Complex delivers specialist care across five departments in Minchinabad, Bahawalnahar — 24/7 emergency, specialist OPD, lab, pharmacy, and more.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Al-Karim Medical Complex — Minchinabad",
    description:
      "Comprehensive healthcare across five departments in Minchinabad, Bahawalnahar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${nunito.variable}`}>
      <body className="min-h-full m-0">{children}</body>
    </html>
  );
}
