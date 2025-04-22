import React from 'react';
import Link from 'next/link';
import { Github, Menu, ExternalLink } from 'lucide-react';

const ForgeLogoSVG = () => (
  <svg 
    viewBox="0 0 64 64" 
    className="w-8 h-8"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Simplified Anvil base */}
    <path 
      d="M12 44L52 44L56 52H8L12 44Z" 
      fill="#06B6D4"
    />
    {/* Anvil body */}
    <path 
      d="M16 28L48 28L52 44H12L16 28Z" 
      fill="#0EA5E9"
    />
    {/* Hammer head */}
    <path 
      d="M32 12L40 20L36 24L28 16L32 12Z" 
      fill="#0EA5E9"
    />
    {/* Hammer handle */}
    <path 
      d="M28 16L24 28L20 32L16 28L24 20L28 16Z" 
      fill="#06B6D4"
    />
    {/* Spark effect */}
    <circle 
      cx="36" 
      cy="24" 
      r="2" 
      fill="#fff"
      className="animate-pulse"
    />
  </svg>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link
    href={href}
    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
  >
    {children}
  </Link>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50">
      <div className="bg-black/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <ForgeLogoSVG />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-lg font-medium text-white">
                OmniCloud
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/why">Why</NavLink>
              <NavLink href="/features">Features</NavLink>
              <NavLink href="/docs">Documentation</NavLink>
              <NavLink href="/blog">Blog</NavLink>

              <div className="h-4 w-px bg-zinc-800" />

              {/* GitHub */}
              <a href="https://github.com/OmniCloudOrg" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-zinc-400 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>

              {/* CTA Button */}
              <Link href="/docs/quickstart" 
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400 
                             hover:bg-cyan-500 text-black text-sm font-medium 
                             transition-colors duration-200">
                <span>Get Started</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <NavLink href="/features">Features</NavLink>
              <NavLink href="/docs">Documentation</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              
              <div className="h-px bg-zinc-800/50 my-4" />
              
              <div className="flex items-center justify-between">
                <a href="https://github.com/OmniCloudOrg" 
                   className="text-zinc-400 hover:text-white transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </a>
                <Link href="/docs/quickstart" 
                      className="inline-flex items-center gap-2 px-4 py-1.5 
                               bg-cyan-400 hover:bg-cyan-500 text-black text-sm 
                               font-medium transition-colors duration-200">
                  Get Started
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;