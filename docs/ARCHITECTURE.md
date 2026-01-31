# Architecture Documentation

## Overview

NAMCS Health Center Data is an interactive data storytelling application built with React, TypeScript, and D3.js. The architecture follows a scene-based presentation pattern where users navigate through a linear sequence of data visualizations.

## Core Concepts

### 1. Story/Scene Pattern

The application is structured as a **Story** containing multiple **Scenes**:

- **Story** - The overall narrative arc with metadata (title, subtitle)
- **Scene** - An individual visualization or content unit with:
  - Unique ID
  - Title and subtitle
  - Component reference
  - Notes for users

This pattern allows for:
- Linear storytelling flow
- Easy addition of new scenes
- Consistent navigation UX
- Scene-level lazy loading

### 2. Data Flow

```
storyData.ts (Story config)
     ↓
ScrollStoryShell (Navigation & state)
     ↓
SceneRenderer (Lazy loading)
     ↓
Scene Component (Individual scenes)
     ↓
D3 Visualization (Charts, graphs, maps)
```

#### Current Data Flow (Phase 1)

```typescript
// 1. Data is defined in sceneData.ts
export const scene01Nodes: Node[] = [ /* ... */ ];

// 2. Scene imports data
import { scene01Nodes } from '../sceneData';

// 3. Scene memoizes data
const data = useMemo(() => {
  const nodes = scene01Nodes.map(n => ({...n}));
  return { nodes };
}, []);

// 4. D3 renders visualization
useEffect(() => {
  // D3 code here
}, [data]);
```

#### Planned Data Flow (Phase 2)

```typescript
// 1. Data lives in public/data/scene01-nodes.json

// 2. Scene uses data loading hook
const { data, loading, error } = useSceneData<Node[]>('scene01-nodes');

// 3. Handle loading/error states
if (loading) return <LoadingSkeleton />;
if (error) return <ErrorMessage error={error} />;

// 4. D3 renders when data is ready
useEffect(() => {
  // D3 code here
}, [data]);
```

## Component Hierarchy

```
App.tsx
 └── ScrollStoryShell.tsx (Main shell)
      ├── DeckBrand.tsx (Header + progress rail)
      │    └── DeckSlideRailFlowline.tsx (Visual progress indicator)
      │
      ├── SceneRenderer.tsx (Lazy loads scene components)
      │    └── Scene[01-16].tsx (Individual scenes)
      │         ├── D3 Visualization (SVG)
      │         ├── useResizeObserver (Responsive sizing)
      │         └── chartAxes (D3 helpers)
      │
      └── Help Overlay (Keyboard shortcuts)
```

### ScrollStoryShell

**Responsibilities:**
- Manage active scene index
- Handle keyboard navigation (Arrow keys, Page Up/Down, Home/End, Space)
- Handle mouse wheel navigation with debouncing
- Persist state to sessionStorage
- Render header and current scene
- Show help overlay on Escape

**State:**
```typescript
const [activeIdx, setActiveIdx] = useState<number>(0);  // Current scene
const [showHelp, setShowHelp] = useState(false);       // Help overlay
```

**Key Features:**
- **Smart scroll handling**: Checks if target has internal scrollable content before navigating scenes
- **Cooldown period**: Prevents accidental rapid scene changes (700ms cooldown on wheel events)
- **Focus management**: Auto-focuses title element on scene change for screen readers
- **Session persistence**: Remembers last viewed scene

### SceneRenderer

**Responsibilities:**
- Lazy load scene components on demand
- Map scene component IDs to actual components
- Provide fallback for missing scenes

**Implementation:**
```typescript
// Registry pattern for lazy loading
const sceneRegistry: Record<string, React.LazyExoticComponent<...>> = {
  scene01_pillars: lazy(() => import('./scenes/Scene01Pillars')),
  scene02_fqhc_map: lazy(() => import('./scenes/Scene02FqhcMap')),
  // ... etc
};

// Render with Suspense
<Suspense fallback={<div>Loading scene...</div>}>
  <Component />
</Suspense>
```

### Scene Components

Each scene is a standalone component that:

