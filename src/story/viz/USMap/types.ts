// USMap Component Types
import type { Topology } from 'topojson-specification';

export interface FQHCSite {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  state: string;
  county: string;
  type: string;
  address: string;
}

export interface FQHCData {
  metadata: {
    source: string;
    generatedAt: string;
    totalSites: number;
  };
  sites: FQHCSite[];
}

export interface MapProjectionConfig {
  type: 'albersUsa' | 'mercator' | 'geoAlbersUsa' | 'geoMercator';
  scale?: number;
  translate?: [number, number];
}

export interface MapStyleConfig {
  backgroundColor: string;
  stateStroke: string;
  stateFill: string;
  stateStrokeWidth: number;
  stateHoverFill?: string;
  pointColor: string;
  pointRadius: number;
  pointOpacity: number;
  pointHoverRadius?: number;
  pointHoverOpacity?: number;
}

export interface TooltipConfig {
  enabled: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
}

export interface ZoomConfig {
  enabled: boolean;
  scaleExtent?: [number, number];
  translateExtent?: [[number, number], [number, number]];
}

export interface CountyData {
  fips: string;
  name: string;
  povertyRate: number;
}

export interface ChoroplethConfig {
  enabled: boolean;
  colorScheme?: string[];
  minValue?: number;
  maxValue?: number;
  opacity?: number;
}

export interface USMapProps {
  // Required
  data: FQHCData;
  topology: Topology;

  // Optional choropleth
  countyTopology?: Topology;
  countyData?: Record<string, CountyData>;
  choroplethConfig?: Partial<ChoroplethConfig>;

  // Optional styling
  mapStyleConfig?: Partial<MapStyleConfig>;
  projectionConfig?: Partial<MapProjectionConfig>;
  tooltipConfig?: Partial<TooltipConfig>;
  zoomConfig?: Partial<ZoomConfig>;

  // Optional dimensions
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;

  // Optional interactions
  enableZoom?: boolean;
  enableTooltip?: boolean;

  // Optional callbacks
  onSiteClick?: (site: FQHCSite) => void;
  onSiteHover?: (site: FQHCSite | null) => void;

  // Optional custom classes
  className?: string;
  tooltipClassName?: string;
}
