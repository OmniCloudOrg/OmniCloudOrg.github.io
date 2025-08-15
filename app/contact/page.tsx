"use client";

import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-gray-400 mb-8">Connect with the OmniCloud community and maintainers.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-6">
              Have questions about OmniCloud? Need help getting started? Want to contribute to the project? 
              Our community is here to help you succeed with open source cloud infrastructure.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-900 rounded-lg">
                <h3 className="font-bold mb-2">GitHub Discussions</h3>
                <p className="text-gray-400 text-sm mb-2">Ask questions and get help from the community.</p>
                <a href="https://github.com/OmniCloudOrg/discussions" className="text-cyan-400 hover:text-cyan-300">
                  Join Discussions →
                </a>
              </div>
              
              <div className="p-4 bg-gray-900 rounded-lg">
                <h3 className="font-bold mb-2">Discord Community</h3>
                <p className="text-gray-400 text-sm mb-2">Chat with developers and maintainers in real-time.</p>
                <a href="https://discord.gg/26feC6QAav" className="text-cyan-400 hover:text-cyan-300">
                  Join Discord →
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="How can we help?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;