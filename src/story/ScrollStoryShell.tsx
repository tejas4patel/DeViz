import { useEffect, useMemo, useRef, useState } from 'react';
import { story } from './storyData';
import SceneRenderer from './SceneRenderer';
import DeckBrand from './DeckBrand';
import CrossReferences from './CrossReferences';
import type { DetailLevel } from './storyTypes';

function isTypingTarget(el: Element | null) {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === 'input') return true;
  if (tag === 'textarea') return true;
  if (tag === 'select') return true;
  const anyEl = el as HTMLElement;
  if (anyEl.isContentEditable) return true;
  return false;
}

export default function ScrollStoryShell() {
  const [detailLevel, setDetailLevel] = useState<DetailLevel>(() => {
    const saved = sessionStorage.getItem('deckDetailLevel');
    return (saved === 'beginner' || saved === 'expert') ? saved : 'beginner';
  });
  
  const filteredScenes = useMemo(() => {
    return story.scenes.filter(scene => {
      if (!scene.detailLevel || scene.detailLevel === 'both') return true;
      if (detailLevel === 'beginner' && scene.detailLevel === 'beginner') return true;
      if (detailLevel === 'expert') return true;
      return false;
    });
  }, [detailLevel]);
  
  const scenes = filteredScenes;
  const [activeIdx, setActiveIdx] = useState(() => {
    const saved = sessionStorage.getItem('deckActiveIdx');
    if (saved) {
      const n = Number(saved);
      if (Number.isFinite(n) && n >= 0) {
        return Math.min(n, filteredScenes.length - 1);
      }
    }
    return 0;
  });
  const [helpOpen, setHelpOpen] = useState(false);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const lastFlipTsRef = useRef(0);
  const accumDeltaRef = useRef(0);

  const meta = useMemo(() => {
    return {
      storyTitle: story.title,
      storySubtitle: story.subtitle,
    };
  }, []);

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < scenes.length - 1;
  const activeScene = scenes[activeIdx];

  useEffect(() => {
    sessionStorage.setItem('deckActiveIdx', String(activeIdx));
  }, [activeIdx]);

  useEffect(() => {
    sessionStorage.setItem('deckDetailLevel', detailLevel);
  }, [detailLevel]);

  useEffect(() => {
    titleRef.current?.focus?.();
  }, [activeIdx]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const ae = document.activeElement;
      if (isTypingTarget(ae)) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setHelpOpen(v => !v);
        return;
      }

      if (e.key === ' ' && e.shiftKey) {
        e.preventDefault();
        if (canPrev) setActiveIdx(v => Math.max(0, v - 1));
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (canNext) setActiveIdx(v => Math.min(scenes.length - 1, v + 1));
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (canPrev) setActiveIdx(v => Math.max(0, v - 1));
        return;
      }

      if (e.key === 'Home') {
        e.preventDefault();
        setActiveIdx(0);
        return;
      }

      if (e.key === 'End') {
        e.preventDefault();
        setActiveIdx(scenes.length - 1);
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown as EventListener);
  }, [canNext, canPrev, scenes.length]);

  // Listen for navigation events from cognitive map
  useEffect(() => {
    const handleNavigateToScene = (event: CustomEvent<{ sceneIndex: number }>) => {
      const { sceneIndex } = event.detail;
      setActiveIdx(sceneIndex);
    };

    window.addEventListener('navigateToScene', handleNavigateToScene as EventListener);
    return () => {
      window.removeEventListener('navigateToScene', handleNavigateToScene as EventListener);
    };
  }, []);

  const onWheelCapture = (e: React.WheelEvent) => {
    if (e.ctrlKey) return;

    const target = e.target as HTMLElement | null;
    const scrollableAncestor = target?.closest?.('.slideScrollBody') as HTMLElement | null;

    if (scrollableAncestor) {
      const atTop = scrollableAncestor.scrollTop <= 0;
      const atBottom =
        Math.ceil(scrollableAncestor.scrollTop + scrollableAncestor.clientHeight) >=
        scrollableAncestor.scrollHeight;

      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
    }

    e.preventDefault();

    const now = Date.now();
    const cooldownMs = 450;
    if (now - lastFlipTsRef.current < cooldownMs) return;

    accumDeltaRef.current += e.deltaY;
    const threshold = 80;
    if (Math.abs(accumDeltaRef.current) < threshold) return;

    const dir = accumDeltaRef.current > 0 ? 1 : -1;
    accumDeltaRef.current = 0;
    lastFlipTsRef.current = now;

    setActiveIdx(prev => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > scenes.length - 1) return scenes.length - 1;
      return next;
    });
  };




  return (
    <div className="deckShell" onWheelCapture={onWheelCapture}>
      <header className="deckHeader card">
        <DeckBrand
          title={meta.storyTitle}
          subtitle={meta.storySubtitle}
          scenes={scenes}
          activeIdx={activeIdx}
          onSelectSlide={idx => setActiveIdx(idx)}
          detailLevel={detailLevel}
          onDetailLevelChange={setDetailLevel}
          totalScenes={story.scenes.length}
        />
      </header>
      <main className="deckBody">
        <section className="deckStage card">
          <div className="sceneHeader">
            <div style={{ minWidth: 0 }}>
              <div
                ref={titleRef}
                tabIndex={0}
                className="deckSceneTitle"
                style={{ fontSize: 20, fontWeight: 800, outline: 'none' }}
              >
                {activeScene.title}
              </div>
              <div className="small" style={{ marginTop: 4 }}>
                {activeScene.subtitle}
              </div>
            </div>
          </div>

          <div className="slideScrollBody">
            <SceneRenderer scene={activeScene} />
            {activeScene.notes ? (
              <div className="small" style={{ marginTop: 12 }}>
                Notes: {activeScene.notes}
              </div>
            ) : null}
            
            <CrossReferences
              currentScene={activeScene}
              onNavigate={(sceneIdx) => {
                // Map filtered scene index back to original story index
                const targetScene = scenes[sceneIdx];
                const originalIdx = story.scenes.findIndex(s => s.id === targetScene.id);
                if (originalIdx !== -1) {
                  // Check if target scene is visible in current detail level
                  const filteredIdx = scenes.findIndex(s => s.id === targetScene.id);
                  if (filteredIdx !== -1) {
                    setActiveIdx(filteredIdx);
                  }
                }
              }}
            />
          </div>

          {/* DeckControls removed per design request; controls moved to header */}
        </section>
      </main>

      {helpOpen ? (
        <div className="helpOverlay" onClick={() => setHelpOpen(false)}>
          <div className="helpCard card" onClick={ev => ev.stopPropagation()}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>Controls</div>

            <div className="helpGrid">
              <div className="helpKey">ArrowDown</div>
              <div className="helpVal">Next slide</div>

              <div className="helpKey">ArrowUp</div>
              <div className="helpVal">Prev slide</div>

              <div className="helpKey">PageDown</div>
              <div className="helpVal">Next slide</div>

              <div className="helpKey">PageUp</div>
              <div className="helpVal">Prev slide</div>

              <div className="helpKey">Space</div>
              <div className="helpVal">Next slide</div>

              <div className="helpKey">Shift plus Space</div>
              <div className="helpVal">Prev slide</div>

              <div className="helpKey">Home</div>
              <div className="helpVal">First slide</div>

              <div className="helpKey">End</div>
              <div className="helpVal">Last slide</div>

              <div className="helpKey">Escape</div>
              <div className="helpVal">Toggle help</div>

              <div className="helpKey">Wheel</div>
              <div className="helpVal">
                Flips slides only when internal scroll is at top or bottom
              </div>
            </div>

            <div className="navBtnRow" style={{ justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setHelpOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
