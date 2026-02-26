import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeVizLogo } from '../../story/components/DeVizLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('demo-auth', 'true');
    navigate('/dashboard/upload', { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Link to="/"><DeVizLogo size={32} variant="wordmark" /></Link>
        </div>
        <h1 className="auth-title">Sign in</h1>

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
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">
              Password
              <Link to="/forgot-password" className="auth-field-link">Forgot password?</Link>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary full-width">Sign in</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
