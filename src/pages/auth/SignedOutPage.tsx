import { Link } from 'react-router-dom';

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
