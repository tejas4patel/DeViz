export type SceneId = string;

export type SceneComponentId =
  | 'scene01_pillars'
  | 'scene02_fqhc_map'
  | 'scene03_before_after'
  | 'scene04_growth'
  | 'scene05_pipeline'
  | 'scene06_data_matrix'
  | 'scene07_access_paths'
  | 'scene08_maternal'
  | 'scene09_dashboard_mock'
  | 'scene10_respiratory_disparities'
  | 'scene11_linkage_power'
  | 'scene12_linkage_rates'
  | 'scene13_limitations'
  | 'scene14_roadmap'
  | 'scene15_choose_path'
  | 'scene16_synthesis';

export type Scene = {
  id: SceneId;
  title: string;
  subtitle: string;
  component: SceneComponentId;
  notes?: string;
};

export type Story = {
  title: string;
  subtitle: string;
  scenes: Scene[];
};

export type PillarKey = 'microdata' | 'dashboards' | 'linkage';

export type SevenKey = 'who' | 'what' | 'when' | 'where' | 'why' | 'which' | 'how';

export type Qa = {
  question: string;
  answer: string;
};

export type SevenPack = Record<SevenKey, Qa>;

export type Node = {
  id: string;
  label: string;
  detail: string;
  group: 'hub' | 'pillar' | 'sub';
  pillar?: PillarKey;
  seven: SevenPack;
  // D3 simulation properties
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
  vx?: number;
  vy?: number;
};

export type Link = {
  source: string | Node;
  target: string | Node;
};

export type Scene04Row = {
  year: number;
  centers_total: number;
  visits_millions: number;
};

export type Scene08Row = {
  age: string;
  maternal_rate: number;
  gdm_rate: number;
};


