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
        {/* Simple cube gradients */}
        <linearGradient id={topId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E64833" />
          <stop offset="100%" stopColor="#B82C1A" />
        </linearGradient>
        
        <linearGradient id={leftId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B82C1A" />
          <stop offset="100%" stopColor="#8B1F12" />
        </linearGradient>
        
        <linearGradient id={rightId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A6221A" />
          <stop offset="100%" stopColor="#6B1710" />
        </linearGradient>
      </defs>

      {/* Simple 3D cube */}
      {/* Top face */}
      <path
        d="M12 18 L22 12 L32 18 L22 24 Z"
        fill={`url(#${topId})`}
      />

      {/* Left face */}
      <path
        d="M12 18 L22 24 L22 34 L12 28 Z"
        fill={`url(#${leftId})`}
      />

      {/* Right face */}
      <path
        d="M22 24 L32 18 L32 28 L22 34 Z"
        fill={`url(#${rightId})`}
      />

      {/* Cube edges */}
      <path
        d="M12 18 L22 12 L32 18 M22 12 L22 24 M12 18 L12 28 M32 18 L32 28 M22 24 L22 34 M12 28 L22 34 L32 28"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="none"
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
