"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Cloud, Box, Cpu, GitBranch, Wrench, Activity, TrendingUp, Server } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Block-Level Storage",
        description: "High-performance I/O with configurable block sizes",
        detail: "Advanced block-level storage engine with write-ahead journaling for crash consistency and optimal performance.",
        area: "feat1",
        className: "lg:col-span-2",
        color: {
            primary: "#fbbf24", // yellow
            secondary: "#f59e0b",
            bg: "bg-yellow-500/5",
            border: "border-yellow-500/20",
            hover: "hover:border-yellow-400/40",
            glow: "#fbbf24",
            text: "text-yellow-400"
        },
        metrics: { value: "2.1ms", label: "Avg Latency", trend: "-67%" }
    },
    {
        icon: <Cloud className="w-6 h-6" />,
        title: "Distributed Replication",
        description: "Synchronous and asynchronous replication modes",
        detail: "Enterprise-grade distributed replication with multi-node synchronization and automatic failover capabilities.",
        area: "feat2",
        className: "lg:col-span-2",
        color: {
            primary: "#06b6d4", // cyan
            secondary: "#0891b2",
            bg: "bg-cyan-500/5",
            border: "border-cyan-500/20",
            hover: "hover:border-cyan-400/40",
            glow: "#06b6d4",
            text: "text-cyan-400"
        },
        metrics: { value: "3x", label: "Replication Factor", trend: "+200%" }
    },
    {
        icon: <Box className="w-6 h-6" />,
        title: "Volume Management",
        description: "Dynamic provisioning and lifecycle management",
        detail: "Complete volume lifecycle management with online expansion, cloning, and multiple access modes support.",
        area: "feat3",
        className: "lg:col-span-1",
        color: {
            primary: "#8b5cf6", // purple
            secondary: "#7c3aed",
            bg: "bg-purple-500/5",
            border: "border-purple-500/20",
            hover: "hover:border-purple-400/40",
            glow: "#8b5cf6",
            text: "text-purple-400"
        },
        metrics: { value: "∞", label: "Volume Scaling", trend: "+∞%" }
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Snapshot Support",
        description: "Point-in-time recovery and cloning",
        detail: "Instant snapshots with copy-on-write technology for efficient backup and recovery operations.",
        area: "feat4",
        className: "lg:col-span-1",
        color: {
            primary: "#10b981", // green
            secondary: "#059669",
            bg: "bg-green-500/5",
            border: "border-green-500/20",
            hover: "hover:border-green-400/40",
            glow: "#10b981",
            text: "text-green-400"
        },
        metrics: { value: "<1s", label: "Snapshot Time", trend: "+95%" }
    },
    {
        icon: <GitBranch className="w-6 h-6" />,
        title: "Rust-Powered Core",
        description: "Memory-safe systems programming",
        detail: "Built with Rust for zero-cost abstractions, memory safety, and fearless concurrency in storage operations.",
        area: "feat5",
        className: "lg:col-span-1",
        color: {
            primary: "#f97316", // orange
            secondary: "#ea580c",
            bg: "bg-orange-500/5",
            border: "border-orange-500/20",
            hover: "hover:border-orange-400/40",
            glow: "#f97316",
            text: "text-orange-400"
        },
        metrics: { value: "0", label: "Memory Leaks", trend: "100%" }
    },
    {
        icon: <Activity className="w-6 h-6" />,
        title: "Real-time Monitoring",
        description: "Performance metrics and health monitoring",
        detail: "Comprehensive monitoring with real-time IOPS, throughput, latency tracking and Prometheus integration.",
        area: "feat6",
        className: "lg:col-span-1",
        color: {
            primary: "#ec4899", // pink
            secondary: "#db2777",
            bg: "bg-pink-500/5",
            border: "border-pink-500/20",
            hover: "hover:border-pink-400/40",
            glow: "#ec4899",
            text: "text-pink-400"
        },
        metrics: { value: "99.99%", label: "Uptime SLA", trend: "+15%" }
    }
];

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    detail: string;
    area: string;
    className: string;
    color: {
        primary: string;
        secondary: string;
        bg: string;
        border: string;
        hover: string;
        glow: string;
        text: string;
    };
    metrics: {
        value: string;
        label: string;
        trend: string;
    };
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`group relative p-6 sm:p-8 bg-gray-900/30 border ${feature.color.border} ${feature.color.hover} 
                       rounded-2xl transition-all duration-500 overflow-hidden h-full backdrop-blur-xl
                       ${feature.className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animationDelay: `${index * 0.1}s`,
                boxShadow: isHovered ? `0 20px 40px ${feature.color.primary}20` : 'none'
            }}
        >
            {/* Animated background gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${feature.color.primary}08 0%, transparent 70%)`
                }}
            />

            {/* Top accent line */}
            <div 
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500"
                style={{
                    background: isHovered 
                        ? `linear-gradient(to right, transparent, ${feature.color.primary}, transparent)`
                        : `linear-gradient(to right, transparent, ${feature.color.primary}30, transparent)`
                }}
            />

            {/* Floating orb */}
            <div 
                className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
                style={{ 
                    backgroundColor: feature.color.primary,
                    boxShadow: `0 0 10px ${feature.color.primary}`
                }}
            />

            {/* Corner glow effect */}
            <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${feature.color.primary} 0%, transparent 70%)`
                }}
            />

            <div className="relative h-full flex flex-col">
                {/* Header with enhanced icon */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div 
                            className={`p-3 rounded-xl ${feature.color.bg} transition-all duration-300 border border-gray-800 group-hover:border-opacity-50`}
                            style={{
                                boxShadow: isHovered ? `0 0 20px ${feature.color.primary}30` : 'none'
                            }}
                        >
                            <div className={feature.color.text}>
                                {feature.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                                {feature.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`w-1 h-1 rounded-full ${feature.color.text}`} />
                                <span className="text-xs text-gray-400 uppercase tracking-wider">
                                    Core Feature
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature highlight with aligned metrics */}
                <div className="mb-4">
                    <p className={`text-xl font-semibold ${feature.color.text} mb-4 tracking-tight`}>
                        {feature.description}
                    </p>
                    
                    {/* Metrics display with consistent alignment */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-black text-white leading-none">
                                {feature.metrics.value}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-medium leading-tight">
                                    {feature.metrics.label}
                                </span>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <TrendingUp className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-green-400 font-medium">
                                        {feature.metrics.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed description */}
                <p className="text-sm text-gray-300 leading-relaxed flex-1">
                    {feature.detail}
                </p>
            </div>
        </div>
    );
};

const Features = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

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

    return (
        <section 
            ref={containerRef}
            className="relative py-24 px-4 bg-black overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced header */}
                <div className="text-center mb-20">
                    <div className="inline-block relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm mb-6">
                            <Server className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-300 tracking-wider uppercase">
                                Storage Features
                            </span>
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                            Enterprise-Grade
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                Distributed Storage
                            </span>
                        </h2>
                        
                        {/* Animated accent line */}
                        <div className="relative h-px w-64 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
                        </div>
                    </div>
                    
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        High-performance distributed filesystem with advanced features - from local storage to multi-region replication - 
                        delivering <span className="text-cyan-300 font-semibold">enterprise reliability</span> with 
                        <span className="text-purple-300 font-semibold"> blazing-fast performance</span>.
                    </p>
                </div>
                
                {/* Enhanced grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA section */}
                <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer group">
                        <span className="text-lg">Explore All Features</span>
                        <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-black opacity-60 group-hover:opacity-100 transition-all duration-300"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes pulse-line {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.15; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 5s ease-in-out infinite;
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

export default Features;