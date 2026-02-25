import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 600);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page">
      <h1>Signing you in</h1>
      <p>Completing authentication and preparing your workspace.</p>
      <p style={{ opacity: 0.8 }}>Placeholder: integrate MSAL or your Azure auth library here.</p>
    </div>
  );
}
