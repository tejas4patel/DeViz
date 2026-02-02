// Default configuration values for USMap

import type {
  MapStyleConfig,
  MapProjectionConfig,
  TooltipConfig,
  ZoomConfig,
  ChoroplethConfig,
} from './types';

export const defaultMapStyleConfig: MapStyleConfig = {
  backgroundColor: '#f8f9fa',
  stateStroke: '#2d3748',
  stateFill: '#e2e8f0',
  stateStrokeWidth: 0.5,
  stateHoverFill: '#cbd5e0',
  pointColor: '#E64833',
  pointRadius: 2,
  pointOpacity: 0.7,
  pointHoverRadius: 4,
  pointHoverOpacity: 1.0,
};

export const defaultProjectionConfig: MapProjectionConfig = {
  type: 'albersUsa',
  scale: 1000,
  translate: [400, 300],
};

export const defaultTooltipConfig: TooltipConfig = {
  enabled: true,
  backgroundColor: '#1a202c',
  textColor: '#ffffff',
  borderColor: '#E64833',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: '13px',
};

export const defaultZoomConfig: ZoomConfig = {
  enabled: true,
  scaleExtent: [1, 8],
  translateExtent: [
    [-100, -100],
    [900, 700],
  ],
};

export const defaultChoroplethConfig: ChoroplethConfig = {
  enabled: true,
  colorScheme: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
  minValue: 0,
  maxValue: 25,
  opacity: 0.7,
};
