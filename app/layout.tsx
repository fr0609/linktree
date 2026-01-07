import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Fitness Explorer - Entrenamiento Personal",
  description: "Ayudo a personas ocupadas a ganar fuerza, perder grasa y sentirse seguras con entrenamientos inteligentes."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${inter.variable}`}>
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
