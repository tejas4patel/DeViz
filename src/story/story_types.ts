export type SceneId = string

export type SceneComponentId =
  | "scene01_pillars"
  | "scene02_fqhc_map"
  | "scene03_before_after"
  | "scene04_growth"
  | "scene05_pipeline"
  | "scene06_data_matrix"
  | "scene07_access_paths"
  | "scene08_maternal"
  | "scene09_dashboard_mock"
  | "scene10_respiratory_disparities"
  | "scene11_linkage_power"
  | "scene12_linkage_rates"
  | "scene13_limitations"
  | "scene14_roadmap"
  | "scene15_choose_path"
  | "scene16_synthesis"

export type Scene = {
  id: SceneId
  title: string
  subtitle: string
  component: SceneComponentId
  notes?: string
}

export type Story = {
  title: string
  subtitle: string
  scenes: Scene[]
}
