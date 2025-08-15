"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Star, GitFork, Users, Clock, Github, ExternalLink, GitCommit, Code, Activity, TrendingUp, Zap, Eye, Heart, Target } from 'lucide-react';

// Types
interface GitHubStats {
    stars: number;
    forks: number;
    contributors: number;
    totalCommits: number;
    topContributors: Contributor[];
    totalLines: number;
    lastUpdated: string;
}

interface Contributor {
    login: string;
    avatar_url: string;
    contributions: number;
    reposContributedTo: string[];
}

// Configuration
const METRICS_JSON_URL = 'https://raw.githubusercontent.com/OmniCloudOrg/metrics/refs/heads/main/data/github-metrics.json';
const CACHE_KEY = 'omnicloud_github_stats';
const CACHE_VERSION = '3.0';
const CACHE_TTL = 3600000; // 1 hour

/**
 * Cache management for GitHub stats
 */
class StatsCache {
    static get(): GitHubStats | null {
        if (typeof window === 'undefined') return null;
        
        try {
            const cached = localStorage.getItem(`${CACHE_KEY}_${CACHE_VERSION}`);
            if (!cached) return null;
            
            const { data, timestamp } = JSON.parse(cached);
            
            if (Date.now() - timestamp < CACHE_TTL) {
                console.log('[Cache] Using cached GitHub stats');
                return data;
            }
            
            console.log('[Cache] Cache expired, will fetch fresh data');
        } catch (error) {
            console.error(`[Cache] Error reading cache: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        return null;
    }
    
    static set(data: GitHubStats): void {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(`${CACHE_KEY}_${CACHE_VERSION}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            console.log('[Cache] Stats cached successfully');
        } catch (error) {
            console.error(`[Cache] Error writing to cache: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    
    static clear(): void {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.removeItem(`${CACHE_KEY}_${CACHE_VERSION}`);
            console.log('[Cache] Cache cleared');
        } catch (error) {
            console.error(`[Cache] Error clearing cache: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

/**
 * Utility for handling GitHub usernames
 */
class GitHubUserUtil {
    static getDisplayName(login: string): string {
        if (!login) return "Unknown";
        
        if (login.includes('@')) {
            return login.split('@')[0];
        }
        
        if (login.includes('(') && login.includes(')')) {
            return login.split('(')[0].trim();
        }
        
        return login;
    }
}

/**
 * Service for fetching GitHub metrics
 */
class GitHubMetricsService {
    async fetchStats(): Promise<GitHubStats> {
        const cached = StatsCache.get();
        if (cached) {
            return cached;
        }
        
        console.log('[Metrics] Fetching fresh GitHub stats from JSON');
        
        try {
            const response = await fetch(METRICS_JSON_URL);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch metrics: ${response.status} ${response.statusText}`);
            }
            
            const metricsData = await response.json();
            const stats = this.processMetricsData(metricsData);
            
            StatsCache.set(stats);
            return stats;
        } catch (error) {
            console.error(`[Metrics] Failed to fetch GitHub stats: ${error instanceof Error ? error.message : String(error)}`);
            
            const cachedFallback = StatsCache.get();
            if (cachedFallback) {
                console.log('[Metrics] Using expired cache as fallback');
                return cachedFallback;
            }
            
            return {
                stars: 0,
                forks: 0,
                contributors: 0,
                totalCommits: 0,
                topContributors: [],
                totalLines: 0,
                lastUpdated: new Date().toISOString()
            };
        }
    }
    
    private processMetricsData(metricsData: any): GitHubStats {
        console.log('[Metrics] Processing metrics data');
        
        const topContributors: Contributor[] = (metricsData.stats.contributors.top || [])
            .slice(0, 12)
            .map((contributor: any) => ({
            login: contributor.login || "Anonymous",
            avatar_url: contributor.avatar_url || "",
            contributions: contributor.contributions || 0,
            reposContributedTo: contributor.repositories || []
            }));
        
        console.log(`[Metrics] Found ${topContributors.length} contributors`);
        
        const stats: GitHubStats = {
            stars: metricsData.stats.stars || 0,
            forks: metricsData.stats.forks || 0,
            contributors: metricsData.stats.contributors.total || 0,
            totalCommits: metricsData.stats.totalCommits || 0,
            topContributors,
            totalLines: metricsData.stats.linesOfCode || 0,
            lastUpdated: metricsData.timestamp || new Date().toISOString()
        };
        
        console.log('[Metrics] Processed stats:', stats);
        return stats;
    }
}

// Enhanced Metric Card Component
interface MetricCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number | string;
    detail: string;
    color: {
        primary: string;
        secondary: string;
        bg: string;
        border: string;
        hover: string;
        text: string;
        glow: string;
    };
    trend?: string;
    index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, detail, color, trend, index }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    // Animate counter on mount
    useEffect(() => {
        if (typeof value === 'number') {
            let start = 0;
            const duration = 2000 + (index * 200); // Stagger animations
            const increment = value / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setAnimatedValue(value);
                    clearInterval(timer);
                } else {
                    setAnimatedValue(Math.floor(start));
                }
            }, 16);
            
            return () => clearInterval(timer);
        }
    }, [value, index]);

    const displayValue = typeof value === 'number' ? 
        (animatedValue > 999 ? `${(animatedValue / 1000).toFixed(1)}k` : animatedValue.toLocaleString()) : 
        value;

    return (
        <div 
            className={`group relative p-8 bg-gray-900/30 border ${color.border} ${color.hover} 
                       rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl`}
            style={{
                animationDelay: `${index * 0.1}s`
            }}
        >
            {/* Animated background gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${color.primary}08 0%, transparent 70%)`
                }}
            />

            {/* Top accent line */}
            <div 
                className="absolute inset-x-0 top-0 h-px transition-all duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(to right, transparent, ${color.primary}30, transparent)`
                }}
            />

            {/* Enhanced top accent on hover */}
            <div 
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(to right, transparent, ${color.primary}, transparent)`
                }}
            />

            {/* Corner glow effect */}
            <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${color.primary} 0%, transparent 70%)`
                }}
            />

            <div className="relative h-full flex flex-col">
                {/* Enhanced icon */}
                <div 
                    className={`p-4 rounded-xl ${color.bg} transition-all duration-300 border border-gray-800 w-fit mb-6 group-hover:shadow-lg`}
                    style={{
                        '--hover-shadow': `0 0 25px ${color.primary}30`
                    } as any}
                >
                    <Icon className={`w-8 h-8 ${color.text}`} />
                </div>

                {/* Animated value */}
                <div className="mb-4 flex-1">
                    <div className="font-mono text-4xl font-black text-white mb-2 tracking-tight">
                        {displayValue}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold text-gray-300">{label}</span>
                        {trend && (
                            <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-green-400" />
                                <span className="text-xs text-green-400 font-medium">
                                    {trend}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="text-sm text-gray-400">{detail}</div>
                </div>
            </div>

            {/* Hover shadow effect */}
            <style jsx>{`
                .group:hover [style*="--hover-shadow"] {
                    box-shadow: var(--hover-shadow);
                }
                .group:hover {
                    box-shadow: 0 20px 40px ${color.primary}20;
                }
            `}</style>
        </div>
    );
};

// Enhanced Contributor Card
const ContributorCard: React.FC<{ contributor: Contributor; rank: number }> = ({ contributor, rank }) => {
    const displayName = GitHubUserUtil.getDisplayName(contributor.login);
    
    // Color based on rank
    const getRankColor = (rank: number) => {
        if (rank === 1) return { primary: '#ffd700', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', text: 'text-yellow-400' };
        if (rank === 2) return { primary: '#c0c0c0', bg: 'bg-gray-400/5', border: 'border-gray-400/20', text: 'text-gray-400' };
        if (rank === 3) return { primary: '#cd7f32', bg: 'bg-orange-600/5', border: 'border-orange-600/20', text: 'text-orange-600' };
        return { primary: '#06b6d4', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-400' };
    };

    const rankColor = getRankColor(rank);

    return (
        <div 
            className={`group relative p-6 bg-gray-900/30 border ${rankColor.border} hover:border-opacity-60 
                       rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl`}
        >
            {/* Background gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${rankColor.primary}05 0%, transparent 70%)`
                }}
            />

            {/* Top accent */}
            <div 
                className="absolute inset-x-0 top-0 h-px transition-all duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(to right, transparent, ${rankColor.primary}30, transparent)`
                }}
            />

            {/* Enhanced top accent on hover */}
            <div 
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(to right, transparent, ${rankColor.primary}, transparent)`
                }}
            />

            <div className="relative flex items-center gap-6">
                {/* Rank badge */}
                <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-xl ${rankColor.bg} border ${rankColor.border} 
                               flex items-center justify-center font-bold text-lg ${rankColor.text} 
                               transition-all duration-300 group-hover:shadow-lg`}
                    style={{
                        '--hover-shadow': `0 0 20px ${rankColor.primary}30`
                    } as any}
                >
                    #{rank}
                </div>

                {/* Avatar with glow */}
                <div className="relative flex-shrink-0">
                    <img 
                        src={contributor.avatar_url} 
                        alt={`${displayName} avatar`} 
                        className="w-16 h-16 rounded-full border-2 border-gray-700 group-hover:border-gray-600 transition-all duration-300 group-hover:shadow-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
                        }}
                        style={{
                            '--hover-shadow': `0 0 20px ${rankColor.primary}40`
                        } as any}
                    />
                    {/* Status indicator */}
                    <div 
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 animate-pulse"
                        style={{ backgroundColor: rankColor.primary }}
                    />
                </div>

