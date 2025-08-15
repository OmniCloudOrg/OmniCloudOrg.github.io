import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ForgeLogoSVG = () => (
  <img src="/logo-wide-transparent.svg" alt="Forge Logo" className="h-20 pt-5" />
);

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const NavLink = ({ href, children, icon }: NavLinkProps) => (
  <a
    href={href}
    className="group flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:bg-cyan-500/5 rounded-lg border border-transparent hover:border-cyan-500/20 backdrop-blur-sm relative overflow-hidden"
  >
    {icon && <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">{icon}</span>}
    <span className="relative z-10">{children}</span>
    {/* Hover glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </a>
);

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax with proper cleanup
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const header = headerRef.current;
    if (header) {
      header.addEventListener('mousemove', handleMouseMove);
      return () => {
        header.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Scroll tracking for dynamic effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/30 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating orbs */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                background: `radial-gradient(circle, ${['#00ffff', '#8000ff', '#ff0080'][i]} 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${-20 + i * 10}%`,
                transform: `translate(${(mousePosition.x - 0.5) * (15 + i * 5)}px, ${(mousePosition.y - 0.5) * (10 + i * 3)}px)`
              }}
            />
          ))}

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(#00ffff 1px, transparent 1px),
                linear-gradient(90deg, #00ffff 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 0 0'
            }}
          />

          {/* Pulsing accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20 animate-pulse" />
        </div>

        {/* Main header content */}
        <div
          className="relative bg-black/80 backdrop-blur-xl transition-all duration-300"
          style={{
            backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)'
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group relative">
                <div className="relative pl-10">
                  <ForgeLogoSVG />
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
                </div>
                {/* Subtle moving gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              </a>
              
              <div className="flex items-center justify-between pt-2 gap-4">
                <a
                  href="https://github.com/OmniCloudOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
                >
                  <Github className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/10 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="/docs/quickstart"
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-sm font-bold transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg shadow-cyan-500/25 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Header;