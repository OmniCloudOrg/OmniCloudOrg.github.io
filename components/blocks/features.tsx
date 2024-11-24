"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Shield, Terminal, GitBranch, Network, Cpu, Activity, Settings } from 'lucide-react';

const features = [
    // Row 1 - Main features (large cards)
    {
        icon: <Cloud className="w-8 h-8 text-cyan-400" />,
        title: "Universal Deployment",
        description: "Deploy seamlessly across public clouds, private infrastructure, or hybrid environments. Support for all major cloud providers and on-premises solutions.",
        area: "feat1",
        className: "lg:col-span-2"
    },
    {
        icon: <Shield className="w-8 h-8 text-cyan-400" />,
        title: "Enterprise Security",
        description: "Zero-trust architecture, RBAC, and comprehensive audit logging keep your deployments secure. Full compliance with SOC 2, HIPAA, and GDPR requirements.",
        area: "feat2",
        className: "lg:col-span-1"
    },
    // Row 2 - Performance features
    {
        icon: <Zap className="w-8 h-8 text-cyan-400" />,
        title: "Lightning Fast Performance",
        description: "Optimized build and deployment pipeline delivers maximum speed and efficiency.",
        area: "feat3",
        className: "lg:col-span-1"
    },
    {
        icon: <Terminal className="w-8 h-8 text-cyan-400" />,
        title: "Advanced CLI Tools",
        description: "Powerful command-line interface enables streamlined workflows and automation.",
        area: "feat4",
        className: "lg:col-span-1"
    },
    {
        icon: <GitBranch className="w-8 h-8 text-cyan-400" />,
        title: "GitOps Ready",
        description: "Native support for GitOps workflows and CI/CD integration with version control systems.",
        area: "feat5",
        className: "lg:col-span-1"
    },
    // Row 3 - Infrastructure features (medium cards)
    {
        icon: <Network className="w-8 h-8 text-cyan-400" />,
        title: "Service Mesh Integration",
        description: "Built-in service mesh provides advanced networking, traffic management, and observability. Support for Istio, Linkerd, and custom implementations.",
        area: "feat6",
        className: "lg:col-span-2"
    },
    {
        icon: <Cpu className="w-8 h-8 text-cyan-400" />,
        title: "Container Orchestration",
        description: "Advanced container orchestration with support for Kubernetes, Docker Swarm, and custom schedulers.",
        area: "feat7",
        className: "lg:col-span-1"
    },
    // Row 4 - Operations features
    {
        icon: <Activity className="w-8 h-8 text-cyan-400" />,
        title: "Real-time Monitoring",
        description: "Comprehensive monitoring and alerting capabilities with custom dashboards.",
        area: "feat8",
        className: "lg:col-span-1"
    },
    {
        icon: <Settings className="w-8 h-8 text-cyan-400" />,
        title: "Automated Operations",
        description: "Automate routine operations with self-healing infrastructure and predictive scaling.",
        area: "feat9",
        className: "lg:col-span-2"
    }
];

interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
    area: string;
    className: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [supportsSpotlight, setSupportsSpotlight] = useState(true);

    useEffect(() => {
        // Check for Firefox
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        // Check for mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        setSupportsSpotlight(!isFirefox && !isMobile);
        setSupportsSpotlight(false);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!supportsSpotlight) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div 
            className={`group relative p-6 bg-gray-950/80 backdrop-blur-sm border border-gray-900 
                       rounded-lg transition-all duration-300 overflow-hidden h-full ${feature.className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Spotlight effect - only shown if supported */}
            {supportsSpotlight && (
                <div 
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                                    rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05) 40%, transparent 60%)`
                    }}
                />
            )}

            {/* Simplified hover effect for Firefox/mobile */}
            {!supportsSpotlight && (
                <div 
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.05), rgba(167, 139, 250, 0.05))'
                    }}
                />
            )}

            {/* Border gradient */}
            <div className="absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                 style={{
                     background: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(167, 139, 250, 0.1))',
                     maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                     WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                 }}
            />

            <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gray-900/50 backdrop-blur-xl">
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">
                        {feature.title}
                    </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                    {feature.description}
                </p>
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section className="py-32 px-4 bg-black relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                            Everything You Need
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        OmniForge provides a complete platform for managing your entire deployment lifecycle,
                        from development to production at any scale.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;