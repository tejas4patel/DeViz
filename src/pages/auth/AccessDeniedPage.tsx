import { Link } from 'react-router-dom';

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
