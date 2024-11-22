"use client";
import React from 'react';
import { Shield, Cpu, GitBranch, Gauge } from 'lucide-react';

const TechOverview = () => {
    return (
        <section className="py-32 px-4 relative bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                            Built for Performance and Safety
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Powered by Rust's memory safety guarantees and blazing-fast performance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Benefits List */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                Memory Safety Guaranteed
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Built entirely in Rust, ensuring thread safety, memory safety, and zero data races at compile time. No more runtime surprises or memory leaks.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-300">
                                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                                    Zero memory leaks
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                                    Thread-safe concurrency
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                                    No null pointer exceptions
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                Blazing Fast Performance
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Zero-cost abstractions and minimal runtime overhead deliver performance that matches or exceeds C++, while maintaining safety guarantees.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <div className="text-2xl font-bold text-cyan-400 mb-1">~0ms</div>
                                    <div className="text-sm text-gray-400">GC Overhead</div>
                                </div>
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
                                    <div className="text-sm text-gray-400">Memory Safety</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                Advanced Concurrency
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Rust's ownership model ensures thread safety and eliminates data races, making concurrent programming easier and safer.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-300">
                                    <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
                                    Safe parallelism
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
                                    Efficient multithreading
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
                                    No data races
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                Modern Tooling
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Leverage the power of modern tooling and ecosystems to build, test, and deploy your applications with ease.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-300">
                                    <GitBranch className="w-5 h-5 mr-2 text-cyan-400" />
                                    Integrated with Git
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <GitBranch className="w-5 h-5 mr-2 text-cyan-400" />
                                    Continuous Integration
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <GitBranch className="w-5 h-5 mr-2 text-cyan-400" />
                                    Automated Testing
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechOverview;