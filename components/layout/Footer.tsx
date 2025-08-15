import React, { useState, useEffect, useRef } from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, ArrowUp, ExternalLink, Code, Book, MessageCircle, Shield, Zap, Users } from 'lucide-react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const footerSections = [
    {
      title: "Project",
      links: [
        { href: "/features", label: "Features", icon: <Zap className="w-3 h-3" /> },
        { href: "/why", label: "Why OmniCloud", icon: <Shield className="w-3 h-3" /> },
        { href: "/about", label: "About", icon: <Users className="w-3 h-3" /> }
      ]
    },
    {
      title: "Community",
      links: [
        { href: "/community", label: "Community", icon: <Users className="w-3 h-3" /> },
        { href: "https://github.com/OmniCloudOrg", label: "GitHub", icon: <Github className="w-3 h-3" /> },
        { href: "https://discord.gg/26feC6QAav", label: "Discord", icon: <MessageCircle className="w-3 h-3" /> }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/docs", label: "Documentation", icon: <Book className="w-3 h-3" /> },
        { href: "/contact", label: "Contact", icon: <Mail className="w-3 h-3" /> },
        { href: "/blog", label: "Blog", icon: <ExternalLink className="w-3 h-3" /> }
      ]
    },
  ];

  const socialLinks = [
    { href: "https://github.com/OmniCloudOrg", icon: <Github className="w-5 h-5" />, label: "GitHub", color: "#ffffff" },
    //{ href: "https://twitter.com/omnicloud", icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "#1da1f2" },
    //{ href: "https://linkedin.com/company/omnicloud", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", color: "#0077b5" },
    //{ href: "mailto:hello@omnicloud.dev", icon: <Mail className="w-5 h-5" />, label: "Email", color: "#ea4335" }
  ];

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll detection for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FooterLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => (
    <a
      href={href}
      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm py-1 hover:translate-x-1"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon && (
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400">
          {icon}
        </span>
      )}
      <span className="group-hover:text-cyan-100 transition-colors">{children}</span>
    </a>
  );

  type FooterLinkType = {
    href: string;
    label: string;
    icon?: React.ReactNode;
  };

  type FooterSectionType = {
    title: string;
    links: FooterLinkType[];
  };

  const FooterSection = ({ section }: { section: FooterSectionType }) => (
    <div className="relative">
      <h3 className="text-white font-bold mb-6 text-lg tracking-tight">{section.title}</h3>
      <ul className="space-y-3">
        {section.links.map(({ href, label, icon }: FooterLinkType) => (
          <li key={href}>
            <FooterLink href={href} icon={icon}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer 
      ref={containerRef}
      className="relative bg-black border-t border-gray-800/50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5 animate-float"
            style={{
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              background: `radial-gradient(circle, ${
                ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'][i]
              } 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 1.8}s`,
              transform: `translate(${(mousePosition.x - 0.5) * (15 + i * 3)}px, ${(mousePosition.y - 0.5) * (10 + i * 2)}px)`
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#06b6d4 1px, transparent 1px),
              linear-gradient(90deg, #06b6d4 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                  GalleonFS
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  High-performance distributed filesystem built in Rust. 
                  <span className="text-cyan-300 font-semibold">Enterprise-grade storage</span> for modern applications.
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-900/30 border border-gray-800 hover:border-gray-700 rounded-xl transition-all duration-300 hover:bg-gray-800/20 hover:scale-110 backdrop-blur-sm"
                    style={{
                      '--hover-color': social.color
                    } as React.CSSProperties}
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer sections */}
            {footerSections.map((section) => (
              <FooterSection key={section.title} section={section} />
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright with love */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <a 
                href="https://github.com/tristanpoland" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline decoration-dotted underline-offset-4"
              >
                Tristan J. Poland
              </a>
              <span>and</span>
              <a 
                href="https://github.com/caznix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium underline decoration-dotted underline-offset-4"
              >
                Caznix
              </a>
            </div>

            {/* Additional links */}
            <div className="flex items-center gap-6 pt-9 text-sm">
              <div className="text-center pb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/5 group">
                  <span className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors">
                    Built for developers, by developers
                  </span>
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Additional links */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-500">
                © 2024 GalleonFS | An OmniCloud project
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating back-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;