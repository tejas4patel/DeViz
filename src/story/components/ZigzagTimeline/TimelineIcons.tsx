import React from 'react';
import { 
  FileText, 
  Calendar, 
  TestTube, 
  Rocket, 
  ArrowUpRight, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

interface IconProps {
  size?: number;
  color?: string;
}

export const ManualAbstractionIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <FileText size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const PlanningIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #90AEAD, #7a9c9b)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Calendar size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const PilotTestIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #4ecdc4, #44a3a0)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <TestTube size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const LaunchIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #FFA500, #ff8c00)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Rocket size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const ExpansionIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <ArrowUpRight size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const ScaleUpIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #244855, #1a3540)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <TrendingUp size={size - 8} color={color} strokeWidth={1.5} />
  </div>
);

export const FullOperationIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #E64833, #c73e2e)',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Settings size={size - 8} color={color} strokeWidth={1.5} />
  </div>
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
