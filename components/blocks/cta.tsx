"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Rocket, Zap, Shield, Star, TrendingUp, Users, Award, CheckCircle, Sparkles } from 'lucide-react';

const CallToAction = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [animatedMetrics, setAnimatedMetrics] = useState([0, 0, 0, 0]);
  const [liveStats, setLiveStats] = useState({
    companies: 2847,
    deployments: 45892,
    uptime: 99.97
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { 
      metric: "24MB", 
      label: "RAM per Service", 
      highlight: true,
      color: {
        primary: "#06b6d4",
        bg: "bg-cyan-500/5",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "#06b6d4"
      },
      icon: <Zap className="w-4 h-4" />,
      target: 24,
      suffix: "MB"
    },
    { 
      metric: "99.9%", 
      label: "System Uptime",
      color: {
        primary: "#10b981",
        bg: "bg-green-500/5", 
        border: "border-green-500/20",
        text: "text-green-400",
        glow: "#10b981"
      },
      icon: <Shield className="w-4 h-4" />,
      target: 99.9,
      suffix: "%"
    },
    { 
      metric: "<30s", 
      label: "Deploy Time",
      color: {
        primary: "#8b5cf6",
        bg: "bg-purple-500/5",
        border: "border-purple-500/20", 
        text: "text-purple-400",
        glow: "#8b5cf6"
      },
      icon: <Rocket className="w-4 h-4" />,
      target: 30,
      suffix: "s"
    },
    { 
      metric: "100%", 
      label: "Open Source",
      color: {
        primary: "#f59e0b",
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
        text: "text-amber-400", 
        glow: "#f59e0b"
      },
      icon: <Star className="w-4 h-4" />,
      target: 100,
      suffix: "%"
    }
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

  // Animate metrics on mount
  useEffect(() => {
    const animateMetric = (index: number, target: number) => {
      let current = 0;
      const increment = target / 60; // 60 frames for smooth animation
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedMetrics(prev => {
            const newMetrics = [...prev];
            newMetrics[index] = target;
            return newMetrics;
          });
          clearInterval(timer);
        } else {
          setAnimatedMetrics(prev => {
            const newMetrics = [...prev];
            newMetrics[index] = current;
            return newMetrics;
          });
        }
      }, 16);
    };

    metrics.forEach((metric, index) => {
      setTimeout(() => {
        animateMetric(index, metric.target);
      }, index * 200);
    });
  }, []);

  // Live stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        companies: prev.companies + Math.floor(Math.random() * 3),
        deployments: prev.deployments + Math.floor(Math.random() * 12) + 5,
        uptime: Math.max(99.95, Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.02))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ metric, index }: { metric: any; index: number }) => {
    const displayValue = index === 2 ? `<${Math.round(animatedMetrics[index])}` : 
                       index === 3 ? Math.round(animatedMetrics[index]) :
                       animatedMetrics[index].toFixed(1);

    return (
      <div 
        className={`group relative p-6 border ${metric.color.border} ${metric.color.bg} 
                   rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl
                   cursor-pointer`}
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${metric.color.primary}08 0%, transparent 70%)`
          }}
        />

        {/* Top accent line */}
        <div 
          className="absolute inset-x-0 top-0 h-px transition-all duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${metric.color.primary}30, transparent)`
          }}
        />

        {/* Enhanced top accent on hover */}
        <div 
          className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${metric.color.primary}, transparent)`
          }}
        />

        {/* Highlight accent for featured metric */}
        {metric.highlight && (
          <div 
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${metric.color.primary}, transparent)`
            }}
          />
        )}

        {/* Corner glow effect */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${metric.color.primary} 0%, transparent 70%)`
          }}
        />

        {/* Floating indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
          <div className={metric.color.text}>
            {metric.icon}
          </div>
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: metric.color.primary,
              boxShadow: `0 0 8px ${metric.color.primary}`
            }}
          />
        </div>

        <div className="relative">
          {/* Metric value */}
          <div className={`text-3xl font-black mb-2 font-mono transition-all duration-300 ${
            metric.highlight ? metric.color.text : 'text-white'
          }`}>
            {displayValue}{metric.suffix}
          </div>
          
          {/* Label */}
          <div className="text-sm text-gray-400 mb-4">
            {metric.label}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mt-auto">
            <div className={`w-2 h-2 rounded-full ${metric.color.text} animate-pulse`} />
            <span className="text-xs text-gray-500">Optimized</span>
          </div>
        </div>

        {/* Hover shadow effect */}
        <style jsx>{`
          .group:hover {
            box-shadow: ${metric.highlight ? `0 20px 40px ${metric.color.primary}20` : `0 20px 40px ${metric.color.primary}15`};
          }
        `}</style>
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#06b6d4 1px, transparent 1px),
              linear-gradient(90deg, #06b6d4 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />

        {/* Glowing accent lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

        {/* Pulsing data lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-line"
              style={{
                top: `${10 + i * 15}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 1.4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left side - Enhanced content */}
          <div className="flex-1 text-left max-w-2xl">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-sm mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono font-semibold">Ready to start</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            {/* Enhanced heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight leading-tight">
              Deploy Faster.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Scale Smarter.
              </span>
            </h2>
            
            {/* Enhanced description */}
            <p className="text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">
              Join <span className="text-cyan-300 font-semibold">{liveStats.companies.toLocaleString()}+ companies</span> already using OmniCloud to modernize their 
              deployment infrastructure. <span className="text-purple-300 font-semibold">Get started free</span>, scale as you grow.
            </p>

            {/* Live stats banner */}
            <div className="flex flex-wrap items-center gap-6 mb-10 p-4 bg-gray-900/20 border border-gray-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Live deployments:</span>
                <span className="text-lg font-bold text-green-400 font-mono">
                  {liveStats.deployments.toLocaleString()}
                </span>
              </div>
              <div className="w-px h-6 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">Uptime:</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">
                  {liveStats.uptime.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25 overflow-hidden">
                <span className="relative z-10">Get Started, it's open source!</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
              </button>
              
              <a 
                href="http://108.17.48.98:5673/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-lg font-medium"
              >
                <span>View the Live Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right side - Enhanced metrics grid */}
          <div className="lg:w-[500px] grid grid-cols-2 gap-6">
            {metrics.map((item, index) => (
              <MetricCard key={index} metric={item} index={index} />
            ))}
          </div>
        </div>

        {/* Final call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/5 border border-green-500/20 text-green-400 rounded-full backdrop-blur-sm">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Join the revolution in cloud deployment</span>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        
        @keyframes pulse-line {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
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

export default CallToAction;