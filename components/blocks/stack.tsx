import React from 'react';
import { Layers, GitBranch, Cpu, Shield } from 'lucide-react';

interface TechStackCardProps {
  title: string;
  description: string;
  features: string[];
}

const TechStackCard: React.FC<TechStackCardProps> = ({ title, description, features }) => (
  <div className="bg-slate-900/50 p-6 rounded-lg backdrop-blur-sm border border-slate-800/50">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-slate-400 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-slate-300">
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const OpenSourceStack = () => {
  const sections = [
    {
      icon: Layers,
      title: "Core Technologies",
      description: "Built on proven open source foundations",
      features: [
        "Rust for performance-critical components",
        "Go for microservices",
        "PostgreSQL for reliable data storage",
        "Redis for caching and queues"
      ]
    },
    {
      icon: GitBranch,
      title: "Developer Tools",
      description: "Modern tooling for efficient development",
      features: [
        "GitHub Actions for CI/CD",
        "Docker for containerization",
        "Kubernetes for orchestration",
        "Terraform for infrastructure"
      ]
    },
    {
      icon: Cpu,
      title: "System Architecture",
      description: "Scalable and maintainable design",
      features: [
        "Event-driven architecture",
        "gRPC for service communication",
        "GraphQL API gateway",
        "Prometheus monitoring"
      ]
    },
    {
      icon: Shield,
      title: "Security & Testing",
      description: "Comprehensive security measures",
      features: [
        "Vault for secrets management",
        "OpenTelemetry for observability",
        "Cypress for E2E testing",
        "Jest for unit testing"
      ]
    }
  ];

  const IconComponent: React.FC<{ icon: React.ComponentType<{ className?: string }> }> = ({ icon: Icon }) => (
    <div className="p-2 bg-cyan-500/10 rounded-lg w-fit mb-6">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Open Source Stack
            </span>
        </div>
        <div className="text-center mb-12">
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built entirely with open source technologies, ensuring transparency,
            reliability, and community-driven innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col">
              <IconComponent icon={section.icon} />
              <TechStackCard {...section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSourceStack;