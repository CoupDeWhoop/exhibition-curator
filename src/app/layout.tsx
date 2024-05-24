import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
