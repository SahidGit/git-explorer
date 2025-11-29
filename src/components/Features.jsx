import React from 'react';
import { MdSearch, MdStar, MdDescription, MdBolt, MdDashboard } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const features = [
    {
        icon: <MdBolt className="w-6 h-6 text-[#E3B341]" />,
        title: 'Lightning Fast',
        description: 'Instantly find repositories with advanced filtering by language, stars, and trends.'
    },
    {
        icon: <MdSearch className="w-6 h-6 text-[#58A6FF]" />,
        title: 'Smart Search',
        description: 'Keep track of your favorite repositories and organize them with ease.'
    },
    {
        icon: <MdDescription className="w-6 h-6 text-[#F0F6FC]" />,
        title: 'Rich Docs',
        description: 'View READMEs and project details directly without leaving the dashboard.'
    },
    {
        icon: <FaGithub className="w-6 h-6 text-white" />,
        title: 'GitHub Sync',
        description: 'Seamlessly integrate with your GitHub account for a personalized experience.'
    },
    {
        icon: <MdStar className="w-6 h-6 text-[#E3B341]" />,
        title: 'Star Projects',
        description: 'Built on modern tech for instant page loads and smooth interactions.'
    },
    {
        icon: <MdDashboard className="w-6 h-6 text-[#7C3AED]" />,
        title: 'Modern UI',
        description: 'A clean, dark-mode interface designed for focus and productivity.'
    }
];

const Features = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-[#0D1117]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#0D1117] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#58A6FF]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F0F6FC] mb-4 font-sans">
                        Everything you need to <span className="text-[#58A6FF]">explore code</span>
                    </h2>
                    <p className="text-lg text-[#8B949E]">
                        Powerful features designed to help you discover, analyze, and manage open source projects efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]/50 hover:bg-[#1C2128] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D1117] group-hover:bg-[#21262D] transition-colors border border-[#30363D] group-hover:border-[#8B949E]">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[#F0F6FC] mb-3 group-hover:text-[#58A6FF] transition-colors font-sans">
                                {feature.title}
                            </h3>
                            <p className="text-[#8B949E] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
