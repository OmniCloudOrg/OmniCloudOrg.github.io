import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black to-blue-900/20" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">
          Ready to Transform Your 
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Deployment Pipeline?
          </span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Join thousands of companies that have already modernized their deployment infrastructure with OmniForge.
          Start your journey today with our free tier.
        </p>
        <div className="flex gap-6 justify-center">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-5 rounded-lg font-semibold text-xl hover:opacity-90 transition-opacity">
            Start Free Trial
          </button>
          <button className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-gray-700 px-10 py-5 rounded-lg font-semibold text-xl hover:bg-gray-900 transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;