"use client"
import React from 'react';
import Link from 'next/link';
import { IconBrandGithub } from "@tabler/icons-react";

const ForgeLogoSVG = () => (
  <svg 
    viewBox="0 0 64 64" 
    className="w-8 h-8"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Anvil base */}
    <path 
      d="M12 44L52 44L56 52H8L12 44Z" 
      fill="url(#gradient-base)"
    />
    {/* Anvil body */}
    <path 
      d="M16 28L48 28L52 44H12L16 28Z" 
      fill="url(#gradient-body)"
    />
    {/* Hammer head */}
    <path 
      d="M32 12L40 20L36 24L28 16L32 12Z" 
      fill="url(#gradient-hammer)"
    />
    {/* Hammer handle */}
    <path 
      d="M28 16L24 28L20 32L16 28L24 20L28 16Z" 
      fill="url(#gradient-handle)"
    />
    {/* Spark effect */}
    <circle 
      cx="36" 
      cy="24" 
      r="2" 
      fill="#fff"
      className="animate-pulse"
    />
    {/* Gradients */}
    <defs>
      <linearGradient id="gradient-base" x1="8" y1="44" x2="56" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="gradient-body" x1="12" y1="28" x2="52" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="gradient-hammer" x1="28" y1="12" x2="40" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC4899" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="gradient-handle" x1="16" y1="16" x2="28" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block px-3 py-2 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
  >
    {children}
  </Link>
);

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-black/50 border-b border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center gap-3">
              <ForgeLogoSVG />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                OmniForge
              </span>
            </div>
          </Link>
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Features
            </Link>
            <Link href="/docs" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Documentation
            </Link>
            <Link href="/blog" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Blog
            </Link>
          </div>
          {/* Call to Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/omniforge/community"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <IconBrandGithub className="w-5 h-5" />
            </Link>
            <Link href="/docs/quickstart">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg transition-all hover:opacity-90">
                Get Started
              </button>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-300 hover:text-neutral-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/features">Features</MobileNavLink>
            <MobileNavLink href="/docs">Documentation</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;