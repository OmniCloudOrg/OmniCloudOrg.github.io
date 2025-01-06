"use client"

import React, { useState, useEffect } from 'react';
import { Zap, Server, Lock } from 'lucide-react';

const generateRacks = (count) => {
    return Array.from({ length: count }, (_, index) => {
        const xStep = 6;
        const yStep = 3.6;
        
        if (index === 0) return { x: xStep, y: yStep, z: 1 };
        if (index === 1) return { x: 0, y: 0, z: 0 };
        return {
            x: -xStep * (index - 1),
            y: -yStep * (index - 1),
            z: -(index - 1) * 10
        };
    });
};

const Hero = () => {
    const [isFirefox, setIsFirefox] = useState(false);
    const racks = generateRacks(4);

    useEffect(() => {
        setIsFirefox(navigator.userAgent.toLowerCase().includes('firefox'));
    }, []);

    const stats = [
        { icon: <Zap className="w-4 h-4" />, text: "Minimal Footprint" },
        { icon: <Server className="w-4 h-4" />, text: "Any infrastructure" },
        { icon: <Lock className="w-4 h-4" />, text: "100% open source" }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#18143c53]" />
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] 
                          bg-[size:4rem_4rem] opacity-20" />

            {/* Main content */}
            <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left side content */}
                    <div className="flex-1 text-left max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-cyan-400/10 
                                      border border-cyan-400/20 text-cyan-400 text-sm">
                            <span className="font-mono">v1.0 Now Available</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        </div>

                        {/* Main heading */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                            Deploy Anywhere.
                            <br />
                            <span className="text-cyan-400">
                                Use Less.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                            The universal, lightweight deployment platform that runs anywhere. 
                            Designed for maximum scale and minimal overhead.
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-zinc-400">
                                    <div className="text-cyan-400">
                                        {stat.icon}
                                    </div>
                                    {stat.text}
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 
                                           text-black font-medium transition-colors duration-200">
                                Get Started Free
                            </button>
                            
                            <button className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 
                                           text-white border border-zinc-800 
                                           transition-colors duration-200">
                                View Documentation →
                            </button>
                        </div>
                    </div>

                    {/* Right side - Server racks */}
                    <div className="flex-1 flex justify-center md:justify-end translate-x-56">
                        {racks.map((transform, index) => (
                            <img
                                key={index}
                                src="/server-rack.svg"
                                alt={`Server Rack ${index + 1}`}
                                className="h-96"
                                style={{
                                    '--tw-translate-x': `${transform.x}rem`,
                                    '--tw-translate-y': `${transform.y}rem`,
                                    transform: 'translate(var(--tw-translate-x), var(--tw-translate-y))',
                                    zIndex: transform.z
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Accent lines */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
        </section>
    );
};

export default Hero;