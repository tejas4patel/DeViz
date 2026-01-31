import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

import { useResizeObserver } from '../viz/useResizeObserver';
import graphData from '../data/scene01-graph.json';

// Types for the graph data
type GraphNode = {
  id: string;
  label: string;
  detail: string;
  group: 'hub' | 'pillar' | 'sub';
};

type GraphLink = {
  source: string;
  target: string;
  type: string;
};

// Type aliases for D3 simulation
type SimNode = GraphNode & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode> & { type: string };

export default function Scene01Pillars() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Load graph data from JSON
  const data = useMemo(() => {
    const nodes = (graphData.nodes as GraphNode[]).map((n) => ({ ...n }));
    const links = (graphData.links as GraphLink[]).map((l) => ({ ...l }));
    return { nodes, links };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(860, rect.width);
    const height = Math.max(400, rect.height - 40); // Subtract space for tip text

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    // Add arrow markers with colors
    const defs = root.append('defs');

    const linkColors: Record<string, string> = {
      partOf: '#2F6FED',
      contains: '#2BB0A6',
      default: '#6B7280',
    };

    Object.entries(linkColors).forEach(([type, color]) => {
      defs
        .append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 15)
        .attr('refY', 5)
        .attr('markerWidth', 2.5)
        .attr('markerHeight', 2.5)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M0,0 L10,5 L0,10 L3,5 Z')
        .attr('fill', color);
    });

    const simNodes = data.nodes.map((n) => ({ ...n })) as SimNode[];
    const simLinks = data.links.map((l) => ({ ...l })) as SimLink[];

    const simulation = d3
      .forceSimulation(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => {
            const source = d.source as SimNode;
            const target = d.target as SimNode;
            const s = source.group;
            const t = target.group;
            if (s === 'hub' || t === 'hub') return 170;
            if (s === 'pillar' && t === 'sub') return 115;
            return 140;
          }),
      )
      .force('charge', d3.forceManyBody().strength(-520))
      .force(
        'collide',
        d3.forceCollide().radius((d) => {
          const node = d as SimNode;
          if (node.group === 'hub') return 70;
          if (node.group === 'pillar') return 52;
          return 38;
        }),
      )
      .force('center', d3.forceCenter(width * 0.42, height * 0.52));

    const linkGroup = root.append('g').attr('class', 'links');
    const nodeGroup = root.append('g').attr('class', 'nodes');

    // Draw links as curved paths
    const link = linkGroup
      .selectAll('path')
      .data(simLinks)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', (d) => linkColors[d.type] || linkColors.default)
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.4)
      .attr('stroke-linecap', 'round')
      .attr('marker-end', (d) => `url(#arrow-${d.type || 'default'})`);

    const node = nodeGroup
      .selectAll('g')
      .data(simNodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('mouseenter', function () {
        d3.select(this).selectAll('circle').transition().duration(200).attr('r', function() {
          const currentR = parseFloat(d3.select(this).attr('r'));
          return currentR * 1.15;
        });
      })
      .on('mouseleave', function (_, d) {
        const node = d as SimNode;
        d3.select(this).select('circle.glow').transition().duration(200).attr('r',
          node.group === 'hub' ? 72 : node.group === 'pillar' ? 56 : 44
        );
        d3.select(this).select('circle:not(.glow)').transition().duration(200).attr('r',
          node.group === 'hub' ? 60 : node.group === 'pillar' ? 44 : 32
        );
      });

    // Add glow effect (larger transparent circle)
    node
      .append('circle')
      .attr('class', 'glow')
      .attr('r', (d: SimNode) => {
        if (d.group === 'hub') return 72;
        if (d.group === 'pillar') return 56;
        return 44;
      })
      .attr('fill', (d: SimNode) => {
        if (d.group === 'hub') return '#1F2A44';
        if (d.group === 'pillar') return '#2F6FED';
        return '#2BB0A6';
      })
      .attr('opacity', 0.12);

    // Add main node circle
    node
      .append('circle')
      .attr('r', (d: SimNode) => {
        if (d.group === 'hub') return 60;
        if (d.group === 'pillar') return 44;
        return 32;
      })
      .attr('fill', (d: SimNode) => {
        if (d.group === 'hub') return '#1F2A44';
        if (d.group === 'pillar') return '#2F6FED';
        return '#FFFFFF';
      })
      .attr('stroke', (d: SimNode) => {
        if (d.group === 'sub') return '#E5E7EB';
        return 'white';
      })
      .attr('strokeWidth', (d: SimNode) => (d.group === 'sub' ? 2 : 3))
      .style('filter', 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))');

    // Helper function to convert text to proper case (preserves acronyms)
    function toProperCase(text: string): string {
      return text
        .split(' ')
        .map((word) => {
          // Preserve all-caps words (acronyms like NAMCS, HC, HUD, NDI, EHR)
          if (word === word.toUpperCase() && word.length > 1) {
            return word;
          }
          // Convert to proper case
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    }

    // Helper function to wrap text
    function wrapText(text: string, maxCharsPerLine: number): string[] {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines;
    }

    node.each(function (d: SimNode) {
      const fontSize = d.group === 'hub' ? 14 : d.group === 'pillar' ? 13 : 11;
      const maxChars = d.group === 'hub' ? 12 : d.group === 'pillar' ? 10 : 9;
      const properCaseLabel = toProperCase(d.label);
      const lines = wrapText(properCaseLabel, maxChars);
      const lineHeight = 1.4;

      const textElement = d3
        .select(this)
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('font-size', fontSize)
        .attr('font-weight', d.group === 'sub' ? 600 : 700)
        .attr('fill', d.group === 'hub' || d.group === 'pillar' ? 'white' : '#1F2A44')
        .style('pointer-events', 'none');

      // Position each line with absolute y coordinates centered around 0
      lines.forEach((line, i) => {
        const y = (i - (lines.length - 1) / 2) * fontSize * lineHeight;
        textElement
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('y', y);
      });
    });

    // Curved path for links
    function curve(d: SimLink) {
      const source = d.source as SimNode;
      const target = d.target as SimNode;
      const dx = target.x! - source.x!;
      const dy = target.y! - source.y!;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.1;
      return `M${source.x},${source.y} A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
    }

    simulation.on('tick', () => {
      link.attr('d', curve);
      node.attr('transform', (d: SimNode) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, rect.width, rect.height]);

  return (
    <div ref={ref} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <svg ref={svgRef} width="100%" style={{ flex: 1, minHeight: 0 }} />
      <div className="small" style={{ marginTop: 10, flexShrink: 0 }}>
        Hover or click nodes to explore the three pillars of NAMCS data
      </div>
    </div>
  );
}
