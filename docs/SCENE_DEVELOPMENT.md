# Scene Development Guide

This guide provides step-by-step instructions for implementing new scenes in the NAMCS Health Center Data visualization project.

## Table of Contents

1. [Overview](#overview)
2. [Scene Template](#scene-template)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [D3 Integration Patterns](#d3-integration-patterns)
5. [TypeScript Best Practices](#typescript-best-practices)
6. [Accessibility Checklist](#accessibility-checklist)
7. [Testing Your Scene](#testing-your-scene)
8. [Examples](#examples)

---

## Overview

A scene is a self-contained React component that:

1. Loads and prepares its data
2. Renders a D3 visualization or custom UI
3. Handles responsive sizing
4. Provides user interaction (hover, click, etc.)
5. Cleans up resources on unmount

---

## Scene Template

### Simple Chart Scene (Bar Chart, Line Chart, etc.)

```typescript
import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../viz/useResizeObserver';
import { axisBottom, axisLeft } from '../viz/chartAxes';
import { SceneXXRow } from '../storyTypes';
import { sceneXXRows } from '../sceneData';

export default function SceneXXName() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const rows = useMemo<SceneXXRow[]>(() => {
    return sceneXXRows;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Set dimensions
    const width = Math.max(620, rect.width);
    const height = 380;
    const margin = { top: 16, right: 18, bottom: 44, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    // Setup SVG
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove(); // Clean slate

    const g = root.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const x = d3.scaleBand<string>()
      .domain(rows.map(r => r.category))
      .range([0, innerW])
      .padding(0.25);

    const y = d3.scaleLinear()
      .domain([0, d3.max(rows, r => r.value)! * 1.15])
      .range([innerH, 0]);

    // Add axes
    const gx = g.append('g').attr('transform', `translate(0, ${innerH})`);
    axisBottom(gx.node() as SVGGElement | null, x);

    const gy = g.append('g');
    axisLeft(gy.node() as SVGGElement | null, y);

    // Add chart elements
    g.selectAll('rect')
      .data(rows)
      .join('rect')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerH - y(d.value))
      .attr('rx', 10)
      .attr('fill', 'rgba(20, 70, 160, 0.22)')
      .attr('stroke', 'rgba(20, 70, 160, 0.55)');

  }, [rows, rect.width]);

  return (
    <div ref={ref}>
      <svg ref={svgRef} width="100%" height="380" />
      <div className="small" style={{ marginTop: 10 }}>
        Data source and notes here
      </div>
    </div>
  );
}
```

### Complex Interactive Scene

```typescript
import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../viz/useResizeObserver';
import { Node } from '../storyTypes';
import { sceneXXNodes } from '../sceneData';

export default function SceneXXName() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [hoveredItem, setHoveredItem] = useState<Node | null>(null);
  const [selectedItem, setSelectedItem] = useState<Node | null>(null);

  const data = useMemo(() => {
    // Clone to prevent D3 mutations
    const nodes = sceneXXNodes.map(n => ({ ...n }));
    return { nodes };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // D3 visualization code

    return () => {
      // Cleanup (stop simulations, remove listeners)
    };
  }, [data, rect.width]);

  const activeItem = selectedItem ?? hoveredItem;

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12 }}>
      <div>
        <svg ref={svgRef} width="100%" height="440" />
      </div>
      <div className="panel-floating">
        {activeItem ? (
          <div>
            <h3>{activeItem.label}</h3>
            <p>{activeItem.detail}</p>
          </div>
        ) : (
          <div>Select an item...</div>
        )}
      </div>
    </div>
  );
}
```

---

## Step-by-Step Implementation

### 1. Define Data Types

Add your scene's data type to `src/story/storyTypes.ts`:

```typescript
export type SceneXXRow = {
  category: string;
  value: number;
  // ... other fields
};
```

### 2. Create Data File

Add your data to `src/story/sceneData.ts`:

```typescript
export const sceneXXRows: SceneXXRow[] = [
  { category: 'Category A', value: 100 },
  { category: 'Category B', value: 200 },
  // ... more data
];
```

### 3. Create Scene Component

Create `src/story/scenes/SceneXXName.tsx` using the template above.

### 4. Register Scene

Add your scene to `src/story/SceneRenderer.tsx`:

```typescript
const sceneRegistry: Record<string, React.LazyExoticComponent<...>> = {
  // ... existing scenes
  sceneXX_name: lazy(() => import('./scenes/SceneXXName')),
};
```

### 5. Update Story Configuration

Update the scene in `src/story/storyData.ts`:

```typescript
{
  id: 'sceneXX',
  title: 'Your Scene Title',
  subtitle: 'Your scene subtitle',
  component: 'sceneXX_name',  // Must match sceneRegistry key
  notes: 'Helpful user notes',
},
```

### 6. Verify It Works

```bash
npm run dev
```

Navigate to your scene using the progress rail or keyboard shortcuts.

---

## D3 Integration Patterns

### Pattern 1: Bar Chart

```typescript
const x = d3.scaleBand<string>()
  .domain(data.map(d => d.category))
  .range([0, innerW])
  .padding(0.25);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)! * 1.15])
  .range([innerH, 0]);

g.selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', d => x(d.category)!)
  .attr('y', d => y(d.value))
  .attr('width', x.bandwidth())
  .attr('height', d => innerH - y(d.value));
```

### Pattern 2: Line Chart

```typescript
const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year)!)
  .range([0, innerW]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)!])
  .range([innerH, 0]);

const line = d3.line<DataPoint>()
  .x(d => x(d.year))
  .y(d => y(d.value));

g.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', '#2F6FED')
  .attr('stroke-width', 2)
  .attr('d', line);
```

### Pattern 3: Force-Directed Graph

```typescript
type SimNode = Node & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode>;

const simNodes = data.nodes.map(n => ({ ...n })) as SimNode[];
const simLinks = data.links.map(l => ({ ...l })) as SimLink[];

const simulation = d3.forceSimulation(simNodes)
  .force('link', d3.forceLink<SimNode, SimLink>(simLinks).id(d => d.id))
  .force('charge', d3.forceManyBody().strength(-100))
  .force('center', d3.forceCenter(width / 2, height / 2));

// Update positions on tick
simulation.on('tick', () => {
  link
    .attr('x1', d => (d.source as SimNode).x ?? 0)
    .attr('y1', d => (d.source as SimNode).y ?? 0)
    .attr('x2', d => (d.target as SimNode).x ?? 0)
    .attr('y2', d => (d.target as SimNode).y ?? 0);

  node.attr('transform', d => `translate(${d.x}, ${d.y})`);
});

// Cleanup
return () => {
  simulation.stop();
};
```

### Pattern 4: Interactive Elements

```typescript
const node = g.selectAll('circle')
  .data(data)
  .join('circle')
  .attr('r', 5)
  .style('cursor', 'pointer')
  .on('mouseenter', function(event: MouseEvent, d) {
    setHoveredItem(d);
    d3.select(this).transition().duration(200).attr('r', 7);
  })
  .on('mouseleave', function() {
    setHoveredItem(null);
    d3.select(this).transition().duration(200).attr('r', 5);
  })
  .on('click', (_event: MouseEvent, d) => {
    setSelectedItem(d);
  });
```

---

## TypeScript Best Practices

### 1. Type Your Data

```typescript
// Define specific types for your data
type MyDataPoint = {
  category: string;
  value: number;
};

const data: MyDataPoint[] = [ /* ... */ ];
```

### 2. Type D3 Scales

```typescript
// Use generic parameters for proper type inference
const x = d3.scaleBand<string>()  // Domain type
  .domain(categories)
  .range([0, width]);

const y = d3.scaleLinear()  // Automatically number domain
  .domain([0, maxValue])
  .range([height, 0]);
```

### 3. Type Force Simulation Nodes

```typescript
// Extend your node type with SimulationNodeDatum
type SimNode = MyNode & d3.SimulationNodeDatum;

// Type your links
type SimLink = d3.SimulationLinkDatum<SimNode>;

// Use in simulation
const simulation = d3.forceSimulation<SimNode>(nodes);
```

### 4. Type Event Handlers

```typescript
// For regular mouse events
.on('click', (event: MouseEvent, d: DataPoint) => {
  console.log(d);
})

// Use function syntax if you need `this`
.on('mouseenter', function(event: MouseEvent, d: DataPoint) {
  d3.select(this).attr('r', 10);
})
```

### 5. Avoid `any`

```typescript
// ❌ Bad
const y = d3.scaleLinear()
  .domain([0, d3.max(data, (d: any) => d.value)])

// ✅ Good
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)!])  // Type inference works!
```

---

## Accessibility Checklist

When implementing a scene, ensure:

### Required

- [ ] SVG has `role="img"`
- [ ] SVG has descriptive `aria-label`
- [ ] Caption/notes have unique ID for `aria-describedby`
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast (4.5:1 for body, 3:1 for large text)

### Recommended

- [ ] Interactive elements are keyboard accessible (`tabIndex={0}`)
- [ ] Interactive elements respond to Enter/Space keys
- [ ] Focus indicators are visible (use `:focus-visible` CSS)
- [ ] Provide alternative text representation for complex charts

### Example

```typescript
<svg
  ref={svgRef}
  width="100%"
  height="380"
  role="img"
  aria-label="Bar chart showing participation growth from 2021 to 2023"
  aria-describedby="scene04-description"
/>
<div id="scene04-description" className="sr-only">
  The chart shows three bars representing years 2021, 2022, and 2023.
  Participation increased from 29 centers in 2021 to 95 centers in 2023.
</div>
<div className="small" style={{ marginTop: 10 }}>
  Data source: NCHS NAMCS Health Center component
</div>
```

---

## Testing Your Scene

### 1. Create Test File

Create `src/story/scenes/SceneXXName.test.tsx`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SceneXXName from './SceneXXName';

// Mock ResizeObserver
beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

describe('SceneXXName', () => {
  it('should render without crashing', () => {
    render(<SceneXXName />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render the correct number of data points', () => {
    const { container } = render(<SceneXXName />);
    // Check for specific SVG elements
    const bars = container.querySelectorAll('rect');
    expect(bars.length).toBe(3); // or expected count
  });
});
```

### 2. Run Tests

```bash
npm run test -- SceneXXName
```

### 3. Manual Testing

- [ ] Navigate to scene using keyboard (Arrow keys, Page Up/Down)
- [ ] Resize browser window - visualization should adapt
- [ ] Hover interactions work correctly
- [ ] Click interactions work correctly
- [ ] No console errors
- [ ] Runs typecheck: `npm run typecheck`
- [ ] Runs lint: `npm run lint`

---

## Examples

### Example 1: Simple Bar Chart (Scene04Growth)

See [src/story/scenes/Scene04Growth.tsx](../src/story/scenes/Scene04Growth.tsx) for:
- Basic bar chart with D3
- Axis rendering with chartAxes utility
- Responsive sizing with useResizeObserver
- Proper TypeScript types

**Key Features:**
- Simple data structure (year, centers, visits)
- Single bar chart
- Minimal interactivity

### Example 2: Grouped Bar Chart (Scene08Maternal)

See [src/story/scenes/Scene08Maternal.tsx](../src/story/scenes/Scene08Maternal.tsx) for:
- Grouped/clustered bar chart
- Nested band scales
- Multiple series per category
- Color differentiation

**Key Features:**
- Complex data structure (age groups with 2 values each)
- Nested scales (outer for groups, inner for series)
- Legend (inline text)

### Example 3: Force-Directed Graph (Scene01Introduction)

See [src/story/scenes/Scene01Introduction.tsx](../src/story/scenes/Scene01Introduction.tsx) for:
- Force simulation with proper types
- Interactive hover and click
- Side panel for details
- Complex state management
- "Seven questions" framework

**Key Features:**
- Most complex scene (301 lines)
- Multiple interaction states (hover, pin)
- D3 force simulation
- Two-column layout with detail panel

---

## Common Pitfalls

### ❌ Pitfall 1: Forgetting to Clean Up

```typescript
// Bad - simulation keeps running after unmount
useEffect(() => {
  const simulation = d3.forceSimulation(nodes);
  simulation.on('tick', updatePositions);
}, []);

// Good - cleanup on unmount
useEffect(() => {
  const simulation = d3.forceSimulation(nodes);
  simulation.on('tick', updatePositions);
  return () => {
    simulation.stop();  // Stop simulation
  };
}, []);
```

### ❌ Pitfall 2: Not Removing Old Elements

```typescript
// Bad - elements accumulate on re-render
useEffect(() => {
  const svg = d3.select(svgRef.current);
  svg.append('g').selectAll('rect').data(data).join('rect');
}, [data]);

// Good - clean slate on each render
useEffect(() => {
  const svg = d3.select(svgRef.current);
  svg.selectAll('*').remove();  // Clear everything
  svg.append('g').selectAll('rect').data(data).join('rect');
}, [data]);
```

### ❌ Pitfall 3: Using `any` Types

```typescript
// Bad - loses type safety
.on('click', (event: any, d: any) => {
  console.log(d.value);  // No autocomplete, no error checking
})

// Good - proper types
.on('click', (event: MouseEvent, d: DataPoint) => {
  console.log(d.value);  // Autocomplete works!
})
```

### ❌ Pitfall 4: Mutating Source Data

```typescript
// Bad - D3 simulation mutates original array
const simulation = d3.forceSimulation(scene01Nodes);

// Good - clone data first
const nodes = scene01Nodes.map(n => ({ ...n }));
const simulation = d3.forceSimulation(nodes);
```

---

## Resources

### D3.js Documentation
- [D3 API Reference](https://github.com/d3/d3/blob/main/API.md)
- [D3 Examples](https://observablehq.com/@d3/gallery)
- [D3 + TypeScript Guide](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/d3)

### React + D3 Patterns
- [React + D3 Integration](https://2019.wattenberger.com/blog/react-and-d3)
- [Amelia Wattenberger's D3 Guide](https://wattenberger.com/blog/d3)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript + React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Accessibility
- [W3C SVG Accessibility Guide](https://www.w3.org/WAI/GL/wiki/SVG_Accessibility_Guidelines)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

---

**Need Help?**

- Check existing scenes for patterns
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Run `npm run test` to ensure your changes don't break existing functionality
- Use TypeScript's autocomplete - it knows the D3 API!

Happy coding! 🎨📊
