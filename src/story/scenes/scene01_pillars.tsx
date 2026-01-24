/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'

import { useResizeObserver } from '../viz/use_resize_observer';

type PillarKey = 'microdata' | 'dashboards' | 'linkage';

type SevenKey = 'who' | 'what' | 'when' | 'where' | 'why' | 'which' | 'how';

type Qa = {
  question: string;
  answer: string;
};

type SevenPack = Record<SevenKey, Qa>;

type Node = {
  id: string;
  label: string;
  detail: string;
  group: 'hub' | 'pillar' | 'sub';
  pillar?: PillarKey;
  seven: SevenPack;
};

type Link = {
  source: string;
  target: string;
};

const sevenOrder: { key: SevenKey; label: string }[] = [
  { key: 'who', label: 'Who' },
  { key: 'what', label: 'What' },
  { key: 'when', label: 'When' },
  { key: 'where', label: 'Where' },
  { key: 'why', label: 'Why' },
  { key: 'which', label: 'Which' },
  { key: 'how', label: 'How' },
];

function makeSevenPack(base: Partial<SevenPack>): SevenPack {
  const fallback: SevenPack = {
    who: {
      question: 'Who is involved',
      answer: 'Key stakeholders participate in this part of the system.',
    },
    what: { question: 'What is it', answer: 'A capability within the NAMCS HC ecosystem.' },
    when: {
      question: 'When is it used',
      answer: 'Used during analysis and reporting depending on your goal.',
    },
    where: {
      question: 'Where is it accessed',
      answer: 'Access depends on whether it is public, secure, or dashboard based.',
    },
    why: {
      question: 'Why it matters',
      answer: 'It enables patient centered outcomes research and equity monitoring.',
    },
    which: {
      question: 'Which choice fits',
      answer: 'Select based on speed, detail, and whether you need linked outcomes.',
    },
    how: {
      question: 'How it works',
      answer: 'It works through standardized data pipelines and protected dissemination.',
    },
  };
  return {
    who: base.who ?? fallback.who,
    what: base.what ?? fallback.what,
    when: base.when ?? fallback.when,
    where: base.where ?? fallback.where,
    why: base.why ?? fallback.why,
    which: base.which ?? fallback.which,
    how: base.how ?? fallback.how,
  };
}

