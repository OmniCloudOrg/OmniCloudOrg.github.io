"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Server, 
  Cloud, 
  Terminal, 
  Settings, 
  Box,
  RefreshCw,
  Zap,
  Database
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: "Multi-Cloud Deployment",
    description: "Deploy seamlessly across AWS, Google Cloud, Azure, and private cloud infrastructure with our unified control plane."
  },
  {
    icon: Terminal,
    title: "GitOps Workflows",
    description: "Implement robust GitOps practices with automated deployments, rollbacks, and version control integration."
  },
  {
    icon: Settings,
    title: "Advanced Configuration",
    description: "Flexible configuration management with support for dynamic environment variables and secrets handling."
  },
  {
    icon: Box,
    title: "Container Orchestration",
    description: "Built-in container orchestration with automatic scaling, load balancing, and service discovery."
  },
  {
    icon: RefreshCw,
    title: "Zero-Downtime Updates",
    description: "Perform seamless updates and rollbacks with zero downtime using our advanced deployment strategies."
  },
  {
    icon: Database,
    title: "State Management",
    description: "Integrated state management for stateful applications with automated backup and recovery."
  }
];

interface FloatingElement {
  top: string;
  left: string;
  width: string;
  height: string;
  background: string;
  transform: string;
  animation: string;
  dx: number;
  dy: number;
}

const generateFloatingElements = (count: number): FloatingElement[] => {
  const elements: FloatingElement[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));
  const cellSize = 100 / gridSize;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const baseTop = (row * cellSize) + (cellSize / 2);
    const baseLeft = (col * cellSize) + (cellSize / 2);
    const size = 30 + ((i % 3) * 15); // Smaller elements
    const angleRad = Math.random() * Math.PI * 2;
    const speed = 0.2 + Math.random() * 0.3; // Slower movement
    const dx = Math.cos(angleRad) * speed;
    const dy = Math.sin(angleRad) * speed;

    elements.push({
      top: `${baseTop}%`,
      left: `${baseLeft}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${
        ['rgba(6,182,212,0.15)', 'rgba(167,139,250,0.15)', 'rgba(99,102,241,0.15)'][
          i % 3
        ]
      } 0%, transparent 70%)`,
      transform: `translate(-50%, -50%)`,
      animation: `floatFeature${i} ${25 + (i % 10)}s infinite linear`,
      dx,
      dy
    });
  }
  return elements;
};

const FeaturesPage: React.FC = () => {
  const [floatingElements] = useState(() => generateFloatingElements(12));
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    setIsFirefox(navigator.userAgent.toLowerCase().includes('firefox'));
  }, []);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <style>
          {`
            @supports not (-moz-appearance: none) {
              .floating-element {
                backdrop-filter: blur(8px);
              }
            }
          `}
          {floatingElements.map((element, i) => `
            @keyframes floatFeature${i} {
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
            className="absolute rounded-full opacity-40 floating-element"
            style={{
              top: element.top,
              left: element.left,
              width: element.width,
              height: element.height,
              background: isFirefox 
                ? element.background.replace(/[0-9]\.15/g, '0.1')
                : element.background,
              transform: element.transform,
              animation: element.animation
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-transparent bg-clip-text">
              Platform Features
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to build, deploy, and scale your applications with enterprise-grade reliability and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: isFirefox ? 'none' : 'blur(12px)'
              }}
            >
              <div className="mb-4">
                <feature.icon className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
              <div 
                className="absolute inset-0 border border-gray-800 rounded-lg group-hover:border-cyan-900/50 transition-colors"
                style={{
                  backdropFilter: isFirefox ? 'none' : 'blur(12px)'
                }}
              />
            </div>
          ))}
        </div>

        <div 
          className="mt-16 p-8 rounded-lg text-center mx-auto max-w-2xl"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: isFirefox ? 'none' : 'blur(12px)'
          }}
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            Ready to Get Started?
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            Join thousands of developers and teams who trust OmniForge for their deployment needs.
          </p>
          <button className="bg-cyan-500 px-6 py-2 rounded-md font-medium hover:bg-cyan-600 transition-colors text-black text-sm">
            Start Building Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;