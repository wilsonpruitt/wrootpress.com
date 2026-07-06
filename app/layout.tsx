import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wrootpress.com"),
  title: {
    default: "Wroot Press",
    template: "%s",
  },
  description:
    "Independent imprint publishing primary-source editions and works in Wesleyan, French Catholic, and patristic studies.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable}`}>
      <head>
        <script defer src="/_vercel/insights/script.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
