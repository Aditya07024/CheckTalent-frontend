import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PRODUCT_METADATA } from "@/lib/constants";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: `${PRODUCT_METADATA.name} — ${PRODUCT_METADATA.tagline}`,
  description: PRODUCT_METADATA.supportingMessage,
  openGraph: {
    title: `${PRODUCT_METADATA.name} — ${PRODUCT_METADATA.tagline}`,
    description: PRODUCT_METADATA.supportingMessage,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Londrina+Shadow&family=Quantico:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
