import "./globals.css";
import type { Metadata } from "next";

import { Logo, Navigation } from "@components";

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
      <body>
        <header className="bg-white pt-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
              <Logo />
            </div>
            <Navigation />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-100 mt-8">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © 2024 앵무새 케어. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
