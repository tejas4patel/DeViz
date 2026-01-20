import { Suspense, lazy } from "react"
import type { Scene } from "./story_types"

const registry: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  scene01_pillars: lazy(() => import("./scenes/scene01_pillars")),
  scene02_fqhc_map: lazy(() => import("./scenes/scene02_fqhc_map")),
  scene03_before_after: lazy(() => import("./scenes/scene03_before_after")),
  scene04_growth: lazy(() => import("./scenes/scene04_growth")),
  scene05_pipeline: lazy(() => import("./scenes/scene05_pipeline")),
  scene06_data_matrix: lazy(() => import("./scenes/scene06_data_matrix")),
  scene07_access_paths: lazy(() => import("./scenes/scene07_access_paths")),
  scene08_maternal: lazy(() => import("./scenes/scene08_maternal")),
  scene09_dashboard_mock: lazy(() => import("./scenes/scene09_dashboard_mock")),
  scene10_respiratory_disparities: lazy(() => import("./scenes/scene10_respiratory_disparities")),
  scene11_linkage_power: lazy(() => import("./scenes/scene11_linkage_power")),
  scene12_linkage_rates: lazy(() => import("./scenes/scene12_linkage_rates")),
  scene13_limitations: lazy(() => import("./scenes/scene13_limitations")),
  scene14_roadmap: lazy(() => import("./scenes/scene14_roadmap")),
  scene15_choose_path: lazy(() => import("./scenes/scene15_choose_path")),
  scene16_synthesis: lazy(() => import("./scenes/scene16_synthesis"))
}

export default function SceneRenderer(props: { scene: Scene }) {
  const { scene } = props
  const Comp = registry[scene.component]

  if (!Comp) return <div>Scene component not found</div>

  return (
    <Suspense fallback={<div className="small">Loading scene</div>}>
      <Comp />
    </Suspense>
  )
}
