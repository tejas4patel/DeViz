import React from 'react';
import { 
  Users, 
  FileCheck, 
  Download, 
  FlaskConical, 
  Send 
} from 'lucide-react';

interface IconProps {
  size?: number;
  color?: string;
}

export const RecruitIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '6px',
    padding: '6px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Users size={size - 12} color={color} strokeWidth={1.5} />
  </div>
);

export const QuestionnaireIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #4ecdc4, #44a3a0)',
    borderRadius: '6px',
    padding: '6px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <FileCheck size={size - 12} color={color} strokeWidth={1.5} />
  </div>
);

export const InstallIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    borderRadius: '6px',
    padding: '6px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Download size={size - 12} color={color} strokeWidth={1.5} />
  </div>
);

export const TestIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
    borderRadius: '6px',
    padding: '6px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <FlaskConical size={size - 12} color={color} strokeWidth={1.5} />
  </div>
);

export const SubmitIcon: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <div style={{
    background: 'linear-gradient(135deg, #a8e063, #56ab2f)',
    borderRadius: '6px',
    padding: '6px',
    display: 'inline-flex',
    border: `1.5px solid ${color}`
  }}>
    <Send size={size - 12} color={color} strokeWidth={1.5} />
  </div>
);

export const PipelineIconMap: Record<string, React.FC<IconProps>> = {
  recruit: RecruitIcon,
  questionnaire: QuestionnaireIcon,
  install: InstallIcon,
  test: TestIcon,
  submit: SubmitIcon,
};
