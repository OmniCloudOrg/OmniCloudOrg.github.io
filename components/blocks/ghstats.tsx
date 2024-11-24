import React from 'react';
import { Star, GitFork, Users, Clock } from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-slate-900/50 p-6 rounded-lg backdrop-blur-sm border border-slate-800/50">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-cyan-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          <span className="text-sm text-cyan-400">{title}</span>
        </div>
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const CommunityMetrics = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="text-center text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Community Driven Development
          </span>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Join our thriving open source community. Every contribution makes a difference.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Star}
          title="GitHub Stars"
          value="15.2K"
          description="Trusted by developers worldwide"
        />
        <MetricCard
          icon={GitFork}
          title="Forks"
          value="2.8K"
          description="Active development branches"
        />
        <MetricCard
          icon={Users}
          title="Contributors"
          value="483"
          description="Global community members"
        />
        <MetricCard
          icon={Clock}
          title="Release Cycle"
          value="2 weeks"
          description="Regular stable releases"
        />
      </div>
    </div>
  </div>
);

export default CommunityMetrics;