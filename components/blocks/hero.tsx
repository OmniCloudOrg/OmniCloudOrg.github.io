"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Server, Users } from 'lucide-react';

const generateFloatingElements = (count) => {
    // Create a grid-like initial distribution
    const elements = [];
    const gridSize = Math.ceil(Math.sqrt(count));
    const cellSize = 100 / gridSize;

    for (let i = 0; i < count; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        // Calculate center position of each grid cell
        const baseTop = (row * cellSize) + (cellSize / 2);
        const baseLeft = (col * cellSize) + (cellSize / 2);
        
        // Add slight randomness to size but keep it consistent
        const size = 50 + ((i % 3) * 30);
        
        // Random movement direction
        const angleRad = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 0.5;
        const dx = Math.cos(angleRad) * speed;
        const dy = Math.sin(angleRad) * speed;

        elements.push({
            top: `${baseTop}%`,
            left: `${baseLeft}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${
                ['rgba(6,182,212,0.4)', 'rgba(167,139,250,0.4)', 'rgba(99,102,241,0.4)'][
                    i % 3
                ]
            } 0%, transparent 70%)`,
            transform: `translate(-50%, -50%)`,
            animation: `float${i} ${15 + (i % 5)}s infinite linear`,
            dx,
            dy
        });
    }
    return elements;
};

const Hero = () => {
    const [floatingElements] = useState(() => generateFloatingElements(20));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Modern background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-violet-950" />

            {/* Futuristic grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Enhanced floating elements */}
            <div className="absolute inset-0 overflow-hidden">
                <style>
                    {floatingElements.map((element, i) => `
                        @keyframes float${i} {
                            0% {
                                transform: translate(-50%, -50%);
                            }
                            50% {
                                transform: translate(
                                    calc(-50% + ${element.dx * 100}px),
                                    calc(-50% + ${element.dy * 100}px)
                                );
                            }
                            100% {
                                transform: translate(-50%, -50%);
                            }
                        }
                    `).join('\n')}
                </style>
                {floatingElements.map((element, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-30 backdrop-blur-3xl"
                        style={{
                            top: element.top,
                            left: element.left,
                            width: element.width,
                            height: element.height,
                            background: element.background,
                            transform: element.transform,
                            animation: element.animation
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
                <h1 className="text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                        OmniForge
                    </span><br />

                    <div className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-950/50 to-violet-950/50 border border-indigo-900/50 backdrop-blur-xl">
                        <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-cyan-400" />
                                Enterprise-grade security
                            </div>
                            <div className="flex items-center gap-2">
                                <Server className="w-4 h-4 text-cyan-400" />
                                99.99% uptime
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-cyan-400" />
                                10k+ users
                            </div>
                        </div>
                    </div>

                </h1>
                
                <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    The Universal, 100% Open-Source Deployment Platform for the Modern Cloud Native Era.
                    Build, deploy, and scale with confidence.
                </p>
                
                <div className="flex gap-4 justify-center mb-12">
                    <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
                        Get Started Free
                    </button>
                    <button className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700/50 px-8 py-4 rounded-lg font-semibold hover:border-gray-600 transition-all duration-300 text-lg group backdrop-blur-xl">
                        View Documentation
                        <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;