import type { Metadata } from "next";
import "./globals.css";
import { displayFont, monoFont } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "doom.lat",
  description: "Portfolio of doom",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${monoFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
