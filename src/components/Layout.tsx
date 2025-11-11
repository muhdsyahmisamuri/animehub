import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSearchPage = location.pathname === '/search';

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Logo" className="logo-icon" />
            <span className="logo-text">Anime Hub</span>
          </Link>
          <nav className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isHomePage ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${isSearchPage ? 'active' : ''}`}
            >
              Search
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>
          Created by <a href="https://syahmisam.my/" target="_blank" rel="noopener noreferrer">Syahmi Samuri</a> © 2025
        </p>
        <p>
          Powered by <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">Jikan API</a> | Data from MyAnimeList
        </p>
      </footer>
    </div>
  );
}

export default Layout;

