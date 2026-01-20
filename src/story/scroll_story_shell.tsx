import { useEffect, useMemo, useRef, useState } from "react"
import { story } from "./story_data"
import SceneRenderer from "./scene_renderer"
import DeckControls from "./deck_controls"
import DeckBrand from "./deck_brand"


function isTypingTarget(el: Element | null) {
  if (!el) return false
  const tag = el.tagName.toLowerCase()
  if (tag === "input") return true
  if (tag === "textarea") return true
  if (tag === "select") return true
  const anyEl = el as HTMLElement
  if (anyEl.isContentEditable) return true
  return false
}

export default function ScrollStoryShell() {
  const scenes = story.scenes
  const [activeIdx, setActiveIdx] = useState(0)
  const [helpOpen, setHelpOpen] = useState(false)

  const titleRef = useRef<HTMLDivElement | null>(null)
  const lastFlipTsRef = useRef(0)
  const accumDeltaRef = useRef(0)

  const meta = useMemo(() => {
    return {
      storyTitle: story.title,
      storySubtitle: story.subtitle
    }
  }, [])

  const canPrev = activeIdx > 0
  const canNext = activeIdx < scenes.length - 1
  const activeScene = scenes[activeIdx]

  useEffect(() => {
    const saved = sessionStorage.getItem("deckActiveIdx")
    if (!saved) return
    const n = Number(saved)
    if (!Number.isFinite(n)) return
    if (n < 0) return
    if (n > scenes.length - 1) return
    setActiveIdx(n)
  }, [scenes.length])

  useEffect(() => {
    sessionStorage.setItem("deckActiveIdx", String(activeIdx))
  }, [activeIdx])

  useEffect(() => {
    titleRef.current?.focus?.()
  }, [activeIdx])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const ae = document.activeElement
      if (isTypingTarget(ae)) return

      if (e.key === "Escape") {
        e.preventDefault()
        setHelpOpen((v) => !v)
        return
      }

      if (e.key === " " && e.shiftKey) {
        e.preventDefault()
        if (canPrev) setActiveIdx((v) => Math.max(0, v - 1))
        return
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        if (canNext) setActiveIdx((v) => Math.min(scenes.length - 1, v + 1))
        return
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        if (canPrev) setActiveIdx((v) => Math.max(0, v - 1))
        return
      }

      if (e.key === "Home") {
        e.preventDefault()
        setActiveIdx(0)
        return
      }

      if (e.key === "End") {
        e.preventDefault()
        setActiveIdx(scenes.length - 1)
        return
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false })
    return () => window.removeEventListener("keydown", onKeyDown as EventListener)
  }, [canNext, canPrev, scenes.length])

  const onWheelCapture = (e: React.WheelEvent) => {
    if (e.ctrlKey) return

    const target = e.target as HTMLElement | null
    const scrollableAncestor = target?.closest?.(".slideScrollBody") as HTMLElement | null

    if (scrollableAncestor) {
      const atTop = scrollableAncestor.scrollTop <= 0
      const atBottom =
        Math.ceil(scrollableAncestor.scrollTop + scrollableAncestor.clientHeight) >=
        scrollableAncestor.scrollHeight

      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return
    }

    e.preventDefault()

    const now = Date.now()
    const cooldownMs = 450
    if (now - lastFlipTsRef.current < cooldownMs) return

    accumDeltaRef.current += e.deltaY
    const threshold = 80
    if (Math.abs(accumDeltaRef.current) < threshold) return

    const dir = accumDeltaRef.current > 0 ? 1 : -1
    accumDeltaRef.current = 0
    lastFlipTsRef.current = now

    setActiveIdx((prev) => {
      const next = prev + dir
      if (next < 0) return 0
      if (next > scenes.length - 1) return scenes.length - 1
      return next
    })
  }

  const goPrev = () => setActiveIdx((v) => Math.max(0, v - 1))
  const goNext = () => setActiveIdx((v) => Math.min(scenes.length - 1, v + 1))
  const goFirst = () => setActiveIdx(0)
  const goLast = () => setActiveIdx(scenes.length - 1)

  return (
    <div className="deckShell" onWheelCapture={onWheelCapture}>
      <header className="deckHeader card">
        <DeckBrand
          title={meta.storyTitle}
          subtitle={meta.storySubtitle}
          scenes={scenes}
          activeIdx={activeIdx}
          onSelectSlide={(idx) => setActiveIdx(idx)}
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
                style={{ fontSize: 20, fontWeight: 800, outline: "none" }}
              >
                {activeScene.title}
              </div>
              <div className="small" style={{ marginTop: 4 }}>
                {activeScene.subtitle}
              </div>
            </div>
            <div className="small">{activeScene.id}</div>
          </div>

          <div className="slideScrollBody">
            <SceneRenderer scene={activeScene} />
            {activeScene.notes ? (
              <div className="small" style={{ marginTop: 12 }}>
                Notes: {activeScene.notes}
              </div>
            ) : null}
          </div>

          <DeckControls
            activeIdx={activeIdx}
            total={scenes.length}
            canPrev={canPrev}
            canNext={canNext}
            title={activeScene.title}
            onPrev={goPrev}
            onNext={goNext}
            onFirst={goFirst}
            onLast={goLast}
            onToggleHelp={() => setHelpOpen((v) => !v)}
            helpOpen={helpOpen}
          />
        </section>
      </main>

      {helpOpen ? (
        <div className="helpOverlay" onClick={() => setHelpOpen(false)}>
          <div className="helpCard card" onClick={(ev) => ev.stopPropagation()}>
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
              <div className="helpVal">Flips slides only when internal scroll is at top or bottom</div>
            </div>

            <div className="navBtnRow" style={{ justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => setHelpOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
