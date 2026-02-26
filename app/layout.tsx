import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Park Bench Prints — Print & Paper, Haarlem",
  description:
    "A Haarlem-based print and paper studio crafting beautiful letterpress, risograph, and fine art prints with care and precision.",
  keywords: ["print", "paper", "Haarlem", "letterpress", "risograph", "art prints", "stationery"],
  openGraph: {
    title: "Park Bench Prints — Print & Paper, Haarlem",
    description:
      "A Haarlem-based print and paper studio crafting beautiful letterpress, risograph, and fine art prints.",
    type: "website",
    url: "https://parkbenchprints.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