1. **Manages its own data** (currently imports from sceneData.ts)
2. **Handles responsive sizing** (uses useResizeObserver hook)
3. **Renders D3 visualization** (in useEffect)
4. **Cleans up on unmount** (stops simulations, removes event listeners)

**Common Pattern:**
```typescript
export default function Scene##Name() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const data = useMemo(() => {
    // Load and prepare data
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // D3 visualization code

    return () => {
      // Cleanup
    };
  }, [data, rect.width]);

  return <svg ref={svgRef} />;
}
```

## D3 + React Integration

### Best Practices

1. **React owns the DOM** - Use refs, not D3 selectors for top-level elements
2. **D3 renders inside useEffect** - React doesn't touch D3-managed SVG content
3. **Clean slate on re-render** - Call `root.selectAll('*').remove()` to clear old elements
4. **Cleanup on unmount** - Stop force simulations, disconnect observers

### Type Safety with D3

All D3 code uses proper TypeScript types:

```typescript
// Type aliases for simulation nodes
type SimNode = Node & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode>;

// Properly typed force simulation
const simulation = d3.forceSimulation<SimNode>(nodes)
  .force('link', d3.forceLink<SimNode, SimLink>(links))
  .force('charge', d3.forceManyBody());

// Properly typed scales
const x = d3.scaleBand<number>()
  .domain(data.map(d => d.year))
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)!])
  .range([height, 0]);
```

### Responsive Visualizations

```typescript
// 1. Get container dimensions
const { ref, rect } = useResizeObserver<HTMLDivElement>();

// 2. Set minimum width to prevent collapse
const width = Math.max(MIN_WIDTH, rect.width);

// 3. Use viewBox for SVG scaling
svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

// 4. Re-render when width changes
useEffect(() => {
  // D3 code
}, [rect.width]);
```

## State Management

### Local Component State

Most state is local to components using React hooks:

```typescript
// Scene01Pillars example
const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
const [pinnedNode, setPinnedNode] = useState<Node | null>(null);

// Derived state
const activeNode = pinnedNode ?? hoveredNode;
```

### Session Storage

Only the current scene index is persisted:

```typescript
// Save on change
sessionStorage.setItem('namcs_activeIdx', String(activeIdx));

// Restore on mount
const saved = sessionStorage.getItem('namcs_activeIdx');
if (saved) setActiveIdx(parseInt(saved, 10));
```

**Why no global state library?**
- Linear navigation doesn't require complex state
- No data sharing between scenes (each loads its own)
- No user authentication or app-level state
- Simpler architecture, fewer dependencies

## Navigation System

### Keyboard Navigation

| Key(s) | Action |
|--------|--------|
| Arrow Down, Page Down, Space | Next scene |
| Arrow Up, Page Up, Shift+Space | Previous scene |
| Home | First scene |
| End | Last scene |
| Escape | Toggle help overlay |

### Mouse Wheel Navigation

- **Threshold**: 40px accumulated delta before scene change
- **Cooldown**: 700ms between scene changes
- **Smart detection**: Checks if scroll target has internal scrollable content
- **Prevention**: Only prevents default if actually navigating scenes

### Click Navigation

- Progress rail allows direct scene selection
- Each scene indicator is clickable

## Styling System

### CSS Architecture

```
Global styles (styles.css)
 ├── CSS Variables (colors, fonts)
 ├── Reusable classes (.card, .small, .btn, .kv)
 └── Component-specific styles

Scene components (inline styles)
 └── Component-specific layout and positioning

D3 visualizations (.attr() and .style())
 └── Data-driven styling (colors, sizes, positions)
```

### Design System

**Color Palette:**
```css
--brand-primary: #1F2A44;      /* Navy */
--brand-secondary: #2F6FED;    /* Blue */
--brand-accent: #2BB0A6;       /* Teal */

--text-primary: #1F2A44;
--text-secondary: #6B7280;
--text-inverse: #FFFFFF;

--bg-app: #FAFBFC;
--bg-surface: #F4F6F8;
--bg-surface-elevated: #EEF1F5;
```

**Typography:**
- Headings: 'Playfair Display' (serif)
- Body: 'Inter' (sans-serif)

**Glassmorphic Design:**
```css
.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
```

