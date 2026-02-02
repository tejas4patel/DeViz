# ForceDirectedGraph - Reusable Component

A fully reusable force-directed graph visualization component with configurable styling, forces, and interactions.

## Structure

```
ForceDirectedGraph/
├── ForceDirectedGraph.tsx    # Main component (to be created)
├── ForceDirectedGraph.css     # Component styles
├── types.ts                   # TypeScript type definitions
├── defaults.ts                # Default configurations
├── index.ts                   # Barrel exports
└── README.md                  # This file
```

## Features

- ✅ Fully configurable node groups with custom colors and sizes
- ✅ Dual-layer link styling with customizable colors
- ✅ Configurable force simulation parameters
- ✅ Optional satellite nodes with hover tooltips
- ✅ Zoom and pan support
- ✅ Drag nodes support
- ✅ Responsive sizing
- ✅ TypeScript support
- ✅ Separated CSS for easy customization

## Usage Example

```typescript
import { ForceDirectedGraph, NodeGroupConfig } from '@/story/viz/ForceDirectedGraph';
import graphData from './data/my-graph.json';

// Define node group configurations
const nodeGroupConfigs: Record<string, NodeGroupConfig> = {
  hub: {
    gradient: ['#244855', '#2d5a6b'],
    satelliteGradient: ['#5a7d8a', '#7a9aa8'],
    stroke: '#1a3540',
    radius: 60,
    glowRadius: 72,
    collisionRadius: 90,
    fontSize: 14,
    maxChars: 12,
  },
  pillar: {
    gradient: ['#E64833', '#f05a42'],
    satelliteGradient: ['#f28b7a', '#f7a698'],
    stroke: '#b8361f',
    radius: 44,
    glowRadius: 56,
    collisionRadius: 70,
    fontSize: 13,
    maxChars: 10,
  },
  sub: {
    gradient: ['#90AEAD', '#a5c3c2'],
    satelliteGradient: ['#b8d4d3', '#cde3e2'],
    stroke: '#6b8584',
    radius: 32,
    glowRadius: 44,
    collisionRadius: 55,
    fontSize: 11,
    maxChars: 9,
  },
};

function MyScene() {
  return (
    <ForceDirectedGraph
      data={graphData}
      nodeGroupConfigs={nodeGroupConfigs}
      enableDrag={true}
      enableZoom={true}
      enableSatellites={true}
      minWidth={860}
      minHeight={400}
    />
  );
}
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `GraphData` | Graph data with nodes and links |
| `nodeGroupConfigs` | `Record<string, NodeGroupConfig>` | Configuration for each node group |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkStyleConfig` | `LinkStyleConfig` | defaults | Link visual styling |
| `forceConfig` | `ForceConfig` | defaults | Force simulation parameters |
| `satelliteConfig` | `SatelliteConfig` | defaults | Satellite node configuration |
| `zoomConfig` | `ZoomConfig` | defaults | Zoom/pan configuration |
| `minWidth` | `number` | `860` | Minimum SVG width |
| `minHeight` | `number` | `400` | Minimum SVG height |
| `enableDrag` | `boolean` | `true` | Enable node dragging |
| `enableZoom` | `boolean` | `true` | Enable zoom/pan |
| `enableSatellites` | `boolean` | `true` | Enable satellite nodes |
| `popoverClassName` | `string` | - | Custom popover class |
| `tooltipClassName` | `string` | - | Custom tooltip class |
| `onNodeClick` | `(node) => void` | - | Node click handler |
| `onNodeHover` | `(node) => void` | - | Node hover handler |

## Data Format

```typescript
{
  "nodes": [
    {
      "id": "node1",
      "label": "My Node",
      "detail": "Node description",
      "group": "hub",
      // Optional satellite data
      "who": "Person involved",
      "what": "What it is",
      "when": "When it happens"
    }
  ],
  "links": [
    {
      "source": "node1",
      "target": "node2",
      "type": "partOf"
    }
  ]
}
```

## Customization

### Custom Link Colors

```typescript
const customLinkConfig = {
  ...defaultLinkStyleConfig,
  colors: {
    myType: '#FF0000',
    anotherType: '#00FF00',
    default: '#0000FF',
  },
};

<ForceDirectedGraph
  data={data}
  nodeGroupConfigs={configs}
  linkStyleConfig={customLinkConfig}
/>
```

### Custom Force Parameters

```typescript
const customForceConfig = {
  ...defaultForceConfig,
  chargeStrength: -800,
  linkDistance: (source, target) => {
    // Custom distance logic
    return 300;
  },
};

<ForceDirectedGraph
  data={data}
  nodeGroupConfigs={configs}
  forceConfig={customForceConfig}
/>
```

## Next Steps

1. ✅ Complete main `ForceDirectedGraph.tsx` component implementation
2. ✅ Update `Scene01Introduction` to use the new component
3. Test with existing data
4. Add additional features as needed

## Future Enhancements (TODO: Option B)

**Enhanced Customization with More className Props**

Currently planned for future implementation:

```typescript
// Additional className props for fine-grained control
<ForceDirectedGraph
  data={data}
  nodeGroupConfigs={configs}
  className="my-custom-container"
  svgClassName="my-custom-svg"
  nodeClassName="my-custom-nodes"
  linkClassName="my-custom-links"
  satelliteClassName="my-custom-satellites"
  styles={{
    container: { background: '#f0f0f0' },
    svg: { border: '1px solid #ccc' },
  }}
/>
```

This would allow users to:
- Apply custom classes to individual component parts
- Use CSS modules or styled-components more easily
- Override specific styling without affecting the entire component
- Mix default styles with custom styles

See TODO comments in `types.ts` and `ForceDirectedGraph.tsx` for implementation details.

## Benefits

- **Reusability**: Use in any scene with different data and styling
- **Maintainability**: Changes to graph logic in one place
- **Customization**: Full control over appearance and behavior
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized D3 rendering
- **Separation of Concerns**: CSS, types, and logic in separate files
