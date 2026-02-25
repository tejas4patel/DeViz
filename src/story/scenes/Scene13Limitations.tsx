/**
 * Scene 13: Limitations and Data Quality
 *
 * DataCoverageTree showing four categories of known limitations.
 * Color encodes impact severity: red = high-impact, brown = moderate,
 * teal = manageable/well-documented.
 */

import { DataCoverageTree } from '../components/DataCoverageTree';
import type { DataElement } from '../components/DataCoverageTree';
import treeRaw from '../data/scene13-limitations-tree.json';

const treeData = treeRaw as DataElement;

const LIMITATIONS_COLORS = {
  root:       '#1F2A44',
  category:   '#6366F1', // indigo — limitation category nodes
  restricted: '#E64833', // red    — high-impact limitation
  both:       '#874F41', // brown  — moderate consideration
  public:     '#2BB0A6', // teal   — manageable / well-documented
};

const LEGEND = [
  { color: '#E64833', label: 'High impact',  sub: 'Affects study design — must address' },
  { color: '#874F41', label: 'Moderate',     sub: 'Should be noted in methods' },
  { color: '#2BB0A6', label: 'Manageable',   sub: 'Well-documented, easy to handle' },
];

export default function Scene13Limitations() {
  return (
    <div style={{ padding: '0 2px 12px', fontFamily: 'var(--font-sans,system-ui)' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2A44' }}>
          Limitations by category
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          Click any category to expand its specific limitations · color encodes study-design impact
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginBottom: 10 }}>
        {LEGEND.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{l.label}</span>
              <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 4 }}>{l.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tree ── */}
      <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
        <DataCoverageTree
          data={treeData}
          availabilityColors={LIMITATIONS_COLORS}
          height={460}
        />
      </div>

      {/* ── Guidance note ── */}
      <div style={{
        marginTop: 10, fontSize: 11, color: '#374151', lineHeight: 1.6,
        background: 'rgba(99,102,241,.06)', borderRadius: 6,
        borderLeft: '3px solid #6366F1', padding: '8px 12px',
      }}>
        <strong>Study design tip:</strong> For geographic disparity studies, restricted file access
        is required (state/MSA IDs). For linkage cohorts, include match-weight sensitivity analyses
        to test for bias from the 62–84% match rate gap. Both are addressable — they just need planning.
      </div>

      {/* ── Data note ── */}
      <div style={{ marginTop: 8, fontSize: 10, color: '#9CA3AF', borderTop: '1px solid #F3F4F6', paddingTop: 7 }}>
        <strong style={{ color: '#6B7280' }}>Source:</strong>{' '}
        NAMCS HC Component documentation, NCHS methodology reports, and FSRDC data access guidelines.
      </div>

    </div>
  );
}
