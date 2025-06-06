import React, { useState, useEffect, useRef } from 'react';
import { Github, Menu, ExternalLink, X, Zap, Code2, Globe } from 'lucide-react';

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
      className="drop-shadow-lg"
    />
    {/* Anvil body */}
    <path 
      d="M16 28L48 28L52 44H12L16 28Z" 
      fill="#0EA5E9"
      className="drop-shadow-lg"
    />
    {/* Hammer head */}
    <path 
      d="M32 12L40 20L36 24L28 16L32 12Z" 
      fill="#0EA5E9"
      className="drop-shadow-lg"
    />
    {/* Hammer handle */}
    <path 
      d="M28 16L24 28L20 32L16 28L24 20L28 16Z" 
      fill="#06B6D4"
      className="drop-shadow-lg"
    />
    {/* Spark effect */}
    <circle 
      cx="36" 
      cy="24" 
      r="2" 
      fill="#fff"
      className="animate-pulse drop-shadow-lg"
    />
  </svg>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ href, children, icon }) => (
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      return () => header.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll tracking for dynamic effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
            className="absolute rounded-full opacity-10 animate-float"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `radial-gradient(circle, ${['#00ffff', '#8000ff', '#ff0080'][i]} 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${-20 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
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
              <div className="relative">
                <ForgeLogoSVG />
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
              </div>
              <span className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                OmniCloud
              </span>
              {/* Subtle moving gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink href="/" icon={<Globe className="w-4 h-4" />}>Home</NavLink>
              <NavLink href="/why" icon={<Zap className="w-4 h-4" />}>Why</NavLink>
              <NavLink href="/features" icon={<Code2 className="w-4 h-4" />}>Features</NavLink>
              <NavLink href="/docs">Documentation</NavLink>
              <NavLink href="/blog">Blog</NavLink>

              {/* Animated divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* GitHub with enhanced hover */}
              <a 
                href="https://github.com/OmniCloudOrg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2 text-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
              >
                <Github className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/10 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Enhanced CTA Button */}
              <a 
                href="/docs/quickstart" 
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-sm font-bold transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg shadow-cyan-500/25 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
              </a>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden group p-2 text-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 relative z-10" />
              ) : (
                <Menu className="w-6 h-6 relative z-10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/10 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </nav>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/30 relative">
            {/* Mobile menu background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40 backdrop-blur-xl" />
            <div className="absolute inset-0 opacity-[0.02]">
              <div 
                style={{
                  backgroundImage: `
                    linear-gradient(#00ffff 1px, transparent 1px),
                    linear-gradient(90deg, #00ffff 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
                className="w-full h-full"
              />
            </div>
            
            <nav className="relative max-w-7xl mx-auto px-4 py-6 space-y-2">
              <NavLink href="/" icon={<Globe className="w-4 h-4" />}>Home</NavLink>
              <NavLink href="/why" icon={<Zap className="w-4 h-4" />}>Why</NavLink>
              <NavLink href="/features" icon={<Code2 className="w-4 h-4" />}>Features</NavLink>
              <NavLink href="/docs">Documentation</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              
              {/* Animated divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
              </div>
              
              <div className="flex items-center justify-between pt-2">
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
            </nav>
          </div>
        )}
      </div>

      {/* Development Warning Banner */}
      <div 
        data-dev-banner
        className="relative border-t border-gray-800/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-xl overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5 opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            {/* Warning icon */}
            <div className="flex-shrink-0 p-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            {/* Warning text */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-sm font-semibold text-amber-300">
                ⚠️ Development Notice
              </span>
              <span className="hidden sm:block text-gray-400">•</span>
              <span className="text-xs sm:text-sm text-gray-300">
                OmniCloud is currently in active development. Features may be incomplete or change without notice.
              </span>
            </div>
            
            {/* Optional close button */}
            <button 
              className="flex-shrink-0 p-1 text-gray-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-800/50"
              onClick={() => {
                // You could implement banner dismissal logic here
                const banner = document.querySelector('[data-dev-banner]');
                if (banner) (banner as HTMLElement).style.display = 'none';
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default Header;