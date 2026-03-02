import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    // Redirect to the SWA logout endpoint. SWA tears down the session and
    // redirects to post_logout_redirect_uri defined in staticwebapp.config.json.
    window.location.href = '/.auth/logout?post_logout_redirect_uri=/signed-out';
  }, []);

  return (
    <div className="page">
      <h1>Signing you out</h1>
      <p>Ending your session.</p>
    </div>
  );
}
