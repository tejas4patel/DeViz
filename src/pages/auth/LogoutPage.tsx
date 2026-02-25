import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/signed-out', { replace: true }), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page">
      <h1>Signing you out</h1>
      <p>Ending your session.</p>
    </div>
  );
}
