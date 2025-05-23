import "./globals.css";
import type { Metadata } from "next";

import { Navigation, Footer } from "@components";

export const metadata: Metadata = {
  title: "앵모닝",
  description: "앵무새 건강 관리와 케어 정보를 위한 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
