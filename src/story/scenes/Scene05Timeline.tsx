/**
 * Scene 05: Evolution Timeline
 *
 * Shows the progression from manual abstraction to automated
 * EHR-based data collection through a zigzag timeline visualization.
 */

import { ZigzagTimeline } from '../components/ZigzagTimeline';
import type { TimelineEvent } from '../components/ZigzagTimeline';
import timelineEventsRaw from '../data/scene05-timeline.json';

const timelineEvents = timelineEventsRaw as TimelineEvent[];

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
