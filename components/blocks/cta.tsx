import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-black">
        {/* Glowing accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Main content */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 
                          bg-cyan-400/5 text-cyan-400 text-sm mb-8">
              <span className="font-mono">Ready to start</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Deploy Faster. 
              <br />
              <span className="text-cyan-400">Scale Smarter.</span>
            </h2>
            
            <p className="text-lg text-zinc-400 max-w-xl mb-8">
              Join thousands of companies already using OmniCloud to modernize their 
              deployment infrastructure. Get started free, scale as you grow.
            </p>

            {/* Prominent CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="group flex items-center gap-2 px-8 py-4 bg-cyan-400 hover:bg-cyan-500 
                               text-black font-medium transition-colors duration-200">
                Get Started, it's open source!
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                View the Live Demo →
              </a>
            </div>
          </div>

          {/* Right side - Metrics grid */}
          <div className="lg:w-[450px] grid grid-cols-2 gap-6">
            {[
              { metric: "24MB", label: "RAM per Service", highlight: true },
              { metric: "99.9%", label: "System Uptime" },
              { metric: "<30s", label: "Deploy Time" },
              { metric: "100%", label: "Open Source" }
            ].map((item, index) => (
              <div key={index} 
                   className={`p-6 border rounded-sm ${
                     item.highlight 
                     ? 'border-cyan-400/30 bg-cyan-400/5' 
                     : 'border-zinc-800 bg-black/30'
                   }`}>
                <div className={`text-2xl font-mono mb-2 ${
                  item.highlight ? 'text-cyan-400' : 'text-white'
                }`}>
                  {item.metric}
                </div>
                <div className="text-sm text-zinc-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Social proof or additional info */}
        <div className="mt-16 pt-16 border-t border-zinc-800">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm text-zinc-500">
            <p>Trusted by Fortune 500 companies</p>
            <p>Enterprise ready</p>
            <p>24/7 Support available</p>
            <p>SOC 2 Type II Certified</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;