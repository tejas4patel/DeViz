import { useParams } from 'react-router-dom';
import ScrollStoryShell from '../../story/ScrollStoryShell';

export default function StoryViewer() {
  // storyId will drive dynamic story loading once the backend is wired up.
  // For now, ScrollStoryShell renders from static storyData.
  const { storyId } = useParams<{ storyId: string }>();
  void storyId;

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollStoryShell />
    </div>
  );
}
