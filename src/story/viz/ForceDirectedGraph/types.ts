import * as d3 from 'd3';

// Base node type - can be extended with additional properties
export interface GraphNode {
  id: string;
  label: string;
  detail?: string;
  group: string;
  [key: string]: any; // Allow additional properties
}

// Link type
export interface GraphLink {
  source: string;
  target: string;
  type?: string;
  relationship?: string;
  description?: string;
}

// D3 Simulation types
export type SimNode = GraphNode & d3.SimulationNodeDatum;
export type SimLink = d3.SimulationLinkDatum<SimNode> & {
  type?: string;
  relationship?: string;
  description?: string;
};

// Graph data structure
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Color configuration for node groups
export interface NodeGroupConfig {
  gradient: string[];
  satelliteGradient: string[];
  stroke: string;
  radius: number;
  glowRadius: number;
  collisionRadius: number;
  fontSize: number;
  maxChars: number;
}

// Link styling configuration
export interface LinkStyleConfig {
  baseColor: string;
  baseWidth: number;
  baseOpacity: number;
  overlayWidth: number;
  overlayOpacity: number;
  colors: Record<string, string>;
}

// Force simulation configuration
export interface ForceConfig {
  linkDistance: (source: string, target: string) => number;
  chargeStrength: number;
  collisionStrength: number;
  collisionIterations: number;
  centerStrength: { x: number; y: number };
}

// Satellite configuration
export interface SatelliteConfig {
  keys: string[];
  questionMap: Record<string, string>;
  distance: number;
  radius: number;
  glowRadius: number;
  fontSize: number;
  strokeWidth: number;
}

// Zoom configuration
export interface ZoomConfig {
  scaleExtent: [number, number];
  initialScale: number;
  initialTranslate: { x: number; y: number };
  transitionDuration: number;
}

// Main component props
export interface ForceDirectedGraphProps {
  data: GraphData;
  nodeGroupConfigs: Record<string, NodeGroupConfig>;
  linkStyleConfig?: LinkStyleConfig;
  forceConfig?: ForceConfig;
  satelliteConfig?: SatelliteConfig;
  zoomConfig?: ZoomConfig;
  minWidth?: number;
  minHeight?: number;
  enableDrag?: boolean;
  enableZoom?: boolean;
  enableSatellites?: boolean;

  // Style customization (currently limited)
  popoverClassName?: string;
  tooltipClassName?: string;

  // TODO: Option B - Add more className props for enhanced customization
  // This would allow users to customize individual parts without overriding all CSS
  // Future additions:
  // className?: string;           // Container div class
  // svgClassName?: string;        // SVG element class
  // nodeClassName?: string;       // Node group elements class
  // linkClassName?: string;       // Link group elements class
  // satelliteClassName?: string;  // Satellite node elements class
  //
  // Could also add style override props:
  // styles?: {
  //   container?: React.CSSProperties;
  //   svg?: React.CSSProperties;
  //   popover?: React.CSSProperties;
  //   tooltip?: React.CSSProperties;
  // };

  // Event handlers
  onNodeClick?: (node: GraphNode) => void;
  onNodeHover?: (node: GraphNode | null) => void;
}
