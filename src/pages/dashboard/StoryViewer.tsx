import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ScrollStoryShell from '../../story/ScrollStoryShell';

type TabType = 'source' | 'storybook';

export default function StoryViewer() {
  // storyId will drive dynamic story loading once the backend is wired up.
  // For now, ScrollStoryShell renders from static storyData.
  const { storyId } = useParams<{ storyId: string }>();
  void storyId;

  const [activeTab, setActiveTab] = useState<TabType>('source');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'source':
        return (
          <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <iframe
              src="/nihms-2127800.pdf"
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                flex: 1
              }}
              title="NIHMS Document"
            />
          </div>
        );
      case 'storybook':
        return <ScrollStoryShell />;
      default:
        return <ScrollStoryShell />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e1e5e9',
        backgroundColor: '#f8f9fa',
        padding: '0',
        minHeight: '48px'
      }}>
        {[
          { id: 'source', label: 'Source' },
          { id: 'storybook', label: 'StoryBook' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#fff' : 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid #E64833' : '2px solid transparent',
              color: activeTab === tab.id ? '#E64833' : '#666',
              fontWeight: activeTab === tab.id ? '600' : '400',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '-2px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = '#f1f3f4';
                e.currentTarget.style.color = '#333';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}
