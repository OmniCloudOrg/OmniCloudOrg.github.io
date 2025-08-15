"use client"

import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Zap, Activity, TrendingUp, Gauge, Timer, Database, Shield } from 'lucide-react';

const PerformanceMetrics = () => {
    const [animatedValues, setAnimatedValues] = useState({
        iops: 0,
        latency: 0,
        throughput: 0,
        uptime: 0
    });
    const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const metrics = [
        {
            id: 'iops',
            title: 'IOPS Performance',
            value: '15,847',
            unit: 'ops/sec',
            description: 'Input/output operations per second',
            icon: <Zap className="w-6 h-6" />,
            color: '#f59e0b',
            target: 15847,
            chart: [12000, 13500, 15000, 15847, 14200, 16000, 15847]
        },
        {
            id: 'latency',
            title: 'Read Latency',
            value: '2.1',
            unit: 'ms',
            description: 'Average read operation latency',
            icon: <Timer className="w-6 h-6" />,
            color: '#10b981',
            target: 2.1,
            chart: [3.2, 2.8, 2.4, 2.1, 2.3, 1.9, 2.1]
        },
        {
            id: 'throughput',
            title: 'Throughput',
            value: '1.2',
            unit: 'GB/s',
            description: 'Data transfer rate',
            icon: <Activity className="w-6 h-6" />,
            color: '#8b5cf6',
            target: 1.2,
            chart: [0.8, 0.9, 1.0, 1.1, 1.2, 1.0, 1.2]
        },
        {
            id: 'uptime',
            title: 'System Uptime',
            value: '99.99',
            unit: '%',
            description: 'Service availability',
            icon: <Shield className="w-6 h-6" />,
            color: '#06b6d4',
            target: 99.99,
            chart: [99.95, 99.97, 99.99, 99.99, 99.98, 99.99, 99.99]
        }
    ];

    const currentMetric = metrics[currentMetricIndex];

    // Animated value updates
    useEffect(() => {
        const animateValue = (target: number, key: keyof typeof animatedValues) => {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                current += increment;
                step++;
                
                setAnimatedValues(prev => ({
                    ...prev,
                    [key]: Math.min(current, target)
                }));

                if (step >= steps) {
                    clearInterval(timer);
                    setAnimatedValues(prev => ({
                        ...prev,
                        [key]: target
                    }));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        };

        metrics.forEach(metric => {
            animateValue(metric.target, metric.id as keyof typeof animatedValues);
        });
    }, []);

    // Cycle through metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMetricIndex((prev) => (prev + 1) % metrics.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const formatValue = (value: number, unit: string) => {
        if (unit === 'ops/sec') {
            return Math.floor(value).toLocaleString();
        }
        if (unit === 'ms' || unit === 'GB/s') {
            return value.toFixed(1);
        }
        if (unit === '%') {
            return value.toFixed(2);
        }
        return value.toString();
    };

    return (
        <section className="py-16 px-4 bg-gray-900/30">
            <div className="max-w-6xl mx-auto">
                {/* Simple header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Performance Metrics
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real-time performance monitoring across all storage operations.
                    </p>
                </div>

                {/* Simple metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <div
                            key={metric.id}
                            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center"
                        >
                            <div 
                                className="p-3 rounded-lg inline-flex mb-4"
                                style={{
                                    backgroundColor: `${metric.color}20`,
                                    color: metric.color
                                }}
                            >
                                {metric.icon}
                            </div>
                            
                            <div className="text-2xl font-bold text-white mb-1 font-mono">
                                {formatValue(animatedValues[metric.id as keyof typeof animatedValues], metric.unit)}
                                <span className="text-sm ml-1 opacity-70" style={{ color: metric.color }}>
                                    {metric.unit}
                                </span>
                            </div>
                            
                            <div className="text-sm text-gray-400">
                                {metric.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PerformanceMetrics;