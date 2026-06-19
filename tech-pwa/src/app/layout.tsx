import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { ToastProvider } from "@/context/ToastContext";
import InstallPrompt from "@/components/InstallPrompt";
import Providers from "./Providers";
import ClockedInBar from "@/components/ClockedInBar";

import { LocaleProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "APT Central Command",
  description: "APT Maintenance Inc. Progressive Web App",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0d0f14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#0d0f14] text-[#ffffff] antialiased min-h-screen selection:bg-[var(--accent)]/30`}>
        <LocaleProvider>
          <Providers>
            <ToastProvider>
              {children}
              <ClockedInBar />
              <InstallPrompt />
            </ToastProvider>
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
