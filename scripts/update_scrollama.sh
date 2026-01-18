#!/usr/bin/env bash
set -euo pipefail

# Run this script from the project root folder.
# Example
# cd NAMCS-Data-Sources
# bash scripts/update_scrollama.sh

PROJECT_MARKER="package.json"
if [ ! -f "$PROJECT_MARKER" ]; then
  echo "Run this from the React project root where package.json exists."
  exit 1
fi

mkdir -p scripts

echo "Installing Scrollama packages"
npm install scrollama react-scrollama

echo "Writing scrollytelling StoryShell"
cat > src/story/scroll_story_shell.tsx <<'TSX'
import { useMemo, useState } from "react"
import { Scrollama, Step } from "react-scrollama"
import { story } from "./story_data"
import SceneRenderer from "./scene_renderer"

type StepData = {
  index: number
}

export default function ScrollStoryShell() {
  const scenes = story.scenes
  const [activeIdx, setActiveIdx] = useState(0)

  const meta = useMemo(() => {
    return {
      storyTitle: story.title,
      storySubtitle: story.subtitle
    }
  }, [])

  const activeScene = scenes[activeIdx]

  function onStepEnter(args: { data: StepData }) {
    const nextIdx = args.data.index
    if (typeof nextIdx !== "number") return
    if (nextIdx < 0 || nextIdx >= scenes.length) return
    setActiveIdx(nextIdx)
  }

  return (
    <div className="scrollyShell">
      <header className="scrollyHeader card">
        <div style={{ fontSize: 18, fontWeight: 800 }}>{meta.storyTitle}</div>
        <div className="small" style={{ marginTop: 6 }}>{meta.storySubtitle}</div>
      </header>

      <div className="scrollyBody">
        <div className="scrollyViz card">
          <div className="sceneHeader">
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{activeScene.title}</div>
              <div className="small" style={{ marginTop: 4 }}>{activeScene.subtitle}</div>
            </div>
            <div className="small">{activeScene.id}</div>
          </div>

          <SceneRenderer scene={activeScene} />

          {activeScene.notes ? (
            <div className="small" style={{ marginTop: 12 }}>
              Notes: {activeScene.notes}
            </div>
          ) : null}
        </div>

        <div className="scrollySteps">
          <Scrollama offset={0.6} onStepEnter={onStepEnter}>
            {scenes.map((s, i) => (
              <Step data={{ index: i }} key={s.id}>
                <div className="stepCard card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 850 }}>{s.title}</div>
                    <div className="small">{s.id}</div>
                  </div>

                  <div className="small" style={{ marginTop: 8, lineHeight: 1.5 }}>
                    {s.subtitle}
                  </div>

                  {s.notes ? (
                    <div className="small" style={{ marginTop: 10, opacity: 0.75 }}>
                      {s.notes}
                    </div>
                  ) : null}

                  <div className="small" style={{ marginTop: 12, opacity: 0.75 }}>
                    Scroll to activate this scene
                  </div>
                </div>
              </Step>
            ))}
          </Scrollama>

          <div className="small" style={{ margin: "18px 4px 40px 4px", opacity: 0.75 }}>
            End of story
          </div>
        </div>
      </div>
    </div>
  )
}
TSX

echo "Updating App to use ScrollStoryShell"
cat > src/app.tsx <<'TSX'
import ScrollStoryShell from "./story/scroll_story_shell"

export default function App() {
  return <ScrollStoryShell />
}
TSX

echo "Appending scrollytelling styles"
cat >> src/styles.css <<'CSS'

.scrollyShell {
  height: 100vh;
  overflow: auto;
  padding: 14px;
}

.scrollyHeader {
  margin-bottom: 12px;
}

.scrollyBody {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 12px;
  align-items: start;
}

.scrollyViz {
  position: sticky;
  top: 12px;
  height: calc(100vh - 12px - 14px - 70px);
  overflow: auto;
}

.scrollySteps {
  display: grid;
  gap: 12px;
}

.stepCard {
  min-height: 70vh;
  display: grid;
  align-content: start;
  gap: 4px;
}

@media (max-width: 980px) {
  .scrollyBody {
    grid-template-columns: 1fr;
  }

  .scrollyViz {
    position: relative;
    top: auto;
    height: auto;
  }

  .stepCard {
    min-height: 55vh;
  }
}
CSS

echo "Done"
echo "Run: npm run dev"
