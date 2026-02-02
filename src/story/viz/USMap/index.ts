// USMap Component - Main exports
export { default as USMap } from './USMap';

// Export types
export type {
  FQHCData,
  FQHCSite,
  CountyData,
  MapStyleConfig,
  MapProjectionConfig,
  TooltipConfig,
  ZoomConfig,
  ChoroplethConfig,
  USMapProps,
} from './types';

// Export defaults for configuration
export {
  defaultMapStyleConfig,
  defaultProjectionConfig,
  defaultTooltipConfig,
  defaultZoomConfig,
  defaultChoroplethConfig,
} from './defaults';
