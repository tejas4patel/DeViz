import type { Scene } from './storyTypes';
import DeckSlideRailFlowLine from './DeckSlideRailFlowline';

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
        <div className="deckBrandTitle">{title}</div>
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
