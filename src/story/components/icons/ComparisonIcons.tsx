/**
 * SVG Icons for Before/After Comparison Components
 * Organized by category for reusability across different comparison scenarios
 */

// Feature Icons - can be used for any comparison feature cards
export const FeatureIcons: Record<string, (color: string) => JSX.Element> = {
  'Data Collection': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M4 12H28" stroke={color} strokeWidth="2"/>
      <circle cx="8" cy="9" r="1.5" fill={color}/>
      <circle cx="12" cy="9" r="1.5" fill={color}/>
      <circle cx="16" cy="9" r="1.5" fill={color}/>
      <rect x="8" y="16" width="8" height="2" rx="1" fill={color}/>
      <rect x="8" y="20" width="12" height="2" rx="1" fill={color}/>
    </svg>
  ),
  'Time Coverage': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="22" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M4 12H28" stroke={color} strokeWidth="2"/>
      <path d="M10 4V8M22 4V8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <rect x="8" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="14" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="20" y="16" width="4" height="4" rx="1" fill={color}/>
      <rect x="8" y="22" width="4" height="4" rx="1" fill={color}/>
      <rect x="14" y="22" width="4" height="4" rx="1" fill={color} fillOpacity="0.5"/>
    </svg>
  ),
  'Centers Participating': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L4 12V28H28V12L16 4Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <rect x="13" y="18" width="6" height="10" fill={color}/>
      <rect x="8" y="14" width="4" height="4" rx="0.5" fill={color} fillOpacity="0.6"/>
      <rect x="20" y="14" width="4" height="4" rx="0.5" fill={color} fillOpacity="0.6"/>
      <path d="M16 4V10" stroke={color} strokeWidth="2"/>
      <path d="M14 8H18" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  'Annual Visit Records': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M8 20L12 16L16 18L20 12L24 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="20" r="2" fill={color}/>
      <circle cx="12" cy="16" r="2" fill={color}/>
      <circle cx="16" cy="18" r="2" fill={color}/>
      <circle cx="20" cy="12" r="2" fill={color}/>
      <circle cx="24" cy="14" r="2" fill={color}/>
    </svg>
  ),
  'Data Quality': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M10 16L14 20L22 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Site Burden': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M8 28C8 24 11.5 20 16 20C20.5 20 24 24 24 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 14V10M14 12H18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // Generic fallback icons
  'document': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="20" height="24" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M10 12H22M10 16H22M10 20H18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'chart': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <rect x="8" y="16" width="4" height="8" fill={color}/>
      <rect x="14" y="12" width="4" height="12" fill={color}/>
      <rect x="20" y="8" width="4" height="16" fill={color}/>
    </svg>
  ),
  'clock': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M16 8V16L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'users': (color: string) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="10" r="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <circle cx="22" cy="10" r="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M4 26C4 22 7 18 12 18C14 18 15.5 18.5 16.5 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 26C28 22 25 18 20 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

// Header Icons for comparison panels
interface HeaderIconProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientId: string;
}

export const ManualProcessIcon = ({ primaryColor, secondaryColor, accentColor, gradientId }: HeaderIconProps) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryColor}/>
        <stop offset="100%" stopColor={secondaryColor}/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="48" height="48" rx="12" fill={`url(#${gradientId})`}/>
    <rect x="16" y="12" width="24" height="32" rx="2" fill="white" fillOpacity="0.95"/>
    <rect x="20" y="8" width="16" height="8" rx="2" fill="#FBE9D0" stroke={primaryColor} strokeWidth="1.5"/>
    <rect x="20" y="20" width="16" height="2" rx="1" fill={primaryColor}/>
    <rect x="20" y="26" width="12" height="2" rx="1" fill={primaryColor} fillOpacity="0.6"/>
    <rect x="20" y="32" width="14" height="2" rx="1" fill={primaryColor} fillOpacity="0.6"/>
    <rect x="20" y="38" width="10" height="2" rx="1" fill={primaryColor} fillOpacity="0.6"/>
    <circle cx="38" cy="38" r="8" fill={accentColor}/>
    <path d="M35 38H41M38 35V41" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const AutomatedProcessIcon = ({ primaryColor, secondaryColor, accentColor, gradientId }: HeaderIconProps) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryColor}/>
        <stop offset="100%" stopColor={secondaryColor}/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="48" height="48" rx="12" fill={`url(#${gradientId})`}/>
    <ellipse cx="28" cy="18" rx="16" ry="6" fill="white" fillOpacity="0.95"/>
    <path d="M12 18V38C12 41.314 19.163 44 28 44C36.837 44 44 41.314 44 38V18" stroke="white" strokeWidth="2.5"/>
    <path d="M12 28C12 31.314 19.163 34 28 34C36.837 34 44 31.314 44 28" stroke="white" strokeWidth="2"/>
    <circle cx="40" cy="16" r="8" fill={accentColor}/>
    <path d="M36 16L39 19L44 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="24" r="2" fill={primaryColor}/>
    <circle cx="22" cy="24" r="1.5" fill={primaryColor} fillOpacity="0.6"/>
    <circle cx="34" cy="24" r="1.5" fill={primaryColor} fillOpacity="0.6"/>
  </svg>
);

// Transition/divider icons
export const TransitionCubeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
    <path d="M4 10L14 16M14 16L24 10M14 16V24" stroke="white" strokeWidth="2"/>
  </svg>
);

export const TransitionArrowIcon = ({ gradientId }: { gradientId: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="transition-arrow">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#244855"/>
        <stop offset="50%" stopColor="#E64833"/>
        <stop offset="100%" stopColor="#874F41"/>
      </linearGradient>
    </defs>
    <path d="M8 24H40M40 24L28 12M40 24L28 36" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Impact banner icons
export const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L18 12H26L20 18L22 26L16 21L10 26L12 18L6 12H14L16 4Z" fill="#FFD700" stroke="#FFA000" strokeWidth="1.5"/>
  </svg>
);

export const LightningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M18 4L8 18H16L14 28L24 14H16L18 4Z" fill="#FFD700" stroke="#FFA000" strokeWidth="1.5"/>
  </svg>
);

// Helper to get icon by name with fallback
export const getFeatureIcon = (name: string, color: string): JSX.Element => {
  const icon = FeatureIcons[name];
  if (icon) return icon(color);
  // Return a generic document icon as fallback
  return FeatureIcons['document'](color);
};
