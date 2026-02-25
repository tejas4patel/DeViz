/**
 * Scene 11: Linkage Power
 *
 * ForceDirectedGraph showing NAMCS HC records linked to
 * HUD housing, NDI mortality, and Medicaid enrollment.
 * Hover any node to see its 7W satellite ring. Drag to rearrange.
 */

import { ForceDirectedGraph } from '../viz/ForceDirectedGraph';
import type { NodeGroupConfig } from '../viz/ForceDirectedGraph';
import graphRaw from '../data/scene11-linkage-graph.json';

const nodeGroupConfigs: Record<string, NodeGroupConfig> = {
  // Central NAMCS HC hub
  hub: {
    gradient:          ['#1F2A44', '#2d3f5e'],
    satelliteGradient: ['#4a6080', '#6a80a0'],
    stroke:            '#141c2e',
    radius:            56,
    glowRadius:        68,
    collisionRadius:   82,
    fontSize:          13,
    maxChars:          12,
  },
  // External linkage sources (HUD, NDI, Medicaid)
  source: {
    gradient:          ['#E64833', '#f05a42'],
    satelliteGradient: ['#f28b7a', '#f7a698'],
    stroke:            '#b8361f',
    radius:            42,
    glowRadius:        54,
    collisionRadius:   68,
    fontSize:          12,
    maxChars:          11,
  },
  // Research outputs enabled by each linkage
  output: {
    gradient:          ['#2BB0A6', '#3dccc1'],
    satelliteGradient: ['#70ddd7', '#9eeae5'],
    stroke:            '#1e8078',
    radius:            38,
    glowRadius:        50,
    collisionRadius:   64,
    fontSize:          11,
    maxChars:          11,
  },
};

export default function Scene11LinkagePower() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{
        margin: '0 24px 8px',
        fontSize: '13px',
        color: '#64748B',
        lineHeight: 1.6,
        flexShrink: 0,
      }}>
        NAMCS HC clinical records are probabilistically matched to three external sources:
        <strong> HUD housing</strong>, the <strong>National Death Index</strong>, and{' '}
        <strong>Medicaid enrollment files</strong>. Each linkage unlocks research questions
        invisible in the clinical record alone.{' '}
        <strong>Hover any node</strong> to see its 7W detail ring. Drag to rearrange.
      </p>

      {/* ── Legend ── */}
      <div style={{
        display: 'flex', gap: '6px 20px', flexWrap: 'wrap',
        margin: '0 24px 4px', flexShrink: 0,
      }}>
        {[
          { color: '#1F2A44', label: 'NAMCS HC Clinical Data' },
          { color: '#E64833', label: 'External linkage source' },
          { color: '#2BB0A6', label: 'Research enabled' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: 11, color: '#374151' }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ForceDirectedGraph
          data={graphRaw}
          nodeGroupConfigs={nodeGroupConfigs}
          minWidth={800}
          minHeight={360}
          enableDrag={true}
          enableZoom={true}
          enableSatellites={true}
        />
      </div>
    </div>
  );
}
