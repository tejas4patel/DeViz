import { Link } from 'react-router-dom';

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
              <Link to={`/dashboard/runs/${r.id}`}>{r.id}</Link>
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
