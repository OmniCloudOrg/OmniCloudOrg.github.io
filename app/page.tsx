import React from 'react';
import { Terminal, Cloud, Zap, Shield, Code, Box } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              OmniForge
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Universal Deployment Platform for the Modern Cloud Native Era
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="border border-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cloud className="w-8 h-8 text-cyan-400" />,
                title: "Universal Deployment",
                description: "Deploy anywhere - public cloud, private infrastructure, or hybrid environments."
              },
              {
                icon: <Zap className="w-8 h-8 text-pink-500" />,
                title: "Lightning Fast",
                description: "Optimized build and deployment pipeline for maximum speed and efficiency."
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-500" />,
                title: "Enterprise Security",
                description: "Built-in security features with zero-trust architecture and RBAC."
              },
              {
                icon: <Terminal className="w-8 h-8 text-green-400" />,
                title: "Powerful CLI",
                description: "Intuitive command-line interface for streamlined workflows."
              },
              {
                icon: <Code className="w-8 h-8 text-yellow-400" />,
                title: "GitOps Ready",
                description: "Native support for GitOps workflows and CI/CD integration."
              },
              {
                icon: <Box className="w-8 h-8 text-red-400" />,
                title: "Service Mesh",
                description: "Built-in service mesh for advanced networking and observability."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black to-blue-900/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Deployments?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join the next generation of cloud-native deployment platforms.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
            Start Free Trial
          </button>
        </div>
      </section>


    </div>
  );
}