                {/* Contributor info */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white truncate">
                            {displayName}
                        </h3>
                        <div className={`px-2 py-1 rounded-full ${rankColor.bg} border ${rankColor.border}`}>
                            <span className={`text-xs font-medium ${rankColor.text}`}>
                                CORE
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                            <GitCommit className="w-3 h-3" />
                            <span>{contributor.contributions.toLocaleString()} commits</span>
                        </div>
                        {contributor.reposContributedTo && (
                            <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{contributor.reposContributedTo.length} repos</span>
                            </div>
                        )}
                    </div>

                    {/* Simple activity indicator */}
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${rankColor.text} animate-pulse`} />
                        <span className="text-xs text-gray-500">
                            Active contributor
                        </span>
                    </div>
                </div>
            </div>

            {/* Hover shadow effect */}
            <style jsx>{`
                .group:hover [style*="--hover-shadow"] {
                    box-shadow: var(--hover-shadow);
                }
                .group:hover {
                    box-shadow: 0 15px 30px ${rankColor.primary}15;
                }
            `}</style>
        </div>
    );
};

/**
 * Format a date as relative time
 */
const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} months ago`;
};

// Main Component
const CommunityMetrics: React.FC = () => {
    const [stats, setStats] = useState<GitHubStats>({
        stars: 0,
        forks: 0,
        contributors: 0,
        totalCommits: 0,
        topContributors: [],
        totalLines: 0,
        lastUpdated: ''
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);
    
    const metricsService = new GitHubMetricsService();

    // Color themes for different metrics
    const metricThemes = [
        { primary: '#fbbf24', secondary: '#f59e0b', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', hover: 'hover:border-yellow-400/40', text: 'text-yellow-400', glow: '#fbbf24' },
        { primary: '#a855f7', secondary: '#9333ea', bg: 'bg-purple-500/5', border: 'border-purple-500/20', hover: 'hover:border-purple-400/40', text: 'text-purple-400', glow: '#a855f7' },
        { primary: '#06b6d4', secondary: '#0891b2', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', hover: 'hover:border-cyan-400/40', text: 'text-cyan-400', glow: '#06b6d4' },
        { primary: '#10b981', secondary: '#059669', bg: 'bg-green-500/5', border: 'border-green-500/20', hover: 'hover:border-green-400/40', text: 'text-green-400', glow: '#10b981' },
        { primary: '#f97316', secondary: '#ea580c', bg: 'bg-orange-500/5', border: 'border-orange-500/20', hover: 'hover:border-orange-400/40', text: 'text-orange-400', glow: '#f97316' },
        { primary: '#ec4899', secondary: '#db2777', bg: 'bg-pink-500/5', border: 'border-pink-500/20', hover: 'hover:border-pink-400/40', text: 'text-pink-400', glow: '#ec4899' }
    ];

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

    // Load GitHub stats
    useEffect(() => {
        const loadStats = async () => {
            try {
                setIsLoading(true);
                const fetchedStats = await metricsService.fetchStats();
                setStats(fetchedStats);
                
                const lastUpdatedDate = new Date(fetchedStats.lastUpdated);
                setLastUpdated(getTimeAgo(lastUpdatedDate));
                
                setError(null);
            } catch (err) {
                setError("Failed to load GitHub stats. Using cached data if available.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadStats();
    }, []);
    
    // Handle refresh
    const handleRefresh = async () => {
        try {
            StatsCache.clear();
            
            setIsLoading(true);
            const fetchedStats = await metricsService.fetchStats();
            setStats(fetchedStats);
            setLastUpdated('just now');
            setError(null);
        } catch (err) {
            setError("Failed to refresh GitHub stats.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const metrics = [
        { icon: Star, label: "GitHub Stars", value: stats.stars, detail: "Across all repos", trend: "+12%" },
        { icon: GitFork, label: "Active Forks", value: stats.forks, detail: "Community derivatives", trend: "+8%" },
        { icon: Users, label: "Contributors", value: stats.contributors, detail: "Including co-authors", trend: "+15%" },
        { icon: GitCommit, label: "Total Commits", value: stats.totalCommits, detail: "Code contributions", trend: "+23%" },
        { icon: Code, label: "Lines of Code", value: stats.totalLines, detail: "All repositories", trend: "+34%" },
        { icon: Clock, label: "Release Cycle", value: "2 weeks", detail: "Continuous delivery", trend: "∞" }
    ];

    return (
        <section 
            ref={containerRef}
            className="relative py-24 px-4 bg-black overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced header */}
                <div className="mb-20">
                    {/* Open Source badge */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-full backdrop-blur-sm">
                            <div className="relative">
                                <Github className="w-6 h-6" />
                                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse" />
                            </div>
                            <span className="font-mono font-semibold tracking-wider">
                                OPEN SOURCE
                            </span>
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                            Built in
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                Public
                            </span>
                        </h2>
                        
                        {/* Animated accent line */}
                        <div className="relative h-px w-64 mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
                        </div>
                        
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Join our <span className="text-cyan-300 font-semibold">growing community</span> of contributors 
                            building the <span className="text-purple-300 font-semibold">future of deployment infrastructure</span>.
                        </p>

                        {/* Live status indicator */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm text-gray-400">
                                    Last updated: {lastUpdated || 'Loading...'}
                                </span>
                            </div>
                            <button 
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white text-sm rounded-lg backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg 
                                    className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Refresh
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <div className="mt-6 p-4 bg-red-900/20 border border-red-800/30 text-red-300 text-sm rounded-xl backdrop-blur-sm text-center max-w-2xl mx-auto">
                            {error}
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-900/20 border border-gray-800 rounded-2xl animate-pulse backdrop-blur-sm"></div>
                            ))}
                        </div>
                        <div className="h-8 w-48 bg-gray-900/20 animate-pulse mb-12 mx-auto rounded-lg"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-900/20 border border-gray-800 rounded-2xl animate-pulse backdrop-blur-sm"></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Enhanced metrics grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {metrics.map((metric, index) => (
                                <MetricCard
                                    key={index}
                                    icon={metric.icon}
                                    label={metric.label}
                                    value={metric.value}
                                    detail={metric.detail}
                                    color={metricThemes[index]}
                                    trend={metric.trend}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Enhanced contributors section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/5 border border-purple-500/20 text-purple-400 rounded-full backdrop-blur-sm mb-6">
                                <Users className="w-4 h-4" />
                                <span className="font-mono font-semibold tracking-wider">
                                    TOP CONTRIBUTORS
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Community Heroes
                            </h3>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Meet the amazing developers who make OmniCloud possible through their contributions and dedication.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
                            {stats.topContributors.slice(0, 8).map((contributor, index) => (
                                <ContributorCard 
                                    key={contributor.login} 
                                    contributor={contributor} 
                                    rank={index + 1} 
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Enhanced CTA section */}
                <div className="relative p-8 bg-gradient-to-r from-gray-900/20 via-gray-900/30 to-gray-900/20 border border-gray-800 rounded-2xl backdrop-blur-xl overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Want to Contribute?
                            </h3>
                            <p className="text-gray-300 max-w-lg">
                                We welcome contributions of all sizes, from documentation to features. 
                                Join our community and help shape the future of cloud deployment.
                            </p>
                            
                            {/* Community stats */}
                            <div className="flex items-center gap-6 mt-4 justify-center lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-gray-400">
                                        {stats.contributors}+ contributors
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-gray-400">
                                        {stats.totalCommits}+ commits
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a 
                                href="https://github.com/OmniCloudOrg/OmniCloud-Full" 
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl backdrop-blur-sm transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5" />
                                <span>View on GitHub</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a 
                                href="/docs/contributing" 
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25"
                            >
                                <span>Contributing Guide</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes pulse-line {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.15; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-pulse-line {
                    animation: pulse-line 4s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default CommunityMetrics;