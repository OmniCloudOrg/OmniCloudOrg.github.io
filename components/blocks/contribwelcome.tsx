import React from 'react';
import { Code2, MessageSquare, Book, Heart } from 'lucide-react';

interface ContributionCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ icon: Icon, title, description, buttonText }) => (
  <div className="bg-slate-900/50 p-6 rounded-lg backdrop-blur-sm border border-slate-800/50 flex flex-col h-full">
    <div className="p-2 bg-cyan-500/10 rounded-lg w-fit">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mt-4">{title}</h3>
    <p className="text-slate-400 mt-2 flex-grow">{description}</p>
    <button className="mt-4 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors text-sm">
      {buttonText}
    </button>
  </div>
);

const ContributorWelcome = () => (
  <div className="py-16 bg-gradient-to-b from-transparent to-slate-900/50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Whether you're fixing bugs, adding features, or improving documentation,
          every contribution matters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContributionCard
          icon={Code2}
          title="Code Contributions"
          description="Help us improve the codebase. We have issues tagged 'good-first-issue' to help you get started."
          buttonText="View Open Issues"
        />
        <ContributionCard
          icon={MessageSquare}
          title="Join Discussions"
          description="Share ideas, ask questions, and help others in our community forums."
          buttonText="Join Discord"
        />
        <ContributionCard
          icon={Book}
          title="Documentation"
          description="Help us improve our docs. Good documentation makes great software even better."
          buttonText="View Docs"
        />
        <ContributionCard
          icon={Heart}
          title="Spread the Word"
          description="Star our repo, share your experience, and help us grow the community."
          buttonText="Star on GitHub"
        />
      </div>
    </div>
  </div>
);

export default ContributorWelcome;