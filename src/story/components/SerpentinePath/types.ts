export type ComplexityLevel = 'low' | 'medium' | 'high';

export interface AccessStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  cost?: string;
  complexity: ComplexityLevel;
}

export interface AccessPath {
  id: string;
  title: string;
  /** Hex color used for the path line and node circles */
  color: string;
  steps: AccessStep[];
  benefits?: string[];
  limitations?: string[];
}

export interface SerpentinePathProps {
  /** Single access path to visualize as a vertical serpentine */
  path: AccessPath;
  /** Column header shown above the path */
  title: string;
  className?: string;
}
