    import React from 'react';

    const StatsSection: React.FC = () => {
        const stats = [
            { value: "99.99%", label: "Uptime Guarantee" },
            { value: "500M+", label: "Containers Deployed" },
            { value: "10k+", label: "Active Users" },
            { value: "150+", label: "Countries Served" }
        ];

        return (
            <section className="py-24 px-4 bg-gradient-to-b from-purple-900/20 via-black to-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-8 rounded-xl bg-gray-900/50 border border-gray-800">
                                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    export default StatsSection;