## Build System

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
```

**Why Vite?**
- Fast HMR (Hot Module Replacement)
- Native ESM support
- Built-in TypeScript support
- Optimized production builds
- Better dev experience than webpack

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,              // All strict checks enabled
    "target": "ES2022",          // Modern JavaScript
    "module": "ESNext",          // ESM modules
    "jsx": "react-jsx",          // New JSX transform
    "noEmit": true,              // Vite handles transpilation
    "isolatedModules": true      // Required for Vite
  }
}
```

## Testing Strategy

### Unit Tests

- **Utilities and helpers**: 90%+ coverage
- **Custom hooks**: 80%+ coverage
- **Simple components**: 60%+ coverage

### Integration Tests

- Scene navigation flow
- Data loading across transitions
- Error recovery
- Keyboard navigation

### Testing Tools

- **Vitest**: Fast unit test runner with Vite integration
- **React Testing Library**: Component testing focused on user behavior
- **jsdom**: DOM environment for tests
- **@testing-library/jest-dom**: Extended matchers

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScenePlaceholder from './ScenePlaceholder';

describe('ScenePlaceholder', () => {
  it('should display the title', () => {
    render(<ScenePlaceholder title="Test" description="Desc" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Performance Considerations

### Lazy Loading

Scenes are lazy-loaded using React.lazy() and Suspense:

```typescript
const Scene01 = lazy(() => import('./scenes/Scene01Pillars'));

<Suspense fallback={<div>Loading...</div>}>
  <Scene01 />
</Suspense>
```

**Benefits:**
- Smaller initial bundle
- Faster initial page load
- Scenes loaded on demand

### D3 Optimization

1. **Memo data transformations**: Prevent unnecessary D3 re-initialization
2. **Stop simulations on unmount**: Prevent memory leaks
3. **Debounce resize events**: Limit re-renders
4. **Use requestAnimationFrame**: Smooth animations

### Future Optimizations

- Preload next/previous scenes
- React.memo for expensive components
- Virtual scrolling for long scene lists (not needed for 16 scenes)

## Accessibility

### Current Implementation

- **Keyboard navigation**: Full keyboard support for scene navigation
- **Focus management**: Auto-focus on scene change
- **Semantic HTML**: Proper use of header, nav, main elements
- **ARIA labels**: Progress rail has aria-label

### Planned Improvements (Phase 4)

- ARIA labels on all SVG visualizations
- Screen reader announcements for scene changes
- Keyboard navigation within interactive visualizations
- Focus indicators (visible focus rings)
- Screen reader-accessible data tables for charts

## Security

### Current Measures

- **No user input**: Static data visualization, no forms
- **No external APIs**: All data bundled with app
- **Content Security Policy**: Vite default CSP headers
- **TypeScript strict mode**: Prevents type-related bugs

### Future Considerations

- Sanitize data if loading from external sources
- Add CSP headers in production
- Regular dependency audits

## Deployment

### Build for Production

```bash
npm run build
```

Output directory: `dist/`

### Preview Production Build

```bash
npm run preview
```

### Environment Requirements

- Node.js 18+ server or static hosting (Netlify, Vercel, GitHub Pages)
- No backend required
- Supports client-side routing (if URL routing is added)

## Future Architecture Changes

### Phase 2: Dynamic Data Loading

- Add `src/data/dataLoader.ts` utilities
- Add `src/data/useSceneData.ts` React hook
- Move data from `sceneData.ts` to `public/data/*.json`
- Add loading/error states to scenes

### Phase 3: Scene Implementations

- Implement 12 placeholder scenes
- Create reusable chart components (BarChart, LineChart, Legend)
- Add scene template generator script

### Phase 4: Accessibility

- Add ErrorBoundary component
- Add LoadingSkeleton component
- Add ScreenReaderTable component for charts
- Improve focus management

### Phase 5: Polish

- Add performance monitoring
- Add analytics (optional)
- Add print/export functionality
- Add URL-based routing (optional)

---

**Last Updated**: Phase 1 Complete

For implementation guidelines, see [SCENE_DEVELOPMENT.md](./SCENE_DEVELOPMENT.md).
