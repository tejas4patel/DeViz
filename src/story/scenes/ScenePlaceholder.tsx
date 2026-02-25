import { FileText } from 'lucide-react';

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
      <div style={{
        background: '#EEF1F5',
        borderRadius: '12px',
        padding: '12px',
        display: 'inline-flex'
      }}>
        <FileText size={24} color="#CBD5E1" strokeWidth={2} />
      </div>

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
