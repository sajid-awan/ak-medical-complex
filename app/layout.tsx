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
  title: "Coming Soon — Al-Karim Medical Complex",
  description:
    "Al-Karim Medical Complex in Minchinabad is launching a new website soon. Contact us on WhatsApp for appointments and inquiries.",
  openGraph: {
    title: "Coming Soon — Al-Karim Medical Complex",
    description:
      "Our new website is on the way. Contact Al-Karim Medical Complex for appointments and care in Minchinabad.",
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
