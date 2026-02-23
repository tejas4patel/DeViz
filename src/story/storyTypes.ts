export type SceneId = string;

export type SceneComponentId =
  | 'scene01_pillars'
  | 'scene02_fqhc_map'
  | 'scene03_before_after'
  | 'scene04_growth'
  | 'scene05_timeline'
  | 'scene06_pipeline'
  | 'scene07_data_matrix'
  | 'scene08_access_paths'
  | 'scene09_maternal'
  | 'scene10_dashboard_mock'
  | 'scene11_respiratory_disparities'
  | 'scene12_linkage_power'
  | 'scene13_linkage_rates'
  | 'scene14_limitations'
  | 'scene15_roadmap'
  | 'scene16_choose_path'
  | 'scene17_synthesis';

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


