import React from 'react';
import { ArrowLeft } from 'lucide-react';

const InfoPage = ({ title, content, onBack }) => {
    return (
        <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC] font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[#8B949E] hover:text-[#58A6FF] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#BC8CFF]">
                    {title}
                </h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    {content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                            <p key={index} className="text-[#8B949E] mb-6 leading-relaxed">
                                {paragraph}
                            </p>
                        )
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InfoPage;
