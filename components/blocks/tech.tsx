"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, GitBranch, Zap, Server, Lock, Code, Activity, TrendingUp, Monitor, BarChart3 } from 'lucide-react';

const TechOverview = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    const techFeatures = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Zero Runtime Overhead",
            description: "No garbage collection, no runtime, no surprises",
            color: {
                primary: "#f59e0b", // amber
                secondary: "#d97706",
                bg: "bg-amber-500/5",
                border: "border-amber-500/20",
                hover: "hover:border-amber-400/40",
                text: "text-amber-400",
                glow: "#f59e0b"
            },
            metrics: [
                { label: "Memory Overhead", value: "24MB", trend: "-89%", icon: <Monitor className="w-3 h-3" /> },
                { label: "GC Pauses", value: "0ms", trend: "100%", icon: <Activity className="w-3 h-3" /> }
            ]
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Memory Safe by Design",
            description: "Compile-time guarantees eliminate common vulnerabilities",
            color: {
                primary: "#ef4444", // red
                secondary: "#dc2626",
                bg: "bg-red-500/5",
                border: "border-red-500/20",
                hover: "hover:border-red-400/40",
                text: "text-red-400",
                glow: "#ef4444"
            },
            metrics: [
                { label: "Memory Safety", value: "100%", trend: "✓", icon: <Shield className="w-3 h-3" /> },
                { label: "Data Races", value: "0", trend: "∞", icon: <Lock className="w-3 h-3" /> }
            ]
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Fearless Concurrency",
            description: "Safe parallelism without the complexity of typical models",
            color: {
                primary: "#8b5cf6", // purple
                secondary: "#7c3aed",
                bg: "bg-purple-500/5",
                border: "border-purple-500/20",
                hover: "hover:border-purple-400/40",
                text: "text-purple-400",
                glow: "#8b5cf6"
            },
            metrics: [
                { label: "Thread Safety", value: "✓", trend: "∞", icon: <Cpu className="w-3 h-3" /> },
                { label: "Deadlock Free", value: "✓", trend: "100%", icon: <GitBranch className="w-3 h-3" /> }
            ]
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

    const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
        return (
            <div 
                className={`group relative p-8 bg-gray-900/30 border ${feature.color.border} ${feature.color.hover} 
                           rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl`}
                style={{
                    animationDelay: `${index * 0.2}s`
                }}
            >
                {/* Animated background gradient */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${feature.color.primary}08 0%, transparent 70%)`
                    }}
                />

                {/* Top accent line */}
                <div 
                    className="absolute inset-x-0 top-0 h-px transition-all duration-500 pointer-events-none"
                    style={{
                        background: `linear-gradient(to right, transparent, ${feature.color.primary}30, transparent)`,
                    }}
                />

                {/* Enhanced top accent on hover */}
                <div 
                    className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `linear-gradient(to right, transparent, ${feature.color.primary}, transparent)`
                    }}
                />

                {/* Floating status indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2 pointer-events-none">
                    <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                            backgroundColor: feature.color.primary,
                            boxShadow: `0 0 10px ${feature.color.primary}`
                        }}
                    />
                    <span className="text-xs text-gray-500 font-mono">ACTIVE</span>
                </div>

                {/* Corner glow effect */}
                <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${feature.color.primary} 0%, transparent 70%)`
                    }}
                />

                {/* Enhanced header */}
                <div className="flex items-start gap-4 mb-6">
                    <div 
                        className={`p-4 rounded-xl ${feature.color.bg} transition-all duration-300 border border-gray-800 group-hover:shadow-lg`}
                        style={{
                            '--hover-shadow': `0 0 25px ${feature.color.primary}30`
                        } as any}
                    >
                        <div className={feature.color.text}>
                            {feature.icon}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {feature.description}
                        </p>
                        
                        {/* Performance badge */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className={`px-2 py-1 rounded-full ${feature.color.bg} border ${feature.color.border}`}>
                                <span className={`text-xs font-medium ${feature.color.text}`}>
                                    OPTIMIZED
                                </span>
                            </div>
                            <TrendingUp className={`w-3 h-3 ${feature.color.text}`} />
                        </div>
                    </div>
                </div>

                {/* Enhanced metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {feature.metrics.map((metric: any, idx: number) => (
                        <div 
                            key={idx} 
                            className="relative p-4 bg-black/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={feature.color.text}>
                                    {metric.icon}
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                    {metric.label}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className={`text-lg font-bold ${feature.color.text} font-mono`}>
                                    {metric.value}
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-green-400 font-medium">
                                        {metric.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">
                            Real-time Performance
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${feature.color.text} animate-pulse`} />
                        <div className="text-xs text-gray-400 font-mono">
                            Optimized
                        </div>
                    </div>
                </div>

                {/* Hover shadow effect */}
                <style jsx>{`
                    .group:hover [style*="--hover-shadow"] {
                        box-shadow: var(--hover-shadow);
                    }
                    .group:hover {
                        box-shadow: 0 25px 50px ${feature.color.primary}20;
                    }
                `}</style>
            </div>
        );
    };

    return (
        <section 
            ref={containerRef}
            className="relative py-24 px-4 bg-black overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating orbs */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 animate-float"
                        style={{
                            width: `${100 + i * 30}px`,
                            height: `${100 + i * 30}px`,
                            background: `radial-gradient(circle, ${
                                ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981', '#f97316'][i]
                            } 0%, transparent 70%)`,
                            left: `${8 + i * 15}%`,
                            top: `${5 + (i % 2) * 40}%`,
                            animationDelay: `${i * 1.2}s`,
                            transform: `translate(${(mousePosition.x - 0.5) * (25 + i * 8)}px, ${(mousePosition.y - 0.5) * (18 + i * 5)}px)`
                        }}
                    />
                ))}

                {/* Enhanced grid pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
                            linear-gradient(#f59e0b 1px, transparent 1px),
                            linear-gradient(90deg, #f59e0b 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        backgroundPosition: '0 0, 0 0'
                    }}
                />

                {/* Pulsing performance lines */}
                <div className="absolute inset-0 opacity-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse-line"
                            style={{
                                top: `${20 + i * 25}%`,
                                left: '0',
                                right: '0',
                                animationDelay: `${i * 1.5}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced header */}
                <div className="mb-20">
                    <div className="flex items-center justify-center mb-8">
                        {/* Rust badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500/5 border border-orange-500/20 text-orange-400 rounded-full backdrop-blur-sm">
                            <div className="relative">
                                <img 
                                    src="https://www.rust-lang.org/logos/rust-logo-128x128.png" 
                                    alt="Rust" 
                                    className="w-6 h-6"
                                />
                                <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg animate-pulse" />
                            </div>
                            <span className="font-mono font-semibold tracking-wider">
                                BUILT WITH RUST
                            </span>
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                            Performance
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                                Without Compromise
                            </span>
                        </h2>
                        
                        {/* Animated accent line */}
                        <div className="relative h-px w-64 mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
                        </div>
                        
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Powered by Rust's <span className="text-orange-300 font-semibold">zero-cost abstractions</span> and 
                            <span className="text-red-300 font-semibold"> memory safety guarantees</span>, 
                            OmniCloud delivers exceptional performance while ensuring reliability.
                        </p>
                    </div>
                </div>



                {/* Enhanced features grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {techFeatures.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom stats summary */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-8 px-8 py-4 bg-gradient-to-r from-amber-500/5 via-red-500/5 to-purple-500/5 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99.9%</div>
                            <div className="text-xs text-gray-400">Uptime</div>
                        </div>
                        <div className="w-px h-8 bg-gray-700" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">24MB</div>
                            <div className="text-xs text-gray-400">Max RAM</div>
                        </div>
                        <div className="w-px h-8 bg-gray-700" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">0ms</div>
                            <div className="text-xs text-gray-400">GC Pause</div>
                        </div>
                        <div className="w-px h-8 bg-gray-700" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">∞</div>
                            <div className="text-xs text-gray-400">Thread Safe</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse-line {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.2; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
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

export default TechOverview;