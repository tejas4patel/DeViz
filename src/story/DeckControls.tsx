import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  activeIdx: number;
  total: number;
  canPrev: boolean;
  canNext: boolean;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  onToggleHelp: () => void;
  helpOpen: boolean;
};

export default function DeckControls(props: Props) {
  const {
    activeIdx,
    total,
    canPrev,
    canNext,
    title,
    onPrev,
    onNext,
    onFirst,
    onLast,
    onToggleHelp,
    helpOpen,
  } = props;

  const pct = useMemo(() => {
    if (total <= 1) return 0;
    return Math.round((activeIdx / (total - 1)) * 100);
  }, [activeIdx, total]);

  return (
    <div className="deckControls">
      <div className="deckControlsLeft">
        <div className="deckTitle">{title}</div>
        <div className="deckMeta">
          Slide {activeIdx + 1} of {total} · {pct} percent
        </div>
      </div>

      <div className="deckControlsRight">
        <button className="btn" onClick={onToggleHelp}>
          {helpOpen ? 'Close help' : 'Help'}
        </button>

        <div className="deckNav">
          <button className="btn" disabled={!canPrev} onClick={onFirst}>
            First
          </button>
          <button className="btn" disabled={!canPrev} onClick={onPrev}>
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button className="btn" disabled={!canNext} onClick={onNext}>
            <ChevronRight size={20} strokeWidth={2} />
          </button>
          <button className="btn" disabled={!canNext} onClick={onLast}>
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
