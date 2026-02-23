import type { Scene } from './storyTypes';
import DeckSlideRailFlowLine from './DeckSlideRailFlowline';
import { TalezLogo } from './components/TalezLogo';

type Props = {
  title: string;
  subtitle?: string;
  scenes: Scene[];
  activeIdx: number;
  onSelectSlide: (idx: number) => void;
};

export default function DeckBrand(props: Props) {
  const { title, subtitle, scenes, activeIdx, onSelectSlide } = props;

  return (
    <div className="deckBrand">
      <div className="deckBrandText">
        <div className="deckBrandSubtitle">{subtitle}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <TalezLogo size={32} style={{ flexShrink: 0 }} />
          <div className="deckBrandTitle" style={{ flex: 1, minWidth: 0 }}>
            {title}
          </div>
        </div>
      </div>

      <div className="deckBrandRail" aria-label="Story progress">
        <DeckSlideRailFlowLine
          scenes={scenes}
          activeIdx={activeIdx}
          onSelectSlide={onSelectSlide}
        />
      </div>
    </div>
  );
}
