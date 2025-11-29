import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({ onExplore, error, loading, onNavigate }) => {
    const [activeTab, setActiveTab] = useState('explore');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'explore') {
            onExplore();
        }
    };

    const handleTokenSave = (token) => {
        console.log('Token saved:', token);
    };

    return (
        <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC] font-sans">
            <Header
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onTokenSave={handleTokenSave}
                onNavigate={onNavigate}
            />
            <Hero onExplore={onExplore} />

            {error && (
                <div className="max-w-4xl mx-auto mt-8">
                    <ErrorMessage message={error} onRetry={onExplore} />
                </div>
            )}

            <Features />
            <FAQ />
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Home;
