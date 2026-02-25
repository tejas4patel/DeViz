import type { Scene, DetailLevel } from './storyTypes';
import DeckSlideRailFlowLine from './DeckSlideRailFlowline';
import { DeVizLogo } from './components/DeVizLogo';

type Props = {
  title: string;
  subtitle?: string;
  scenes: Scene[];
  activeIdx: number;
  onSelectSlide: (idx: number) => void;
  detailLevel: DetailLevel;
  onDetailLevelChange: (level: DetailLevel) => void;
  totalScenes: number;
};

export default function DeckBrand(props: Props) {
  const { title, subtitle, scenes, activeIdx, onSelectSlide, detailLevel, onDetailLevelChange, totalScenes } = props;

  return (
    <div className="deckBrand">
      <div className="deckBrandText">
        <div className="deckBrandSubtitle">{subtitle}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <DeVizLogo size={32} style={{ flexShrink: 0 }} />
          <div className="deckBrandTitle" style={{ flex: 1, minWidth: 0 }}>
            {title}
          </div>
        </div>
      </div>

      <div className="deckBrandRail" aria-label="Story progress">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <button
            onClick={() => onDetailLevelChange(detailLevel === 'beginner' ? 'expert' : 'beginner')}
            style={{
              fontSize: '11px',
              padding: '6px 12px',
              border: `2px solid ${detailLevel === 'expert' ? '#244855' : '#d1d5db'}`,
              borderRadius: '20px',
              background: detailLevel === 'expert' ? '#244855' : '#ffffff',
              color: detailLevel === 'expert' ? '#ffffff' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '600',
              minWidth: '70px'
            }}
          >
            {detailLevel === 'beginner' ? 'Essential' : 'Complete'}
          </button>
        
          <DeckSlideRailFlowLine
            scenes={scenes}
            activeIdx={activeIdx}
            onSelectSlide={onSelectSlide}
          />
        </div>
      </div>
    </div>
  );
}
