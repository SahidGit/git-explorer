import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import RepositoryList from '../components/RepositoryList';
import BookmarksPanel from '../components/BookmarksPanel';
import RepositoryDetail from '../components/RepositoryDetail';
import * as githubService from '../services/githubService';
import { storageService } from '../services/storageService';

const Dashboard = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('explore');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [filters, setFilters] = useState({
        query: '',
        language: '',
        sort: 'stars',
        since: 'daily'
    });

    useEffect(() => {
        if (activeTab === 'explore') {
            fetchRepositories();
        }
    }, [filters, activeTab]);

    const fetchRepositories = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (filters.query) {
                // searchRepositories expects an object
                data = await githubService.searchRepositories({
                    query: filters.query,
                    sort: filters.sort,
                    language: filters.language
                });
            } else {
                data = await githubService.getTrendingRepositories(filters.language, filters.since);
            }
            // The API returns { items: [] } for search, but getTrending might return items directly?
            // Let's check githubService.js again. 
            // searchRepositories returns response.data which is { total_count, incomplete_results, items }
            // getTrendingRepositories calls searchRepositories.
            // So data will be { items: [...] }
            setRepositories(data.items || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBookmarkToggle = (repo) => {
        storageService.toggleBookmark(repo);
        // Force update if needed, but for now relying on parent/child updates
    };

    const handleTokenSave = (token) => {
        storageService.saveToken(token);
        // Optionally reload or show success message
    };

    return (
        <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC] font-sans">
            <Header
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onTokenSave={handleTokenSave}
            />

            <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {activeTab === 'explore' && (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Explore Repositories</h1>
                            <p className="text-slate-400">Discover trending projects and popular codebases.</p>
                        </div>

                        <FilterPanel filters={filters} onFilterChange={setFilters} />

                        <RepositoryList
                            repositories={repositories}
                            loading={loading}
                            error={error}
                            onRetry={fetchRepositories}
                            onRepoClick={setSelectedRepo}
                            onBookmarkToggle={handleBookmarkToggle}
                            isBookmarked={(id) => storageService.isBookmarked(id)}
                        />
                    </>
                )}

                {activeTab === 'bookmarks' && (
                    <BookmarksPanel
                        onRepoClick={setSelectedRepo}
                        onBookmarkToggle={handleBookmarkToggle}
                    />
                )}
            </main>

            {selectedRepo && (
                <RepositoryDetail
                    repo={selectedRepo}
                    onClose={() => setSelectedRepo(null)}
                    onBookmarkToggle={handleBookmarkToggle}
                    isBookmarked={storageService.isBookmarked(selectedRepo.id)}
                />
            )}
        </div>
    );
};

export default Dashboard;
