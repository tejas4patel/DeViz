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

export interface PipelineFlowProps {
  stages: PipelineStage[];
  width?: number;
  height?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
