"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Code, Cpu, Rocket, Server, Activity, HardDrive, Wifi } from 'lucide-react';

const AmoledHero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [codeText, setCodeText] = useState('');
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [cpuUsages, setCpuUsages] = useState<number[][]>([]);
    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
    const [currentFlipWord, setCurrentFlipWord] = useState(0);
    const [flipWordText, setFlipWordText] = useState('');
    const [isTypingFlipWord, setIsTypingFlipWord] = useState(false);
    const [terminalCompleted, setTerminalCompleted] = useState(false);
    const [cycleStartTime, setCycleStartTime] = useState<number | null>(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [totalCycleDuration, setTotalCycleDuration] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Constants for better control
    const DISPLAY_DURATION = 6000; // 6 seconds to display completed terminal
    const TYPING_SPEED = 50; // ms between characters
    const LINE_DELAY = 800; // ms between lines

    const flipWords = ["Build", "Ship", "Scale"];

    // Different code examples for each technology
    const codeExamples = {
        nextjs: [
            'npx create-next-app@latest my-app',
            'cd my-app',
            'omni deploy',
            '> Building Next.js application...',
            '✨ Deployed to https://my-app.omni.dev'
        ],
        rust: [
            'cargo new my-rust-app',
            'cd my-rust-app',
            'omni deploy --runtime rust',
            '> Compiling Rust binary...',
            '✨ Serverless function deployed'
        ],
        svelte: [
            'npm create svelte@latest my-app',
            'cd my-app',
            'omni deploy',
            '> Building SvelteKit app...',
            '✨ Edge deployment complete'
        ],
        react: [
            'npx create-react-app my-app',
            'cd my-app',
            'omni deploy',
            '> Optimizing React build...',
            '✨ CDN distribution ready'
        ],
        vue: [
            'npm create vue@latest my-app',
            'cd my-app',
            'omni deploy',
            '> Building Vue.js application...',
            '✨ Global deployment successful'
        ],
        angular: [
            'ng new my-app',
            'cd my-app',
            'omni deploy',
            '> Building Angular project...',
            '✨ Production build deployed'
        ],
        python: [
            'mkdir my-python-api',
            'cd my-python-api',
            'omni deploy --runtime python',
            '> Installing dependencies...',
            '✨ Python API endpoint live'
        ],
        nodejs: [
            'mkdir my-node-api',
            'cd my-node-api && npm init -y',
            'omni deploy',
            '> Packaging Node.js app...',
            '✨ Microservice deployed'
        ]
    };

    type CodeExampleKey = keyof typeof codeExamples;
    const getCurrentCodeLines = () => {
        const techKeys = Object.keys(codeExamples) as CodeExampleKey[];
        const currentTechKey = techKeys[currentBadgeIndex];
        return codeExamples[currentTechKey] || codeExamples.nextjs;
    };

    // **NEW: Calculate total cycle duration including typing time**
    const calculateCycleDuration = (codeLines: string[]) => {
        let totalTypingTime = 0;
        
        // Calculate typing time for each line
        codeLines.forEach((line, index) => {
            totalTypingTime += line.length * TYPING_SPEED; // Time to type each character
            if (index < codeLines.length - 1) {
                totalTypingTime += LINE_DELAY; // Time between lines
            }
        });
        
        return totalTypingTime + DISPLAY_DURATION; // Total typing + display time
    };

    // Technology logos from online sources
    const TechIcons = {
        nextjs: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                alt="Next.js" 
                className="w-4 h-4 filter invert"
            />
        ),
        rust: (
            <img 
                src="https://www.rust-lang.org/logos/rust-logo-128x128.png" 
                alt="Rust" 
                className="w-4 h-4"
            />
        ),
        svelte: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" 
                alt="Svelte" 
                className="w-4 h-4"
            />
        ),
        react: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                alt="React" 
                className="w-4 h-4"
            />
        ),
        vue: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" 
                alt="Vue.js" 
                className="w-4 h-4"
            />
        ),
        angular: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" 
                alt="Angular" 
                className="w-4 h-4"
            />
        ),
        python: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                alt="Python" 
                className="w-4 h-4"
            />
        ),
        nodejs: (
            <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                alt="Node.js" 
                className="w-4 h-4"
            />
        )
    };

    // Supported technologies for animated badge with custom styling
    const supportedTechs = [
        { 
            icon: TechIcons.nextjs, 
            name: "Next.js 15", 
            borderColor: "border-white/30",
            bgColor: "bg-white/5",
            textColor: "text-white",
            iconColor: "text-white",
            progressColor: "#ffffff"
        },
        { 
            icon: TechIcons.rust, 
            name: "Rust", 
            borderColor: "border-orange-500/30",
            bgColor: "bg-orange-500/5",
            textColor: "text-orange-300",
            iconColor: "text-orange-400",
            progressColor: "#fb923c"
        },
        { 
            icon: TechIcons.svelte, 
            name: "Svelte", 
            borderColor: "border-red-500/30",
            bgColor: "bg-red-500/5",
            textColor: "text-red-300",
            iconColor: "text-red-400",
            progressColor: "#f87171"
        },
        { 
            icon: TechIcons.react, 
            name: "React", 
            borderColor: "border-blue-500/30",
            bgColor: "bg-blue-500/5",
            textColor: "text-blue-300",
            iconColor: "text-blue-400",
            progressColor: "#60a5fa"
        },
        { 
            icon: TechIcons.vue, 
            name: "Vue.js", 
            borderColor: "border-green-500/30",
            bgColor: "bg-green-500/5",
            textColor: "text-green-300",
            iconColor: "text-green-400",
            progressColor: "#4ade80"
        },
        { 
            icon: TechIcons.angular, 
            name: "Angular", 
            borderColor: "border-red-600/30",
            bgColor: "bg-red-600/5",
            textColor: "text-red-300",
            iconColor: "text-red-500",
            progressColor: "#ef4444"
        },
        { 
            icon: TechIcons.python, 
            name: "Python", 
            borderColor: "border-yellow-500/30",
            bgColor: "bg-yellow-500/5",
            textColor: "text-yellow-300",
            iconColor: "text-yellow-400",
            progressColor: "#facc15"
        },
        { 
            icon: TechIcons.nodejs, 
            name: "Node.js", 
            borderColor: "border-green-600/30",
            bgColor: "bg-green-600/5",
            textColor: "text-green-300",
            iconColor: "text-green-500",
            progressColor: "#22c55e"
        }
    ];

    // **UPDATED: Progress bar animation - tracks entire cycle**
    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        if (cycleStartTime && totalCycleDuration > 0) {
            progressInterval = setInterval(() => {
                const elapsed = Date.now() - cycleStartTime;
                const newProgress = Math.min((elapsed / totalCycleDuration) * 100, 100);
                setProgressPercent(newProgress);

                // Clean up when progress is complete
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                }
            }, 16); // ~60fps updates for smooth animation
        } else {
            // Reset progress when cycle hasn't started
            setProgressPercent(0);
        }

        return () => {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
        };
    }, [cycleStartTime, totalCycleDuration]);

    // Simple typewriter flip words animation
    useEffect(() => {
        if (!isTypingFlipWord) {
            const timer = setTimeout(() => {
                setIsTypingFlipWord(true);
                setFlipWordText('');
                
                // Start typing the current word
                const currentWord = flipWords[currentFlipWord];
                let charIndex = 0;
                
                const typeInterval = setInterval(() => {
                    if (charIndex < currentWord.length) {
                        setFlipWordText(currentWord.slice(0, charIndex + 1));
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        
                        // Wait a bit then move to next word
                        setTimeout(() => {
                            setCurrentFlipWord((prev) => (prev + 1) % flipWords.length);
                            setIsTypingFlipWord(false);
                        }, 1500);
                    }
                }, 100); // Typing speed
                
            }, 500); // Delay between words
            
            return () => clearTimeout(timer);
        }
    }, [currentFlipWord, isTypingFlipWord]);

    // Initialize first word
    useEffect(() => {
        setFlipWordText(flipWords[0]);
    }, []);

    // **UPDATED: Main badge cycling logic - uses calculated total duration**
    useEffect(() => {
        let transitionTimer: NodeJS.Timeout;

        // Only set up transition if we have a cycle start time and total duration
        if (cycleStartTime && totalCycleDuration > 0) {
            const elapsed = Date.now() - cycleStartTime;
            const remainingTime = Math.max(0, totalCycleDuration - elapsed);

            console.log(`Setting transition timer for ${remainingTime}ms (total: ${totalCycleDuration}ms) for tech:`, supportedTechs[currentBadgeIndex].name);

            transitionTimer = setTimeout(() => {
                console.log('Transitioning to next technology...');
                setCurrentBadgeIndex((prev) => (prev + 1) % supportedTechs.length);
            }, remainingTime);
        }

        return () => {
            if (transitionTimer) {
                clearTimeout(transitionTimer);
            }
        };
    }, [cycleStartTime, totalCycleDuration, currentBadgeIndex]);

    // **UPDATED: Reset terminal state when badge changes and start new cycle**
    useEffect(() => {
        console.log('Badge changed to:', supportedTechs[currentBadgeIndex].name);
        
        // Reset all states
        setCodeText('');
        setCurrentLineIndex(0);
        setTerminalCompleted(false);
        setProgressPercent(0);
        
        // Calculate new cycle duration and start cycle
        const currentCodeLines = getCurrentCodeLines();
        const newCycleDuration = calculateCycleDuration(currentCodeLines);
        setTotalCycleDuration(newCycleDuration);
        setCycleStartTime(Date.now());
        
        console.log(`Starting new cycle for ${supportedTechs[currentBadgeIndex].name}, duration: ${newCycleDuration}ms`);
    }, [currentBadgeIndex]);

    // Generate random CPU usage values
    useEffect(() => {
        const generateCpuUsages = () => {
            const usages = [];
            for (let rackId = 0; rackId < 2; rackId++) {
                const rackUsages = [];
                for (let serverId = 0; serverId < 8; serverId++) {
                    rackUsages.push(Math.floor(Math.random() * 85) + 10); // 10-95%
                }
                usages.push(rackUsages);
            }
            return usages;
        };

        setCpuUsages(generateCpuUsages());
        
        const interval = setInterval(() => {
            setCpuUsages(generateCpuUsages());
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

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // **UPDATED: Typewriter effect - only manages typing, doesn't control transitions**
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentCodeLines = getCurrentCodeLines();
        
        if (currentLineIndex < currentCodeLines.length && !terminalCompleted) {
            const currentLine = currentCodeLines[currentLineIndex];
            const currentText = codeText.split('\n')[currentLineIndex] || '';
            
            if (currentText.length < currentLine.length) {
                // Still typing current line
                timeout = setTimeout(() => {
                    const lines = codeText.split('\n');
                    lines[currentLineIndex] = currentLine.slice(0, currentText.length + 1);
                    setCodeText(lines.join('\n'));
                }, TYPING_SPEED);
            } else if (currentLineIndex < currentCodeLines.length - 1) {
                // Move to next line
                timeout = setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1);
                    setCodeText(prev => prev + '\n');
                }, LINE_DELAY);
            } else {
                // All lines completed - mark terminal as complete
                console.log('Terminal completed for:', supportedTechs[currentBadgeIndex].name);
                setTerminalCompleted(true);
            }
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [codeText, currentLineIndex, currentBadgeIndex, terminalCompleted, TYPING_SPEED, LINE_DELAY]);

    const features = [
        { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast", detail: "Zero-config builds" },
        { icon: <Code className="w-5 h-5" />, text: "Full-Stack Ready", detail: "API routes included" },
        { icon: <Cpu className="w-5 h-5" />, text: "Edge Optimized", detail: "Global deployment" },
        { icon: <Rocket className="w-5 h-5" />, text: "Scalable", detail: "Auto-scaling support" }
    ];

    // Enhanced server rack configuration with cool colors
    const serverRacks = [
        { id: 1, servers: 8, color: '#00d4ff', intensity: 0.8, delay: 0, name: 'US-EAST-1' },
        { id: 2, servers: 8, color: '#8b5cf6', intensity: 0.6, delay: 0.3, name: 'EU-WEST-1' }
    ];

    // System stats for summary
    const systemStats = {
        totalServers: 16,
        activeInstances: 247,
        avgResponseTime: '12ms',
        uptime: '99.99%',
        dataTransfer: '2.4TB',
        globalUsers: '150K+'
    };

    const currentTech = supportedTechs[currentBadgeIndex];

    // Cool color scheme for CPU usage
    const getCoolUsageColor = (usage: number) => {
        if (usage > 75) return { bg: 'linear-gradient(to right, #7c3aed, #5b21b6)', color: '#a855f7' }; // Purple
        if (usage > 50) return { bg: 'linear-gradient(to right, #0ea5e9, #0284c7)', color: '#38bdf8' }; // Blue
        return { bg: 'linear-gradient(to right, #06b6d4, #0891b2)', color: '#22d3ee' }; // Cyan
    };

    return (
        <div className="relative bg-black p-20">
            <div 
                ref={containerRef}
                className="relative min-h-screen max-h-screen lg:max-h-none overflow-hidden flex items-center justify-center pt-8 sm:pt-12 lg:pt-0"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    {/* Floating orbs */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full opacity-20 animate-float"
                            style={{
                                width: `${120 + i * 40}px`,
                                height: `${120 + i * 40}px`,
                                background: `radial-gradient(circle, ${['#00ffff', '#ff0080', '#8000ff'][i % 3]} 0%, transparent 70%)`,
                                left: `${10 + i * 15}%`,
                                top: `${5 + i * 12}%`,
                                animationDelay: `${i * 1.2}s`,
                                transform: `translate(${(mousePosition.x - 0.5) * (30 + i * 10)}px, ${(mousePosition.y - 0.5) * (20 + i * 8)}px)`
                            }}
                        />
                    ))}

                    {/* Fixed Grid pattern - covers everything including margins */}
                    <div 
                        className="fixed inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(#00ffff 1px, transparent 1px),
                                linear-gradient(90deg, #00ffff 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            backgroundPosition: '0 0, 0 0',
                            left: '-50px',
                            right: '-50px',
                            top: '-50px',
                            bottom: '-50px'
                        }}
                    />

                    {/* Pulsing lines */}
                    <div className="absolute inset-0 opacity-10">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-line"
                                style={{
                                    top: `${20 + i * 20}%`,
                                    left: '0',
                                    right: '0',
                                    animationDelay: `${i * 0.8}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Main content with improved responsive padding */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center w-full py-8 lg:py-16">
                    {/* Left content */}
                    <div className="space-y-6 lg:space-y-8 max-w-2xl">
                        {/* Animated Badge */}
                        <div className={`relative inline-flex items-center gap-3 px-4 py-2 rounded-full border ${currentTech.borderColor} ${currentTech.bgColor} backdrop-blur-sm overflow-hidden transition-all duration-500`}>
                            <div 
                                className="flex items-center gap-3 transition-all duration-500 ease-in-out"
                                key={currentBadgeIndex}
                            >
                                <div className={`animate-badge-enter ${currentTech.iconColor}`}>
                                    {currentTech.icon}
                                </div>
                                <span className={`text-sm font-medium ${currentTech.textColor} animate-badge-enter`}>
                                    {currentTech.name} Ready
                                </span>
                                <div className={`w-2 h-2 rounded-full animate-pulse ${
                                    currentTech.iconColor === 'text-white' ? 'bg-white' :
                                    currentTech.iconColor === 'text-orange-400' ? 'bg-orange-400' :
                                    currentTech.iconColor === 'text-red-400' ? 'bg-red-400' :
                                    currentTech.iconColor === 'text-blue-400' ? 'bg-blue-400' :
                                    currentTech.iconColor === 'text-green-400' ? 'bg-green-400' :
                                    currentTech.iconColor === 'text-red-500' ? 'bg-red-500' :
                                    currentTech.iconColor === 'text-yellow-400' ? 'bg-yellow-400' :
                                    currentTech.iconColor === 'text-green-500' ? 'bg-green-500' :
                                    'bg-cyan-400'
                                }`} />
                            </div>
                        </div>

                        {/* Main heading with simple typewriter flip word */}
                        <div className="space-y-4 lg:space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none">
                                <span className="text-white">
                                    {flipWordText}
                                    <span className="animate-pulse">|</span>
                                </span>
                                <span className="block text-blue-500 mt-2">
                                    Fast
                                </span>
                                <span className="block text-white mt-2">
                                    Applications
                                </span>
                            </h1>
                            
                            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed">
                                Deploy your cloud native applications without the hassle.
                                <span className="text-cyan-300 font-medium"> Zero configuration required</span>, 
                                maximum performance.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group p-4 lg:p-5 rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer"
                                    style={{
                                        animationDelay: `${index * 0.2}s`
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                            {feature.icon}
                                        </div>
                                        <span className="font-semibold text-white text-sm lg:text-base">{feature.text}</span>
                                    </div>
                                    <p className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {feature.detail}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                            <button className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                                <span className="flex items-center justify-center gap-2">
                                    Get Started
                                    <Rocket className="w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            
                            <button className="px-6 lg:px-8 py-3 lg:py-4 border border-gray-700 text-white rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                                Documentation →
                            </button>
                        </div>
                    </div>

                    {/* Right side - Terminal & Server Visualization */}
                    <div className="space-y-6 lg:space-y-8 max-w-xl mx-auto lg:mx-0">
                        {/* Terminal with Progress Bar */}
                        <div 
                            className="relative p-4 sm:p-6 lg:p-8 rounded-2xl border border-gray-800 bg-gray-900/30 backdrop-blur-xl shadow-2xl w-full max-w-md mx-auto lg:mx-0 overflow-hidden"
                        >
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                                </div>
                                <span className="ml-4 text-sm text-gray-400 font-mono">terminal</span>
                            </div>

                            {/* Terminal content */}
                            <div className="font-mono text-xs sm:text-sm space-y-1 min-h-[100px] lg:min-h-[120px] overflow-hidden">
                                <pre className="text-cyan-300 whitespace-pre-wrap break-words">
                                    {codeText}
                                    <span className="animate-pulse text-white">|</span>
                                </pre>
                            </div>

                            {/* **UPDATED: Progress Bar - now tracks entire cycle** */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
                                <div 
                                    className="h-full transition-all duration-75 ease-linear relative overflow-hidden"
                                    style={{ 
                                        width: `${progressPercent}%`,
                                        backgroundColor: currentTech.progressColor,
                                        boxShadow: `0 0 8px ${currentTech.progressColor}40`
                                    }}
                                >
                                    {/* Animated shine effect */}
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{
                                            animation: cycleStartTime ? 'shimmer 2s ease-in-out infinite' : 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Server Racks with Cool Colors */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-md mx-auto lg:mx-0">
                            {serverRacks.map((rack, rackIndex) => (
                                <div key={rack.id} className="relative">
                                    <div 
                                        className="bg-gray-900/40 border border-gray-700 rounded-xl p-3 sm:p-4 lg:p-5 backdrop-blur-sm"
                                        style={{
                                            animation: `glow-${rack.id} 3s infinite ease-in-out`,
                                            animationDelay: `${rack.delay}s`
                                        }}
                                    >
                                        {/* Rack header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <span className="text-xs text-gray-400 font-mono block">{rack.name}</span>
                                                <span className="text-xs text-gray-500 font-mono">RACK-{rack.id}</span>
                                            </div>
                                            <div 
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: rack.color, boxShadow: `0 0 10px ${rack.color}` }}
                                            />
                                        </div>

                                        {/* Server slots with cool CPU colors */}
                                        <div className="space-y-2">
                                            {Array.from({ length: rack.servers }).map((_, serverIndex) => {
                                                const cpuUsage = cpuUsages[rackIndex]?.[serverIndex] || 0;
                                                const coolColors = getCoolUsageColor(cpuUsage);
                                                
                                                return (
                                                    <div
                                                        key={serverIndex}
                                                        className="flex items-center gap-2 p-2 rounded bg-gray-800/50 border border-gray-700"
                                                        style={{
                                                            animationDelay: `${serverIndex * 0.1 + rack.delay}s`
                                                        }}
                                                    >
                                                        <div 
                                                            className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                                                            style={{ 
                                                                backgroundColor: coolColors.color,
                                                                opacity: rack.intensity,
                                                                boxShadow: `0 0 6px ${coolColors.color}`
                                                            }}
                                                        />
                                                        <div className="flex-1 h-1.5 bg-gray-700 rounded overflow-hidden min-w-0 relative">
                                                            <div 
                                                                className="h-full transition-all duration-1000 ease-out"
                                                                style={{ 
                                                                    width: `${cpuUsage}%`,
                                                                    background: coolColors.bg
                                                                }}
                                                            />
                                                        </div>
                                                        <span 
                                                            className="text-xs font-mono flex-shrink-0 w-8 text-right"
                                                            style={{ color: coolColors.color }}
                                                        >
                                                            {cpuUsage}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* System Usage Summary */}
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16 xl:py-20">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                            Real-time System Overview
                        </h2>
                        <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
                            Monitor your global infrastructure performance and resource utilization across all regions
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <Server className="w-4 lg:w-5 h-4 lg:h-5 text-cyan-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Total Servers</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.totalServers}</div>
                            <div className="text-xs text-green-400 mt-1">All Active</div>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <Activity className="w-4 lg:w-5 h-4 lg:h-5 text-purple-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Running Instances</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.activeInstances}</div>
                            <div className="text-xs text-green-400 mt-1">+12 today</div>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Response Time</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.avgResponseTime}</div>
                            <div className="text-xs text-green-400 mt-1">Avg Global</div>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <Wifi className="w-4 lg:w-5 h-4 lg:h-5 text-green-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Uptime</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.uptime}</div>
                            <div className="text-xs text-green-400 mt-1">30 days</div>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <HardDrive className="w-4 lg:w-5 h-4 lg:h-5 text-blue-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Data Transfer</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.dataTransfer}</div>
                            <div className="text-xs text-cyan-400 mt-1">This month</div>
                        </div>

                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <Rocket className="w-4 lg:w-5 h-4 lg:h-5 text-pink-400" />
                                <span className="text-xs lg:text-sm text-gray-400 font-medium">Global Users</span>
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-white">{systemStats.globalUsers}</div>
                            <div className="text-xs text-green-400 mt-1">+5.2% growth</div>
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
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                
                @keyframes glow-1 {
                    0%, 100% { box-shadow: 0 0 20px #00d4ff20; }
                    50% { box-shadow: 0 0 40px #00d4ff40; }
                }
                
                @keyframes glow-2 {
                    0%, 100% { box-shadow: 0 0 20px #8b5cf620; }
                    50% { box-shadow: 0 0 40px #8b5cf640; }
                }

                @keyframes badge-enter {
                    0% { opacity: 0; transform: translateY(-10px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-pulse-line {
                    animation: pulse-line 2s ease-in-out infinite;
                }

                .animate-badge-enter {
                    animation: badge-enter 0.5s ease-out;
                }

                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default AmoledHero;