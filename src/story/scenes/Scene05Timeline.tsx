/**
 * Scene 05: Evolution Timeline
 *
 * Shows the progression from manual abstraction to automated
 * EHR-based data collection through a zigzag timeline visualization.
 */

import { ZigzagTimeline, TimelineEvent } from '../components/ZigzagTimeline';

// Timeline events showing the evolution of the NAMCS HC redesign
const timelineEvents: TimelineEvent[] = [
  {
    date: 'Pre-2021',
    label: 'Manual Abstraction',
    description: 'Paper-based visit forms with manual data extraction and 3-week sample periods.',
    type: 'milestone',
    icon: '📋',
  },
  {
    date: 'Q1 2021',
    label: 'Planning Phase',
    description: 'Development of EHR-based data collection methodology and center recruitment.',
    type: 'change',
    icon: '📐',
  },
  {
    date: 'Q2 2021',
    label: 'Pilot Testing',
    description: 'Initial pilot with select health centers to validate EHR extraction process.',
    type: 'feature',
    icon: '🧪',
  },
  {
    date: 'Q3 2021',
    label: 'System Launch',
    description: 'Official launch of automated EHR-based encounter data submission system.',
    type: 'release',
    icon: '🚀',
  },
  {
    date: 'Q4 2021',
    label: 'Expansion',
    description: 'Rapid onboarding of participating health centers across multiple states.',
    type: 'feature',
    icon: '📈',
  },
  {
    date: '2022',
    label: 'Scale-up',
    description: 'Significant growth in participating centers from 29 to 64 locations.',
    type: 'milestone',
    icon: '🏥',
  },
  {
    date: '2023',
    label: 'Full Operation',
    description: '95 participating centers providing continuous year-round EHR data.',
    type: 'milestone',
    icon: '✨',
  },
];

export default function Scene05Timeline() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
    }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2
          style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#244855',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          Evolution Timeline
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: '#64748B',
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px',
          }}
        >
          The journey from manual abstraction to automated EHR-based data collection
        </p>

        <ZigzagTimeline
          events={timelineEvents}
          width={900}
          height={400}
          pathColor="#90AEAD"
          pathWidth={26}
          nodeRadius={15}
          showDates={true}
        />

        <div
          style={{
            marginTop: '32px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            borderLeft: '4px solid #E64833',
          }}
        >
          <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.6 }}>
            <strong>Key Impact:</strong> The 2021 redesign transformed NAMCS HC from limited sampling to
            comprehensive year-round data collection, expanding from 29 to 95 participating centers and
            increasing visit records from 3.5M to 9M annually.
          </p>
        </div>
      </div>
    </div>
  );
}
