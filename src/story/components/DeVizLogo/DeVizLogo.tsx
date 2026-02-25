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
  const bgId = `dvz-bg-${uid}`;
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
        <linearGradient id={bgId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2d5866" />
          <stop offset="100%" stopColor="#1a3840" />
        </linearGradient>
        <radialGradient id={shineId} cx="28%" cy="22%" r="52%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="44" height="44" rx="10" fill={`url(#${bgId})`} />
      <rect width="44" height="44" rx="10" fill={`url(#${shineId})`} />

      {/* D letterform — cream fill with evenodd cutout */}
      <path
        d="M 4 7 L 14 7 Q 23 7 23 22 Q 23 37 14 37 L 4 37 Z
           M 10 14 L 14 14 Q 17 14 17 22 Q 17 30 14 30 L 10 30 Z"
        fill="#FBE9D0"
        fillRule="evenodd"
      />

      {/* V letterform — coral fill with evenodd inner notch */}
      <path
        d="M 23 7 L 41 7 L 32 37 Z
           M 28 7 L 36 7 L 32 29 Z"
        fill="#E64833"
        fillRule="evenodd"
      />
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
