export interface DataElement {
  title: string;
  availability?: 'both' | 'restricted' | 'public';
  category?: string;
  description?: string;
  details?: string;
  children?: DataElement[];
}

export interface DataCoverageTreeProps {
  data: DataElement;
  width?: number;
  height?: number;
  className?: string;
}
