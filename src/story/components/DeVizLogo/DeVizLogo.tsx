import { useId } from 'react';
import type { CSSProperties } from 'react';

type Variant = 'icon' | 'wordmark';

type Props = {
  size?: number;
  variant?: Variant;
  onDark?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function DeVizLogo({ size = 44, variant = 'icon', onDark = false, className, style }: Props) {
  const uid = useId().replace(/:/g, '');
  const bgId    = `dvz-bg-${uid}`;
  const topId   = `dvz-top-${uid}`;
  const leftId  = `dvz-left-${uid}`;
  const rightId = `dvz-right-${uid}`;
  const glowId  = `dvz-glow-${uid}`;

  // Isometric cube vertices
  //   Top apex  : (22,  9)
  //   Mid-right : (33, 15.5)
  //   Center    : (22, 22)
  //   Mid-left  : (11, 15.5)
  //   Bot-right : (33, 28.5)
  //   Bot-left  : (11, 28.5)
  //   Bottom    : (22, 35)

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
        {/* Background */}
        <linearGradient id={bgId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e4455" />
          <stop offset="100%" stopColor="#112830" />
        </linearGradient>

        {/* Subtle warm glow behind the cube */}
        <radialGradient id={glowId} cx="50%" cy="52%" r="42%">
          <stop offset="0%" stopColor="rgba(230,72,51,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Top face — warm cream, lit */}
        <linearGradient id={topId} x1="22" y1="9" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF5E6" />
          <stop offset="100%" stopColor="#E8CFA8" />
        </linearGradient>

        {/* Left face — cool teal shadow */}
        <linearGradient id={leftId} x1="11" y1="15.5" x2="22" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2e7a8e" />
          <stop offset="100%" stopColor="#153540" />
        </linearGradient>

        {/* Right face — coral, warm highlight */}
        <linearGradient id={rightId} x1="33" y1="15.5" x2="22" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F06048" />
          <stop offset="100%" stopColor="#B82C1A" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="44" height="44" rx="10" fill={`url(#${bgId})`} />

      {/* Warm glow */}
      <rect width="44" height="44" rx="10" fill={`url(#${glowId})`} />

      {/* Top face (cream) */}
      <polygon
        points="22,9 33,15.5 22,22 11,15.5"
        fill={`url(#${topId})`}
      />

      {/* Left face (teal) */}
      <polygon
        points="11,15.5 22,22 22,35 11,28.5"
        fill={`url(#${leftId})`}
      />

      {/* Right face (coral) */}
      <polygon
        points="33,15.5 22,22 22,35 33,28.5"
        fill={`url(#${rightId})`}
      />

      {/* Edge lines for geometric crispness */}
      <path
        d="M22 9 L33 15.5 L33 28.5 L22 35 L11 28.5 L11 15.5 Z"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M22 22 L22 35 M11 15.5 L22 22 L33 15.5"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="0.6"
        fill="none"
      />

      {/* Top-right edge highlight (simulates light catching the corner) */}
      <path
        d="M22 9 L33 15.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Gem glint — specular sparkle on the top face */}
      <circle cx="28.5" cy="12.5" r="1.8" fill="white" opacity="0.75" />
      <circle cx="28.5" cy="12.5" r="3.5" fill="white" opacity="0.10" />
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
          <span style={{ color: onDark ? '#FBE9D0' : '#244855' }}>De</span>
          <span style={{ color: '#E64833' }}>Viz</span>
        </span>
      </div>
    );
  }

  return icon;
}
