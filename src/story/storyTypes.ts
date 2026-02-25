export type SceneId = string;

export type SceneComponentId =
  | 'scene00_cognitive_map'
  | 'scene01_pillars'
  | 'scene02_fqhc_map'
  | 'scene03_before_after'
  | 'scene04_growth'
  | 'scene05_timeline'
  | 'scene06_pipeline'
  | 'scene07_data_matrix'
  | 'scene08_access_paths'
  | 'scene09_maternal'
  | 'scene10_respiratory'
  | 'scene11_linkage_power'
  | 'scene12_linkage_rates'
  | 'scene13_limitations'
  | 'scene14_roadmap'
  | 'scene15_synthesis';

export type Scene = {
  id: SceneId;
  title: string;
  subtitle: string;
  component: SceneComponentId;
  notes?: string;
  relatedScenes?: string[];
  detailLevel?: 'beginner' | 'expert' | 'both';
};

export type Story = {
  title: string;
  subtitle: string;
  scenes: Scene[];
};

export type DetailLevel = 'beginner' | 'expert';

export type CrossReference = {
  sceneId: string;
  concept: string;
  description: string;
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


