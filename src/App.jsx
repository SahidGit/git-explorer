import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InfoPage from './pages/InfoPage';
import './styles/App.css';

const PAGES_CONTENT = {
  features: {
    title: 'Features',
    content: `Advanced search & filters: Quickly find exactly what you're looking for with powerful search tools and customizable filters designed to refine results based on your preferences.`
  },
  changelog: {
    title: 'Changelog',
    content: `Discover all the latest updates, improvements, and feature releases in one place, so you never miss important changes or enhancements.`
  },
  docs: {
    title: 'Documentation',
    content: `Access comprehensive guides, step-by-step tutorials, and detailed instructions designed to help you understand and utilize all features effectively.`
  },
  api: {
    title: 'API Reference',
    content: `Explore the GitHub API documentation that provides developers with all necessary endpoints, request formats, and usage examples for seamless integration.`
  },
  community: {
    title: 'Community',
    content: `Join the discussion forums where you can connect with other users, ask questions, share insights, and engage in meaningful conversations about the platform.`
  },
  blog: {
    title: 'Blog',
    content: `Read the latest technical articles and industry news, featuring expert opinions, tips, and case studies that keep you informed about developments and best practices.`
  }
};

function App() {
  const [view, setView] = useState('landing');
  const [activeInfoPage, setActiveInfoPage] = useState(null);

  const handleNavigate = (page) => {
    if (page === 'dashboard' || page === 'landing') {
      setView(page);
      setActiveInfoPage(null);
    } else if (PAGES_CONTENT[page]) {
      setActiveInfoPage(page);
      setView('info');
    }
  };

  return (
    <>
      {view === 'landing' ? (
        <Home onExplore={() => setView('dashboard')} onNavigate={handleNavigate} />
      ) : view === 'dashboard' ? (
        <Dashboard onBack={() => setView('landing')} />
      ) : (
        <InfoPage
          title={PAGES_CONTENT[activeInfoPage]?.title}
          content={PAGES_CONTENT[activeInfoPage]?.content}
          onBack={() => setView('landing')}
        />
      )}
    </>
  );
}

export default App;
