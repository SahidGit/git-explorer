const STORAGE_KEYS = {
    BOOKMARKS: 'gitexplorer_bookmarks',
    NOTES: 'gitexplorer_notes',
    THEME: 'gitexplorer_theme',
    TOKEN: 'gitexplorer_token',
};

export const storageService = {
    // Bookmarks
    getBookmarks: () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error reading bookmarks:', e);
            return [];
        }
    },

    toggleBookmark: (repo) => {
        const bookmarks = storageService.getBookmarks();
        const exists = bookmarks.find((b) => b.id === repo.id);

        let newBookmarks;
        if (exists) {
            newBookmarks = bookmarks.filter((b) => b.id !== repo.id);
        } else {
            newBookmarks = [...bookmarks, repo];
        }

        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(newBookmarks));
        return newBookmarks;
    },

    isBookmarked: (repoId) => {
        const bookmarks = storageService.getBookmarks();
        return bookmarks.some((b) => b.id === repoId);
    },

    // Notes
    getNote: (repoId) => {
        try {
            const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
            return notes[repoId] || '';
        } catch (e) {
            return '';
        }
    },

    saveNote: (repoId, content) => {
        try {
            const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
            notes[repoId] = content;
            localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
        } catch (e) {
            console.error('Error saving note:', e);
        }
    },

    // Token
    getToken: () => {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    },

    saveToken: (token) => {
        if (token) {
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        } else {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
    },
};
