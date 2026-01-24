import type { Scene } from './story_types';
import DeckSlideRailFlowLine from './deck_slide_rail_flowline';

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
        <div className="deckBrandTitle">{title}</div>
        {subtitle ? <div className="deckBrandSubtitle">{subtitle}</div> : null}
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
