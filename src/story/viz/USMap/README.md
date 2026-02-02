# USMap Component

A reusable React component for rendering interactive US maps with D3.js, featuring:
- County-level choropleth visualization
- Point markers for locations (e.g., FQHC sites)
- Interactive zoom and pan controls
- Customizable tooltips
- Responsive design

## Installation

Import the component and types:

```typescript
import { USMap } from './viz/USMap';
import type { FQHCData, CountyData, USMapProps } from './viz/USMap';
```

## Basic Usage

```tsx
<USMap
  data={fqhcData}
  topology={usStatesTopology}
  width={1200}
  height={700}
/>
```

## Props

### Required Props

- `data: FQHCData` - Site data to display on the map
- `topology: Topology` - TopoJSON data for US states

### Optional Props

#### Choropleth Layer
- `countyTopology?: Topology` - TopoJSON data for US counties
- `countyData?: Record<string, CountyData>` - County-level data for choropleth
- `choroplethConfig?: Partial<ChoroplethConfig>` - Choropleth styling configuration

#### Dimensions
- `width?: number` - Map width in pixels (default: 960)
- `height?: number` - Map height in pixels (default: 600)
- `minWidth?: number` - Minimum width (default: 800)
- `minHeight?: number` - Minimum height (default: 500)

#### Features
- `enableZoom?: boolean` - Enable zoom/pan controls (default: true)
- `enableTooltip?: boolean` - Enable tooltips on hover (default: true)

#### Styling
- `mapStyleConfig?: Partial<MapStyleConfig>` - Map styling options
- `projectionConfig?: Partial<MapProjectionConfig>` - Projection settings
- `tooltipConfig?: Partial<TooltipConfig>` - Tooltip styling
- `zoomConfig?: Partial<ZoomConfig>` - Zoom behavior settings
- `className?: string` - Custom CSS class
- `tooltipClassName?: string` - Custom tooltip CSS class

#### Callbacks
- `onSiteClick?: (site: FQHCSite) => void` - Called when a site is clicked
- `onSiteHover?: (site: FQHCSite | null) => void` - Called when hovering over sites

## Configuration Objects

### MapStyleConfig

```typescript
{
  backgroundColor: string;      // Map background color
  stateStroke: string;          // State border color
  stateFill: string;            // State fill color
  stateStrokeWidth: number;     // State border width
  stateHoverFill: string;       // State fill on hover
  pointColor: string;           // Point marker color ('none' for transparent)
  pointRadius: number;          // Point marker radius
  pointOpacity: number;         // Point marker opacity
  pointHoverRadius: number;     // Point radius on hover
  pointHoverOpacity: number;    // Point opacity on hover
}
```

### ChoroplethConfig

```typescript
{
  enabled: boolean;             // Enable choropleth layer
  colorScheme: string[];        // Array of colors for quantized scale
  minValue: number;             // Minimum data value
  maxValue: number;             // Maximum data value
  opacity: number;              // County fill opacity
}
```

### ZoomConfig

```typescript
{
  enabled: boolean;                              // Enable zoom
  scaleExtent: [number, number];                 // [min, max] zoom levels
  translateExtent: [[number, number], [number, number]];  // Pan boundaries
}
```

### TooltipConfig

```typescript
{
  enabled: boolean;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
}
```

## Example: Full Configuration

```tsx
<USMap
  data={fqhcData}
  topology={usTopology}
  countyTopology={usCountyTopology}
  countyData={countyPovertyData}
  width={1200}
  height={700}
  enableZoom={true}
  enableTooltip={true}
  projectionConfig={{
    type: 'albersUsa',
    scale: 1300,
    translate: [600, 350],
  }}
  zoomConfig={{
    scaleExtent: [1, 8],
    translateExtent: [
      [-500, -200],
      [1700, 900],
    ],
  }}
  choroplethConfig={{
    enabled: true,
    colorScheme: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4'],
    minValue: 5,
    maxValue: 25,
    opacity: 0.75,
  }}
  mapStyleConfig={{
    pointColor: 'none',
    pointRadius: 1.5,
    pointHoverRadius: 5,
  }}
  tooltipConfig={{
    backgroundColor: '#244855',
    textColor: '#ffffff',
    borderColor: '#E64833',
  }}
/>
```

## Data Formats

### FQHCData

```typescript
{
  sites: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    county: string;
    coordinates: [number, number];  // [longitude, latitude]
  }>
}
```

### CountyData

```typescript
{
  [fips: string]: {
    fips: string;
    name: string;
    povertyRate: number;  // Or any numeric value for choropleth
  }
}
```

## Styling

The component uses CSS variables from `common-styles.css` for consistent theming:

- `--color-hub-primary`, `--color-pillar-primary`, etc. - Color palette
- `--spacing-*` - Spacing tokens
- `--radius-*` - Border radius tokens
- `--transition-*` - Transition timing tokens

Override these in your project's CSS to customize the appearance globally.

## Features

### Zoom & Pan
- Zoom in/out buttons
- Mouse wheel zoom
- Click and drag to pan
- Reset zoom button
- Configurable zoom extent and pan boundaries

### Tooltips
- Auto-positioned tooltips on hover
- Customizable styling
- Shows site name, address, and location
- Smooth fade in/out with anti-flicker behavior

### Point Markers
- Constant visual size regardless of zoom level
- Invisible hit areas for better hover detection
- Customizable colors, sizes, and opacity
- Smooth hover transitions

### Choropleth
- County-level data visualization
- Quantized color scales
- Configurable value ranges
- Legend with color scale

## Performance

- Handles 18,000+ points efficiently
- Counter-scaling for constant marker size during zoom
- Optimized D3 selections and updates
- Separate hit areas prevent hover flickering
