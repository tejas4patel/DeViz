/**
 * Layout component for page structure and navigation
 */

import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { DeVizLogo } from '../story/components/DeVizLogo';
import { useState } from 'react';

type Props = {
  authenticated?: boolean;
};

export default function Layout({ authenticated = false }: Props) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: Replace with real auth state
  
  // Redirect to login if accessing protected routes without authentication
  if (authenticated && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="layout">
      <nav className="layout-nav">
        {!authenticated ? (
          // Public navigation
          <PublicNav currentPath={location.pathname} />
        ) : (
          // Authenticated dashboard navigation
          <DashboardNav currentPath={location.pathname} />
        )}
      </nav>
      
      <main className="layout-content">
        <Outlet />
      </main>
      
      {!authenticated && (
        <footer className="layout-footer">
          <div className="footer-content">
            <p>&copy; 2026 DeViz. Transform documents into engaging stories.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

function PublicNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-brand">
        <DeVizLogo size={28} variant="wordmark" onDark />
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={currentPath === '/' ? 'nav-link active' : 'nav-link'}>
          Home
        </Link>
        <Link to="/problem" className={currentPath === '/problem' ? 'nav-link active' : 'nav-link'}>
          Problem
        </Link>
        <Link to="/solution" className={currentPath === '/solution' ? 'nav-link active' : 'nav-link'}>
          Solution
        </Link>
        <Link to="/how-it-works" className={currentPath === '/how-it-works' ? 'nav-link active' : 'nav-link'}>
          How It Works
        </Link>
        <Link to="/demo" className={currentPath === '/demo' ? 'nav-link active' : 'nav-link'}>
          Demo
        </Link>
      </div>
      
      <div className="nav-auth">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-button primary">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

function DashboardNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="nav-container">
      <Link to="/dashboard" className="nav-brand">
        <DeVizLogo size={28} variant="wordmark" onDark />
      </Link>
      
      <div className="nav-links">
        <Link to="/dashboard" className={currentPath === '/dashboard' ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </Link>
        <Link to="/dashboard/upload" className={currentPath === '/dashboard/upload' ? 'nav-link active' : 'nav-link'}>
          Upload
        </Link>
      </div>
      
      <div className="nav-auth">
        <button className="nav-button secondary">
          Sign Out
        </button>
      </div>
    </div>
  );
}