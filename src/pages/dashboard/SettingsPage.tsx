export default function SettingsPage() {
  return (
    <div className="page">
      <h1>Settings</h1>
      <p>This page will hold account and workspace preferences.</p>

      <div className="card">
        <h2>Profile</h2>
        <p>Placeholder: name, email, profile settings.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Notifications</h2>
        <p>Placeholder: notifications for run completion and failures.</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Integrations</h2>
        <p>Placeholder: storage, webhooks, API keys.</p>
      </div>
    </div>
  );
}
