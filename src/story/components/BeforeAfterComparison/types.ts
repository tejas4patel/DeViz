/**
 * Type definitions for the BeforeAfterComparison component
 * These interfaces define the data structure for any before/after comparison visualization
 */

export interface ComparisonFeature {
  /** Label displayed above the feature value (e.g., "Data Collection", "Time Coverage") */
  label: string;
  /** Main value or metric (e.g., "Manual chart abstraction", "~50,000 visits") */
  value: string;
  /** Additional description or context for the feature */
  description: string;
  /** Optional icon key - if not provided, uses label to find icon */
  iconKey?: string;
}

export interface ComparisonPeriod {
  /** Time period label (e.g., "Pre-2021", "2021 Onwards") */
  period: string;
  /** Main title for this period (e.g., "Manual Abstraction", "Full Year EHR") */
  title: string;
  /** List of features to display for this period */
  features: ComparisonFeature[];
  /** Optional summary text (not currently displayed but available for future use) */
  summary?: string;
}

export interface ComparisonTransition {
  /** The year or label for the transition point */
  year: number | string;
  /** Description of the impact or change */
  impact: string;
}

export interface ComparisonStat {
  /** The value to display prominently (e.g., "8x", "3x", "12mo") */
  value: string;
  /** Label describing the stat (e.g., "More Visits", "More Centers") */
  label: string;
}

export interface ComparisonData {
  /** Data for the "before" state (left panel) */
  before: ComparisonPeriod;
  /** Data for the "after" state (right panel) */
  after: ComparisonPeriod;
  /** Transition point information */
  transition: ComparisonTransition;
  /** Optional key stats to display in the impact banner */
  stats?: ComparisonStat[];
}

export interface ComparisonTheme {
  /** Primary color for the "before" panel (default: #244855) */
  beforeColor: string;
  /** Secondary/darker shade for "before" panel gradient */
  beforeColorDark: string;
  /** Primary color for the "after" panel (default: #874F41) */
  afterColor: string;
  /** Secondary/darker shade for "after" panel gradient */
  afterColorDark: string;
  /** Accent color for transition badge (default: #E64833) */
  accentColor: string;
  /** Success/positive indicator color (default: #4CAF50) */
  successColor: string;
}

export interface BeforeAfterComparisonProps {
  /** The comparison data to display */
  data: ComparisonData;
  /** Optional custom theme colors */
  theme?: Partial<ComparisonTheme>;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Whether to show the impact banner at the bottom (default: true) */
  showImpactBanner?: boolean;
  /** Whether to show feature numbers (default: true) */
  showFeatureNumbers?: boolean;
  /** Custom header icon for "before" panel - if not provided, uses ManualProcessIcon */
  beforeIcon?: React.ReactNode;
  /** Custom header icon for "after" panel - if not provided, uses AutomatedProcessIcon */
  afterIcon?: React.ReactNode;
}

// Default theme values
export const defaultTheme: ComparisonTheme = {
  beforeColor: '#244855',
  beforeColorDark: '#1a3540',
  afterColor: '#874F41',
  afterColorDark: '#6b3d32',
  accentColor: '#E64833',
  successColor: '#4CAF50',
};
