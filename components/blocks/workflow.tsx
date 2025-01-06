"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Box, Activity, ArrowRight } from 'lucide-react';

const Workflow = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const phases = [
    {
      id: "dev",
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      title: "Develop",
      tech: "CLI + SDKs",
      description: "Write code with real-time environment sync",
      details: [
        "Local development with live reload",
        "Automatic dependency management",
        "Environment parity guaranteed"
      ]
    },
    {
      id: "build",
      icon: <Box className="w-6 h-6 text-cyan-400" />,
      title: "Build",
      tech: "Container Factory",
      description: "Automatic container optimization",
      details: [
        "Smart dependency detection",
        "Multi-stage optimization",
        "Security scanning included"
      ]
    },
    {
      id: "deploy",
      icon: <Activity className="w-6 h-6 text-cyan-400" />,
      title: "Deploy",
      tech: "Universal Runtime",
      description: "Deploy anywhere with 24MB overhead",
      details: [
        "Cloud or bare metal deployment",
        "Automatic scaling built-in",
        "Real-time monitoring"
      ]
    }
  ];

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

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isVisible) {
      interval = setInterval(() => {
        setActivePhase((prev) => (prev + 1) % phases.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] 
                    bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-cyan-400 text-sm font-medium tracking-wider mb-2 uppercase">
              Development Pipeline
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Streamlined Developer Experience
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-12 left-[27%] right-[27%] h-px">
            <div className="relative w-full h-full">
              {[0, 1].map(index => (
                <div
                  key={index}
                  className="absolute top-0 h-full transition-all duration-500 flex items-center"
                  style={{
                    left: `${index * 50}%`,
                    width: '50%',
                    opacity: activePhase > index ? 1 : 0
                  }}
                >
                  <div className="w-full h-px bg-cyan-400/30" />
                  <ArrowRight className="w-4 h-4 text-cyan-400/30 absolute -right-2" />
                </div>
              ))}
            </div>
          </div>

          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className={`relative group ${
                activePhase === index ? 'z-10' : 'z-0'
              }`}
            >
              {/* Card */}
              <div className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm h-full
                            transition-all duration-500 hover:border-cyan-900">
                {/* Progress indicator */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px bg-cyan-400 transition-all duration-500"
                  style={{
                    width: activePhase >= index ? '100%' : '0%',
                    opacity: activePhase >= index ? 0.5 : 0
                  }}
                />

                {/* Content */}
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded bg-black/50">
                      {phase.icon}
                    </div>
                    <span className="text-sm font-mono text-cyan-400/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title and Tech */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-sm font-mono text-cyan-400">
                      {phase.tech}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm mb-4">
                    {phase.description}
                  </p>

                  {/* Details */}
                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {phase.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center text-xs text-zinc-500"
                        >
                          <span className="w-1 h-1 bg-cyan-400/50 rounded-full mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;