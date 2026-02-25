import { Link } from 'react-router-dom';

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
