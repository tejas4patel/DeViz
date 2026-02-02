import { Suspense, lazy } from 'react';
import type { Scene } from './storyTypes';

const registry: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  scene01_pillars: lazy(() => import('./scenes/Scene01Introduction')),
  scene02_fqhc_map: lazy(() => import('./scenes/Scene02FqhcMap')),
  scene03_before_after: lazy(() => import('./scenes/Scene03BeforeAfter')),
  scene04_growth: lazy(() => import('./scenes/Scene04Growth')),
  scene05_pipeline: lazy(() => import('./scenes/Scene05Pipeline')),
  scene06_data_matrix: lazy(() => import('./scenes/Scene06DataMatrix')),
  scene07_access_paths: lazy(() => import('./scenes/Scene07AccessPaths')),
  scene08_maternal: lazy(() => import('./scenes/Scene08Maternal')),
  scene09_dashboard_mock: lazy(() => import('./scenes/Scene09DashboardMock')),
  scene10_respiratory_disparities: lazy(() => import('./scenes/Scene10RespiratoryDisparities')),
  scene11_linkage_power: lazy(() => import('./scenes/Scene11LinkagePower')),
  scene12_linkage_rates: lazy(() => import('./scenes/Scene12LinkageRates')),
  scene13_limitations: lazy(() => import('./scenes/Scene13Limitations')),
  scene14_roadmap: lazy(() => import('./scenes/Scene14Roadmap')),
  scene15_choose_path: lazy(() => import('./scenes/Scene15ChoosePath')),
  scene16_synthesis: lazy(() => import('./scenes/Scene16Synthesis')),
};

export default function SceneRenderer(props: { scene: Scene }) {
  const { scene } = props;
  const Comp = registry[scene.component];

  if (!Comp) return <div>Scene component not found</div>;

  return (
    <Suspense fallback={<div className="small">Loading scene</div>}>
      <Comp />
    </Suspense>
  );
}
