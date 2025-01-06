import React from 'react';
import { Zap, Cloud, Box, Cpu, GitBranch, Wrench } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6 text-cyan-400" />,
        title: "Ultra-Light Runtime",
        description: "Only 24MB RAM overhead per microservice",
        detail: "Deploy more services on existing hardware without compromise. Industry-leading efficiency.",
        area: "feat1",
        className: "lg:col-span-3"
    },
    {
        icon: <Cloud className="w-6 h-6 text-cyan-400" />,
        title: "Universal Deployment",
        description: "Deploy to any infrastructure",
        detail: "Native support for major cloud providers, VMs (VirtualBox, VMware, OpenStack), and bare metal through simple JSON templates.",
        area: "feat2",
        className: "lg:col-span-2"
    },
    {
        icon: <Box className="w-6 h-6 text-cyan-400" />,
        title: "Smart Build System",
        description: "Automatic container optimization",
        detail: "Leverages devcontainer features to create optimized base images without manual configuration.",
        area: "feat3",
        className: "lg:col-span-1"
    },
    {
        icon: <Cpu className="w-6 h-6 text-cyan-400" />,
        title: "Multi-Runtime Support",
        description: "Any Docker-compatible runtime",
        detail: "Run workloads on any container runtime compatible with the Docker image standard.",
        area: "feat4",
        className: "lg:col-span-1"
    },
    {
        icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
        title: "Rust-Powered Core",
        description: "Built for reliability",
        detail: "Get the security and efficiency benefits of a modern systems programming language.",
        area: "feat5",
        className: "lg:col-span-1"
    },
    {
        icon: <Wrench className="w-6 h-6 text-cyan-400" />,
        title: "Hardware Integration",
        description: "Direct bare metal support",
        detail: "Seamlessly mix cloud, VM, and physical hardware resources in your infrastructure.",
        area: "feat6",
        className: "lg:col-span-1"
    }
];

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    detail: string;
    area: string;
    className: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
    return (
        <div 
            className={`group relative p-6 bg-black border border-zinc-800 
                       rounded-sm transition-all duration-500 overflow-hidden h-full 
                       hover:border-cyan-950 ${feature.className}`}
        >
            {/* Accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full flex flex-col">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded bg-zinc-900 group-hover:bg-zinc-900/80 
                                transition-colors duration-300">
                        {feature.icon}
                    </div>
                    <h3 className="text-base font-medium text-white tracking-wide">
                        {feature.title}
                    </h3>
                </div>

                {/* Feature highlight */}
                <p className="text-lg font-semibold text-cyan-400 mb-3 tracking-tight">
                    {feature.description}
                </p>

                {/* Detailed description */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.detail}
                </p>
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section className="py-24 px-4 bg-black relative">

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <p className="text-cyan-400 text-sm font-medium tracking-wider mb-2 uppercase">
                            Platform Features
                        </p>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Next-Generation Deployment Platform
                        </h2>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
                    </div>
                    <p className="text-zinc-400 max-w-2xl mx-auto mt-6">
                        Ultra-efficient deployment to any target - from public clouds to bare metal - 
                        with minimal overhead and maximum flexibility.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;