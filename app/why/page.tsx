"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Globe, Cpu, Lock, Layers, ArrowRight, CheckCircle } from 'lucide-react';

type WhyUsSectionProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
};

const WhyUsSection: React.FC<WhyUsSectionProps> = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative p-6 lg:p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
      style={{
        animationDelay: `${index * 0.15}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse" style={{ padding: '1px' }}>
          <div className="w-full h-full bg-gray-900/30 rounded-2xl" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
            <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300 mb-1">
              {title}
            </h3>
            <div className="h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        </div>
        
        <p className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
        
        {/* Hover arrow indicator */}
        <div className="flex items-center gap-2 mt-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

const WhyUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const differentiators = [
    {
      icon: Zap,
      title: "Radical Efficiency",
      description: "Our platform is engineered for minimal resource consumption, delivering unprecedented performance with just 24MB RAM overhead per microservice. We don't just optimize—we redefine infrastructure efficiency."
    },
    {
      icon: Globe,
      title: "Universal Adaptability", 
      description: "Break free from infrastructure constraints. OmniCloud seamlessly spans cloud providers, virtual machines, and bare metal, giving you the flexibility to design your infrastructure without technological boundaries."
    },
    {
      icon: Shield,
      title: "Proactive Resilience",
      description: "Move beyond reactive monitoring. Our autonomous systems continuously analyze and self-heal, ensuring your infrastructure remains robust with minimal human intervention and near-zero downtime."
    },
    {
      icon: Lock,
      title: "Transparent Security",
      description: "Security isn't an afterthought—it's our foundation. With granular control and end-to-end encryption, we provide a security model that's both comprehensive and comprehensible."
    },
    {
      icon: Cpu,
      title: "Developer-First Design",
      description: "We've built a platform that speaks the language of modern developers. From intuitive interfaces to powerful CLI tools, OmniCloud accelerates your workflow without adding complexity."
    },
    {
      icon: Layers,
      title: "Future-Proof Architecture",
      description: "Our modular, open-source design means you're not locked into a static ecosystem. Extend, modify, and evolve your infrastructure as your needs change, without wholesale migrations."
    }
  ];

  const benefits = [
    "24MB RAM overhead per microservice",
    "Zero-config deployment in under 30 seconds",
    "99.99% uptime with autonomous healing",
    "Cross-platform compatibility guarantee"
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Animated floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => {
          const size = 120 + i * 30;
          const maxMovement = 25 + i * 8;
          const leftPercent = 10 + (i * 11);
          const topPercent = 5 + (i * 12);
          
          return (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.08] animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${['#00ffff', '#ff0080', '#8000ff', '#00ff80'][i % 4]} 0%, transparent 70%)`,
                left: `${Math.max(5, Math.min(leftPercent, 75))}%`,
                top: `${Math.max(5, Math.min(topPercent, 70))}%`,
                animationDelay: `${i * 1.8}s`,
                transform: `translate(${(mousePosition.x - 0.5) * Math.min(maxMovement, 35)}px, ${(mousePosition.y - 0.5) * Math.min(maxMovement * 0.7, 25)}px)`
              }}
            />
          );
        })}

        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#00ffff 1px, transparent 1px),
              linear-gradient(90deg, #00ffff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 0'
          }}
        />

        {/* Animated lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-line"
              style={{
                top: `${15 + i * 18}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 1.2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                Our Unique Approach
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Beyond Traditional
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Infrastructure
              </span>
            </h2>
            
            {/* Animated underline */}
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-8">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse" />
            </div>
          </div>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            OmniCloud isn't just another infrastructure platform. We're a paradigm shift in how organizations conceive, build, and manage their technological ecosystems.
          </p>

          {/* Key benefits showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-900/30 border border-gray-800 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-pulse" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {differentiators.map((diff, index) => (
            <WhyUsSection 
              key={index} 
              icon={diff.icon} 
              title={diff.title} 
              description={diff.description}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center">
          <div className="relative inline-block p-8 lg:p-12 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 border border-gray-800 rounded-3xl backdrop-blur-xl overflow-hidden">
            {/* CTA background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Reimagine Your Infrastructure?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Experience the OmniCloud difference—where technology adapts to your vision, not the other way around.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-lg font-bold transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg shadow-cyan-500/25 overflow-hidden">
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Animated shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                </button>
                
                <button className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-xl backdrop-blur-sm hover:bg-cyan-500/5 relative overflow-hidden">
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes pulse-line {
          0%, 100% { opacity: 0.1; transform: scaleX(0.5); }
          50% { opacity: 0.3; transform: scaleX(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyUs;