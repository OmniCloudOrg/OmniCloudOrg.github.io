import React from 'react';
import { Shield, Zap, Globe, Cpu, Lock, Layers } from 'lucide-react';

const WhyUsSection = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-cyan-900 transition-colors duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded bg-black/40 text-cyan-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <p className="text-sm text-zinc-400">{description}</p>
  </div>
);

const WhyUs = () => {
  const differentiators = [
    {
      icon: Zap,
      title: "Radical Efficiency",
      description: "Our platform is engineered for minimal resource consumption, delivering unprecedented performance with just 24MB RAM overhead per microservice. We don't just optimize—we redefine infrastructure efficiency."
    },
    {
      icon: Globe,
      title: "Universal Adaptability",
      description: "Break free from infrastructure constraints. OmniCloud seamlessly spans cloud providers, virtual machines, and bare metal, giving you the flexibility to design your infrastructure without technological boundaries."
    },
    {
      icon: Shield,
      title: "Proactive Resilience",
      description: "Move beyond reactive monitoring. Our autonomous systems continuously analyze and self-heal, ensuring your infrastructure remains robust with minimal human intervention and near-zero downtime."
    },
    {
      icon: Lock,
      title: "Transparent Security",
      description: "Security isn't an afterthought—it's our foundation. With granular control and end-to-end encryption, we provide a security model that's both comprehensive and comprehensible."
    },
    {
      icon: Cpu,
      title: "Developer-First Design",
      description: "We've built a platform that speaks the language of modern developers. From intuitive interfaces to powerful CLI tools, OmniCloud accelerates your workflow without adding complexity."
    },
    {
      icon: Layers,
      title: "Future-Proof Architecture",
      description: "Our modular, open-source design means you're not locked into a static ecosystem. Extend, modify, and evolve your infrastructure as your needs change, without wholesale migrations."
    }
  ];

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] 
                      bg-[size:4rem_4rem] opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-cyan-400 text-sm font-medium tracking-wider mb-2 uppercase">
              Our Unique Approach
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Beyond Traditional Infrastructure
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-6">
            OmniCloud isn't just another infrastructure platform. We're a paradigm shift in how organizations conceive, build, and manage their technological ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, index) => (
            <WhyUsSection 
              key={index} 
              icon={diff.icon} 
              title={diff.title} 
              description={diff.description} 
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ready to Reimagine Your Infrastructure?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              Experience the OmniCloud difference—where technology adapts to your vision, not the other way around.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-cyan-400 text-black hover:bg-cyan-500 transition-colors">
                Start Your Journey
              </button>
              <button className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;