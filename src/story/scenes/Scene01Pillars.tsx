/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'

import { useResizeObserver } from '../viz/useResizeObserver';
import { Node, Link, SevenKey, SevenPack, PillarKey } from '../storyTypes';
import { scene01Nodes, scene01Links, sevenOrder } from '../sceneData';

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
        <div style={{ fontWeight: 800, color: '#111827' }}>Seven dimensions</div>
        <div className="small" style={{ color: pinned ? '#059669' : '#6B7280' }}>{pinned ? 'Selection Active' : 'Hover to preview'}</div>
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
                  border: isActive ? '1px solid #2F6FED' : '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  background: isActive ? '#EFF6FF' : 'white',
                  color: isActive ? '#1e3a8a' : '#374151',
                  userSelect: 'none',
                  fontWeight: isActive ? 700 : 600,
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 2px 4px rgba(37,99,235,0.1)' : 'none',
                }}
              >
                {item.label}
              </div>

              {isActive ? (
                <div
                  className="card" /* Use global card style for gloss */
                  style={{
                    position: 'absolute',
                    zIndex: 100,
                    left: 0,
                    top: 'calc(100% + 8px)',
                    width: 320,
                    padding: 16,
                    // Additional overrides
                    background: 'rgba(255, 255, 255, 0.98)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(255,255,255,0.6)',
                  }}
                >
                  <div style={{ textTransform: 'uppercase', color: '#2BB0A6', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontWeight: 800, color: '#1F2A44', fontSize: 15, marginBottom: 8 }}>{qa.question}?</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#4B5563' }}>
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
    // Clone to ensure D3 simulation doesn't mutate original data across re-renders
    const nodes = scene01Nodes.map(n => ({ ...n }));
    const links = scene01Links.map(l => ({ ...l }));
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
      .attr('opacity', 0.4)
      .selectAll('line')
      .data(simLinks)
      .join('line')
      .attr('stroke', '#6B7280') /* text-secondary */
      .attr('strokeWidth', (d: any) => {
        const s = (d.source as any)?.group;
        const t = (d.target as any)?.group;
        if (s === 'hub' || t === 'hub') return 2;
        return 1; // Thinner, elegant lines
      });

    const node = root
      .append('g')
      .selectAll('g')
      .data(simNodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('mouseenter', (event: any, d: Node & d3.SimulationNodeDatum) => {
        setHoveredNode(d);
        // Add subtle hover scale effect
        d3.select(event.currentTarget).transition().duration(200).attr('transform', `translate(${d.x}, ${d.y}) scale(1.1)`);
      })
      .on('mouseleave', (event: any, d: Node & d3.SimulationNodeDatum) => {
        setHoveredNode(null);
        d3.select(event.currentTarget).transition().duration(200).attr('transform', `translate(${d.x}, ${d.y}) scale(1)`);
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
        return 32;
      })
      // New Palette Colors
      .attr('fill', (d: Node & d3.SimulationNodeDatum) => {
        if (d.group === 'hub') return '#1F2A44'; // Primary Navy
        if (d.group === 'pillar') return '#2F6FED'; // Secondary Blue
        return '#FFFFFF'; // White for subs
      })
      .attr('stroke', (d: Node & d3.SimulationNodeDatum) => {
        if (d.group === 'sub') return '#E5E7EB'; // Border Default
        return 'white'; // White border for colored nodes (pop)
      })
      .attr('strokeWidth', (d: Node & d3.SimulationNodeDatum) => (d.group === 'sub' ? 2 : 3))
      // Add shadow for depth
      .style('filter', 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))');

    node
      .append('text')
      .text((d: Node & d3.SimulationNodeDatum) => d.label)
      .attr('textAnchor', 'middle')
      .attr('dy', (d: Node & d3.SimulationNodeDatum) => (d.group === 'hub' ? 6 : 5))
      .attr('fontSize', (d: Node & d3.SimulationNodeDatum) =>
        d.group === 'hub' ? 14 : d.group === 'pillar' ? 13 : 11,
      )
      .attr('fontWeight', (d: Node & d3.SimulationNodeDatum) => (d.group === 'sub' ? 600 : 700))
      .attr('fill', (d: Node & d3.SimulationNodeDatum) => {
          if (d.group === 'hub' || d.group === 'pillar') return 'white';
          return '#1F2A44'; // Navy text for white nodes
      })
      .style('pointer-events', 'none'); // Ensure clicks go to group/circle

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

      <div className="panel-floating" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="kv" style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: '#2BB0A6', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.05em' }}>Selected Node</div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.2 }}>{panelTitle}</div>
            <div style={{ marginTop: 12, lineHeight: 1.6, color: '#4b5563' }}>
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
          <div style={{ marginTop: 14, color: '#9CA3AF', fontStyle: 'italic', fontSize: 13 }}>
            Pick any node to reveal Who What When Where Why Which How
          </div>
        )}

        {pinnedNode ? (
          <button
            className="btn"
            style={{ marginTop: 20, width: '100%', background: '#F3F4F6', color: '#1F2A44', fontWeight: 600, border: 'none' }}
            onClick={() => {
              setPinnedNode(null);
              setHoveredSeven(null);
            }}
          >
            Clear Selection
          </button>
        ) : null}
      </div>
    </div>
  );
}
