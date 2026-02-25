import { useId } from 'react';
import type { CSSProperties } from 'react';

type Variant = 'icon' | 'wordmark';

type Props = {
  size?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
};

export default function DeVizLogo({ size = 44, variant = 'icon', className, style }: Props) {
  const uid = useId().replace(/:/g, '');
  const bgId = `dvz-bg-${uid}`;
  const bar2Id = `dvz-bar2-${uid}`;
  const bar3Id = `dvz-bar3-${uid}`;
  const glowId = `dvz-glow-${uid}`;
  const shineId = `dvz-shine-${uid}`;

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DeViz"
      role="img"
      className={variant === 'icon' ? className : undefined}
      style={variant === 'icon' ? style : undefined}
    >
      <defs>
        {/* Deep navy background */}
        <linearGradient id={bgId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A2744" />
          <stop offset="100%" stopColor="#0F1828" />
        </linearGradient>

        {/* Middle bar: blue */}
        <linearGradient id={bar2Id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2F6FED" />
        </linearGradient>

        {/* Tallest bar: teal */}
        <linearGradient id={bar3Id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34C5BA" />
          <stop offset="100%" stopColor="#2BB0A6" />
        </linearGradient>

        {/* Glow for peak node */}
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Top-left gloss */}
        <radialGradient id={shineId} cx="25%" cy="20%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* ── Background ── */}
      <rect width="44" height="44" rx="10" fill={`url(#${bgId})`} />
      <rect width="44" height="44" rx="10" fill={`url(#${shineId})`} />

      {/* ── Bar chart: 3 ascending bars ── */}
      {/* Bar 1 — short, blue */}
      <rect x="7" y="26" width="7" height="11" rx="2" fill="#3B82F6" opacity="0.85" />

      {/* Bar 2 — medium */}
      <rect x="18" y="17" width="7" height="20" rx="2" fill={`url(#${bar2Id})`} opacity="0.92" />

      {/* Bar 3 — tallest, teal */}
      <rect x="29" y="8" width="7" height="29" rx="2" fill={`url(#${bar3Id})`} />

      {/* ── Trend line connecting bar tops ── */}
      <path
        d="M 10.5 26 L 21.5 17 L 32.5 8"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Peak node — insight moment ── */}
      <circle cx="32.5" cy="8" r="2.8" fill="white" opacity="0.95" filter={`url(#${glowId})`} />
      <circle cx="32.5" cy="8" r="5.5" fill="none" stroke="white" strokeWidth="0.8" opacity="0.22" />
    </svg>
  );

  if (variant === 'wordmark') {
    return (
      <div
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...style }}
        aria-label="DeViz"
      >
        {icon}
        <span
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: size * 0.52,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          <span style={{ color: '#1F2A44' }}>De</span>
          <span style={{ color: '#2BB0A6' }}>Viz</span>
        </span>
      </div>
    );
  }

  return icon;
}
