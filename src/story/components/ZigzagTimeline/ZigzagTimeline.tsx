import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { TimelineEvent, ZigzagTimelineProps } from './types';
import { TimelineIconMap } from './TimelineIcons';
import './ZigzagTimeline.css';

export default function ZigzagTimeline({
  events,
  width = 800,
  height = 400,
  pathColor = '#90AEAD',
  pathWidth = 24,
  nodeRadius = 12,
  showDates = true,
  className = '',
}: ZigzagTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || events.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 50, right: 60, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add gradient definitions
    const defs = svg.append('defs');

    const pathGradient = defs.append('linearGradient')
      .attr('id', 'path-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    pathGradient.append('stop').attr('offset', '0%').attr('stop-color', '#90AEAD').attr('stop-opacity', 0.6);
    pathGradient.append('stop').attr('offset', '50%').attr('stop-color', '#244855').attr('stop-opacity', 0.8);
    pathGradient.append('stop').attr('offset', '100%').attr('stop-color', '#E64833').attr('stop-opacity', 0.6);

    // Generate serpentine/zigzag path with smoother curves
    const rowHeight = innerHeight / 3;
    const cornerRadius = 50;
    const leftX = 0;
    const rightX = innerWidth;

    const pathData = `
      M ${leftX} ${rowHeight * 0.5}
      L ${rightX - cornerRadius} ${rowHeight * 0.5}
      Q ${rightX} ${rowHeight * 0.5} ${rightX} ${rowHeight * 0.5 + cornerRadius}
      L ${rightX} ${rowHeight * 1.5 - cornerRadius}
      Q ${rightX} ${rowHeight * 1.5} ${rightX - cornerRadius} ${rowHeight * 1.5}
      L ${leftX + cornerRadius} ${rowHeight * 1.5}
      Q ${leftX} ${rowHeight * 1.5} ${leftX} ${rowHeight * 1.5 + cornerRadius}
      L ${leftX} ${rowHeight * 2.5 - cornerRadius}
      Q ${leftX} ${rowHeight * 2.5} ${leftX + cornerRadius} ${rowHeight * 2.5}
      L ${rightX} ${rowHeight * 2.5}
    `.trim();

    // Shadow/glow path
    g.append('path')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#path-gradient)')
      .attr('stroke-width', pathWidth + 8)
      .attr('opacity', 0.15)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('filter', 'blur(8px)');

    // Base path with gradient
    const pathElement = g.append('path')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#path-gradient)')
      .attr('stroke-width', pathWidth)
      .attr('opacity', 0.5)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Overlay animated dashed path
    g.append('path')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-dasharray', '10,10')
      .attr('class', 'zigzag-timeline__animated-path');

    // Calculate node positions along the path
    const pathNode = pathElement.node();
    if (!pathNode) return;

    const pathLength = pathNode.getTotalLength();
    const nodePositions = events.map((event, i) => {
      const fraction = events.length > 1 ? i / (events.length - 1) : 0.5;
      const point = pathNode.getPointAtLength(pathLength * fraction);
      return { x: point.x, y: point.y, event, index: i };
    });

    // Color mapping for event types
    const getNodeColor = (event: TimelineEvent) => {
      switch (event.type) {
        case 'milestone':
          return '#E64833';
        case 'feature':
          return '#244855';
        case 'change':
          return '#90AEAD';
        case 'release':
          return '#FFA500';
        default:
          return '#6B7280';
      }
    };

    // Icon mapping
    const getIconKey = (icon?: string): string => {
      const iconMap: Record<string, string> = {
        '📋': 'manual',
        '📐': 'planning',
        '🧪': 'pilot',
        '🚀': 'launch',
        '📈': 'expansion',
        '🏥': 'scaleup',
        '✨': 'operation',
      };
      return icon ? iconMap[icon] || 'manual' : 'manual';
    };

    // Draw nodes
    const nodesGroup = g.append('g').attr('class', 'zigzag-timeline__nodes');

    const nodes = nodesGroup
      .selectAll('.zigzag-timeline__node')
      .data(nodePositions)
      .enter()
      .append('g')
      .attr('class', 'zigzag-timeline__node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer');

    // Outer glow ring
    nodes
      .append('circle')
      .attr('class', 'zigzag-timeline__node-glow')
      .attr('r', nodeRadius * 2.5)
      .attr('fill', d => getNodeColor(d.event))
      .attr('opacity', 0.1);

    // Pulsing glow effect
    nodes
      .append('circle')
      .attr('class', 'zigzag-timeline__node-pulse')
      .attr('r', nodeRadius * 2)
      .attr('fill', d => getNodeColor(d.event))
      .attr('opacity', 0.2);

    // Main node circle with gradient
    nodes.each(function(d, i) {
      const node = d3.select(this);
      const color = getNodeColor(d.event);

      // Create unique gradient for each node
      const gradId = `node-grad-${i}`;
      defs.append('radialGradient')
        .attr('id', gradId)
        .selectAll('stop')
        .data([
          { offset: '0%', color: color, opacity: 1 },
          { offset: '100%', color: d3.color(color)?.darker(0.5).toString() || color, opacity: 1 }
        ])
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)
        .attr('stop-opacity', d => d.opacity);

      node.append('circle')
        .attr('class', 'zigzag-timeline__node-circle')
        .attr('r', nodeRadius)
        .attr('fill', `url(#${gradId})`)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3.5)
        .attr('opacity', 1)
        .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))');
    });

    // Date labels with background
    if (showDates) {
      nodes
        .append('rect')
        .attr('x', -30)
        .attr('y', nodeRadius + 12)
        .attr('width', 60)
        .attr('height', 20)
        .attr('rx', 10)
        .attr('fill', '#fff')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.95);

      nodes
        .append('text')
        .attr('y', nodeRadius + 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#374151')
        .text(d => d.event.date);
    }

    // Event labels with background
    nodes
      .append('rect')
      .attr('x', d => {
        const textLength = (d.event.label.length > 15 ? 15 : d.event.label.length) * 6;
        return -textLength / 2 - 8;
      })
      .attr('y', -nodeRadius - 26)
      .attr('width', d => {
        const textLength = (d.event.label.length > 15 ? 15 : d.event.label.length) * 6;
        return textLength + 16;
      })
      .attr('height', 22)
      .attr('rx', 11)
      .attr('fill', d => getNodeColor(d.event))
      .attr('opacity', 0.15)
      .attr('stroke', d => getNodeColor(d.event))
      .attr('stroke-width', 1.5);

    nodes
      .append('text')
      .attr('y', -nodeRadius - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('fill', '#1f2937')
      .text(d => d.event.label.length > 15 ? d.event.label.substring(0, 15) + '...' : d.event.label);

    // Interaction handlers
    nodes
      .on('mouseenter', function (this: SVGGElement, event: MouseEvent, d) {
        const node = d3.select(this);

        node.select('.zigzag-timeline__node-circle')
          .transition()
          .duration(300)
          .attr('r', nodeRadius + 6)
          .style('filter', 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))');

        node.select('.zigzag-timeline__node-glow')
          .transition()
          .duration(300)
          .attr('r', nodeRadius * 3)
          .attr('opacity', 0.25);

        const rect = this.getBoundingClientRect();
        setHoveredEvent(d.event);
        setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top });
      })
      .on('mouseleave', function (this: SVGGElement) {
        const node = d3.select(this);

        node.select('.zigzag-timeline__node-circle')
          .transition()
          .duration(300)
          .attr('r', nodeRadius)
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))');

        node.select('.zigzag-timeline__node-glow')
          .transition()
          .duration(300)
          .attr('r', nodeRadius * 2.5)
          .attr('opacity', 0.1);

        setHoveredEvent(null);
      });

  }, [events, width, height, pathColor, pathWidth, nodeRadius, showDates]);

  // Render SVG icons in React overlay
  const renderIcons = () => {
    if (!svgRef.current || !containerRef.current) return null;

    const svg = svgRef.current;
    const nodes = svg.querySelectorAll('.zigzag-timeline__node');

    return Array.from(nodes).map((node, i) => {
      const event = events[i];
      if (!event) return null;

      const rect = node.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();

      const iconKey = event.icon ?
        ({'📋': 'manual', '📐': 'planning', '🧪': 'pilot', '🚀': 'launch',
          '📈': 'expansion', '🏥': 'scaleup', '✨': 'operation'}[event.icon] || 'manual')
        : 'manual';

      const IconComponent = TimelineIconMap[iconKey];
      if (!IconComponent) return null;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${rect.left - containerRect.left + rect.width / 2}px`,
            top: `${rect.top - containerRect.top + rect.height / 2}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <IconComponent size={nodeRadius * 1.5} color="#fff" />
        </div>
      );
    });
  };

  return (
    <div ref={containerRef} className={`zigzag-timeline ${className}`} style={{ position: 'relative' }}>
      <svg ref={svgRef} />
      {renderIcons()}

      {hoveredEvent && (
        <div
          className="zigzag-timeline__popover"
          style={{
            position: 'fixed',
            left: `${popoverPosition.x}px`,
            top: `${popoverPosition.y - 10}px`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          <div className="zigzag-timeline__popover-content">
            <div className="zigzag-timeline__popover-date">{hoveredEvent.date}</div>
            <div className="zigzag-timeline__popover-label">{hoveredEvent.label}</div>
            <div className="zigzag-timeline__popover-description">{hoveredEvent.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
