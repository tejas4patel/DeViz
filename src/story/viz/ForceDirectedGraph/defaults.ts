import {
  LinkStyleConfig,
  ForceConfig,
  SatelliteConfig,
  ZoomConfig,
} from './types';

// Default link styling
export const defaultLinkStyleConfig: LinkStyleConfig = {
  baseColor: '#A4B6C1',
  baseWidth: 20,
  baseOpacity: 0.6,
  overlayWidth: 12,
  overlayOpacity: 0.5,
  colors: {
    partOf: '#244855',
    contains: '#E64833',
    default: '#90AEAD',
  },
};

// Default force configuration
export const defaultForceConfig: ForceConfig = {
  linkDistance: (source: string, target: string) => {
    if (source === 'hub' || target === 'hub') return 255;
    if (source === 'pillar' && target === 'sub') return 173;
    return 210;
  },
  chargeStrength: -520,
  collisionStrength: 1.0,
  collisionIterations: 3,
  centerStrength: { x: 0.05, y: 0.05 },
};

// Default satellite configuration
export const defaultSatelliteConfig: SatelliteConfig = {
  keys: ['who', 'what', 'when', 'where', 'why', 'which', 'how'],
  questionMap: {
    who: 'Who is involved?',
    what: 'What is it?',
    when: 'When does it occur?',
    where: 'Where does it happen?',
    why: 'Why does it matter?',
    which: 'Which options are available?',
    how: 'How does it work?',
  },
  distance: 30,
  radius: 16,
  glowRadius: 20,
  fontSize: 9,
  strokeWidth: 2,
};

// Default zoom configuration
export const defaultZoomConfig: ZoomConfig = {
  scaleExtent: [0.1, 4],
  initialScale: 0.85,
  initialTranslate: { x: 0.1, y: 0.08 },
  transitionDuration: 750,
};

// Helper to merge configurations with defaults
export function mergeConfig<T>(defaults: T, override?: Partial<T>): T {
  if (!override) return defaults;
  return { ...defaults, ...override };
}
