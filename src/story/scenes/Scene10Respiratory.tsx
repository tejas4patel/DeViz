/**
 * Scene 10: Respiratory Disparities
 *
 * DataCoverageTree showing visit rates for asthma, COPD, and
 * influenza/URI by race/ethnicity. Color encodes disparity level.
 *
 * Data: NAMCS HC Component, pooled 2021–2023 estimates.
 */

import { DataCoverageTree } from '../components/DataCoverageTree';
import type { DataElement } from '../components/DataCoverageTree';
import treeRaw from '../data/scene10-respiratory-tree.json';

const treeData = treeRaw as DataElement;

// Repurpose availability color slots to encode disparity level
const RESPIRATORY_COLORS = {
  root:       '#1F2A44', // dark navy  — root
  category:   '#2F6FED', // blue       — condition nodes
  restricted: '#E64833', // red        — highest disparity (>130% of condition avg)
  both:       '#874F41', // brown      — elevated (85–130%)
  public:     '#2BB0A6', // teal       — below average burden
};

const LEGEND = [
  { color: '#E64833', label: 'Highest disparity', sub: '>130% of condition average' },
  { color: '#874F41', label: 'Elevated',           sub: '85–130% of condition average' },
  { color: '#2BB0A6', label: 'Below average',      sub: '<85% of condition average' },
];

export default function Scene10Respiratory() {
  return (
    <div style={{ padding: '0 2px 12px', fontFamily: 'var(--font-sans,system-ui)' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2A44' }}>
          Respiratory condition rates by race / ethnicity
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          Click any condition to expand its race/ethnicity breakdown · rates per 1,000 encounters at FQHCs
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
          availabilityColors={RESPIRATORY_COLORS}
          height={460}
        />
      </div>

      {/* ── Key insights ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
        {[
          { color: '#E64833', text: 'NH Black patients face 59% higher asthma rates than NH White patients — the largest single-condition disparity in the dataset.' },
          { color: '#2F6FED', text: 'COPD burden is highest among NH White patients, reflecting older age demographics and historic smoking patterns in this FQHC subgroup.' },
        ].map((ins, i) => (
          <div key={i} style={{
            fontSize: 11, color: '#374151', lineHeight: 1.55,
            background: `${ins.color}0d`, borderRadius: 6,
            borderLeft: `3px solid ${ins.color}`, padding: '7px 10px',
          }}>
            {ins.text}
          </div>
        ))}
      </div>

      {/* ── Data note ── */}
      <div style={{ marginTop: 8, fontSize: 10, color: '#9CA3AF', borderTop: '1px solid #F3F4F6', paddingTop: 7 }}>
        <strong style={{ color: '#6B7280' }}>Data:</strong>{' '}
        NAMCS HC Component, pooled 2021–2023. Rates per 1,000 encounters, weighted to represent
        women at participating FQHCs. Race/ethnicity from self-reported demographic fields.
      </div>

    </div>
  );
}
