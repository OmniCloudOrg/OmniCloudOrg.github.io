"use client"

import React, { useEffect, useState } from 'react';
import { Star, GitFork, Users, Clock, Github, ExternalLink, GitCommit, LucideIcon } from 'lucide-react';

interface GitHubStats {
    stars: number;
    forks: number;
    contributors: number;
    totalCommits: number;
}

interface Repository {
    name: string;
}

interface MainRepoData {
    stargazers_count: number;
    forks_count: number;
    contributors_url: string;
}

const fetchGitHubStats = async (): Promise<GitHubStats> => {
    // First get the organization's repositories
    const reposResponse = await fetch('https://api.github.com/orgs/Omni-Forge/repos');
    const repos: Repository[] = await reposResponse.json();
    
    // Get the main repo stats
    const mainRepoResponse = await fetch('https://api.github.com/repos/Omni-Forge/OmniForge');
    const mainRepoData: MainRepoData = await mainRepoResponse.json();
    
    // Fetch commit counts for all repos
    const commitPromises = repos.map(async (repo: Repository) => {
        try {
            const commitsResponse = await fetch(`https://api.github.com/repos/Omni-Forge/${repo.name}/commits?per_page=1`);
            
            // Check if the response is ok
            if (!commitsResponse.ok) {
                console.warn(`Failed to fetch commits for ${repo.name}: ${commitsResponse.statusText}`);
                return 0;
            }

            const linkHeader = commitsResponse.headers.get('link');
            
            // If link header exists, extract last page number which is total commits
            if (linkHeader) {
                const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
                return matches ? parseInt(matches[1]) : 0;
            }
            
            // If no link header, get commits from response
            const commits = await commitsResponse.json();
            return Array.isArray(commits) ? commits.length : 0;
        } catch (error) {
            console.error(`Error fetching commits for ${repo.name}:`, error);
            return 0;
        }
    });
    
    const commitCounts = await Promise.all(commitPromises);
    const totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

    return {
        stars: mainRepoData.stargazers_count,
        forks: mainRepoData.forks_count,
        contributors: await fetchContributors(mainRepoData.contributors_url),
        totalCommits,
    };
};

const fetchContributors = async (url: string): Promise<number> => {
    const response = await fetch(url);
    const data = await response.json();
    return data.length;
};

interface MetricCardProps {
    icon: LucideIcon;
    label: string;
    value: number | string;
    detail: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, detail }) => (
    <div className="relative group">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm 
                      transition-colors duration-300 hover:border-cyan-900">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-black/40 text-cyan-400">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="font-mono text-2xl text-white mb-1">{value}</div>
                    <div className="text-sm text-zinc-400 mb-2">{label}</div>
                    <div className="text-xs text-zinc-500">{detail}</div>
                </div>
            </div>
        </div>
    </div>
);

const CommunityMetrics: React.FC = () => {
    const [stats, setStats] = useState<GitHubStats>({
        stars: 0,
        forks: 0,
        contributors: 0,
        totalCommits: 0
    });

    useEffect(() => {
        const getStats = async () => {
            const stats = await fetchGitHubStats();
            setStats(stats);
        };
        getStats();
    }, []);

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
                    
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Built in Public
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl">
                        Join our growing community of contributors building the future of deployment infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    <MetricCard
                        icon={Star}
                        label="GitHub Stars"
                        value={stats.stars}
                        detail=""
                    />
                    <MetricCard
                        icon={GitFork}
                        label="Active Forks"
                        value={stats.forks}
                        detail=""
                    />
                    <MetricCard
                        icon={Users}
                        label="Contributors"
                        value={stats.contributors}
                        detail=""
                    />
                    <MetricCard
                        icon={GitCommit}
                        label="Total Commits"
                        value={stats.totalCommits}
                        detail=""
                    />
                    <MetricCard
                        icon={Clock}
                        label="Release Cycle"
                        value="2 weeks"
                        detail=""
                    />
                </div>

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
                        <a href="https://github.com/Omni-Forge/OmniForge" 
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