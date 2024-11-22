"use client";
import React from 'react';
import { Activity, Workflow, GitMerge, BarChart, AlertCircle, CheckCircle2 } from 'lucide-react';

const AutonomousOps = () => {
  const features = [
    {
      title: "Self-Healing Infrastructure",
      description: "Automatic detection and resolution of common infrastructure issues without human intervention.",
      icon: <Activity className="w-6 h-6" />,
      metrics: ["99.99% Uptime", "60% Fewer Incidents"]
    },
    {
      title: "Predictive Scaling",
      description: "ML-powered resource allocation that anticipates demand spikes before they occur.",
      icon: <BarChart className="w-6 h-6" />,
      metrics: ["30% Cost Savings", "Zero Downtime"]
    },
    {
      title: "Automated Rollbacks",
      description: "Instant detection of deployment issues with automatic rollback to last known good state.",
      icon: <GitMerge className="w-6 h-6" />,
      metrics: ["< 30s Recovery", "100% Success Rate"]
    }
  ];

  return (
    <section className="py-32 px-4 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Hands-Free Operations
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Set it and forget it. Our autonomous systems handle deployment, scaling, and incident response automatically.
          </p>
        </div>

        {/* Live Status Dashboard Preview */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-gray-800 blur-xl opacity-50" />
          <div className="relative p-6 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">System Status</span>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">Healthy</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Active Deployments</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">24/24</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Incidents</span>
              <AlertCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">0 Active</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-gray-300">Automatic scaling event completed</span>
            </div>
            <span className="text-gray-500">2m ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-gray-300">Performance optimization applied</span>
            </div>
            <span className="text-gray-500">15m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-cyan-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {feature.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="px-3 py-2 bg-gray-800/50 rounded-lg text-sm text-cyan-400">
                    {metric}
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