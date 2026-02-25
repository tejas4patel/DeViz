/**
 * Scene 00: Cognitive Map
 * 
 * Provides an overview of the story structure to help users build
 * a mental model before diving into the details.
 */

import { useState } from 'react';
import { story } from '../storyData';

const categoryColors = {
  foundation: '#244855',
  context: '#E64833', 
  methodology: '#90AEAD',
  insights: '#7C3AED'
};

const sceneCategories = {
  'scene00_cognitive_map': 'foundation',
  'scene01_introduction': 'foundation', 
  'scene02': 'context',
  'scene03': 'methodology',
  'scene04': 'context',
  'scene05': 'methodology',
  'scene06': 'methodology',
  'scene07': 'insights',
  'scene08': 'insights',
  'scene09': 'insights',
  'scene10': 'insights',
  'scene11': 'insights'
} as const;

export default function Scene00CognitiveMap() {
  const [hoveredScene, setHoveredScene] = useState<string | null>(null);
  const scenes = story.scenes;

  const handleSceneClick = (sceneId: string) => {
    const sceneIndex = scenes.findIndex(s => s.id === sceneId);
    if (sceneIndex !== -1) {
      // Dispatch a custom event to notify the parent of navigation
      window.dispatchEvent(new CustomEvent('navigateToScene', {
        detail: { sceneIndex }
      }));
    }
  };

  const categoryLabels = {
    foundation: 'Foundation',
    context: 'Context & Scale', 
    methodology: 'Data Collection',
    insights: 'Research & Applications'
  };

  const organizedScenes = Object.entries(categoryLabels).map(([category, label]) => ({
    category: category as keyof typeof categoryLabels,
    label,
    scenes: scenes.filter(scene => sceneCategories[scene.id as keyof typeof sceneCategories] === category),
    color: categoryColors[category as keyof typeof categoryColors]
  }));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
      overflow: 'auto'
    }}>
      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#244855',
            marginBottom: '12px'
          }}>
            Story Map
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748B',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Navigate through 12 focused scenes exploring NAMCS Health Center data.
            From foundational concepts to real-world research applications.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {organizedScenes.map(({ category, label, scenes: categoryScenes, color }) => (
            <div key={category} style={{
              background: '#ffffff',
              border: `2px solid ${color}`,
              borderRadius: '12px',
              padding: '20px',
              minHeight: '200px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: color,
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {label}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categoryScenes.map((scene, idx) => (
                  <div
                    key={scene.id}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: hoveredScene === scene.id 
                        ? `${color}15` 
                        : 'transparent',
                      border: `1px solid ${hoveredScene === scene.id ? color : '#e2e8f0'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={() => setHoveredScene(scene.id)}
                    onMouseLeave={() => setHoveredScene(null)}
                    onClick={() => handleSceneClick(scene.id)}
                  >
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>
                      Scene {String(scenes.indexOf(scene) + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748B',
                      lineHeight: 1.4
                    }}>
                      {scene.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Navigation Tips
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            fontSize: '13px',
            color: '#64748B',
            lineHeight: 1.5
          }}>
            <div>• Use arrow keys or space to navigate between scenes</div>
            <div>• Essential mode shows 7 core scenes, Complete shows all 12</div>
            <div>• Hover over elements for additional context and definitions</div>
            <div>• Related concepts are cross-referenced with clickable links</div>
          </div>
        </div>

        {hoveredScene && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#374151',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '400px',
            textAlign: 'center',
            zIndex: 1000,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            {scenes.find(s => s.id === hoveredScene)?.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}