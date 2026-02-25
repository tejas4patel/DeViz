import ScrollStoryShell from '../story/ScrollStoryShell';

export default function DemoPage() {
  return (
    <div className="demo-page">
      <div className="demo-banner">
        <strong>Example Story</strong> · A research dataset transformed into an interactive, scene-based narrative
      </div>
      <ScrollStoryShell />
    </div>
  );
}
