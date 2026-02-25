export default function ScenePlaceholder(props: { title: string; description: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '48px 32px',
        gap: '20px',
        textAlign: 'center',
      }}
    >
      {/* Decorative lines icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="#EEF1F5" />
        <rect x="12" y="20" width="24" height="3" rx="1.5" fill="#CBD5E1" />
        <rect x="16" y="26" width="16" height="3" rx="1.5" fill="#CBD5E1" />
        <rect x="19" y="32" width="10" height="3" rx="1.5" fill="#CBD5E1" />
      </svg>

      {/* Description */}
      <p
        style={{
          fontSize: '15px',
          color: '#475569',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: 0,
        }}
      >
        {props.description}
      </p>

      {/* Coming soon badge */}
      <span
        style={{
          display: 'inline-block',
          padding: '4px 14px',
          background: '#F1F5F9',
          borderRadius: '100px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#94A3B8',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Coming Soon
      </span>
    </div>
  );
}
