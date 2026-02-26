/**
 * Examples Gallery Page – showcasing DeViz transformations
 */

import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

const P = '#244855';
const S = '#E64833';
const A = '#90AEAD';
const C = '#FBE9D0';

// ── Mini Viz Previews (SVG) ────────────────────────────────────────────────

function LineChartPreview({ color }: { color: string }) {
  const pts = [10, 80, 40, 62, 70, 48, 100, 38, 130, 22, 160, 14, 190, 8];
  const polyPts = pts.join(' ');
  const areaPts = `10,88 ${polyPts} 190,88`;
  return (
    <svg viewBox="0 0 200 96" className="w-full h-full" aria-hidden>
      <polygon points={areaPts} fill={color} opacity="0.12" />
      <polyline points={polyPts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 2, 4, 6, 8, 10, 12].map(i => (
        <circle key={i} cx={pts[i * 2]} cy={pts[i * 2 + 1]} r="3.5" fill={color} />
      ))}
      <line x1="10" y1="88" x2="190" y2="88" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
      <line x1="10" y1="8"  x2="10"  y2="88" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}

function FlowchartPreview({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 96" className="w-full h-full" aria-hidden>
      <rect x="72" y="4"  width="56" height="20" rx="4" fill={color} opacity="0.85" />
      <text x="100" y="17" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Policy</text>
      <line x1="100" y1="24" x2="100" y2="42" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="18"  y="42" width="52" height="20" rx="4" fill={color} opacity="0.6" />
      <text x="44"  y="55" textAnchor="middle" fill="white" fontSize="7">Impact A</text>
      <rect x="130" y="42" width="52" height="20" rx="4" fill={color} opacity="0.6" />
      <text x="156" y="55" textAnchor="middle" fill="white" fontSize="7">Impact B</text>
      <line x1="100" y1="42" x2="44"  y2="42" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="100" y1="42" x2="156" y2="42" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="44"  y1="62" x2="44"  y2="76" stroke={color} strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="156" y1="62" x2="156" y2="76" stroke={color} strokeWidth="1.5" strokeOpacity="0.35" />
      <rect x="14"  y="76" width="60" height="16" rx="3" fill={color} opacity="0.38" />
      <text x="44"  y="87" textAnchor="middle" fill="white" fontSize="6">Stakeholders</text>
      <rect x="126" y="76" width="60" height="16" rx="3" fill={color} opacity="0.38" />
      <text x="156" y="87" textAnchor="middle" fill="white" fontSize="6">Budget</text>
    </svg>
  );
}

function SystemDiagramPreview({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 96" className="w-full h-full" aria-hidden>
      <circle cx="100" cy="48" r="18" fill={color} opacity="0.85" />
      <text x="100" y="52" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">API</text>
      {[
        { cx: 28, cy: 22, label: 'Auth' },
        { cx: 172, cy: 22, label: 'DB' },
        { cx: 28, cy: 74, label: 'Cache' },
        { cx: 172, cy: 74, label: 'Queue' },
      ].map(({ cx, cy, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="14" fill={color} opacity="0.5" />
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="6.5">{label}</text>
        </g>
      ))}
      {[
        [40, 29, 84, 42], [160, 29, 116, 42],
        [40, 67, 84, 54], [160, 67, 116, 54],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      ))}
    </svg>
  );
}

function BarChartPreview({ color }: { color: string }) {
  const bars = [
    { h: 38, label: 'Q1' }, { h: 54, label: 'Q2' },
    { h: 44, label: 'Q3' }, { h: 66, label: 'Q4' },
    { h: 76, label: 'Q1' }, { h: 88, label: 'Q2' },
  ];
  const step = 28;
  const startX = 14;
  return (
    <svg viewBox="0 0 200 96" className="w-full h-full" aria-hidden>
      {bars.map(({ h, label }, i) => {
        const x = startX + i * step;
        return (
          <g key={i}>
            <rect x={x} y={88 - h} width="20" height={h} rx="3"
              fill={color} opacity={0.28 + (h / 88) * 0.55} />
            <text x={x + 10} y="95" textAnchor="middle" fill={color} fontSize="6.5" opacity="0.65">{label}</text>
          </g>
        );
      })}
      <line x1="10" y1="88" x2="190" y2="88" stroke={color} strokeWidth="1" strokeOpacity="0.25" />
      {/* Trend dashed line */}
      <polyline
        points="24,70 52,56 80,66 108,50 136,44 164,38"
        fill="none" stroke={color} strokeWidth="2" strokeDasharray="5,3" strokeOpacity="0.75"
      />
    </svg>
  );
}

// ── Category badge colours ─────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  Academic:    '#2F6FED',
  Government:  P,
  Engineering: S,
  Business:    '#059669',
};

