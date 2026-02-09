import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const RecruitIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="recruit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="10" r="5" fill="url(#recruit-grad)" stroke={color} strokeWidth="1.5"/>
    <path d="M8 24C8 19.5817 11.5817 16 16 16C20.4183 16 24 19.5817 24 24" stroke="url(#recruit-grad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="8" cy="12" r="3" fill="url(#recruit-grad)" stroke={color} strokeWidth="1"/>
    <circle cx="24" cy="12" r="3" fill="url(#recruit-grad)" stroke={color} strokeWidth="1"/>
    <path d="M6 22C6 20 7 18 9 18" stroke="url(#recruit-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M26 22C26 20 25 18 23 18" stroke="url(#recruit-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const QuestionnaireIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="questionnaire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ecdc4" />
        <stop offset="100%" stopColor="#44a3a0" />
      </linearGradient>
    </defs>
    <rect x="7" y="4" width="18" height="24" rx="2" fill="url(#questionnaire-grad)" stroke={color} strokeWidth="1.5"/>
    <line x1="11" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="14" x2="19" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="22" x2="17" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="11" cy="10" r="1.5" fill={color}/>
    <circle cx="11" cy="14" r="1.5" fill={color}/>
    <circle cx="11" cy="18" r="1.5" fill={color}/>
  </svg>
);

export const InstallIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="install-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
    <rect x="6" y="8" width="20" height="16" rx="2" fill="url(#install-grad)" stroke={color} strokeWidth="1.5"/>
    <rect x="9" y="11" width="14" height="10" rx="1" fill={color} opacity="0.3"/>
    <path d="M12 14L14 16L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="24" width="4" height="3" rx="0.5" fill="url(#install-grad)" stroke={color} strokeWidth="1"/>
    <line x1="10" y1="27" x2="22" y2="27" stroke="url(#install-grad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TestIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="test-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffeaa7" />
        <stop offset="100%" stopColor="#fdcb6e" />
      </linearGradient>
    </defs>
    <path d="M10 6L10 14C10 18 12 22 16 22C20 22 22 18 22 14L22 6" fill="url(#test-grad)" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="9" y="4" width="14" height="4" rx="1" fill="url(#test-grad)" stroke={color} strokeWidth="1.5"/>
    <path d="M16 14C16 14 13 16 13 18C13 19.6569 14.3431 21 16 21C17.6569 21 19 19.6569 19 18C19 16 16 14 16 14Z" fill={color} opacity="0.6"/>
    <circle cx="16" cy="28" r="2" fill="url(#test-grad)" stroke={color} strokeWidth="1.5"/>
    <line x1="16" y1="22" x2="16" y2="26" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const SubmitIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="submit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a8e063" />
        <stop offset="100%" stopColor="#56ab2f" />
      </linearGradient>
    </defs>
    <path d="M4 16L28 4L20 28L16 20L4 16Z" fill="url(#submit-grad)" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="28" y1="4" x2="16" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="28" cy="4" r="2" fill={color}/>
    <path d="M12 24L16 20L20 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PipelineIconMap: Record<string, React.FC<IconProps>> = {
  recruit: RecruitIcon,
  questionnaire: QuestionnaireIcon,
  install: InstallIcon,
  test: TestIcon,
  submit: SubmitIcon,
};
