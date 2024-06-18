import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { cormorant } from "./fonts";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import MuseumSelector from "./components/Nav/MuseumSelector";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Museum & Gallery Exhibition",
  description:
    "A gallery of great works, curated for your own viewing pleasure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.className}>
      <body>
        <Navbar />
        <MuseumSelector />
        <NextTopLoader showSpinner={true} />
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
