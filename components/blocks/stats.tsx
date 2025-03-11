import React from 'react';
import { Shield, Server, Zap, Users } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { 
      icon: <Server className="w-6 h-6" />,
      value: "99.99%", 
      label: "Uptime Guarantee",
      detail: "Globally distributed infrastructure"
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      value: "500M+", 
      label: "Containers Deployed",
      detail: "With minimal resource overhead"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      value: "10k+", 
      label: "Active Users",
      detail: "From startups to enterprises"
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      value: "150+", 
      label: "Countries Served",
      detail: "Global edge deployment network"
    }
  ];

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] 
                    bg-[size:4rem_4rem] opacity-20" />
      
      {/* Glowing accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-cyan-400 text-sm font-medium tracking-wider mb-2 uppercase">
              Platform Metrics
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Global Scale & Reliability
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-sm 
                       hover:border-cyan-900 transition-colors duration-300"
            >
              <div className="p-3 rounded bg-black/40 text-cyan-400 mb-6 w-fit">
                {stat.icon}
              </div>
              
              <div className="font-mono text-3xl text-white mb-3">
                {stat.value}
              </div>
              
              <div className="text-base text-zinc-400 mb-2">
                {stat.label}
              </div>
              
              <div className="text-xs text-zinc-500">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional animated counter effect could be added with useEffect */}
      </div>
    </section>
  );
};

export default StatsSection;