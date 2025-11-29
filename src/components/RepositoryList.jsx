import React from 'react';
import { Star, GitFork, Eye, Bookmark, ExternalLink, Search } from 'lucide-react';
import { formatNumber, getRelativeTime } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const RepositoryList = ({
    repositories,
    loading,
    error,
    onRetry,
    onRepoClick,
    onBookmarkToggle,
    isBookmarked
}) => {
    if (loading) return <LoadingSpinner />;

    if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

    if (!repositories || repositories.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="bg-slate-800/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No repositories found</h3>
                <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {repositories.map((repo) => (
                <div
                    key={repo.id}
                    className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer flex flex-col h-full"
                    onClick={() => window.open(repo.html_url, '_blank')}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={repo.owner.avatar_url}
                                alt={repo.owner.login}
                                className="w-10 h-10 rounded-full border border-slate-600"
                            />
                            <div>
                                <h3 className="font-semibold text-blue-400 group-hover:text-blue-300 truncate max-w-[160px]">
                                    {repo.name}
                                </h3>
                                <p className="text-xs text-slate-400 hover:underline" onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(repo.owner.html_url, '_blank');
                                }}>
                                    {repo.owner.login}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmarkToggle(repo);
                            }}
                            className={`p-2 rounded-lg transition-colors ${isBookmarked(repo.id)
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            <Bookmark className={`w-4 h-4 ${isBookmarked(repo.id) ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-2 flex-grow">
                        {repo.description || 'No description available'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                            <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                {repo.language}
                            </span>
                        )}
                        <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50">
                            {formatNumber(repo.size)} KB
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-700/50 mt-auto">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1" title="Stars">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{formatNumber(repo.stargazers_count)}</span>
                            </div>
                            <div className="flex items-center gap-1" title="Forks">
                                <GitFork className="w-4 h-4 text-slate-500" />
                                <span>{formatNumber(repo.forks_count)}</span>
                            </div>
                        </div>
                        <span className="text-xs text-slate-500">
                            {getRelativeTime(repo.updated_at)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};



export default RepositoryList;
