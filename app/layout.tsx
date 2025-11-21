import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { url } from "inspector";

const geistSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BimmerViz",
  description: "Innovating Project Builds",
};

export const icon = '/icon.png'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
