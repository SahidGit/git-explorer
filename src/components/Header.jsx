import React, { useState, useEffect } from 'react';
import { Github, Search, Bookmark, Settings, X, Menu } from 'lucide-react';

const Header = ({ activeTab, onTabChange, onTokenSave, onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        onTokenSave(token);
        setShowTokenInput(false);
        setToken('');
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className={`mx-auto rounded-2xl transition-all duration-300 ${isScrolled
                            ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg px-6 py-3'
                            : 'bg-transparent px-0 py-2'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => onTabChange('explore')}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                                        <Github className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-white tracking-tight">
                                    Git<span className="text-indigo-400">Explorer</span>
                                </span>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
                                <button
                                    onClick={() => onTabChange('explore')}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'explore'
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Search className="w-4 h-4" />
                                    Explore
                                </button>
                                <button
                                    onClick={() => onTabChange('bookmarks')}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'bookmarks'
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Bookmark className="w-4 h-4" />
                                    Bookmarks
                                </button>
                            </nav>

                            {/* Actions */}
                            <div className="hidden md:flex items-center gap-4">
                                <button
                                    onClick={() => setShowTokenInput(!showTokenInput)}
                                    className="p-2 text-slate-400 hover:text-white transition-colors relative group"
                                    title="API Settings"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden flex items-center justify-center w-9 h-9 p-0 text-white hover:bg-transparent transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <svg className="pointer-events-none w-[18px] h-[18px] fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] translate-x-[7px]" y="7" width="9" height="2" rx="1"></rect>
                                        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] rotate-0 opacity-100" y="7" width="16" height="2" rx="1"></rect>
                                        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px]" y="7" width="9" height="2" rx="1"></rect>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-[#0D1117]/95 backdrop-blur-xl md:hidden flex flex-col animate-in fade-in duration-200">
                    <div className="flex justify-end p-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8">
                        <div className="space-y-6 text-center w-full max-w-sm">
                            <button
                                onClick={() => {
                                    onTabChange('explore');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full py-3 text-2xl font-bold text-white hover:text-indigo-400 transition-colors border-b border-white/5"
                            >
                                Explore
                            </button>
                            <button
                                onClick={() => {
                                    onTabChange('bookmarks');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full py-3 text-2xl font-bold text-white hover:text-indigo-400 transition-colors border-b border-white/5"
                            >
                                Bookmarks
                            </button>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button onClick={() => { onNavigate('features'); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                                    Features
                                </button>
                                <button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                                    Trending
                                </button>
                                <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                                    Blog
                                </button>
                                <button onClick={() => { onNavigate('community'); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                                    Community
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setShowTokenInput(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full mt-8 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                API Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Token Input Modal */}
            {showTokenInput && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">GitHub API Token</h3>
                            <button onClick={() => setShowTokenInput(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">
                            Add a personal access token to increase API rate limits (5000 requests/hour).
                        </p>
                        <form onSubmit={handleTokenSubmit}>
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="ghp_..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mb-4 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                Save Token
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
