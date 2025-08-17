import type { Metadata } from "next";
import { Manrope, Comfortaa } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--manrope",
  display: "swap",
});

const comfortaa = Comfortaa({
  weight: "variable",
  display: "swap",
  subsets: ["latin", "cyrillic", "latin-ext", "cyrillic-ext"],
  variable: "--font-work-comfortaa",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Creat",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${manrope.className} ${manrope.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