// ── Example data ───────────────────────────────────────────────────────────
const examples = [
  {
    id: 'research-article',
    title: 'Research Paper → Visual Story',
    category: 'Academic',
    description: 'Turn dense academic papers into scrollable stories with animated charts, interactive maps, and highlighted findings.',
    inputType: 'PDF Research Paper',
    outputType: 'Interactive Story',
    preview: {
      before: '20-page climate change study with complex data tables and statistical analysis',
      after: 'Scrollable story: animated temperature charts, region maps, and a timeline of key findings',
    },
    features: ['Chart generation', 'Insight extraction', 'Citation tracking', 'Interactive elements'],
    vizType: 'line',
    color: '#2F6FED',
  },
  {
    id: 'policy-memo',
    title: 'Policy Document → Decision Flow',
    category: 'Government',
    description: 'Convert policy documents into clear decision trees and impact visualizations that any stakeholder can understand.',
    inputType: 'Policy Memo',
    outputType: 'Decision Flow',
    preview: {
      before: '45-page healthcare policy proposal with budget implications and regulatory requirements',
      after: 'Interactive decision tree, budget breakdowns, and a stakeholder impact matrix',
    },
    features: ['Decision tree mapping', 'Impact visualization', 'Stakeholder analysis', 'Budget breakdowns'],
    vizType: 'flowchart',
    color: P,
  },
  {
    id: 'technical-spec',
    title: 'Technical Docs → System Diagrams',
    category: 'Engineering',
    description: 'Extract system architecture and workflows from technical specifications into clean, interactive diagrams.',
    inputType: 'Technical Specification',
    outputType: 'System Diagrams',
    preview: {
      before: 'Complex API docs with multiple endpoints, authentication flows, and data models',
      after: 'Interactive architecture diagrams, API flow visualizations, and data relationship maps',
    },
    features: ['Architecture mapping', 'Flow diagrams', 'Dependency tracking', 'Interactive navigation'],
    vizType: 'system',
    color: S,
  },
  {
    id: 'market-analysis',
    title: 'Market Report → Data Story',
    category: 'Business',
    description: 'Transform market research and financial data into compelling visual narratives ready for presentations.',
    inputType: 'Market Analysis Report',
    outputType: 'Data Story',
    preview: {
      before: 'Quarterly market analysis with financial tables, competitor data, and trend projections',
      after: 'Dynamic dashboard: animated trend charts, competitive landscape maps, and forecast visualizations',
    },
    features: ['Financial charts', 'Trend visualization', 'Competitive analysis', 'Forecast modeling'],
    vizType: 'bar',
    color: '#059669',
  },
];

function VizPreview({ vizType, color }: { vizType: string; color: string }) {
  return (
    <div
      className="h-36 rounded-xl p-4 flex items-center"
      style={{ background: `${color}12` }}
    >
      {vizType === 'line'      && <LineChartPreview color={color} />}
      {vizType === 'flowchart' && <FlowchartPreview color={color} />}
      {vizType === 'system'    && <SystemDiagramPreview color={color} />}
      {vizType === 'bar'       && <BarChartPreview color={color} />}
    </div>
  );
}

export default function ExamplesGalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-20 pb-24" style={{ background: P }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute top-0 left-1/2 pointer-events-none"
          style={{
            width: 600, height: 300,
            transform: 'translateX(-50%)',
            background: `radial-gradient(ellipse, ${A}50, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative container mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/75 text-sm font-medium px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: S }} />
            Real-world transformations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            See DeViz in
            <span className="block mt-1" style={{ color: S }}>action</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Real transformations from documents to interactive visual stories. See how DeViz extracts insights and creates engaging narratives across industries.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-12">
            {[
              { num: '4 industries', label: 'covered' },
              { num: '50+', label: 'visualization types' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{num}</div>
                <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Examples Grid ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {examples.map(example => (
            <Link
              key={example.id}
              to="/story/demo-job-001"
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col transition-shadow duration-200 no-underline"
              style={{ color: 'inherit' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.12)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '')}
            >
              {/* Viz preview area */}
              <div className="p-6 pb-0">
                <VizPreview vizType={example.vizType} color={example.color} />
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: P }}>{example.title}</h3>
                    <span
                      className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: categoryColors[example.category] ?? P }}
                    >
                      {example.category}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">{example.description}</p>

                {/* Input → Output */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-lg"
                    style={{ background: `${S}15`, color: S }}
                  >
                    {example.inputType}
                  </div>
                  <MoveRight size={18} className="flex-shrink-0 text-slate-400" strokeWidth={1.75} />
                  <div
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-lg"
                    style={{ background: `${example.color}15`, color: example.color }}
                  >
                    {example.outputType}
                  </div>
                </div>

                {/* Before / After */}
                <div className="space-y-3 mb-5">
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ color: S }}
                    >
                      Before
                    </div>
                    <div
                      className="text-sm text-slate-600 p-3 rounded-lg border-l-4"
                      style={{ background: `${S}08`, borderColor: S }}
                    >
                      {example.preview.before}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ color: example.color }}
                    >
                      After
                    </div>
                    <div
                      className="text-sm text-slate-600 p-3 rounded-lg border-l-4"
                      style={{ background: `${example.color}08`, borderColor: example.color }}
                    >
                      {example.preview.after}
                    </div>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-5 flex-1">
                  {example.features.map(f => (
                    <span
                      key={f}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: `${example.color}12`, color: example.color }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-24 max-w-4xl">
        <div
          className="rounded-2xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${P} 0%, #1a3540 100%)` }}
        >
          <div
            className="absolute -bottom-16 -right-8 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `${A}30`, filter: 'blur(60px)' }}
          />
          <h2 className="relative text-4xl font-bold mb-4">Ready to Transform Your Documents?</h2>
          <p className="relative text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Try DeViz with your own documents and see how quickly you can create engaging visual stories.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/story/demo-job-001"
              className="py-4 px-8 rounded-xl font-bold text-lg transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${S}, #c23a26)`, color: '#fff' }}
            >
              Try Live Demo
            </Link>
            <Link
              to="/register"
              className="py-4 px-8 rounded-xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
