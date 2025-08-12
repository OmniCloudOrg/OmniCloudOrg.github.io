"use client";

import localFont from "next/font/local";
import { Header, Footer } from "@/components/layout";
import "./globals.css";
import { useEffect } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  useEffect(() => {
    // Add favicon dynamically on client side
    const addFavicon = () => {
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());

      // Add new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = '/favicon.png';
      document.head.appendChild(link);

      // Add apple touch icon
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = '/favicon.png';
      document.head.appendChild(appleLink);

      // Add viewport meta if not exists
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1';
        document.head.appendChild(viewport);
      }
    };

    addFavicon();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>OmniCloud - Next-Generation Cloud Infrastructure Platform</title>
        <meta name="description" content="Deploy, manage, and scale your applications with OmniCloud's developer-friendly infrastructure platform. 24MB RAM overhead, 99.99% uptime, zero-config deployment." />
        <meta name="keywords" content="cloud infrastructure, deployment platform, microservices, container orchestration, DevOps, serverless" />
        <meta name="author" content="OmniCloud" />
        <meta property="og:title" content="OmniCloud - Next-Generation Cloud Infrastructure Platform" />
        <meta property="og:description" content="Deploy, manage, and scale your applications with OmniCloud's developer-friendly infrastructure platform." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OmniCloud - Next-Generation Cloud Infrastructure Platform" />
        <meta name="twitter:description" content="Deploy, manage, and scale your applications with OmniCloud's developer-friendly infrastructure platform." />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
