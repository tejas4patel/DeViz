import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeVizLogo } from '../../story/components/DeVizLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Link to="/"><DeVizLogo size={32} variant="wordmark" /></Link>
        </div>

        {submitted ? (
          <>
            <h1 className="auth-title">Check your email</h1>
            <p className="auth-subtitle">
              If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
            </p>
            <Link to="/login" className="btn-primary full-width" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem' }}>
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            <h1 className="auth-title">Reset password</h1>
            <p className="auth-subtitle">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-primary full-width">Send reset link</button>
            </form>

            <p className="auth-footer">
              Remember your password? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
