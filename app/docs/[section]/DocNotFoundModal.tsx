'use client';

import React from 'react';
import { Github } from 'lucide-react';

interface DocNotFoundModalProps {
  slug: string;
}

const DocNotFoundModal: React.FC<DocNotFoundModalProps> = ({ slug }) => {
  const githubUrl = `https://github.com/OmniCloudOrg/OmniCloudOrg.github.io/tree/master/public/docs/${slug}.md`;
  
  const handleGoBack = () => {
    window.history.back();
  };

  const handleContribute = () => {
    window.open(githubUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background border rounded-lg shadow-lg max-w-md w-full animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground">
            Document Not Found
          </h2>
          <p className="mt-4 text-base leading-6 text-muted-foreground">
            This documentation page hasn't been created yet. Would you like to contribute by writing it?
          </p>
        </div>
        {/* Footer */}
        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2
                     bg-background border border-input hover:bg-accent hover:text-accent-foreground
                     transition-colors focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ring focus-visible:ring-offset-2
                     w-full sm:w-auto"
          >
            Go Back
          </button>
          <button
            onClick={handleContribute}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2
                     bg-primary text-primary-foreground hover:bg-primary/90
                     transition-colors focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ring focus-visible:ring-offset-2
                     w-full sm:w-auto"
          >
            <Github className="w-4 h-4" />
            Contribute on GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocNotFoundModal;