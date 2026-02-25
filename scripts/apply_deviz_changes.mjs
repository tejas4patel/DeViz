// File: scripts/apply_deviz_changes.mjs
// Run from repo root with:
// node scripts/apply_deviz_changes.mjs

import fs from "fs";
import path from "path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const pagesDir = path.join(srcDir, "pages");
const authDir = path.join(pagesDir, "auth");
const dashDir = path.join(pagesDir, "dashboard");
const componentsDir = path.join(srcDir, "components");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileAlways(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Wrote ${path.relative(root, filePath)}`);
}

function writeFileIfMissing(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    console.log(`Exists ${path.relative(root, filePath)}`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created ${path.relative(root, filePath)}`);
}

ensureDir(pagesDir);
ensureDir(authDir);
ensureDir(dashDir);
ensureDir(componentsDir);

const appTsx = `/**
 * Main application component with routing structure
 */

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ProblemPage from './pages/ProblemPage';
import SolutionPage from './pages/SolutionPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DemoPage from './pages/DemoPage';

import PricingPage from './pages/PricingPage';
import ExamplesGalleryPage from './pages/ExamplesGalleryPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import LogoutPage from './pages/auth/LogoutPage';
import SignedOutPage from './pages/auth/SignedOutPage';
import AccessDeniedPage from './pages/auth/AccessDeniedPage';

import DashboardPage from './pages/dashboard/DashboardPage';
import UploadPage from './pages/dashboard/UploadPage';
import ProcessingPage from './pages/dashboard/ProcessingPage';
import StoryViewer from './pages/dashboard/StoryViewer';
import RunsPage from './pages/dashboard/RunsPage';
import RunDetailPage from './pages/dashboard/RunDetailPage';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <Routes>
      {/* Public marketing routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="problem" element={<ProblemPage />} />
        <Route path="solution" element={<SolutionPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="demo" element={<DemoPage />} />

        <Route path="pricing" element={<PricingPage />} />
        <Route path="examples" element={<ExamplesGalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>

      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Azure auth integration placeholders */}
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signed-out" element={<SignedOutPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {/* Authenticated dashboard routes */}
      <Route path="/dashboard" element={<Layout authenticated />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="processing/:jobId" element={<ProcessingPage />} />
        <Route path="story/:storyId" element={<StoryViewer />} />

        <Route path="runs" element={<RunsPage />} />
        <Route path="runs/:runId" element={<RunDetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
`;

const layoutTsx = `/**
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
  const [isAuthenticated] = useState(false); // TODO: Replace with real auth state

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
        <Link
          to="/how-it-works"
          className={currentPath === '/how-it-works' ? 'nav-link active' : 'nav-link'}
        >
          How It Works
        </Link>
        <Link to="/demo" className={currentPath === '/demo' ? 'nav-link active' : 'nav-link'}>
          Demo
        </Link>

        <Link to="/pricing" className={currentPath === '/pricing' ? 'nav-link active' : 'nav-link'}>
          Pricing
        </Link>
        <Link
          to="/examples"
          className={currentPath === '/examples' ? 'nav-link active' : 'nav-link'}
        >
          Examples
        </Link>
        <Link to="/contact" className={currentPath === '/contact' ? 'nav-link active' : 'nav-link'}>
          Contact
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
        <Link
          to="/dashboard/upload"
          className={currentPath === '/dashboard/upload' ? 'nav-link active' : 'nav-link'}
        >
          Upload
        </Link>
        <Link
          to="/dashboard/runs"
          className={currentPath.startsWith('/dashboard/runs') ? 'nav-link active' : 'nav-link'}
        >
          Runs
        </Link>
        <Link
          to="/dashboard/settings"
          className={currentPath === '/dashboard/settings' ? 'nav-link active' : 'nav-link'}
        >
          Settings
        </Link>
      </div>

      <div className="nav-auth">
        <Link to="/logout" className="nav-button secondary">
          Sign Out
        </Link>
      </div>
    </div>
  );
}
`;

