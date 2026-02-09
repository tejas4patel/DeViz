export interface TimelineEvent {
  date: string;
  label: string;
  description: string;
  type?: 'milestone' | 'feature' | 'change' | 'release';
  icon?: string;
}

export interface ZigzagTimelineProps {
  events: TimelineEvent[];
  width?: number;
  height?: number;
  pathColor?: string;
  pathWidth?: number;
  nodeRadius?: number;
  showDates?: boolean;
  className?: string;
}
