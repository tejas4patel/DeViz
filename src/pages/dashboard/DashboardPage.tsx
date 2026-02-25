import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/dashboard/upload" className="btn-primary">
          + New Story
        </Link>
      </div>

      <div className="dashboard-empty">
        <div className="empty-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="56" height="56" rx="14" fill="rgba(36,72,85,0.08)" />
            <rect x="16" y="14" width="16" height="22" rx="3" fill="#244855" opacity="0.3" />
            <rect x="24" y="18" width="16" height="22" rx="3" fill="#244855" opacity="0.5" />
            <rect x="20" y="22" width="16" height="22" rx="3" fill="#244855" opacity="0.85" />
            <rect x="23" y="26" width="10" height="1.5" rx="1" fill="#FBE9D0" opacity="0.8" />
            <rect x="23" y="30" width="7" height="1.5" rx="1" fill="#FBE9D0" opacity="0.6" />
            <rect x="23" y="34" width="8" height="1.5" rx="1" fill="#FBE9D0" opacity="0.6" />
          </svg>
        </div>
        <h2>No stories yet</h2>
        <p>Upload a document to generate your first structured story.</p>
        <Link to="/dashboard/upload" className="btn-primary">
          Upload Document
        </Link>
      </div>
    </div>
  );
}
