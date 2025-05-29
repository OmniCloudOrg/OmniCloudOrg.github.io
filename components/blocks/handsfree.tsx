"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Activity, GitMerge, BarChart, AlertCircle, CheckCircle2, Terminal, Server, Cpu, Shield, Zap, TrendingUp, Eye, Brain, Gauge } from 'lucide-react';

const AutonomousOps = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [liveMetrics, setLiveMetrics] = useState({
    health: 99.99,
    services: 1247,
    memory: 24,
    cpuUsage: 0,
    networkLatency: 0,
    activeOps: 0
  });
  const [recentEvents, setRecentEvents] = useState([
    { message: "Predictive scaling activated", timestamp: "2m ago", type: "success", severity: "high" },
    { message: "Performance optimization applied", timestamp: "15m ago", type: "success", severity: "medium" },
    { message: "Automatic dependency update", timestamp: "1h ago", type: "info", severity: "low" }
  ]);
  const [autonomousActions, setAutonomousActions] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    {
      label: "System Health",
      value: `${liveMetrics.health.toFixed(2)}%`,
      status: "optimal",
      icon: <Server className="w-5 h-5" />,
      trend: "+0.01%",
      color: {
        primary: "#10b981", // green
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        text: "text-green-400",
        glow: "#10b981"
      },
      liveData: [99.98, 99.99, 99.97, 99.99, 99.98, 99.99, 99.99, 99.98]
    },
    {
      label: "Active Services",
      value: liveMetrics.services.toLocaleString(),
      status: "normal",
      icon: <Terminal className="w-5 h-5" />,
      trend: `+${Math.floor(Math.random() * 50) + 10}`,
      color: {
        primary: "#06b6d4", // cyan
        bg: "bg-cyan-500/5",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "#06b6d4"
      },
      liveData: [1220, 1235, 1242, 1238, 1245, 1247, 1250, 1248]
    },
    {
      label: "Memory Usage",
      value: `${liveMetrics.memory}MB`,
      status: "optimal",
      icon: <Activity className="w-5 h-5" />,
      trend: "per instance",
      color: {
        primary: "#8b5cf6", // purple
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        text: "text-purple-400",
        glow: "#8b5cf6"
      },
      liveData: [22, 24, 23, 25, 24, 23, 24, 25]
    }
  ];

  const features = [
    {
      title: "Self-Healing",
      description: "Autonomous infrastructure recovery with zero human intervention",
      icon: <Shield className="w-6 h-6" />,
      color: {
        primary: "#ef4444", // red
        bg: "bg-red-500/5",
        border: "border-red-500/20",
        text: "text-red-400",
        glow: "#ef4444"
      },
      stats: [
        { label: "Recovery Time", value: "<30s", icon: <Zap className="w-3 h-3" /> },
        { label: "Success Rate", value: "99.99%", icon: <CheckCircle2 className="w-3 h-3" /> }
      ],
      autonomousLevel: 95
    },
    {
      title: "Smart Scaling",
      description: "ML-powered predictive resource allocation and optimization",
      icon: <Brain className="w-6 h-6" />,
      color: {
        primary: "#f59e0b", // amber
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
        text: "text-amber-400",
        glow: "#f59e0b"
      },
      stats: [
        { label: "Cost Reduced", value: "−30%", icon: <TrendingUp className="w-3 h-3" /> },
        { label: "Response Time", value: "−65%", icon: <Gauge className="w-3 h-3" /> }
      ],
      autonomousLevel: 88
    },
    {
      title: "Safe Deploys",
      description: "Instant rollback capability with automatic issue detection",
      icon: <GitMerge className="w-6 h-6" />,
      color: {
        primary: "#06b6d4", // cyan
        bg: "bg-cyan-500/5",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "#06b6d4"
      },
      stats: [
        { label: "Deploy Time", value: "89s", icon: <Activity className="w-3 h-3" /> },
        { label: "Success Rate", value: "100%", icon: <CheckCircle2 className="w-3 h-3" /> }
      ],
      autonomousLevel: 92
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

  const MetricCard = ({ metric, index }: { metric: any; index: number }) => {
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

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'optimal': return 'text-green-400';
        case 'normal': return 'text-cyan-400';
        case 'warning': return 'text-yellow-400';
        default: return 'text-gray-400';
      }
    };

    return (
      <div 
        className={`group relative p-6 bg-gray-900/30 border ${metric.color.border} hover:border-opacity-60 
                   rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl
                   transform hover:scale-[1.02] hover:-translate-y-1`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 0.1}s`,
          boxShadow: isHovered ? `0 15px 30px ${metric.color.primary}20` : 'none'
        }}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${metric.color.primary}08 0%, transparent 70%)`
          }}
        />

        {/* Top accent */}
        <div 
          className="absolute inset-x-0 top-0 h-px transition-all duration-500"
          style={{
            background: isHovered 
              ? `linear-gradient(to right, transparent, ${metric.color.primary}, transparent)`
              : `linear-gradient(to right, transparent, ${metric.color.primary}30, transparent)`
          }}
        />

        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: metric.color.primary,
              boxShadow: `0 0 8px ${metric.color.primary}`
            }}
          />
          <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
            {metric.status.toUpperCase()}
          </span>
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div 
              className={`p-3 rounded-xl ${metric.color.bg} border border-gray-800 transition-all duration-300 group-hover:scale-110`}
              style={{
                boxShadow: isHovered ? `0 0 20px ${metric.color.primary}30` : 'none'
              }}
            >
              <div className={metric.color.text}>
                {metric.icon}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{metric.label}</h3>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">
                  {metric.trend}
                </span>
              </div>
            </div>
          </div>

          {/* Value display */}
          <div className="mb-4">
            <div className="text-3xl font-black text-white font-mono mb-2">
              {metric.value}
            </div>
            
            {/* Mini chart */}
            <div className="flex items-end gap-1 h-8">
              {metric.liveData.map((value: number, i: number) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-500"
                  style={{
                    height: `${((value - Math.min(...metric.liveData)) / (Math.max(...metric.liveData) - Math.min(...metric.liveData))) * 100}%`,
                    backgroundColor: metric.color.primary,
                    opacity: isHovered ? 0.8 - (i * 0.05) : 0.5,
                    minHeight: '3px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">System Response</span>
            <span className="text-xs text-gray-400">{Math.round(animationProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out rounded-full"
              style={{ 
                width: `${animationProgress}%`,
                backgroundColor: metric.color.primary,
                boxShadow: `0 0 8px ${metric.color.primary}60`
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`group relative p-8 bg-gray-900/30 border ${feature.color.border} hover:border-opacity-60 
                   rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl
                   transform hover:scale-[1.02] hover:-translate-y-1`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 0.1}s`,
          boxShadow: isHovered ? `0 20px 40px ${feature.color.primary}20` : 'none'
        }}
      >
        {/* Background effects */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${feature.color.primary}08 0%, transparent 70%)`
          }}
        />

        <div 
          className="absolute inset-x-0 top-0 h-px transition-all duration-500"
          style={{
            background: isHovered 
              ? `linear-gradient(to right, transparent, ${feature.color.primary}, transparent)`
              : `linear-gradient(to right, transparent, ${feature.color.primary}30, transparent)`
          }}
        />

        {/* Autonomy level indicator */}
        <div className="absolute top-6 right-6">
          <div className={`px-3 py-1 rounded-full ${feature.color.bg} border ${feature.color.border}`}>
            <span className={`text-xs font-bold ${feature.color.text}`}>
              {feature.autonomousLevel}% AUTO
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div 
              className={`p-4 rounded-xl ${feature.color.bg} border border-gray-800 transition-all duration-300 group-hover:scale-110`}
              style={{
                boxShadow: isHovered ? `0 0 25px ${feature.color.primary}30` : 'none'
              }}
            >
              <div className={feature.color.text}>
                {feature.icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">
                  AUTONOMOUS MODE
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {feature.stats.map((stat: { icon: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, statIndex: React.Key | null | undefined) => (
              <div key={statIndex} className="p-4 bg-black/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className={feature.color.text}>
                    {stat.icon}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                </div>
                <div className={`text-lg font-bold ${feature.color.text} font-mono`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Autonomy progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Autonomy Level</span>
            <span className="text-xs text-gray-400">{feature.autonomousLevel}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out rounded-full"
              style={{ 
                width: `${feature.autonomousLevel}%`,
                backgroundColor: feature.color.primary,
                boxShadow: `0 0 10px ${feature.color.primary}60`
              }}
            />
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

        {/* Data flow lines */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse-line"
              style={{
                top: `${15 + i * 20}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 1.6}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          {/* Autonomous badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/5 border border-green-500/20 text-green-400 rounded-full backdrop-blur-sm mb-8">
            <Brain className="w-5 h-5" />
            <span className="font-mono font-semibold tracking-wider">
              AUTONOMOUS OPERATIONS
            </span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Zero-Touch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400">
              Infrastructure
            </span>
          </h2>
          
          {/* Animated accent line */}
          <div className="relative h-px w-64 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
          </div>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Self-managing systems that predict, prevent, and resolve issues before they impact your applications. 
            <span className="text-green-300 font-semibold">AI-powered automation</span> at enterprise scale.
          </p>

          {/* Live autonomous activity counter */}
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/30 border border-gray-800 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">Autonomous actions today:</span>
            </div>
            <span className="text-xl font-bold text-green-400 font-mono">
              {autonomousActions.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Enhanced Live Metrics Dashboard */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Live System Dashboard</h3>
            <p className="text-gray-400">Real-time autonomous system monitoring and control</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} />
            ))}
          </div>

          {/* Enhanced Recent Events Log */}
          <div className="p-8 bg-gray-900/20 border border-gray-800 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-bold text-white">Autonomous Activity Feed</h4>
              </div>
            </div>
            
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="group flex items-center justify-between p-4 bg-black/40 border border-gray-800 hover:border-gray-700 rounded-xl transition-all duration-300 hover:bg-gray-800/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      event.type === 'success' ? 'bg-green-500/10 text-green-400' : 
                      event.type === 'info' ? 'bg-cyan-500/10 text-cyan-400' : 
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                        {event.message}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                          event.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-gray-500/10 text-gray-400'
                        }`}>
                          {event.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{event.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Autonomous Capabilities</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Advanced AI-driven operations that handle complex scenarios without human intervention
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
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

export default AutonomousOps;