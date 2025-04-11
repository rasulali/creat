import type { Metadata } from "next";
import { Manrope, Jost } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--manrope",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--jost",
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
      <body className={`${jost.variable} ${manrope.className} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
