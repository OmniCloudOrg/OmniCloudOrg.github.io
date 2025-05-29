"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Server, 
  Cloud, 
  Terminal, 
  Settings, 
  Box,
  RefreshCw,
  Zap,
  Database,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status?: string;
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative p-6 lg:p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse" style={{ padding: '1px' }}>
          <div className="w-full h-full bg-gray-900/30 rounded-2xl" />
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Icon with enhanced styling */}
        <div className="relative mb-6">
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
            <feature.icon className="w-7 h-7 lg:w-8 lg:h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
            {feature.title}
          </h3>
          
          {/* Animated underline */}
          <div className="h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          <p className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {feature.description}
          </p>
          
          {/* Status indicator */}
          {feature.status && (
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>{feature.status}</span>
            </div>
          )}
          
          {/* Hover learn more */}
          <div className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-medium">Explore feature</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesPage = () => {
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

  const features = [
    {
      icon: Cloud,
      title: "Multi-Cloud Deployment",
      description: "Deploy seamlessly across AWS, Google Cloud, Azure, and private cloud infrastructure with our unified control plane.",
      status: "Enterprise Ready"
    },
    {
      icon: Terminal,
      title: "GitOps Workflows",
      description: "Implement robust GitOps practices with automated deployments, rollbacks, and version control integration.",
      status: "Developer Focused"
    },
    {
      icon: Settings,
      title: "Advanced Configuration",
      description: "Flexible configuration management with support for dynamic environment variables and secrets handling.",
      status: "Security First"
    },
    {
      icon: Box,
      title: "Container Orchestration",
      description: "Built-in container orchestration with automatic scaling, load balancing, and service discovery.",
      status: "Auto-Scaling"
    },
    {
      icon: RefreshCw,
      title: "Zero-Downtime Updates",
      description: "Perform seamless updates and rollbacks with zero downtime using our advanced deployment strategies.",
      status: "99.99% Uptime"
    },
    {
      icon: Database,
      title: "State Management",
      description: "Integrated state management for stateful applications with automated backup and recovery.",
      status: "Data Protected"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Lightning-fast deployments with edge caching, CDN integration, and intelligent resource allocation.",
      status: "Sub-second Response"
    },
    {
      icon: Server,
      title: "Infrastructure as Code",
      description: "Define your infrastructure declaratively with version control, testing, and automated provisioning.",
      status: "GitOps Ready"
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA", icon: Shield },
    { value: "<30s", label: "Deployment Time", icon: Zap },
    { value: "150+", label: "Integrations", icon: Settings },
    { value: "24/7", label: "Expert Support", icon: Star }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Animated floating orbs */}
        {Array.from({ length: 12 }).map((_, i) => {
          const size = 80 + i * 25;
          const maxMovement = 20 + i * 6;
          const leftPercent = 8 + (i * 8);
          const topPercent = 5 + (i * 9);
          
          return (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.06] animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${['#00ffff', '#ff0080', '#8000ff', '#00ff80', '#ffff00'][i % 5]} 0%, transparent 70%)`,
                left: `${Math.max(5, Math.min(leftPercent, 85))}%`,
                top: `${Math.max(5, Math.min(topPercent, 80))}%`,
                animationDelay: `${i * 2.1}s`,
                transform: `translate(${(mousePosition.x - 0.5) * Math.min(maxMovement, 30)}px, ${(mousePosition.y - 0.5) * Math.min(maxMovement * 0.7, 20)}px)`
              }}
            />
          );
        })}

        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#00ffff 1px, transparent 1px),
              linear-gradient(90deg, #00ffff 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0'
          }}
        />

        {/* Animated accent lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-line"
              style={{
                top: `${10 + i * 15}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                Platform Features
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Everything You Need to
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Build & Scale
              </span>
            </h2>
            
            {/* Animated underline */}
            <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-8">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse" />
            </div>
          </div>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Enterprise-grade reliability meets developer-friendly simplicity. Deploy, manage, and scale your applications with confidence.
          </p>

          {/* Stats showcase */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/30 border border-gray-800 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-6 h-6 text-cyan-400 mb-3 mx-auto group-hover:animate-pulse" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center">
          <div className="relative inline-block p-8 lg:p-12 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 border border-gray-800 rounded-3xl backdrop-blur-xl overflow-hidden max-w-4xl">
            {/* CTA background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Ready to Get Started?
                </h3>
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join thousands of developers and teams who trust OmniCloud for their deployment needs. Start building today with our free tier.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-lg font-bold transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg shadow-cyan-500/25 overflow-hidden">
                  <span className="relative z-10">Start Building Now</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Animated shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                </button>
                
                <button className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-xl backdrop-blur-sm hover:bg-cyan-500/5 relative overflow-hidden">
                  <span className="relative z-10">View Documentation</span>
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
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        
        @keyframes pulse-line {
          0%, 100% { opacity: 0.1; transform: scaleX(0.3); }
          50% { opacity: 0.3; transform: scaleX(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-pulse-line {
          animation: pulse-line 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesPage;