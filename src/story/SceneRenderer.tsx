import { Suspense, lazy } from 'react';
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

export default function SceneRenderer(props: { scene: Scene }) {
  const { scene } = props;
  const Comp = registry[scene.component];

  if (!Comp) return <div>Scene component not found</div>;

  return (
    <Suspense fallback={<SceneLoader title={scene.title} />}>
      <Comp />
    </Suspense>
  );
}
