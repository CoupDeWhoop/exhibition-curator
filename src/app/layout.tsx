import type { Metadata } from "next";
import { Cormorant_Garamond } from "@next/font/google";
import "./globals.css";

const cg = Cormorant_Garamond({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={cg.className}>
      <body>
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
