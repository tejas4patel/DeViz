/**
 * Icons for Before/After Comparison Components using Lucide React
 * Organized by category for reusability across different comparison scenarios
 */

import { 
  Database, 
  Calendar, 
  Building, 
  TrendingUp, 
  CheckCircle, 
  Users,
  FileText,
  BarChart3,
  Clock,
  Plus,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

// Feature Icons - can be used for any comparison feature cards
export const FeatureIcons: Record<string, (color: string) => JSX.Element> = {
  'Data Collection': (color: string) => <Database size={32} color={color} strokeWidth={2} />,
  'Time Coverage': (color: string) => <Calendar size={32} color={color} strokeWidth={2} />,
  'Centers Participating': (color: string) => <Building size={32} color={color} strokeWidth={2} />,
  'Annual Visit Records': (color: string) => <TrendingUp size={32} color={color} strokeWidth={2} />,
  'Data Quality': (color: string) => <CheckCircle size={32} color={color} strokeWidth={2} />,
  'Site Burden': (color: string) => <Users size={32} color={color} strokeWidth={2} />,
  // Generic fallback icons
  'document': (color: string) => <FileText size={32} color={color} strokeWidth={2} />,
  'chart': (color: string) => <BarChart3 size={32} color={color} strokeWidth={2} />,
  'clock': (color: string) => <Clock size={32} color={color} strokeWidth={2} />,
  'users': (color: string) => <Users size={32} color={color} strokeWidth={2} />,
};

// Header Icons for comparison panels
interface HeaderIconProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientId: string;
}

export const ManualProcessIcon = ({ primaryColor, secondaryColor, accentColor, gradientId }: HeaderIconProps) => (
  <div style={{ 
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
    borderRadius: '12px',
    padding: '12px',
    display: 'inline-flex',
    position: 'relative'
  }}>
    <FileText size={32} color="white" strokeWidth={2} />
    <div style={{
      position: 'absolute',
      bottom: '-4px',
      right: '-4px',
      background: accentColor,
      borderRadius: '50%',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Plus size={16} color="white" strokeWidth={2} />
    </div>
  </div>
);

export const AutomatedProcessIcon = ({ primaryColor, secondaryColor, accentColor, gradientId }: HeaderIconProps) => (
  <div style={{ 
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
    borderRadius: '12px',
    padding: '12px',
    display: 'inline-flex',
    position: 'relative'
  }}>
    <Database size={32} color="white" strokeWidth={2} />
    <div style={{
      position: 'absolute',
      bottom: '-4px',
      right: '-4px',
      background: accentColor,
      borderRadius: '50%',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CheckCircle size={16} color="white" strokeWidth={2} />
    </div>
  </div>
);

// Transition/divider icons
export const TransitionCubeIcon = () => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid white',
    borderRadius: '8px',
    padding: '6px',
    display: 'inline-flex'
  }}>
    <BarChart3 size={16} color="white" strokeWidth={2} />
  </div>
);

export const TransitionArrowIcon = ({ gradientId }: { gradientId: string }) => (
  <div style={{
    width: '48px',
    height: '48px',
    background: `linear-gradient(90deg, #244855 0%, #E64833 50%, #874F41 100%)`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }} className="transition-arrow">
    <ArrowRight size={24} color="white" strokeWidth={2} />
  </div>
);

// Impact banner icons
export const StarIcon = () => (
  <Star size={32} color="#FFA000" fill="#FFD700" strokeWidth={1.5} />
);

export const LightningIcon = () => (
  <Zap size={32} color="#FFA000" fill="#FFD700" strokeWidth={1.5} />
);

// Helper to get icon by name with fallback
export const getFeatureIcon = (name: string, color: string): JSX.Element => {
  const icon = FeatureIcons[name];
  if (icon) return icon(color);
  // Return a generic document icon as fallback
  return FeatureIcons['document'](color);
};
