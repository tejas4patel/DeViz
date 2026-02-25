import { Link, useParams } from 'react-router-dom';

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