writeFileAlways(path.join(srcDir, "App.tsx"), appTsx);
writeFileAlways(path.join(componentsDir, "Layout.tsx"), layoutTsx);

writeFileIfMissing(
  path.join(pagesDir, "PricingPage.tsx"),
  `import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className="page">
      <h1>Pricing</h1>
      <p>This is placeholder content for pricing. Replace with real plans, limits, and billing details.</p>

      <section className="card">
        <h2>Starter</h2>
        <p>Quick experiments and lightweight usage.</p>
        <ul>
          <li>Limited runs per month</li>
          <li>Basic visual story outputs</li>
          <li>Community support</li>
        </ul>
      </section>

      <section className="card">
        <h2>Pro</h2>
        <p>For creators and teams shipping DeViz stories regularly.</p>
        <ul>
          <li>More runs and larger documents</li>
          <li>More output formats</li>
          <li>Priority support</li>
        </ul>
      </section>

      <section className="card">
        <h2>Enterprise</h2>
        <p>Production integrations and governance.</p>
        <ul>
          <li>Higher limits and SLAs</li>
          <li>Team roles and auditability</li>
          <li>Integration support</li>
        </ul>
      </section>

      <div style={{ marginTop: 24 }}>
        <Link to="/register" className="nav-button primary">Create an account</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(pagesDir, "ExamplesGalleryPage.tsx"),
  `import { Link } from 'react-router-dom';

const examples = [
  { title: 'Research article to storyboard', caption: 'Turns dense sections into a guided visual narrative.' },
  { title: 'Policy memo to explainer flow', caption: 'Highlights key decisions, tradeoffs, and consequences.' },
  { title: 'Technical spec to diagram set', caption: 'Extracts entities, steps, and dependencies into visuals.' },
];

export default function ExamplesGalleryPage() {
  return (
    <div className="page">
      <h1>Examples</h1>
      <p>This page will showcase before and after transformations with short explanations of what DeViz extracted.</p>

      <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        {examples.map((ex) => (
          <div key={ex.title} className="card">
            <h2 style={{ marginTop: 0 }}>{ex.title}</h2>
            <p>{ex.caption}</p>
            <p style={{ opacity: 0.8 }}>
              Placeholder: add input excerpt, output preview, and a note about structure decisions.
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to="/demo" className="nav-button primary">Try the demo</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(pagesDir, "ContactPage.tsx"),
  `export default function ContactPage() {
  return (
    <div className="page">
      <h1>Contact</h1>
      <p>This is placeholder content. Add a form, support address, and sales contact if needed.</p>

      <div className="card">
        <h2>General inquiries</h2>
        <p>Placeholder: name, email, message, submit button.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Support</h2>
        <p>Placeholder: support email and response time expectations.</p>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(pagesDir, "TermsPage.tsx"),
  `export default function TermsPage() {
  return (
    <div className="page">
      <h1>Terms of Service</h1>
      <p>This is placeholder content. Replace with real terms before launch.</p>

      <h2>Service</h2>
      <p>DeViz transforms documents into visual stories and related artifacts.</p>

      <h2>Acceptable use</h2>
      <p>Users must only upload content they have rights to use and must follow all applicable laws.</p>

      <h2>Availability</h2>
      <p>Define uptime targets, maintenance windows, and support expectations per plan.</p>

      <h2>Limitation of liability</h2>
      <p>Add standard limitation language appropriate for your business.</p>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(pagesDir, "PrivacyPage.tsx"),
  `export default function PrivacyPage() {
  return (
    <div className="page">
      <h1>Privacy Policy</h1>
      <p>This is placeholder content. Replace with your real policy before launch.</p>

      <h2>What we collect</h2>
      <p>Account identifiers, usage telemetry, and uploaded content needed to provide the service.</p>

      <h2>How we use data</h2>
      <p>To operate DeViz, improve reliability, and support user requested features.</p>

      <h2>Data retention</h2>
      <p>Define retention windows per plan and provide deletion controls.</p>

      <h2>Contact</h2>
      <p>Provide a support contact for privacy requests.</p>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(pagesDir, "NotFoundPage.tsx"),
  `import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="nav-button primary">Go to home</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(authDir, "AuthCallbackPage.tsx"),
  `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 600);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page">
      <h1>Signing you in</h1>
      <p>Completing authentication and preparing your workspace.</p>
      <p style={{ opacity: 0.8 }}>Placeholder: integrate MSAL or your Azure auth library here.</p>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(authDir, "LogoutPage.tsx"),
  `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/signed-out', { replace: true }), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page">
      <h1>Signing you out</h1>
      <p>Ending your session.</p>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(authDir, "SignedOutPage.tsx"),
  `import { Link } from 'react-router-dom';

export default function SignedOutPage() {
  return (
    <div className="page">
      <h1>You are signed out</h1>
      <p>Thanks for using DeViz.</p>
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="nav-button primary">Return home</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(authDir, "AccessDeniedPage.tsx"),
  `import { Link } from 'react-router-dom';

export default function AccessDeniedPage() {
  return (
    <div className="page">
      <h1>Access denied</h1>
      <p>Your account is signed in, but it does not have permission to view this page.</p>
      <p style={{ opacity: 0.8 }}>Placeholder: add guidance for requesting access and role requirements.</p>
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="nav-button primary">Go to home</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(dashDir, "RunsPage.tsx"),
  `import { Link } from 'react-router-dom';

const mockRuns = [
  { id: 'run_001', status: 'Complete', updated: 'Recently' },
  { id: 'run_002', status: 'Processing', updated: 'Recently' },
  { id: 'run_003', status: 'Failed', updated: 'Recently' },
];

export default function RunsPage() {
  return (
    <div className="page">
      <h1>Runs</h1>
      <p>This page will list workflow executions, status, and links to outputs.</p>

      <div className="card">
        <h2>Recent runs</h2>
        <ul>
          {mockRuns.map((r) => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <Link to={\`/dashboard/runs/\${r.id}\`}>{r.id}</Link>
              <span style={{ marginLeft: 8, opacity: 0.8 }}>{r.status}</span>
              <span style={{ marginLeft: 8, opacity: 0.6 }}>{r.updated}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/dashboard/upload" className="nav-button primary">Start a new run</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(dashDir, "RunDetailPage.tsx"),
  `import { Link, useParams } from 'react-router-dom';

export default function RunDetailPage() {
  const { runId } = useParams();

  return (
    <div className="page">
      <h1>Run details</h1>
      <p style={{ opacity: 0.8 }}>Run ID: {runId}</p>

      <div className="card">
        <h2>Status</h2>
        <p>Placeholder: status, timestamps, progress, and step results.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Artifacts</h2>
        <p>Placeholder: story output, visuals, exports, and links.</p>
        <p>
          Example link
          <span style={{ marginLeft: 8 }}>
            <Link to="/dashboard/story/example_story_id">Open story viewer</Link>
          </span>
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Logs</h2>
        <p>Placeholder: step logs, warnings, and errors for troubleshooting.</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/dashboard/runs" className="nav-button secondary">Back to runs</Link>
      </div>
    </div>
  );
}
`
);

writeFileIfMissing(
  path.join(dashDir, "SettingsPage.tsx"),
  `export default function SettingsPage() {
  return (
    <div className="page">
      <h1>Settings</h1>
      <p>This page will hold account and workspace preferences.</p>

      <div className="card">
        <h2>Profile</h2>
        <p>Placeholder: name, email, profile settings.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Notifications</h2>
        <p>Placeholder: notifications for run completion and failures.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Integrations</h2>
        <p>Placeholder: storage, webhooks, API keys.</p>
      </div>
    </div>
  );
}
`
);

console.log("");
console.log("All changes applied.");
console.log("Next run your dev server with npm run dev");