import type { Scene } from "./story_types"

import Scene01Pillars from "./scenes/scene01_pillars"
import Scene02FqhcMap from "./scenes/scene02_fqhc_map"
import Scene03BeforeAfter from "./scenes/scene03_before_after"
import Scene04Growth from "./scenes/scene04_growth"
import Scene05Pipeline from "./scenes/scene05_pipeline"
import Scene06DataMatrix from "./scenes/scene06_data_matrix"
import Scene07AccessPaths from "./scenes/scene07_access_paths"
import Scene08Maternal from "./scenes/scene08_maternal"
import Scene09DashboardMock from "./scenes/scene09_dashboard_mock"
import Scene10RespiratoryDisparities from "./scenes/scene10_respiratory_disparities"
import Scene11LinkagePower from "./scenes/scene11_linkage_power"
import Scene12LinkageRates from "./scenes/scene12_linkage_rates"
import Scene13Limitations from "./scenes/scene13_limitations"
import Scene14Roadmap from "./scenes/scene14_roadmap"
import Scene15ChoosePath from "./scenes/scene15_choose_path"
import Scene16Synthesis from "./scenes/scene16_synthesis"

export default function SceneRenderer(props: { scene: Scene }) {
  const { scene } = props

  if (scene.component === "scene01_pillars") return <Scene01Pillars />
  if (scene.component === "scene02_fqhc_map") return <Scene02FqhcMap />
  if (scene.component === "scene03_before_after") return <Scene03BeforeAfter />
  if (scene.component === "scene04_growth") return <Scene04Growth />
  if (scene.component === "scene05_pipeline") return <Scene05Pipeline />
  if (scene.component === "scene06_data_matrix") return <Scene06DataMatrix />
  if (scene.component === "scene07_access_paths") return <Scene07AccessPaths />
  if (scene.component === "scene08_maternal") return <Scene08Maternal />
  if (scene.component === "scene09_dashboard_mock") return <Scene09DashboardMock />
  if (scene.component === "scene10_respiratory_disparities") return <Scene10RespiratoryDisparities />
  if (scene.component === "scene11_linkage_power") return <Scene11LinkagePower />
  if (scene.component === "scene12_linkage_rates") return <Scene12LinkageRates />
  if (scene.component === "scene13_limitations") return <Scene13Limitations />
  if (scene.component === "scene14_roadmap") return <Scene14Roadmap />
  if (scene.component === "scene15_choose_path") return <Scene15ChoosePath />
  if (scene.component === "scene16_synthesis") return <Scene16Synthesis />

  return <div>Scene component not found</div>
}