function SevenWheel(props: {
  seven: SevenPack;
  hoveredKey: SevenKey | null;
  onHoverKey: (k: SevenKey | null) => void;
  pinned: boolean;
}) {
  const { seven, hoveredKey, onHoverKey, pinned } = props;

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontWeight: 800 }}>Seven questions</div>
        <div className="small">{pinned ? 'Pinned' : 'Hover mode'}</div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          position: 'relative',
        }}
      >
        {sevenOrder.map(item => {
          const isActive = hoveredKey === item.key;
          const qa = seven[item.key];
          return (
            <div key={item.key} style={{ position: 'relative' }}>
              <div
                onMouseEnter={() => onHoverKey(item.key)}
                onMouseLeave={() => onHoverKey(null)}
                style={{
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  cursor: 'default',
                  background: isActive ? 'rgba(20, 70, 160, 0.10)' : 'white',
                  userSelect: 'none',
                  fontWeight: 750,
                }}
              >
                {item.label}
              </div>

              {isActive ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 50,
                    left: 0,
                    top: 'calc(100% + 8px)',
                    width: 300,
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRadius: 12,
                    padding: 12,
                    boxShadow: '0 14px 34px rgba(10, 18, 32, 0.14)',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{qa.question}</div>
                  <div className="small" style={{ marginTop: 8, lineHeight: 1.45 }}>
                    {qa.answer}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Scene01Pillars() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [pinnedNode, setPinnedNode] = useState<Node | null>(null);
  const [hoveredSeven, setHoveredSeven] = useState<SevenKey | null>(null);

  const activeNode = pinnedNode ?? hoveredNode;

  const data = useMemo(() => {
    const nodes: Node[] = [
      {
        id: 'hub',
        label: 'NAMCS HC Component',
        detail:
          'EHR based encounter submissions powering microdata, dashboards, and linkage products for research.',
        group: 'hub',
        seven: makeSevenPack({
          who: {
            question: 'Who operates and contributes to this component',
            answer:
              'A federal statistical program operates it, and participating health centers contribute encounter data extracts.',
          },
          what: {
            question: 'What is this component',
            answer:
              'A health center focused data ecosystem producing microdata files, interactive estimates, and linkage ready resources.',
          },
          when: {
            question: 'When did the redesigned approach begin',
            answer:
              'The redesigned approach begins with the 2021 collection, moving toward full year EHR based submissions.',
          },
          where: {
            question: 'Where does the data originate and where is it used',
            answer:
              'Data originates from participating health centers across the United States and is used via public files, secure access, and dashboards.',
          },
          why: {
            question: 'Why does this matter',
            answer:
              'It expands patient centered outcomes research capacity for underserved populations and supports equity monitoring.',
          },
          which: {
            question: 'Which path should you choose first',
            answer:
              'Use dashboards for quick insight, public files for accessible modeling, and secure restricted files for deeper detail and linkages.',
          },
          how: {
            question: 'How does it work end to end',
            answer:
              'Centers submit standardized encounter extracts, the steward validates and weights them, then releases products across multiple access tiers.',
          },
        }),
      },

      {
        id: 'microdata',
        label: 'Microdata',
        detail: 'Visit level datasets for analysis, public sample plus restricted detail files.',
        group: 'pillar',
        pillar: 'microdata',
        seven: makeSevenPack({
          who: {
            question: 'Who uses microdata',
            answer:
              'Analysts and researchers who need custom queries, models, and reproducible estimates.',
          },
          what: {
            question: 'What is microdata here',
            answer: 'Record level encounter data packaged as public use and restricted use files.',
          },
          when: {
            question: 'When should you use microdata',
            answer: 'When dashboards are not flexible enough and you need bespoke analysis.',
          },
          where: {
            question: 'Where is it accessed',
            answer:
              'Public microdata is downloaded publicly; restricted microdata is accessed in a secure setting.',
          },
          why: {
            question: 'Why it matters',
            answer:
              'Microdata enables custom stratification, modeling, and validation of findings.',
          },
          which: {
            question: 'Which microdata tier fits',
            answer:
              'Public for low friction analysis, restricted when you need more variables, granularity, or linked products.',
          },
          how: {
            question: 'How to use it correctly',
            answer:
              'Apply weights and variance guidance to produce nationally representative estimates.',
          },
        }),
      },
      {
        id: 'dashboards',
        label: 'Dashboards',
        detail: 'Interactive preliminary estimates for people who do not want to code.',
        group: 'pillar',
        pillar: 'dashboards',
        seven: makeSevenPack({
          who: {
            question: 'Who benefits most from dashboards',
            answer:
              'Clinicians, policy teams, and community stakeholders who want fast insight without coding.',
          },
          what: {
            question: 'What do dashboards provide',
            answer:
              'Interactive rates and counts with uncertainty measures and downloadable tables.',
          },
          when: {
            question: 'When should you use dashboards',
            answer: 'When you need quick exploration, trend checks, or disparity scans.',
          },
          where: {
            question: 'Where are they used',
            answer: 'In a web interface designed for exploration and export of summary tables.',
          },
          why: {
            question: 'Why dashboards exist',
            answer: 'They reduce barriers, improve timeliness, and broaden who can use the data.',
          },
          which: {
            question: 'Which questions fit dashboards',
            answer:
              'High level patterns, comparisons by common stratifiers, and early signals for deeper study.',
          },
          how: {
            question: 'How to interpret them safely',
            answer:
              'Use confidence intervals, avoid over reading small differences, and treat results as exploratory when labeled preliminary.',
          },
        }),
      },
      {
        id: 'linkage',
        label: 'Linkage',
        detail: 'Patient level links to external sources to add outcomes and social context.',
        group: 'pillar',
        pillar: 'linkage',
        seven: makeSevenPack({
          who: {
            question: 'Who is linkable',
            answer:
              'People with sufficient identifiers under secure rules to enable matching to external records.',
          },
          what: {
            question: 'What linkage adds',
            answer:
              'Social context and downstream outcomes not contained in encounter records alone.',
          },
          when: {
            question: 'When linkage is essential',
            answer:
              'When outcomes or exposures require administrative sources, such as mortality or housing assistance participation.',
          },
          where: {
            question: 'Where linkage is accessed',
            answer:
              'Typically through secure restricted environments that protect confidentiality.',
          },
          why: {
            question: 'Why linkage matters',
            answer:
              'It enables richer outcomes research, social determinants analysis, and program evaluation.',
          },
          which: {
            question: 'Which linkages are most common',
            answer:
              'Housing assistance and mortality are strong examples of extending context and endpoints.',
          },
          how: {
            question: 'How linkage is done',
            answer:
              'Through deterministic and probabilistic matching under controlled governance and disclosure protection.',
          },
        }),
      },

      {
        id: 'public_file',
        label: 'Public file',
        detail: 'Accessible microdata tier designed to lower cost and compute barriers.',
        group: 'sub',
        pillar: 'microdata',
        seven: makeSevenPack({
          who: {
            question: 'Who should start here',
            answer: 'Teams that need microdata but want the lowest access friction.',
          },
          what: {
            question: 'What you get',
            answer: 'A microdata product with key variables and weights for national estimates.',
          },
          when: {
            question: 'When it is enough',
            answer: 'When your question fits available variables and does not require linkages.',
          },
          where: {
            question: 'Where you work with it',
            answer: 'In your normal local or cloud analytics environment.',
          },
          why: {
            question: 'Why it exists',
            answer: 'To broaden use while protecting confidentiality through reduced detail.',
          },
          which: {
            question: 'Which analyses fit',
            answer:
              'Descriptive statistics, subgroup comparisons, and many regression models using available fields.',
          },
          how: {
            question: 'How to run estimates',
            answer: 'Use the provided weights and variance guidance in your analytic workflow.',
          },
        }),
      },
      {
        id: 'restricted_file',
        label: 'Restricted file',
        detail: 'Secure microdata tier with broader detail and possible linked products.',
        group: 'sub',
        pillar: 'microdata',
        seven: makeSevenPack({
          who: {
            question: 'Who needs this tier',
            answer: 'Researchers requiring additional detail, granularity, or linked data.',
          },
          what: {
            question: 'What is different',
            answer: 'More sensitive variables and broader coverage under secure access rules.',
          },
          when: {
            question: 'When to use it',
            answer: 'When public data lacks needed variables or when linkage is required.',
          },
          where: {
            question: 'Where analysis occurs',
            answer: 'Inside a controlled secure environment with output review.',
          },
          why: {
            question: 'Why secure access',
            answer: 'To reduce reidentification risk when working with more detailed information.',
          },
          which: {
            question: 'Which studies benefit',
            answer:
              'Studies needing detailed clinical fields, fine stratification, or linked outcomes.',
          },
          how: {
            question: 'How results are released',
            answer:
              'Through disclosure safe output review before anything leaves the secure environment.',
          },
        }),
      },

      {
        id: 'biannual_prelim',
        label: 'Biannual prelim',
        detail: 'Periodic preliminary estimate cadence that improves timeliness.',
        group: 'sub',
        pillar: 'dashboards',
        seven: makeSevenPack({
          who: {
            question: 'Who uses this cadence',
            answer: 'Users who need recent directional estimates for planning and monitoring.',
          },
          what: {
            question: 'What it means',
            answer:
              'Estimates are released on a periodic schedule prior to final annual microdata products.',
          },
          when: {
            question: 'When to rely on it',
            answer:
              'For exploratory monitoring and early signals, then confirm with microdata when available.',
          },
          where: {
            question: 'Where it appears',
            answer: 'In the dashboard interface as time period selections.',
          },
          why: {
            question: 'Why it is helpful',
            answer: 'It shortens the feedback loop for disparities and utilization monitoring.',
          },
          which: {
            question: 'Which pitfalls to avoid',
            answer: 'Avoid treating small differences as definitive without uncertainty checks.',
          },
          how: {
            question: 'How to interpret',
            answer: 'Use the displayed confidence intervals and any significance guidance.',
          },
        }),
      },
      {
        id: 'download_tables',
        label: 'Download tables',
        detail: 'Exportable tables for reporting and sharing.',
        group: 'sub',
        pillar: 'dashboards',
        seven: makeSevenPack({
          who: {
            question: 'Who uses exports',
            answer: 'Teams building reports, briefs, and slide decks from dashboard results.',
          },
          what: {
            question: 'What is exported',
            answer: 'Counts, rates, and uncertainty fields depending on the module and view.',
          },
          when: {
            question: 'When to export',
            answer: 'After selecting the module and stratifier that matches your question.',
          },
          where: {
            question: 'Where exports go',
            answer: 'Into your local files for use in reporting workflows.',
          },
          why: {
            question: 'Why this feature matters',
            answer: 'It makes evidence portable and reproducible for stakeholder communication.',
          },
          which: {
            question: 'Which export is best',
            answer: 'Use the most detailed table available for transparency and auditing.',
          },
          how: {
            question: 'How to cite responsibly',
            answer:
              'Include the time period, module, and that results are preliminary when labeled that way.',
          },
        }),
      },

      {
        id: 'hud_link',
        label: 'HUD link',
        detail: 'Link to housing assistance participation to add social context.',
        group: 'sub',
        pillar: 'linkage',
        seven: makeSevenPack({
          who: {
            question: 'Who can be linked',
            answer:
              'Linkage eligible patients whose identifiers support matching under secure rules.',
          },
          what: {
            question: 'What it adds',
            answer:
              'Housing assistance participation indicators usable as social determinants exposures.',
          },
          when: {
            question: 'When it is useful',
            answer:
              'When housing context may affect utilization, chronic disease management, or disparities.',
          },
          where: {
            question: 'Where it is accessed',
            answer: 'In a secure environment together with restricted microdata.',
          },
          why: {
            question: 'Why housing matters',
            answer: 'Housing stability is a major driver of health outcomes and access.',
          },
          which: {
            question: 'Which programs appear',
            answer:
              'Major categories include vouchers, public housing, and assisted multifamily housing.',
          },
          how: {
            question: 'How to analyze',
            answer:
              'Align participation windows to encounter dates and account for linkage eligibility and selection.',
          },
        }),
      },
      {
        id: 'ndi_link',
        label: 'NDI link',
        detail: 'Link to mortality records to enable downstream outcome analysis.',
        group: 'sub',
        pillar: 'linkage',
        seven: makeSevenPack({
          who: {
            question: 'Who is eligible for mortality linkage',
            answer: 'People with adequate identifiers to support secure matching.',
          },
          what: {
            question: 'What it adds',
            answer: 'Mortality outcomes and timing beyond encounter level endpoints.',
          },
          when: {
            question: 'When to use it',
            answer: 'When long term outcomes or survival style endpoints are central to the study.',
          },
          where: {
            question: 'Where it is accessed',
            answer: 'Through secure restricted analysis pathways.',
          },
          why: {
            question: 'Why it matters',
            answer:
              'It strengthens outcome measurement and supports evaluation of real world cohorts.',
          },
          which: {
            question: 'Which studies benefit',
            answer:
              'Time to event analyses and studies where mortality is an endpoint or competing risk.',
          },
          how: {
            question: 'How to model',
            answer:
              'Define time origin, apply survey design methods where needed, and handle linkage eligibility and censoring.',
          },
        }),
      },
    ];

    const links: Link[] = [
      { source: 'hub', target: 'microdata' },
      { source: 'hub', target: 'dashboards' },
      { source: 'hub', target: 'linkage' },

      { source: 'microdata', target: 'public_file' },
      { source: 'microdata', target: 'restricted_file' },

      { source: 'dashboards', target: 'biannual_prelim' },
      { source: 'dashboards', target: 'download_tables' },

      { source: 'linkage', target: 'hud_link' },
      { source: 'linkage', target: 'ndi_link' },
    ];

    return { nodes, links };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(860, rect.width);
    const height = 440;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    const simNodes = data.nodes.map(n => ({ ...n })) as Array<Node & d3.SimulationNodeDatum>;
    const simLinks = data.links.map(l => ({ ...l })) as Array<
      d3.SimulationLinkDatum<Node & d3.SimulationNodeDatum>
    >;

    const simulation = d3
      .forceSimulation(simNodes)
      .force(
        'link',
        d3
          .forceLink<
            Node & d3.SimulationNodeDatum,
            d3.SimulationLinkDatum<Node & d3.SimulationNodeDatum>
          >(simLinks)
          .id((d: any) => (d as Node).id)
          .distance((d: any) => {
            const s = (d.source as any)?.group;
            const t = (d.target as any)?.group;
            if (s === 'hub' || t === 'hub') return 170;
            if (s === 'pillar' && t === 'sub') return 115;
            return 140;
          }),
      )
      .force('charge', d3.forceManyBody().strength(-520))
      .force(
        'collide',
        d3.forceCollide().radius((d: any) => {
          if (d.group === 'hub') return 70;
          if (d.group === 'pillar') return 52;
          return 38;
        }),
      )
      .force('center', d3.forceCenter(width * 0.42, height * 0.52));

    const link = root
      .append('g')
      .attr('opacity', 0.25)
      .selectAll('line')
      .data(simLinks)
      .join('line')
      .attr('stroke', 'currentColor')
      .attr('strokeWidth', (d: any) => {
        const s = (d.source as any)?.group;
        const t = (d.target as any)?.group;
        if (s === 'hub' || t === 'hub') return 3;
        return 2;
      });

    const node = root
      .append('g')
      .selectAll('g')
      .data(simNodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('mouseenter', (_: any, d: Node & d3.SimulationNodeDatum) => {
        setHoveredNode(d);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
      })
      .on('click', (_: any, d: Node & d3.SimulationNodeDatum) => {
        setPinnedNode(prev => {
          if (prev?.id === d.id) return null;
          return d;
        });
      });

    node
      .append('circle')
      .attr('r', (d: Node & d3.SimulationNodeDatum) => {
        if (d.group === 'hub') return 60;
        if (d.group === 'pillar') return 44;
        return 30;
      })
      .attr('fill', 'white')
      .attr('stroke', (d: Node & d3.SimulationNodeDatum) => {
        if (d.group === 'hub') return 'rgba(20, 70, 160, 0.55)';
        if (d.group === 'pillar') return 'rgba(0, 0, 0, 0.22)';
        return 'rgba(0, 0, 0, 0.14)';
      })
      .attr('strokeWidth', (d: Node & d3.SimulationNodeDatum) => (d.group === 'hub' ? 3 : 2));

    node
      .append('text')
      .text((d: Node & d3.SimulationNodeDatum) => d.label)
      .attr('textAnchor', 'middle')
      .attr('dy', (d: Node & d3.SimulationNodeDatum) => (d.group === 'hub' ? 6 : 5))
      .attr('fontSize', (d: Node & d3.SimulationNodeDatum) =>
        d.group === 'hub' ? 14 : d.group === 'pillar' ? 13 : 11,
      )
      .attr('fontWeight', (d: Node & d3.SimulationNodeDatum) => (d.group === 'sub' ? 650 : 800));

    const infoBox = root.append('g').attr('transform', `translate(${width * 0.7}, 18)`);

    const lines = [
      'Explore the system',
      'Hover nodes to preview',
      'Click nodes to pin selection',
      'Then hover Who What When Where Why Which How',
    ];

    infoBox
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width * 0.28)
      .attr('height', 116)
      .attr('rx', 14)
      .attr('fill', 'rgba(255, 255, 255, 0.92)')
      .attr('stroke', 'rgba(0, 0, 0, 0.10)');

    infoBox
      .selectAll('text')
      .data(lines)
      .join('text')
      .attr('x', 14)
      .attr('y', (_d, i) => 22 + i * 22)
      .attr('fontSize', (d, i) => (i === 0 ? 13 : 12))
      .attr('fontWeight', (d, i) => (i === 0 ? 800 : 500))
      .text(d => d);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (d.source as any).x)
        .attr('y1', (d: any) => (d.source as any).y)
        .attr('x2', (d: any) => (d.target as any).x)
        .attr('y2', (d: any) => (d.target as any).y);

      node.attr('transform', (d: Node & d3.SimulationNodeDatum) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, rect.width]);

  const panelTitle = activeNode ? activeNode.label : 'Select a node';
  const panelBody = activeNode
    ? activeNode.detail
    : 'Hover a node to preview its details. Click to pin it, then explore the seven questions.';

  const pinned = Boolean(pinnedNode);

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 12,
      }}
    >
      <div>
        <svg ref={svgRef} width="100%" height="440" />
        <div className="small" style={{ marginTop: 10 }}>
          Tip: click a node to pin details so the panel stays stable while you explore
        </div>
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div className="kv">
          <div style={{ fontWeight: 800 }}>Selected</div>
          <div>
            <div style={{ fontWeight: 850 }}>{panelTitle}</div>
            <div className="small" style={{ marginTop: 8, lineHeight: 1.45 }}>
              {panelBody}
            </div>
          </div>
        </div>

        {activeNode ? (
          <SevenWheel
            seven={activeNode.seven}
            hoveredKey={hoveredSeven}
            onHoverKey={k => setHoveredSeven(k)}
            pinned={pinned}
          />
        ) : (
          <div className="small" style={{ marginTop: 14 }}>
            Pick any node to reveal Who What When Where Why Which How
          </div>
        )}

        {pinnedNode ? (
          <button
            className="btn"
            style={{ marginTop: 14, width: '100%' }}
            onClick={() => {
              setPinnedNode(null);
              setHoveredSeven(null);
            }}
          >
            Clear pinned selection
          </button>
        ) : null}
      </div>
    </div>
  );
}
