import type { Metadata } from "next";
import { Manrope, Comfortaa } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--manrope",
  display: "swap",
});

const comfortaa = Comfortaa({
  weight: "variable",
  display: "swap",
  subsets: ["latin", "cyrillic", "latin-ext", "cyrillic-ext"],
  variable: "--font-work-comfortaa",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "CREAT Company LLC | Engineering Excellence in Azerbaijan",
    template: "%s | CREAT Company LLC",
  },
  description:
    "Azerbaijan's leading engineering firm specializing in renewable energy, mining, and infrastructure projects. 70+ major projects delivered with 29+ international partners.",
  keywords: [
    "engineering Azerbaijan",
    "renewable energy Baku",
    "mining projects",
    "infrastructure development",
    "project management Azerbaijan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${manrope.className} ${manrope.variable} bg-creatBG`}
      >
        {children}
      </body>
    </html>
  );
}
