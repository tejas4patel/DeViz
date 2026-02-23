export interface DataElement {
  title: string;
  availability?: 'both' | 'restricted' | 'public';
  category?: string;
  description?: string;
  details?: string;
  children?: DataElement[];
}

/**
 * Override the default availability→color mapping.
 * Any omitted key falls back to the component default.
 * Enables theming without modifying the component (OCP).
 */
export interface AvailabilityColorMap {
  root?: string;
  both?: string;
  restricted?: string;
  public?: string;
  category?: string;
}

export interface DataCoverageTreeProps {
  data: DataElement;
  width?: number;
  height?: number;
  /** Override node and link colors by availability type */
  availabilityColors?: AvailabilityColorMap;
  className?: string;
}
