import React from 'react';
import { Shield, Cpu, GitBranch, Zap, Server, Lock, Code } from 'lucide-react';

const TechOverview = () => {
    const techFeatures = [
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Zero Runtime Overhead",
            description: "No garbage collection, no runtime, no surprises",
            metrics: [
                { label: "Memory Overhead", value: "24MB" },
                { label: "GC Pauses", value: "0ms" }
            ]
        },
        {
            icon: <Lock className="w-5 h-5" />,
            title: "Memory Safe by Design",
            description: "Compile-time guarantees eliminate common vulnerabilities",
            metrics: [
                { label: "Memory Safety", value: "100%" },
                { label: "Data Races", value: "0" }
            ]
        },
        {
            icon: <Cpu className="w-5 h-5" />,
            title: "Fearless Concurrency",
            description: "Safe parallelism without the complexity of typical models",
            metrics: [
                { label: "Thread Safety", value: "✓" },
                { label: "Deadlock Free", value: "✓" }
            ]
        }
    ];

    return (
        <section className="py-24 px-4 bg-black relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] 
                          bg-[size:4rem_4rem] opacity-10" />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 
                                  border border-cyan-400/20 text-cyan-400 text-sm mb-6">
                        <Code className="w-4 h-4" />
                        <span className="font-mono">Built with Rust</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Performance Without Compromise
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl">
                        Powered by Rust's zero-cost abstractions and memory safety guarantees, 
                        OmniCloud delivers exceptional performance while ensuring reliability.
                    </p>
                </div>

                {/* Main features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {techFeatures.map((feature, index) => (
                        <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm
                                                  hover:border-cyan-900 transition-colors duration-300">
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 rounded bg-black/40 text-cyan-400">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-3 mt-6">
                                {feature.metrics.map((metric, idx) => (
                                    <div key={idx} className="p-2 bg-black/40 border border-zinc-800 rounded-sm">
                                        <div className="text-xs text-zinc-500 mb-1">{metric.label}</div>
                                        <div className="text-sm font-mono text-cyan-400">{metric.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechOverview;