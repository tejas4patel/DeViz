import { Component, Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import type { Scene } from './storyTypes';
import { SceneLoader } from './components/SceneLoader';

const registry: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  scene00_cognitive_map: lazy(() => import('./scenes/Scene00CognitiveMap')),
  scene01_pillars:       lazy(() => import('./scenes/Scene01Introduction')),
  scene02_fqhc_map:      lazy(() => import('./scenes/Scene02FqhcMap')),
  scene03_before_after:  lazy(() => import('./scenes/Scene03BeforeAfter')),
  scene04_growth:        lazy(() => import('./scenes/Scene04Growth')),
  scene05_timeline:      lazy(() => import('./scenes/Scene05Timeline')),
  scene06_pipeline:      lazy(() => import('./scenes/Scene06Pipeline')),
  scene07_data_matrix:   lazy(() => import('./scenes/Scene07DataMatrix')),
  scene08_access_paths:  lazy(() => import('./scenes/Scene08AccessPaths')),
  scene09_maternal:      lazy(() => import('./scenes/Scene09Maternal')),
  scene10_respiratory:   lazy(() => import('./scenes/Scene10Respiratory')),
  scene11_linkage_power: lazy(() => import('./scenes/Scene11LinkagePower')),
  scene12_linkage_rates: lazy(() => import('./scenes/Scene12LinkageRates')),
  scene13_limitations:   lazy(() => import('./scenes/Scene13Limitations')),
  scene14_roadmap:       lazy(() => import('./scenes/Scene14Roadmap')),
  scene15_synthesis:     lazy(() => import('./scenes/Scene15Synthesis')),
};

// ── Error Boundary ────────────────────────────────────────────────────────────
type BoundaryProps = { sceneName: string; children: ReactNode };
type BoundaryState = { hasError: boolean };

class SceneErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[SceneErrorBoundary] Scene crashed:', this.props.sceneName, error, info);
  }

  handleRetry = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%', gap: '1rem',
          padding: '2rem', textAlign: 'center', color: 'var(--text-primary)',
        }}>
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Failed to load &ldquo;{this.props.sceneName}&rdquo;
          </div>
          <div style={{ opacity: 0.7, fontSize: '0.875rem', maxWidth: 360 }}>
            Something went wrong while rendering this scene.
          </div>
          <button className="btn" onClick={this.handleRetry}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── SceneRenderer ─────────────────────────────────────────────────────────────
export default function SceneRenderer({ scene }: { scene: Scene }) {
  const Comp = registry[scene.component];

  if (!Comp) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Scene component not found</div>;
  }

  return (
    <SceneErrorBoundary sceneName={scene.title}>
      <Suspense fallback={<SceneLoader title={scene.title} />}>
        <Comp />
      </Suspense>
    </SceneErrorBoundary>
  );
}
