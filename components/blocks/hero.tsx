"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Server, Lock, Terminal } from 'lucide-react';

const Hero = () => {
    const [isFirefox, setIsFirefox] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const terminalRef = useRef<HTMLDivElement>(null);
    const [terminalText, setTerminalText] = useState('');
    const fullCommand = '$ deploy app --minimal --scale auto';
    const typingSpeed = 80;
    const blinkCursor = '|';


    // Terminal typing animation
    useEffect(() => {
        let currentIndex = 0;
        let typingInterval: NodeJS.Timeout;

        const startTyping = () => {
            typingInterval = setInterval(() => {
                if (currentIndex < fullCommand.length) {
                    setTerminalText(fullCommand.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);

                    // After typing is complete, show success message
                    setTimeout(() => {
                        setTerminalText(prev => `${prev}\n\n✓ Deployment successful in 1.2s`);
                    }, 800);
                }
            }, typingSpeed);
        };

        // Start typing after a brief delay
        const timeout = setTimeout(startTyping, 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(typingInterval);
        };
    }, []);

    // Browser detection
    useEffect(() => {
        setIsFirefox(navigator.userAgent.toLowerCase().includes('firefox'));
    }, []);

    const stats = [
        { icon: <Zap className="w-4 h-4" />, text: "Minimal Footprint", highlight: "90% less resources" },
        { icon: <Server className="w-4 h-4" />, text: "Any infrastructure", highlight: "Cloud or on-prem" },
        { icon: <Lock className="w-4 h-4" />, text: "100% open source", highlight: "MIT license" }
    ];

    // Server rack configuration
    const serverRacks = [
        { width: 100, height: 296, serverCount: 13, offsetX: -60, offsetY: 0, zIndex: 0},
        { width: 100, height: 296, serverCount: 13, offsetX: 50, offsetY: 0, zIndex: 0},
        { width: 100, height: 296, serverCount: 13, offsetX: 160, offsetY: 0, zIndex:0 }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background gradients */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-indigo-900 to-transparent animate-pulse-slow"
                    style={{
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                        transition: 'transform 0.2s ease-out'
                    }}
                />
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-cyan-900 via-transparent to-transparent"
                    style={{
                        transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`,
                        transition: 'transform 0.2s ease-out'
                    }}
                />
            </div>

            {/* Dot grid pattern */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1rem 1rem, #2a2a4a 1px, transparent 0)',
                    backgroundSize: '3rem 3rem',
                    opacity: 0.3,
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            />

            {/* Subtle glowing network lines */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4facfe" />
                            <stop offset="100%" stopColor="#00f2fe" />
                        </linearGradient>
                    </defs>
                    <g stroke="url(#networkGradient)" strokeWidth="0.5">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <line
                                key={`h-line-${i}`}
                                x1="0"
                                y1={`${(i * 100) / 15}%`}
                                x2="100%"
                                y2={`${(i * 100) / 15}%`}
                            />
                        ))}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <line
                                key={`v-line-${i}`}
                                x1={`${(i * 100) / 15}%`}
                                y1="0"
                                x2={`${(i * 100) / 15}%`}
                                y2="100%"
                            />
                        ))}
                    </g>
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 px-4 max-w-7xl mx-auto w-full py-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left side content */}
                    <div className="flex-1 text-left max-w-xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm rounded-full animate-shimmer bg-[linear-gradient(110deg,#1a1a3f,#2a2a4a,#1a1a3f)] bg-[length:200%_100%]">
                            <span className="font-mono">v1.0 Coming Soon!</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        </div>

                        {/* Main heading without the erroneous line */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                            Deploy Anywhere.
                            <br />
                            <span className="text-cyan-400">Use Less.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                            The universal, lightweight deployment platform that runs anywhere.
                            <span className="text-cyan-300"> Zero waste architecture</span> for maximum scale with minimal overhead.
                        </p>

                        {/* Stats row with hover effects */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index}
                                    className="group flex flex-col gap-2 p-3 rounded-md transition-all duration-300 hover:bg-zinc-900/50 hover:border-cyan-900/50 hover:border hover:-translate-y-1">
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                            {stat.icon}
                                        </div>
                                        {stat.text}
                                    </div>
                                    <div className="text-xs text-cyan-500/80 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {stat.highlight}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons with animated effects */}
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium rounded-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1">
                                Get Started, it's Open Source!
                            </button>

                            <button className="px-6 py-3 bg-transparent border border-zinc-700 text-white rounded-md hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-900/10">
                                View Documentation →
                            </button>
                        </div>
                    </div>

                    {/* Right side - Terminal animation */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative">
                            <div
                                ref={terminalRef}
                                className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden shadow-xl shadow-cyan-900/10 backdrop-blur-sm"
                                style={{
                                    transform: `perspective(1000px) 
                                               rotateY(${(mousePosition.x - 0.5) * -5}deg) 
                                               rotateX(${(mousePosition.y - 0.5) * 5}deg)`,
                                    transition: 'transform 0.2s ease-out'
                                }}
                            >
                                {/* Terminal header */}
                                <div className="flex items-center p-3 bg-zinc-900 border-b border-zinc-800">
                                    <div className="flex gap-1.5 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex-1 text-center text-xs text-zinc-400 font-mono">
                                        terminal - deployment
                                    </div>
                                    <Terminal className="w-4 h-4 text-zinc-500" />
                                </div>

                                {/* Terminal content */}
                                <div className="p-4 font-mono text-sm text-zinc-300 h-[250px] w-[500px] bg-[linear-gradient(110deg,#080815,#10102a,#080815)]">
                                    <pre className="whitespace-pre-wrap">
                                        {terminalText}
                                        <span className="text-cyan-400 animate-blink">{blinkCursor}</span>
                                    </pre>
                                </div>
                            </div>

                            {/* Multiple server racks visualization below the terminal */}
                            <div className="absolute top-52 transform -translate-x-1/2 mx-auto">
                                <div className="relative flex items-end">
                                    {serverRacks.map((rack, rackIndex) => (
                                        <div 
                                            key={rackIndex} 
                                            className="absolute"
                                            style={{ 
                                                left: `${rack.offsetX}px`, 
                                                top: `${rack.offsetY}px`,
                                                zIndex: rack.zIndex
                                            }}
                                        >
                                            <div className="relative border border-zinc-800 rounded bg-zinc-900/50" 
                                                 style={{ height: `${rack.height}px`, width: `${rack.width}px` }}>
                                                {/* Server lights */}
                                                <div className="absolute -top-1 right-0 bottom-0 w-3 flex flex-col justify-evenly p-0.5">
                                                    {Array.from({ length: Math.min(13, rack.serverCount) }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{
                                                                backgroundColor: i % 3 === 0 ? '#4ade80' : '#2563eb',
                                                                boxShadow: i % 3 === 0 ? '0 0 6px #4ade80' : '0 0 6px #2563eb',
                                                                opacity: 0.7,
                                                                animation: `glow ${1 + (rackIndex * 0.2)}s infinite alternate ${i * 0.1}s`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Server shelves */}
                                                <div className="absolute left-2 right-4 top-2 bottom-2">
                                                    {Array.from({ length: rack.serverCount }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-full h-5 mb-1 border border-zinc-700 bg-zinc-800/50 rounded-sm flex items-center pl-2"
                                                            style={{
                                                                height: `${Math.max(5, 90 / rack.serverCount)}%`,
                                                                marginBottom: '2px'
                                                            }}
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add keyframes for glow animation */}
            <style jsx>{`
                @keyframes glow {
                    0% { opacity: 0.4; }
                    100% { opacity: 0.9; }
                }
                
                @keyframes pulse-slow {
                    0% { opacity: 0.25; }
                    50% { opacity: 0.35; }
                    100% { opacity: 0.25; }
                }
                
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default Hero;