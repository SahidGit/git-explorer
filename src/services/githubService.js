import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

const api = axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});

export const setGithubToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `token ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const searchRepositories = async ({ query, sort = 'stars', order = 'desc', page = 1, perPage = 30 }) => {
    try {
        const q = query || 'stars:>1000';
        const response = await api.get('/search/repositories', {
            params: {
                q,
                sort,
                order,
                page,
                per_page: perPage,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching repositories:', error);
        throw error;
    }
};

export const getTrendingRepositories = async (language = '', since = 'daily') => {
    // Note: GitHub API doesn't have a direct "trending" endpoint like the website.
    // We simulate it by searching for created date.
    const date = new Date();
    if (since === 'daily') date.setDate(date.getDate() - 1);
    else if (since === 'weekly') date.setDate(date.getDate() - 7);
    else if (since === 'monthly') date.setMonth(date.getMonth() - 1);

    const dateStr = date.toISOString().split('T')[0];
    const query = `created:>${dateStr}${language ? ` language:${language}` : ''}`;

    return searchRepositories({ query, sort: 'stars', order: 'desc' });
};

export const getRepositoryDetails = async (owner, repo) => {
    try {
        const [repoData, languages, contributors] = await Promise.all([
            api.get(`/repos/${owner}/${repo}`),
            api.get(`/repos/${owner}/${repo}/languages`),
            api.get(`/repos/${owner}/${repo}/contributors?per_page=10`),
        ]);

        return {
            ...repoData.data,
            languages: languages.data,
            contributors: contributors.data,
        };
    } catch (error) {
        console.error('Error fetching repository details:', error);
        throw error;
    }
};

export const getRepositoryActivity = async (owner, repo) => {
    try {
        // Get commit activity for the last year
        const response = await api.get(`/repos/${owner}/${repo}/stats/commit_activity`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repository activity:', error);
        return [];
    }
};
