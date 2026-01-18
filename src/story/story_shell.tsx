import { useMemo, useState } from "react"
import { story } from "./story_data"
import SceneRenderer from "./scene_renderer"

export default function StoryShell() {
  const scenes = story.scenes
  const [idx, setIdx] = useState(0)

  const current = scenes[idx]
  const canPrev = idx > 0
  const canNext = idx < scenes.length - 1

  const meta = useMemo(() => {
    return {
      storyTitle: story.title,
      storySubtitle: story.subtitle
    }
  }, [])

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 700 }}>{meta.storyTitle}</div>
          <div className="small" style={{ marginTop: 6 }}>{meta.storySubtitle}</div>

          <div style={{ marginTop: 14, fontWeight: 650 }}>Scenes</div>
          <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
            {scenes.map((s, i) => (
              <button
                key={s.id}
                className="btn"
                onClick={() => setIdx(i)}
                style={{
                  textAlign: "left",
                  background: i === idx ? "rgba(20, 70, 160, 0.10)" : "white"
                }}
              >
                <div style={{ fontWeight: 650 }}>{s.title}</div>
                <div className="small">{s.subtitle}</div>
              </button>
            ))}
          </div>

          <div className="navBtnRow">
            <button className="btn" disabled={!canPrev} onClick={() => setIdx(v => Math.max(0, v - 1))}>
              Prev
            </button>
            <button className="btn" disabled={!canNext} onClick={() => setIdx(v => Math.min(scenes.length - 1, v + 1))}>
              Next
            </button>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="card">
          <div className="sceneHeader">
            <div>
              <div style={{ fontSize: 20, fontWeight: 750 }}>{current.title}</div>
              <div className="small" style={{ marginTop: 4 }}>{current.subtitle}</div>
            </div>
            <div className="small">{current.id}</div>
          </div>

          <SceneRenderer scene={current} />

          {current.notes ? (
            <div className="small" style={{ marginTop: 12 }}>
              Notes: {current.notes}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
