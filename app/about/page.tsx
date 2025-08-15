"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  Quote,
  Heart,
  Globe,
  Sparkles,
  CheckCircle,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <div 
      className="group relative p-6 lg:p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 text-center">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl font-bold group-hover:border-cyan-400/50 transition-all duration-300">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300 mb-2">
          {member.name}
        </h3>
        
        <p className="text-cyan-400 font-medium mb-4">{member.role}</p>
        
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed mb-6">
          {member.bio}
        </p>
        
        <div className="flex justify-center gap-3">
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
               className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
               className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer"
               className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible in cloud infrastructure, never settling for the status quo."
    },
    {
      icon: Users,
      title: "Developer-Centric",
      description: "Every decision we make is guided by one question: How can we make developers' lives easier and more productive?"
    },
    {
      icon: Shield,
      title: "Security by Design",
      description: "Security isn't an afterthought—it's woven into the very fabric of everything we build from day one."
    },
    {
      icon: Heart,
      title: "Open Source",
      description: "We believe in transparency and community. Our open-source approach ensures no vendor lock-in and continuous innovation."
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Tristan J. Poland",
      role: "Project Founder",
      bio: "Systems programmer, Web developer, and distributed infrastructure architect specializing in high-performance networking, scalable server solutions, and developer tooling.",
      avatar: "/team/alex.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const milestones = [
    { year: "2024", event: "Project founded with vision to democratize cloud infrastructure" },
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-[0.08] animate-float"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              background: `radial-gradient(circle, ${['#00ffff', '#ff0080', '#8000ff', '#00ff80'][i % 4]} 0%, transparent 70%)`,
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i * 15)}%`,
              animationDelay: `${i * 2}s`,
              transform: `translate(${(mousePosition.x - 0.5) * (20 + i * 5)}px, ${(mousePosition.y - 0.5) * (15 + i * 3)}px)`
            }}
          />
        ))}

        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#00ffff 1px, transparent 1px),
              linear-gradient(90deg, #00ffff 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">About OmniCloud</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-none">
            Redefining Cloud
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h1>
          
          <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-8">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse" />
          </div>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're building an open source platform to make cloud infrastructure as intuitive and accessible as turning on a light switch. 
            Born from frustration with complex deployment processes, OmniCloud represents a new paradigm in how developers build and scale applications.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="relative p-8 lg:p-12 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 border border-gray-800 rounded-3xl backdrop-blur-xl mb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
          
          <div className="relative z-10 text-center">
            <Quote className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <blockquote className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-relaxed">
              "Infrastructure should empower innovation, not constrain it. We're building an open source platform that puts developers back in control."
            </blockquote>
            <cite className="text-cyan-400 font-medium">— Tristan J. Poland</cite>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These principles guide every decision we make and every line of code we write.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative p-6 lg:p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300 mb-6">
                    <value.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From a simple idea to a platform trusted by thousands of developers worldwide.
            </p>
          </div>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex items-center gap-6 p-6 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-lg leading-relaxed">{milestone.event}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate engineers and innovators from top tech companies, united by the vision of better infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="text-center">
          <div className="relative inline-block p-8 lg:p-12 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 border border-gray-800 rounded-3xl backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
            
            <div className="relative z-10">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Contribute?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                OmniCloud thrives because of contributors like you. Join our open source community and help shape the future of cloud infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
                <a 
                  href="https://github.com/OmniCloudOrg"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-lg font-bold transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg shadow-cyan-500/25 overflow-hidden"
                >
                  <span className="relative z-10">Contribute on GitHub</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                </a>
                
                <a 
                  href="/community"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-xl backdrop-blur-sm hover:bg-cyan-500/5 relative overflow-hidden"
                >
                  <span className="relative z-10">Join Community</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;