"use client";

import React, { useEffect, useState } from 'react';
import { Star, GitFork, Users, Clock, Github, ExternalLink, GitCommit, LucideIcon, Code } from 'lucide-react';

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
    /**
     * Get cached stats
     */
    static get(): GitHubStats | null {
        if (typeof window === 'undefined') return null;
        
        try {
            const cached = localStorage.getItem(`${CACHE_KEY}_${CACHE_VERSION}`);
            if (!cached) return null;
            
            const { data, timestamp } = JSON.parse(cached);
            
            // Check if cache is still valid
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
    
    /**
     * Save stats to cache
     */
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
    
    /**
     * Clear the cache
     */
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
    /**
     * Get display name for a contributor
     */
    static getDisplayName(login: string): string {
        if (!login) return "Unknown";
        
        // Handle email-format logins
        if (login.includes('@')) {
            return login.split('@')[0];
        }
        
        // Handle names with parentheses
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
    /**
     * Fetch all GitHub stats
     */
    async fetchStats(): Promise<GitHubStats> {
        // Check cache first
        const cached = StatsCache.get();
        if (cached) {
            return cached;
        }
        
        console.log('[Metrics] Fetching fresh GitHub stats from JSON');
        
        try {
            // Fetch the metrics JSON
            const response = await fetch(METRICS_JSON_URL);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch metrics: ${response.status} ${response.statusText}`);
            }
            
            const metricsData = await response.json();
            
            // Process and convert the JSON data to our GitHubStats format
            const stats = this.processMetricsData(metricsData);
            
            // Save to cache
            StatsCache.set(stats);
            
            return stats;
        } catch (error) {
            console.error(`[Metrics] Failed to fetch GitHub stats: ${error instanceof Error ? error.message : String(error)}`);
            
            // Return cached data if available, even if expired
            const cachedFallback = StatsCache.get();
            if (cachedFallback) {
                console.log('[Metrics] Using expired cache as fallback');
                return cachedFallback;
            }
            
            // Return empty stats if no cache available
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
    
    /**
     * Process metrics data from JSON to GitHubStats format
     */
    private processMetricsData(metricsData: any): GitHubStats {
        console.log('[Metrics] Processing metrics data');
        
        // Extract the top contributors and map to our format
        const topContributors: Contributor[] = metricsData.stats.contributors.top
            .slice(0, 10) // Get top 6 contributors
            .map((contributor: any) => ({
                login: contributor.login,
                avatar_url: contributor.avatar_url,
                contributions: contributor.contributions,
                reposContributedTo: contributor.repositories || []
            }));
        
        // Create the stats object
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

// UI Components
interface MetricCardProps {
    icon: LucideIcon;
    label: string;
    value: number | string;
    detail: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, detail }) => (
    <div className="relative group">
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-sm 
                      transition-colors duration-300 hover:border-cyan-900 h-full">
            <div className="flex flex-col items-start">
                <div className="p-3 rounded bg-black/40 text-cyan-400 mb-4">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <div className="font-mono text-3xl text-white mb-3">
                        {typeof value === 'number' && value > 999 ? `${(value / 1000).toFixed(1)}k` : value}
                    </div>
                    <div className="text-base text-zinc-400 mb-2">{label}</div>
                    <div className="text-xs text-zinc-500">{detail}</div>
                </div>
            </div>
        </div>
    </div>
);

const ContributorCard: React.FC<{ contributor: Contributor; rank: number }> = ({ contributor, rank }) => {
    // Get clean display name
    const displayName = GitHubUserUtil.getDisplayName(contributor.login);
    
    return (
        <div className="flex items-center p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-cyan-900 transition-colors duration-300">
            <div className="flex-shrink-0 mr-5 text-2xl font-bold text-zinc-600">#{rank}</div>
            <img 
                src={contributor.avatar_url} 
                alt={`${displayName} avatar`} 
                className="w-12 h-12 rounded-full mr-5"
                onError={(e) => {
                    // Fallback for invalid avatar URLs
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
                }}
            />
            <div className="flex-grow">
                <div className="text-white font-medium text-lg mb-1">{displayName}</div>
                <div className="text-sm text-zinc-400">
                    {contributor.contributions.toLocaleString()} commits
                </div>
                {contributor.reposContributedTo && (
                    <div className="text-xs text-zinc-500 mt-1">
                        Active in {contributor.reposContributedTo.length} {contributor.reposContributedTo.length === 1 ? 'repo' : 'repos'}
                    </div>
                )}
            </div>
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
    
    // Initialize GitHub metrics service
    const metricsService = new GitHubMetricsService();

    // Load GitHub stats
    useEffect(() => {
        const loadStats = async () => {
            try {
                setIsLoading(true);
                const fetchedStats = await metricsService.fetchStats();
                setStats(fetchedStats);
                
                // Format last updated time
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
            // Clear cache
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

    return (
        <section className="py-24 px-4 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3f_1px,transparent_1px)] 
                          bg-[size:4rem_4rem] opacity-10" />

            <div className="max-w-6xl mx-auto relative">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 
                                  border border-cyan-400/20 text-cyan-400 text-sm mb-6">
                        <Github className="w-4 h-4" />
                        <span className="font-mono">Open Source</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h2 className="text-3xl font-bold text-white">
                            Built in Public
                        </h2>
                        
                        <div className="flex items-center gap-3">
                            {!isLoading && lastUpdated && (
                                <span className="text-xs text-zinc-500">
                                    Last updated: {lastUpdated}
                                </span>
                            )}
                            <button 
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/70 
                                        border border-zinc-800 text-zinc-400 text-xs hover:text-white 
                                        transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg 
                                    className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} 
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
                    
                    <p className="text-lg text-zinc-400 max-w-xl">
                        Join our growing community of contributors building the future of deployment infrastructure.
                    </p>
                    
                    {error && (
                        <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded">
                            {error}
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-48 bg-zinc-900/30 border border-zinc-800 rounded-sm animate-pulse"></div>
                            ))}
                        </div>
                        <div className="h-8 w-48 bg-zinc-900/30 animate-pulse mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-24 bg-zinc-900/30 border border-zinc-800 rounded-sm animate-pulse"></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <MetricCard
                                icon={Star}
                                label="GitHub Stars"
                                value={stats.stars}
                                detail="Across all repos"
                            />
                            <MetricCard
                                icon={GitFork}
                                label="Active Forks"
                                value={stats.forks}
                                detail="Community derivatives"
                            />
                            <MetricCard
                                icon={Users}
                                label="Contributors"
                                value={stats.contributors}
                                detail="Including co-authors"
                            />
                            <MetricCard
                                icon={GitCommit}
                                label="Total Commits"
                                value={stats.totalCommits}
                                detail="Code contributions"
                            />
                            <MetricCard
                                icon={Code}
                                label="Lines of Code"
                                value={stats.totalLines}
                                detail="All repositories"
                            />
                            <MetricCard
                                icon={Clock}
                                label="Release Cycle"
                                value="2 weeks"
                                detail="Continuous delivery"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-8">
                            Top Contributors
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            {stats.topContributors.map((contributor, index) => (
                                <ContributorCard 
                                    key={contributor.login} 
                                    contributor={contributor} 
                                    rank={index + 1} 
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="flex flex-wrap items-center justify-between gap-6 p-6 
                               bg-zinc-900/50 border border-zinc-800 rounded-sm">
                    <div>
                        <h3 className="text-white font-medium mb-1">
                            Want to Contribute?
                        </h3>
                        <p className="text-sm text-zinc-400">
                            We welcome contributions of all sizes, from documentation to features.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://github.com/OmniCloudOrg/OmniCloud-Full" 
                           className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 
                                    border border-zinc-800 text-sm text-zinc-300 hover:text-white 
                                    transition-colors duration-200">
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                        <a href="/docs/contributing" 
                           className="inline-flex items-center gap-2 px-4 py-2 
                                    bg-cyan-400 hover:bg-cyan-500 text-black text-sm 
                                    transition-colors duration-200">
                            <ExternalLink className="w-4 h-4" />
                            Contributing Guide
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityMetrics;