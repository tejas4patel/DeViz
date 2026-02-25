/**
 * Scene 14: Roadmap
 *
 * ZigzagTimeline showing the NAMCS HC program trajectory
 * from 2021 launch through 2026 planned expansions.
 */

import { ZigzagTimeline } from '../components/ZigzagTimeline';
import type { TimelineEvent } from '../components/ZigzagTimeline';
import eventsRaw from '../data/scene14-roadmap-timeline.json';

const events = eventsRaw as TimelineEvent[];

export default function Scene14Roadmap() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '32px 20px',
      background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
    }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 style={{
          fontSize: '22px', fontWeight: '800', color: '#244855',
          textAlign: 'center', marginBottom: '8px',
        }}>
          NAMCS HC Program Roadmap
        </h2>
        <p style={{
          fontSize: '14px', color: '#64748B', textAlign: 'center',
          marginBottom: '36px', maxWidth: '680px', margin: '0 auto 36px',
        }}>
          From a 29-center pilot in 2021 to near-real-time linkage datasets in 2026 —
          a sustained investment in FQHC research infrastructure
        </p>

        <ZigzagTimeline
          events={events}
          width={900}
          height={400}
          pathColor="#90AEAD"
          pathWidth={26}
          nodeRadius={15}
          showDates={true}
        />

        <div style={{
          marginTop: '28px', padding: '16px 20px',
          background: '#f8f9fa', borderRadius: '12px',
          borderLeft: '4px solid #2F6FED',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }}>
          {[
            { value: '95+',   label: 'Centers by 2023' },
            { value: '9M+',   label: 'Annual visits' },
            { value: '3',     label: 'Linkage partners by 2025' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1F2A44' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
