import React from 'react';
import { Search, Filter, Calendar, Star, Code, GitFork } from 'lucide-react';

const LANGUAGES = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go',
    'Rust', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin'
];

const FilterPanel = ({ filters, onFilterChange }) => {
    return (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search */}
                <div className="md:col-span-5 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={filters.query}
                        onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Language Filter */}
                <div className="md:col-span-3 relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={filters.language}
                        onChange={(e) => onFilterChange({ ...filters, language: e.target.value })}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="">All Languages</option>
                        {LANGUAGES.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Sort Filter */}
                <div className="md:col-span-2 relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={filters.sort}
                        onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="stars">Most Stars</option>
                        <option value="forks">Most Forks</option>
                        <option value="updated">Recently Updated</option>
                    </select>
                </div>

                {/* Time Range (only for trending) */}
                <div className="md:col-span-2 relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={filters.since}
                        onChange={(e) => onFilterChange({ ...filters, since: e.target.value })}
                        disabled={!!filters.query}
                        className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer ${filters.query ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <option value="daily">Today</option>
                        <option value="weekly">This Week</option>
                        <option value="monthly">This Month</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
