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
  viewMode: 'source' | 'story';
  onViewModeChange: (mode: 'source' | 'story') => void;
  totalScenes: number;
};

export default function DeckBrand(props: Props) {
  const { title, subtitle, scenes, activeIdx, onSelectSlide, detailLevel, onDetailLevelChange, viewMode, onViewModeChange, totalScenes } = props;

  return (
    <div className="deckBrand" style={{ gap: '4px' }}>
      <div className="deckBrandText">
        <div className="deckBrandSubtitle">{subtitle}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <DeVizLogo size={24} style={{ flexShrink: 0 }} />
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
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => onViewModeChange('source')}
              style={{
                fontSize: '11px',
                padding: '6px 12px',
                border: `2px solid ${viewMode === 'source' ? '#244855' : '#d1d5db'}`,
                borderRadius: '20px',
                background: viewMode === 'source' ? '#244855' : '#ffffff',
                color: viewMode === 'source' ? '#ffffff' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '600',
                minWidth: '70px'
              }}
            >
              Source
            </button>
            
            <button
              onClick={() => onViewModeChange('story')}
              style={{
                fontSize: '11px',
                padding: '6px 12px',
                border: `2px solid ${viewMode === 'story' ? '#244855' : '#d1d5db'}`,
                borderRadius: '20px',
                background: viewMode === 'story' ? '#244855' : '#ffffff',
                color: viewMode === 'story' ? '#ffffff' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '600',
                minWidth: '70px'
              }}
            >
              Story
            </button>
          </div>
        
          <DeckSlideRailFlowLine
            scenes={scenes}
            activeIdx={activeIdx}
            onSelectSlide={onSelectSlide}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
}
