import React from 'react';
import { Activity, GitMerge, BarChart, AlertCircle, CheckCircle2, Terminal, Server } from 'lucide-react';

const AutonomousOps = () => {
  const metrics = [
    {
      label: "System Health",
      value: "99.99%",
      status: "optimal",
      icon: <Server className="w-4 h-4" />,
      trend: "+0.01%"
    },
    {
      label: "Active Services",
      value: "1,247",
      status: "normal",
      icon: <Terminal className="w-4 h-4" />,
      trend: "+23"
    },
    {
      label: "Memory Usage",
      value: "24MB",
      status: "optimal",
      icon: <Activity className="w-4 h-4" />,
      trend: "per instance"
    }
  ];

  const recentEvents = [
    {
      message: "Predictive scaling activated",
      timestamp: "2m ago",
      type: "success"
    },
    {
      message: "Performance optimization applied",
      timestamp: "15m ago",
      type: "success"
    },
    {
      message: "Automatic dependency update",
      timestamp: "1h ago",
      type: "info"
    }
  ];

  const features = [
    {
      title: "Self-Healing",
      description: "Autonomous infrastructure recovery with zero human intervention",
      icon: <Activity className="w-5 h-5" />,
      stats: [
        { label: "Recovery Time", value: "<30s" },
        { label: "Success Rate", value: "99.99%" }
      ]
    },
    {
      title: "Smart Scaling",
      description: "ML-powered predictive resource allocation and optimization",
      icon: <BarChart className="w-5 h-5" />,
      stats: [
        { label: "Cost Reduced", value: "−30%" },
        { label: "Response Time", value: "−65%" }
      ]
    },
    {
      title: "Safe Deploys",
      description: "Instant rollback capability with automatic issue detection",
      icon: <GitMerge className="w-5 h-5" />,
      stats: [
        { label: "Deploy Time", value: "89s" },
        { label: "Success Rate", value: "100%" }
      ]
    }
  ];

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-cyan-400 text-sm font-medium tracking-wider mb-2 uppercase">
              Autonomous Operations
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Zero-Touch Infrastructure
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        <div className="mb-16 p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="p-4 bg-black/40 border border-zinc-800 rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-zinc-900">
                      {metric.icon}
                    </div>
                    <span className="text-sm text-zinc-400">{metric.label}</span>
                  </div>
                  <span className={`text-xs ${
                    metric.status === 'optimal' ? 'text-cyan-400' : 'text-zinc-400'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-mono text-white">{metric.value}</span>
                  <span className="text-xs text-zinc-500">{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Events Log */}
          <div className="space-y-2">
            {recentEvents.map((event, index) => (
              <div key={index} 
                   className="flex items-center justify-between p-3 bg-black/40 border border-zinc-900 rounded-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-zinc-300">{event.message}</span>
                </div>
                <span className="text-xs text-zinc-500">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm
                                      hover:border-cyan-900 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-black/40 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white">{feature.title}</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6">{feature.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {feature.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="p-2 bg-black/40 border border-zinc-900 rounded-sm">
                    <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
                    <div className="text-sm font-mono text-cyan-400">{stat.value}</div>
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

export default AutonomousOps;