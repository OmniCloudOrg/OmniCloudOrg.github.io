"use client";

import localFont from "next/font/local";
import { Header, Footer } from "@/components/layout";
import "./globals.css";
import React, { useEffect, useState } from "react";
// Modal for construction warning
function ConstructionWarningModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 text-neutral-100 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-neutral-800">
        <h2 className="text-2xl font-bold mb-4 text-white">Site Under Construction</h2>
        <p className="mb-6 text-base opacity-80 text-neutral-300">
          This site is currently under construction. Some features may not work as expected.
        </p>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

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
  const [showWarning, setShowWarning] = useState(false);

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

    // Show construction warning if not dismissed
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("siteWarningDismissed");
      if (!dismissed) {
        setShowWarning(true);
      }
    }
  }, []);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("siteWarningDismissed", "true");
    }
    setShowWarning(false);
  };

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
        {showWarning && <ConstructionWarningModal onClose={handleClose} />}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
