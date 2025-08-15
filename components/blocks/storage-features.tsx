"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Database, Shield, Zap, Copy, Archive, MoveRight, Gauge, Settings } from 'lucide-react';

const StorageFeatures = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    const features = [
        {
            id: 'volumes',
            title: 'Dynamic Volume Management',
            description: 'Create, resize, and manage storage volumes with zero downtime',
            icon: <Database className="w-8 h-8" />,
            color: '#06b6d4',
            details: [
                'Online volume expansion',
                'Multiple access modes (RWO, ROX, RWX)',
                'Storage class selection',
                'Automatic provisioning'
            ],
            codeExample: `galleonfs create volume web-data \\
  --size 500GB \\
  --class fast-ssd \\
  --replicas 3`
        },
        {
            id: 'snapshots',
            title: 'Instant Snapshots',
            description: 'Point-in-time snapshots with copy-on-write technology',
            icon: <Copy className="w-8 h-8" />,
            color: '#8b5cf6',
            details: [
                'Copy-on-write snapshots',
                'Instant creation (<1s)',
                'Space-efficient storage',
                'Volume cloning support'
            ],
            codeExample: `galleonfs snapshot create web-data \\
  --name "pre-deployment" \\
  --description "Before v2.1 deploy"`
        },
        {
            id: 'backup',
            title: 'Automated Backup & Recovery',
            description: 'Multi-strategy backup with intelligent scheduling',
            icon: <Archive className="w-8 h-8" />,
            color: '#10b981',
            details: [
                'Incremental & differential backups',
                'Cross-region replication',
                'Retention policy management',
                'Application-consistent backups'
            ],
            codeExample: `galleonfs backup schedule web-data \\
  --policy daily-incremental \\
  --retention 30d \\
  --destination s3://backups/`
        },
        {
            id: 'encryption',
            title: 'Enterprise Encryption',
            description: 'AES-256-GCM encryption with flexible key management',
            icon: <Shield className="w-8 h-8" />,
            color: '#ef4444',
            details: [
                'AES-256-GCM encryption',
                'HSM key management',
                'Key rotation support',
                'Compliance ready (FIPS 140-2)'
            ],
            codeExample: `galleonfs encrypt web-data \\
  --algorithm AES-256-GCM \\
  --key-source hsm \\
  --auto-rotate 90d`
        },
        {
            id: 'migration',
            title: 'Live Migration',
            description: 'Zero-downtime migration between storage classes and nodes',
            icon: <MoveRight className="w-8 h-8" />,
            color: '#f59e0b',
            details: [
                'Zero-downtime migration',
                'Cross-node data movement',
                'Storage class changes',
                'Bandwidth throttling'
            ],
            codeExample: `galleonfs migrate web-data \\
  --target-class nvme-high \\
  --target-node node-03 \\
  --throttle 100MB/s`
        },
        {
            id: 'monitoring',
            title: 'Real-Time Monitoring',
            description: 'Comprehensive monitoring with Prometheus integration',
            icon: <Gauge className="w-8 h-8" />,
            color: '#ec4899',
            details: [
                'Real-time IOPS & latency',
                'Prometheus metrics export',
                'Custom alerting rules',
                'Performance analytics'
            ],
            codeExample: `galleonfs metrics export \\
  --format prometheus \\
  --endpoint :9090/metrics \\
  --interval 15s`
        }
    ];

    const currentFeature = features[activeFeature];

    // Auto-cycle through features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Mouse tracking
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

    return (
        <section className="py-16 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Simple header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Storage Features
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Enterprise storage capabilities for mission-critical workloads.
                    </p>
                </div>

                {/* Simple features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                        >
                            <div 
                                className="p-3 rounded-lg inline-flex mb-4"
                                style={{
                                    backgroundColor: `${feature.color}20`,
                                    color: feature.color
                                }}
                            >
                                {feature.icon}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-4">
                                {feature.description}
                            </p>
                            
                            <div className="space-y-2">
                                {feature.details.slice(0, 3).map((detail, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                                        <div 
                                            className="w-1 h-1 rounded-full"
                                            style={{ backgroundColor: feature.color }}
                                        />
                                        {detail}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorageFeatures;