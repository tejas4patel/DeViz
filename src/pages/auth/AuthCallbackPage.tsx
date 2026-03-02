import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Azure SWA handles the real OAuth callback internally at /.auth/login/aad/callback.
    // This React route is kept for backwards-compatibility only.
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return (
    <div className="page">
      <h1>Redirecting&hellip;</h1>
    </div>
  );
}
