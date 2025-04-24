import { Metadata } from "next";
import localFont from "next/font/local";
import ProviderGlobal from "@app/components/provider";
import "./globals.css";
import "aos/dist/aos.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ptit",
  description: "Web chat cho ptit",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderGlobal>{children}</ProviderGlobal>
      </body>
    </html>
  );
}
