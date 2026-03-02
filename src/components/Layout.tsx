/**
 * Layout component for page structure and navigation
 */

import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { DeVizLogo } from '../story/components/DeVizLogo';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

type Props = {
  authenticated?: boolean;
};

export default function Layout({ authenticated = false }: Props) {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuthContext();

  // Wait for /.auth/me to resolve before deciding to redirect — prevents flash
  if (authenticated && loading) {
    return null;
  }

  if (authenticated && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="layout">
      <nav className="layout-nav">
        {!authenticated ? (
          <PublicNav currentPath={location.pathname} />
        ) : (
          <DashboardNav currentPath={location.pathname} />
        )}
      </nav>

      <main className="layout-content">
        <Outlet />
      </main>

      {!authenticated && location.pathname !== '/demo' && (
        <footer className="layout-footer">
          <div className="footer-content">
            <p>&copy; 2026 DeViz. Transform documents into engaging stories.</p>
            <div style={{ marginTop: 8, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

const PUBLIC_NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/problem', label: 'Problem', exact: true },
  { to: '/solution', label: 'Solution', exact: true },
  { to: '/how-it-works', label: 'How It Works', exact: true },
  { to: '/pricing', label: 'Pricing', exact: true },
  { to: '/examples', label: 'Examples', exact: true },
  { to: '/contact', label: 'Contact', exact: true },
] as const;

const DASHBOARD_NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', exact: true },
  { to: '/dashboard/upload', label: 'Upload', exact: true },
  { to: '/dashboard/runs', label: 'Runs', exact: false },
  { to: '/dashboard/settings', label: 'Settings', exact: true },
] as const;

function isActive(linkTo: string, currentPath: string, exact: boolean) {
  return exact ? currentPath === linkTo : currentPath.startsWith(linkTo);
}

function PublicNav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <div className="nav-container">
      <Link to="/" className="nav-brand" onClick={close}>
        <DeVizLogo size={28} variant="wordmark" onDark />
      </Link>

      <div className="nav-links">
        {PUBLIC_NAV_LINKS.map(({ to, label, exact }) => (
          <Link key={to} to={to} className={isActive(to, currentPath, exact) ? 'nav-link active' : 'nav-link'}>
            {label}
          </Link>
        ))}
      </div>

      <div className="nav-auth">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-button primary">Sign Up</Link>
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>

      {menuOpen && (
        <>
          <div className="nav-mobile-backdrop" onClick={close} aria-hidden="true" />
          <div className="nav-mobile-menu">
            {PUBLIC_NAV_LINKS.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                className={isActive(to, currentPath, exact) ? 'nav-link active' : 'nav-link'}
                onClick={close}
              >
                {label}
              </Link>
            ))}
            <div className="nav-mobile-auth">
              <Link to="/login" className="nav-link" onClick={close}>Login</Link>
              <Link to="/register" className="nav-button primary" onClick={close}>Sign Up</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DashboardNav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <div className="nav-container">
      <Link to="/dashboard" className="nav-brand" onClick={close}>
        <DeVizLogo size={28} variant="wordmark" onDark />
      </Link>

      <div className="nav-links">
        {DASHBOARD_NAV_LINKS.map(({ to, label, exact }) => (
          <Link key={to} to={to} className={isActive(to, currentPath, exact) ? 'nav-link active' : 'nav-link'}>
            {label}
          </Link>
        ))}
      </div>

      <div className="nav-auth">
        <Link to="/logout" className="nav-button secondary">Sign Out</Link>
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>

      {menuOpen && (
        <>
          <div className="nav-mobile-backdrop" onClick={close} aria-hidden="true" />
          <div className="nav-mobile-menu">
            {DASHBOARD_NAV_LINKS.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                className={isActive(to, currentPath, exact) ? 'nav-link active' : 'nav-link'}
                onClick={close}
              >
                {label}
              </Link>
            ))}
            <div className="nav-mobile-auth">
              <Link to="/logout" className="nav-button secondary" onClick={close}>Sign Out</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
