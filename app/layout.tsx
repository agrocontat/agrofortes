import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agrofortes | Serviços Estratégicos para o Agronegócio",
  description:
    "Impulsionando o seu Agronegócio com Soluções Especializadas. Registros Ambientais, Proteção de Marcas, Holding Rural, Consultoria e muito mais.",
  keywords: [
    "agronegócio",
    "consultoria agrícola",
    "holding rural",
    "registros ambientais",
    "proteção de marcas",
    "Varginha MG",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
