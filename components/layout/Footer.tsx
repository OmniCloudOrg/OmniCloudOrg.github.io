import React from 'react';
import SocialLinks from './SocialLinks';
import { Heart } from 'lucide-react'

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-neutral-400 hover:text-neutral-100 transition-colors">
    {children}
  </a>
);

const FooterSection = ({ 
  title, 
  links 
}: { 
  title: string; 
  links: Array<{ href: string; label: string; }> 
}) => (
  <div>
    <h3 className="text-neutral-100 font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map(({ href, label }) => (
        <li key={href}>
          <FooterLink href={href}>{label}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 mb-4 md:mb-0">
          <FooterLove></FooterLove>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

const FooterLove = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
      <p>Made with <Heart className="w-4 h-4 inline-block text-red-500" /> by Tristan J. Poland</p>
    </div>
  )
}


export default Footer;