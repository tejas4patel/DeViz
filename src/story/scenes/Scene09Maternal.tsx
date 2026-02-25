/**
 * Scene 09: Maternal Health Analysis
 *
 * Interactive tree showing visit rates and health indicators
 * by age group. Click any age group to expand its indicators.
 *
 * Data: NAMCS HC Component, Table 2 (age rates).
 */

import { DataCoverageTree } from '../components/DataCoverageTree';
import type { DataElement } from '../components/DataCoverageTree';
import treeRaw from '../data/scene09-maternal-tree.json';

const treeData = treeRaw as DataElement;

// Repurpose availability color slots to encode indicator type
const MATERNAL_COLORS = {
  root:       '#1F2A44', // dark navy  — root node
  category:   '#2F6FED', // blue       — age group nodes
  both:       '#2F6FED', // blue       — visit volume metrics
  restricted: '#E64833', // red        — gestational diabetes (GDM)
  public:     '#2BB0A6', // teal       — hypertension
};

const LEGEND = [
  { color: '#2F6FED', label: 'Visit volume',         sub: 'Maternal visits & prenatal care' },
  { color: '#E64833', label: 'Gestational diabetes', sub: 'GDM rate per 1,000 women'        },
  { color: '#2BB0A6', label: 'Hypertension',         sub: 'HTN disorders per 1,000 women'   },
];

export default function Scene09Maternal() {
  return (
    <div style={{ padding: '0 2px 12px', fontFamily: 'var(--font-sans,system-ui)' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2A44' }}>
          Maternal health indicators by age group
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          Click any age group to expand its four health indicators · rates per 1,000 women at FQHCs
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
          availabilityColors={MATERNAL_COLORS}
          height={480}
        />
      </div>

      {/* ── Key insight ── */}
      <div style={{
        marginTop: 10, fontSize: 11, color: '#374151', lineHeight: 1.6,
        background: 'rgba(230,72,51,.06)', borderRadius: 6,
        borderLeft: '3px solid #E64833', padding: '8px 12px',
      }}>
        <strong>Risk–volume mismatch:</strong> Ages 20–29 have the <strong>highest visit volume</strong> (134.6/1k),
        but ages 30–39 carry the <strong>peak GDM risk</strong> (4.3/1k) — 65% higher than the previous decade.
        Expand each age group to compare all four indicators.
      </div>

      {/* ── Data note ── */}
      <div style={{ marginTop: 8, fontSize: 10, color: '#9CA3AF', borderTop: '1px solid #F3F4F6', paddingTop: 7 }}>
        <strong style={{ color: '#6B7280' }}>Data:</strong>{' '}
        NAMCS HC Component, Table 2. Rates weighted to represent women at participating FQHCs.
        HTN includes preeclampsia and gestational hypertension.
      </div>

    </div>
  );
}
