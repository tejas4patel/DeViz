import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const ManualAbstractionIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="manual-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#ee5a6f" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="16" height="18" rx="2" fill="url(#manual-grad)" stroke={color} strokeWidth="1.5"/>
    <line x1="7" y1="7" x2="17" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const PlanningIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="planning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#90AEAD" />
        <stop offset="100%" stopColor="#7a9c9b" />
      </linearGradient>
    </defs>
    <path d="M3 3L21 3L21 21L3 21L3 3Z" fill="url(#planning-grad)" stroke={color} strokeWidth="1.5"/>
    <line x1="3" y1="8" x2="21" y2="8" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="3" x2="8" y2="21" stroke={color} strokeWidth="1.5"/>
    <path d="M12 12L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 16L16 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const PilotTestIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pilot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ecdc4" />
        <stop offset="100%" stopColor="#44a3a0" />
      </linearGradient>
    </defs>
    <path d="M12 2L12 14" stroke="url(#pilot-grad)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="14" r="6" fill="url(#pilot-grad)" stroke={color} strokeWidth="1.5"/>
    <path d="M12 11L12 17M9 14L15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="3" r="2" fill="url(#pilot-grad)" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const LaunchIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="launch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#ff8c00" />
      </linearGradient>
    </defs>
    <path d="M12 2L13.5 8L20 9.5L13.5 11L12 17L10.5 11L4 9.5L10.5 8L12 2Z" fill="url(#launch-grad)" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 15L5 21L9 19L7 15Z" fill="url(#launch-grad)" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M17 15L19 21L15 19L17 15Z" fill="url(#launch-grad)" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const ExpansionIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="expansion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="url(#expansion-grad)" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="2" y1="12" x2="8" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="2" x2="12" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="16" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ScaleUpIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scale-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#244855" />
        <stop offset="100%" stopColor="#1a3540" />
      </linearGradient>
    </defs>
    <rect x="3" y="14" width="5" height="7" rx="1" fill="url(#scale-grad)" stroke={color} strokeWidth="1.5"/>
    <rect x="9.5" y="10" width="5" height="11" rx="1" fill="url(#scale-grad)" stroke={color} strokeWidth="1.5"/>
    <rect x="16" y="6" width="5" height="15" rx="1" fill="url(#scale-grad)" stroke={color} strokeWidth="1.5"/>
    <path d="M18 4L21 7L18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FullOperationIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="operation-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E64833" />
        <stop offset="100%" stopColor="#c73e2e" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="url(#operation-grad)" stroke={color} strokeWidth="1.5"/>
    <path d="M12 12L12 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
    <path d="M8 4L12 2L16 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TimelineIconMap: Record<string, React.FC<IconProps>> = {
  'manual': ManualAbstractionIcon,
  'planning': PlanningIcon,
  'pilot': PilotTestIcon,
  'launch': LaunchIcon,
  'expansion': ExpansionIcon,
  'scaleup': ScaleUpIcon,
  'operation': FullOperationIcon,
};
