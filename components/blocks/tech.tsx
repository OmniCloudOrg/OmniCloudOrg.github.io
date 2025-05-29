"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, GitBranch, Zap, Server, Lock, Code, Activity, TrendingUp, Monitor, BarChart3 } from 'lucide-react';

const TechOverview = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [activeMetricIndex, setActiveMetricIndex] = useState(0);
    const [cpuUsage, setCpuUsage] = useState<number[]>([]);
    const [memoryUsage, setMemoryUsage] = useState<number[]>([]);
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
            ],
            liveData: { cpu: [12, 8, 15, 9, 11], memory: [24, 24, 24, 24, 24] }
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
            ],
            liveData: { cpu: [5, 3, 4, 2, 3], memory: [18, 19, 18, 19, 18] }
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
            ],
            liveData: { cpu: [45, 52, 38, 61, 44], memory: [128, 145, 132, 156, 139] }
        }
    ];

    // Generate live system data
    useEffect(() => {
        const generateCpuData = () => {
            return Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 5);
        };
        
        const generateMemoryData = () => {
            return Array.from({ length: 20 }, () => Math.floor(Math.random() * 40) + 20);
        };

        setCpuUsage(generateCpuData());
        setMemoryUsage(generateMemoryData());

        const interval = setInterval(() => {
            setCpuUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 5]);
            setMemoryUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 20]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Cycle through active metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMetricIndex(prev => (prev + 1) % techFeatures.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
        const [isHovered, setIsHovered] = useState(false);
        const [animationProgress, setAnimationProgress] = useState(0);

        useEffect(() => {
            let interval: NodeJS.Timeout;
            if (isHovered) {
                interval = setInterval(() => {
                    setAnimationProgress(prev => Math.min(prev + 3, 100));
                }, 30);
            } else {
                setAnimationProgress(0);
            }
            return () => {
                if (interval) clearInterval(interval);
            };
        }, [isHovered]);

        return (
            <div 
                className={`group relative p-8 bg-gray-900/30 border ${feature.color.border} ${feature.color.hover} 
                           rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl
                           transform hover:scale-[1.02] hover:-translate-y-2`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    animationDelay: `${index * 0.2}s`,
                    boxShadow: isHovered ? `0 25px 50px ${feature.color.primary}20` : 'none'
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
                    className="absolute inset-x-0 top-0 h-px transition-all duration-500"
                    style={{
                        background: isHovered 
                            ? `linear-gradient(to right, transparent, ${feature.color.primary}, transparent)`
                            : `linear-gradient(to right, transparent, ${feature.color.primary}30, transparent)`
                    }}
                />

                {/* Floating status indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                    <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                            backgroundColor: feature.color.primary,
                            boxShadow: `0 0 10px ${feature.color.primary}`
                        }}
                    />
                    <span className="text-xs text-gray-500 font-mono">ACTIVE</span>
                </div>

                {/* Enhanced header */}
                <div className="flex items-start gap-4 mb-6">
                    <div 
                        className={`p-4 rounded-xl ${feature.color.bg} transition-all duration-300 group-hover:scale-110 border border-gray-800`}
                        style={{
                            boxShadow: isHovered ? `0 0 25px ${feature.color.primary}30` : 'none'
                        }}
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

                {/* Enhanced metrics with mini charts */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {feature.metrics.map((metric: any, idx: number) => (
                        <div 
                            key={idx} 
                            className="relative p-4 bg-black/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors backdrop-blur-sm group/metric"
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

                            {/* Mini performance chart */}
                            <div className="mt-3 h-8 flex items-end gap-0.5">
                                {feature.liveData.cpu.slice(-8).map((value: number, i: number) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-sm transition-all duration-300 group-hover/metric:opacity-100 opacity-60"
                                        style={{
                                            height: `${(value / 100) * 100}%`,
                                            backgroundColor: feature.color.primary,
                                            minHeight: '2px'
                                        }}
                                    />
                                ))}
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
                        <div className="text-xs text-gray-400 font-mono">
                            {Math.round(animationProgress)}% optimized
                        </div>
                        <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full transition-all duration-1000 ease-out rounded-full"
                                style={{ 
                                    width: `${animationProgress}%`,
                                    backgroundColor: feature.color.primary,
                                    boxShadow: `0 0 8px ${feature.color.primary}60`
                                }}
                            />
                        </div>
                    </div>
                </div>
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

                {/* Live system monitor */}
                <div className="mb-12 p-6 bg-gray-900/20 border border-gray-800 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-cyan-400" />
                            <span className="text-sm font-medium text-gray-300">System Performance Monitor</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span>CPU Usage</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                <span>Memory Usage</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                        {/* CPU Usage Chart */}
                        <div>
                            <div className="h-16 flex items-end gap-1 mb-2">
                                {cpuUsage.map((usage, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-sm transition-all duration-500"
                                        style={{
                                            height: `${usage}%`,
                                            backgroundColor: '#f59e0b',
                                            opacity: i === cpuUsage.length - 1 ? 1 : 0.7 - (cpuUsage.length - i) * 0.05
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-gray-400">
                                Avg: {Math.round(cpuUsage.reduce((a, b) => a + b, 0) / cpuUsage.length)}% CPU
                            </div>
                        </div>
                        
                        {/* Memory Usage Chart */}
                        <div>
                            <div className="h-16 flex items-end gap-1 mb-2">
                                {memoryUsage.map((usage, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-sm transition-all duration-500"
                                        style={{
                                            height: `${usage}%`,
                                            backgroundColor: '#8b5cf6',
                                            opacity: i === memoryUsage.length - 1 ? 1 : 0.7 - (memoryUsage.length - i) * 0.05
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-gray-400">
                                Avg: {Math.round(memoryUsage.reduce((a, b) => a + b, 0) / memoryUsage.length)}MB RAM
                            </div>
                        </div>
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