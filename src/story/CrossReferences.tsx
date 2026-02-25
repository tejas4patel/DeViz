/**
 * CrossReferences component
 * Shows related scenes and concepts to build cognitive connections
 */

import { useMemo } from 'react';
import { story } from './storyData';
import type { Scene } from './storyTypes';

type Props = {
  currentScene: Scene;
  onNavigate: (sceneIdx: number) => void;
};

export default function CrossReferences({ currentScene, onNavigate }: Props) {
  const relatedScenes = useMemo(() => {
    if (!currentScene.relatedScenes) return [];
    
    return currentScene.relatedScenes
      .map((relatedId: string) => {
        const sceneIdx = story.scenes.findIndex(s => s.id === relatedId);
        const scene = story.scenes[sceneIdx];
        return scene ? { scene, index: sceneIdx } : null;
      })
      .filter((item): item is { scene: Scene; index: number } => item !== null);
  }, [currentScene.relatedScenes]);

  if (relatedScenes.length === 0) return null;

  return (
    <div style={{
      marginTop: '16px',
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>🔗</span>
        Related Concepts
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {relatedScenes.map(({ scene, index }) => (
          <button
            key={scene.id}
            onClick={() => onNavigate(index)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              background: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '16px',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#244855';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#244855';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#374151';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            Scene {String(index + 1).padStart(2, '0')}: {scene.title}
          </button>
        ))}
      </div>
      
      <div style={{
        fontSize: '11px',
        color: '#6b7280',
        marginTop: '8px',
        fontStyle: 'italic'
      }}>
        Click to jump to related scenes and build connections between concepts
      </div>
    </div>
  );
}