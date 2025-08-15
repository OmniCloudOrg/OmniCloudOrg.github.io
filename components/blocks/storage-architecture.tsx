"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Database, Shield, Zap, Network, HardDrive, Server, Activity, GitBranch } from 'lucide-react';

const StorageArchitecture = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const architectureComponents = [
        {
            id: 'application',
            title: 'Application Layer',
            description: 'Your applications using GalleonFS volumes',
            icon: <Server className="w-8 h-8" />,
            color: '#06b6d4',
            position: { x: 50, y: 10 },
            connections: ['api']
        },
        {
            id: 'api',
            title: 'GalleonFS API',
            description: 'Volume management and storage operations',
            icon: <Network className="w-8 h-8" />,
            color: '#8b5cf6',
            position: { x: 50, y: 30 },
            connections: ['core']
        },
        {
            id: 'core',
            title: 'Storage Engine',
            description: 'Block-level storage with journaling',
            icon: <Database className="w-8 h-8" />,
            color: '#f59e0b',
            position: { x: 50, y: 50 },
            connections: ['replication', 'encryption']
        },
        {
            id: 'replication',
            title: 'Replication Service',
            description: 'Multi-node data synchronization',
            icon: <GitBranch className="w-8 h-8" />,
            color: '#10b981',
            position: { x: 25, y: 70 },
            connections: ['storage']
        },
        {
            id: 'encryption',
            title: 'Security Layer',
            description: 'AES-256 encryption and access control',
            icon: <Shield className="w-8 h-8" />,
            color: '#ef4444',
            position: { x: 75, y: 70 },
            connections: ['storage']
        },
        {
            id: 'storage',
            title: 'Physical Storage',
            description: 'NVMe, SSD, HDD, and cloud storage',
            icon: <HardDrive className="w-8 h-8" />,
            color: '#ec4899',
            position: { x: 50, y: 90 },
            connections: []
        }
    ];

    return (
        <section className="py-16 px-4 bg-black">
            <div className="max-w-5xl mx-auto">
                {/* Simple header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        System Architecture
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        GalleonFS uses a layered architecture for scalability and reliability.
                    </p>
                </div>

                {/* Simple stack visualization */}
                <div className="space-y-4">
                    {architectureComponents.map((component, index) => (
                        <div
                            key={component.id}
                            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div 
                                    className="p-3 rounded-lg"
                                    style={{
                                        backgroundColor: `${component.color}20`,
                                        color: component.color
                                    }}
                                >
                                    {component.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {component.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {component.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorageArchitecture;