import { Link } from 'react-router-dom';
import { DeVizLogo } from '../../story/components/DeVizLogo';

export default function RegisterPage() {
  function handleSignIn() {
    window.location.href = '/.auth/login/aad?post_login_redirect_uri=/dashboard';
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Link to="/"><DeVizLogo size={32} variant="wordmark" /></Link>
        </div>
        <h1 className="auth-title">Get access</h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: 0.75, fontSize: '0.9rem' }}>
          Access is managed through your Microsoft work or school account.
          Contact your administrator to request access.
        </p>
        <button type="button" className="btn-primary full-width" onClick={handleSignIn}>
          Sign in with Microsoft
        </button>
        <p className="auth-footer">
          Already have access? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
