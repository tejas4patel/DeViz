import { Link } from 'react-router-dom';
import { DeVizLogo } from '../../story/components/DeVizLogo';

export default function LoginPage() {
  function handleSignIn() {
    window.location.href = '/.auth/login/aad?post_login_redirect_uri=/dashboard';
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Link to="/"><DeVizLogo size={32} variant="wordmark" /></Link>
        </div>
        <h1 className="auth-title">Sign in</h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: 0.75, fontSize: '0.9rem' }}>
          DeViz uses your Microsoft work or school account.
        </p>
        <button type="button" className="btn-primary full-width" onClick={handleSignIn}>
          Sign in with Microsoft
        </button>
        <p className="auth-footer">
          Don&apos;t have an account? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
