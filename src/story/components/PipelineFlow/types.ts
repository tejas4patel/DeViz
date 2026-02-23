export interface PipelineStage {
  id: string;
  title: string;
  description: string;
  icon: string;
  status?: 'active' | 'completed' | 'pending';
  metrics?: {
    value: string;
    label: string;
  }[];
}

/** Colors for a single stage status */
export interface StageStatusColors {
  /** Stroke, badge, and label color */
  primary: string;
  /** Background fill (reserved for future use) */
  bg: string;
}

/**
 * Override the default status→color mapping.
 * Any omitted key falls back to the component default.
 */
export type StatusColorMap = Partial<Record<'completed' | 'active' | 'pending' | 'default', StageStatusColors>>;

export interface PipelineFlowProps {
  stages: PipelineStage[];
  width?: number;
  height?: number;
  title?: string;
  /** Override default status colors for extensibility (OCP) */
  statusColors?: StatusColorMap;
  className?: string;
}
