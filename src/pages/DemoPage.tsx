import ScrollStoryShell from '../story/ScrollStoryShell';

export default function DemoPage() {
  return (
    <div className="demo-page">
      <div className="demo-banner">
        <strong>Live Demo</strong> — NAMCS Ambulatory Care Survey · 2019–2022 trends
      </div>
      <ScrollStoryShell />
    </div>
  );
}
