"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Box, Activity, ArrowRight, Code2, Zap, Server, CheckCircle, Play, Pause, RotateCcw, Monitor, Cpu, Database } from 'lucide-react';

const Workflow = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [progress, setProgress] = useState([0, 0, 0]);
  const [liveMetrics, setLiveMetrics] = useState({
    buildTime: 0,
    deployTime: 0,
    memoryUsage: 24
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      id: "dev",
      icon: <Terminal className="w-8 h-8" />,
      title: "Develop",
      tech: "CLI + SDKs",
      description: "Write code with real-time environment sync",
      color: {
        primary: "#06b6d4", // cyan
        secondary: "#0891b2",
        bg: "bg-cyan-500/5",
        border: "border-cyan-500/20",
        hover: "hover:border-cyan-400/40",
        text: "text-cyan-400",
        glow: "#06b6d4"
      },
      details: [
        "Local development with live reload",
        "Automatic dependency management", 
        "Environment parity guaranteed"
      ],
      metrics: {
        label: "Dev Speed",
        value: "2.3s",
        trend: "+45%",
        icon: <Code2 className="w-4 h-4" />
      },
      liveData: [85, 92, 78, 88, 95, 82, 90, 87]
    },
    {
      id: "build",
      icon: <Box className="w-8 h-8" />,
      title: "Build",
      tech: "Container Factory",
      description: "Automatic container optimization",
      color: {
        primary: "#8b5cf6", // purple
        secondary: "#7c3aed",
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        hover: "hover:border-purple-400/40",
        text: "text-purple-400",
        glow: "#8b5cf6"
      },
      details: [
        "Smart dependency detection",
        "Multi-stage optimization",
        "Security scanning included"
      ],
      metrics: {
        label: "Build Time",
        value: "1.2m",
        trend: "-67%",
        icon: <Cpu className="w-4 h-4" />
      },
      liveData: [45, 52, 38, 61, 44, 55, 48, 53]
    },
    {
      id: "deploy",
      icon: <Activity className="w-8 h-8" />,
      title: "Deploy",
      tech: "Universal Runtime",
      description: "Deploy anywhere with 24MB overhead",
      color: {
        primary: "#10b981", // green
        secondary: "#059669",
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        hover: "hover:border-green-400/40",
        text: "text-green-400",
        glow: "#10b981"
      },
      details: [
        "Cloud or bare metal deployment",
        "Automatic scaling built-in",
        "Real-time monitoring"
      ],
      metrics: {
        label: "Deploy Time",
        value: "24s",
        trend: "-82%",
        icon: <Server className="w-4 h-4" />
      },
      liveData: [24, 28, 22, 26, 23, 25, 21, 27]
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

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Phase cycling with progress animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && !isPaused) {
      interval = setInterval(() => {
        setActivePhase((prev) => (prev + 1) % phases.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isVisible, isPaused, phases.length]);

  // Progress animation
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isVisible) {
      progressInterval = setInterval(() => {
        setProgress(prev => prev.map((p, index) => {
          if (index <= activePhase) {
            return Math.min(p + 2, 100);
          }
          return Math.max(p - 5, 0);
        }));
      }, 50);
    }
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [activePhase, isVisible]);

  // Live metrics simulation
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setLiveMetrics(prev => ({
        buildTime: Math.max(0.8, prev.buildTime + (Math.random() - 0.5) * 0.2),
        deployTime: Math.max(20, prev.deployTime + (Math.random() - 0.5) * 4),
        memoryUsage: Math.max(20, Math.min(30, prev.memoryUsage + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(metricsInterval);
  }, []);

  const PhaseCard = ({ phase, index, isActive }: { phase: any; index: number; isActive: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isActive || isHovered) {
        interval = setInterval(() => {
          setAnimationProgress(prev => Math.min(prev + 3, 100));
        }, 30);
      } else {
        setAnimationProgress(0);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isActive, isHovered]);

    return (
      <div
        className={`group relative transition-all duration-500 ${
          isActive ? 'z-20 scale-105' : 'z-10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced Card */}
        <div 
          className={`relative p-8 bg-gray-900/30 border ${phase.color.border} ${phase.color.hover} 
                     rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl h-full
                     ${isActive ? 'border-opacity-100 scale-[1.02]' : 'border-opacity-50'}`}
          style={{
            boxShadow: isActive || isHovered ? `0 20px 40px ${phase.color.primary}20` : 'none'
          }}
        >
          {/* Animated background gradient */}
          <div 
            className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
              isActive || isHovered ? 'opacity-100' : ''
            }`}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${phase.color.primary}08 0%, transparent 70%)`
            }}
          />

          {/* Top accent line */}
          <div 
            className="absolute inset-x-0 top-0 h-px transition-all duration-500"
            style={{
              background: isActive || isHovered 
                ? `linear-gradient(to right, transparent, ${phase.color.primary}, transparent)`
                : `linear-gradient(to right, transparent, ${phase.color.primary}30, transparent)`
            }}
          />

          {/* Status indicators */}
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? 'animate-pulse' : ''
              }`}
              style={{ 
                backgroundColor: phase.color.primary,
                boxShadow: `0 0 10px ${phase.color.primary}`
              }}
            />
            <span className="text-xs text-gray-500 font-mono">
              {isActive ? 'ACTIVE' : 'READY'}
            </span>
          </div>

          {/* Phase number */}
          <div className="absolute top-6 left-6">
            <div 
              className={`w-8 h-8 rounded-lg ${phase.color.bg} border ${phase.color.border} 
                         flex items-center justify-center font-bold text-sm ${phase.color.text}
                         transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
              style={{
                boxShadow: isActive ? `0 0 20px ${phase.color.primary}30` : 'none'
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          <div className="relative pt-8">
            {/* Enhanced icon */}
            <div 
              className={`p-4 rounded-xl ${phase.color.bg} transition-all duration-300 border border-gray-800 w-fit mb-6 ${
                isActive || isHovered ? 'scale-110' : ''
              }`}
              style={{
                boxShadow: isActive || isHovered ? `0 0 25px ${phase.color.primary}30` : 'none'
              }}
            >
              <div className={phase.color.text}>
                {phase.icon}
              </div>
            </div>

            {/* Title and Tech */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {phase.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-mono ${phase.color.text} font-semibold`}>
                  {phase.tech}
                </span>
                <div className={`px-2 py-1 rounded-full ${phase.color.bg} border ${phase.color.border}`}>
                  <span className={`text-xs font-medium ${phase.color.text}`}>
                    OPTIMIZED
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {phase.description}
              </p>
            </div>

            {/* Performance metrics */}
            <div className="mb-6 p-4 bg-black/40 border border-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={phase.color.text}>
                    {phase.metrics.icon}
                  </div>
                  <span className="text-sm text-gray-400">{phase.metrics.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${phase.color.text} font-mono`}>
                    {phase.metrics.value}
                  </span>
                  <span className="text-xs text-green-400 font-medium">
                    {phase.metrics.trend}
                  </span>
                </div>
              </div>
              
              {/* Mini performance chart */}
              <div className="flex items-end gap-1 h-6">
                {phase.liveData.map((value: any, _i: any, arr: any[]) => (
                  <div
                    key={_i}
                    className="flex-1 rounded-sm transition-all duration-500"
                    style={{
                      height: `${value}%`,
                      backgroundColor: phase.color.primary,
                      opacity: isActive || isHovered ? 0.8 - (typeof _i === 'number' ? _i * 0.05 : 0) : 0.4,
                      minHeight: '2px'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Details */}
            <div className="space-y-3 mb-6">
              {phase.details.map((detail: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, i: React.Key | null | undefined) => (
                <div
                  key={i}
                  className="flex items-center text-sm text-gray-300 group/item"
                >
                  <div 
                    className="w-2 h-2 rounded-full mr-3 transition-all duration-300"
                    style={{ 
                      backgroundColor: phase.color.primary,
                      opacity: isActive ? 0.8 : 0.4
                    }}
                  />
                  <span className="group-hover/item:text-white transition-colors">
                    {detail}
                  </span>
                  <CheckCircle className={`w-3 h-3 ml-auto opacity-0 transition-opacity ${
                    isActive ? 'opacity-100' : ''
                  } ${phase.color.text}`} />
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">Progress</span>
              </div>
              <span className="text-xs text-gray-400">{Math.round(progress[index])}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${progress[index]}%`,
                  backgroundColor: phase.color.primary,
                  boxShadow: `0 0 10px ${phase.color.primary}60`
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
      ref={sectionRef} 
      className="relative py-24 px-4 bg-black overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="relative"
      >

          {/* Flowchart background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(#06b6d4 1px, transparent 1px),
                  linear-gradient(90deg, #06b6d4 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 0 0'
              }}
            />
          </div>
       
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            {/* Pipeline badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-full backdrop-blur-sm mb-8">
              <Database className="w-5 h-5" />
              <span className="font-mono font-semibold tracking-wider">
                DEVELOPMENT PIPELINE
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Streamlined
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
                Developer Experience
              </span>
            </h2>
            
            {/* Animated accent line */}
            <div className="relative h-px w-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
            </div>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              From local development to global deployment in minutes. 
              <span className="text-cyan-300 font-semibold">Zero configuration</span>, 
              <span className="text-purple-300 font-semibold"> maximum efficiency</span>.
            </p>

            {/* Pipeline controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded-lg backdrop-blur-sm transition-all"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                onClick={() => {
                  setActivePhase(0);
                  setProgress([0, 0, 0]);
                }}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded-lg backdrop-blur-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-sm">Reset</span>
              </button>
            </div>
          </div>

          {/* Enhanced Workflow Steps */}
          <div className="relative">
            {/* Flowchart connectors */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px pointer-events-none transform -translate-y-1/2">
              <div className="relative w-full h-full max-w-6xl mx-auto">
                {/* Horizontal flow line */}
                <div className="absolute inset-0 flex items-center justify-between px-8">
                  <div className="w-1/3 h-px bg-gradient-to-r from-cyan-500/30 via-cyan-500/60 to-cyan-500/30"></div>
                  <div className="w-1/3 h-px bg-gradient-to-r from-purple-500/30 via-purple-500/60 to-purple-500/30"></div>
                </div>
                
                {/* Flow arrows */}
                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '33.33%' }}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '66.66%' }}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Phase cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {phases.map((phase, index) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  index={index}
                  isActive={activePhase === index}
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
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-line {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-pulse-line {
          animation: pulse-line 5s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Workflow;