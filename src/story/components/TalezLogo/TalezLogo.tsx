import { useId } from 'react';
import type { CSSProperties } from 'react';

type Variant = 'icon' | 'wordmark';

type Props = {
  size?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
};

export default function TalezLogo({ size = 44, variant = 'icon', className, style }: Props) {
  const uid = useId().replace(/:/g, '');
  const bgId = `tlz-bg-${uid}`;
  const arcId = `tlz-arc-${uid}`;
  const shineId = `tlz-shine-${uid}`;
  const glowId = `tlz-glow-${uid}`;

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Talez.ai"
      role="img"
      className={variant === 'icon' ? className : undefined}
      style={variant === 'icon' ? style : undefined}
    >
      <defs>
        {/* Rich deep-navy background gradient */}
        <linearGradient id={bgId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#233060" />
          <stop offset="100%" stopColor="#141E35" />
        </linearGradient>

        {/* Story-arc gradient: corporate blue → teal insight */}
        <linearGradient id={arcId} x1="6" y1="38" x2="38" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#2F6FED" />
          <stop offset="100%" stopColor="#2BB0A6" />
        </linearGradient>

        {/* Subtle top-left shine */}
        <radialGradient id={shineId} cx="28%" cy="22%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Soft glow filter for end node */}
        <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Background ── */}
      <rect width="44" height="44" rx="10" fill={`url(#${bgId})`} />
      <rect width="44" height="44" rx="10" fill={`url(#${shineId})`} />

      {/* ── T letterform ── */}
      {/* Crossbar */}
      <rect x="7" y="11" width="30" height="5" rx="2.5" fill="white" opacity="0.95" />
      {/* Vertical stem */}
      <rect x="19.5" y="11" width="5" height="21" rx="2.5" fill="white" opacity="0.95" />

      {/* ── Story arc: data narrative rising from origin to insight ── */}
      {/* Subtle shadow trail for depth */}
      <path
        d="M 6 38 C 12 25, 28 17, 38 6"
        stroke="rgba(43,176,166,0.15)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Main arc */}
      <path
        d="M 6 38 C 12 25, 28 17, 38 6"
        stroke={`url(#${arcId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Data story nodes ── */}
      {/* Origin node — data gathering */}
      <circle cx="6" cy="38" r="3" fill="#3B82F6" opacity="0.9" />

      {/* Mid node — transformation, sits where arc meets T stem */}
      <circle cx="22" cy="22" r="2.5" fill="#2BB0A6" opacity="0.9" />

      {/* Terminal node — AI insight, ".ai" moment */}
      <circle cx="38" cy="6" r="3.2" fill="#2BB0A6" filter={`url(#${glowId})`} />
      {/* Halo ring for the AI accent */}
      <circle cx="38" cy="6" r="6" fill="none" stroke="#2BB0A6" strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="6" r="8.5" fill="none" stroke="#2BB0A6" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );

  if (variant === 'wordmark') {
    return (
      <div
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...style }}
        aria-label="Talez.ai"
      >
        {icon}
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            fontSize: size * 0.52,
            fontWeight: 800,
            color: '#1F2A44',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          Talez
          <span
            style={{
              color: '#2BB0A6',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: size * 0.38,
              letterSpacing: '-0.01em',
            }}
          >
            .ai
          </span>
        </span>
      </div>
    );
  }

  return icon;
}
