"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Code, Box, BarChart, Loader2 } from 'lucide-react';

const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = [
    {
      step: "01",
      title: "Development",
      description: "Start with our powerful CLI tools and SDKs. Develop locally with automatic environment synchronization.",
      icon: <Code className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Build & Test",
      description: "Automated build pipeline with integrated testing and security scanning. Support for all major frameworks.",
      icon: <Box className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Deploy & Monitor",
      description: "One-click deployments with automatic scaling and real-time monitoring. Full observability and logging.",
      icon: <BarChart className="w-8 h-8" />
    }
  ];

  // Start/stop animation based on visibility
  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % (phases.length + 1));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setActiveStep(0); // Reset to initial state when not visible
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
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

  return (
    <section ref={sectionRef} className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Streamlined Workflow
          </span>
        </h2>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Lines */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform -translate-y-1/2 transition-opacity duration-500"
               style={{ opacity: activeStep >= 1 ? 1 : 0 }} />
          <div className="hidden md:block absolute top-24 left-2/3 w-1/3 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform -translate-y-1/2 transition-opacity duration-500"
               style={{ opacity: activeStep >= 2 ? 1 : 0 }} />

          {phases.map((phase, index) => (
            <div key={index} className="relative p-8 rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 overflow-hidden">
              {/* Loading Animation */}
              <div className={`absolute top-2 left-2 transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-0'}`}>
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              </div>

              {/* Completion Indicator */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transition-opacity duration-500 ${activeStep > index ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="text-6xl font-bold text-gray-800 absolute top-4 right-4">
                {phase.step}
              </div>
              <div className="relative z-10">
                <div className="mb-6">{phase.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{phase.title}</h3>
                <p className="text-gray-400">{phase.description}</p>
              </div>

              {/* Completion Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 transition-opacity duration-500 pointer-events-none ${activeStep > index ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;