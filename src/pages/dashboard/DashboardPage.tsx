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
        <div className="empty-icon">📚</div>
        <h2>No stories yet</h2>
        <p>Upload a document to generate your first structured story.</p>
        <Link to="/dashboard/upload" className="btn-primary">
          Upload Document
        </Link>
      </div>
    </div>
  );
}
