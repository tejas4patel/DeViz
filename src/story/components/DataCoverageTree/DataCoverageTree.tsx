import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { DataCoverageTreeProps } from './types';
import { useResizeObserver } from '../../viz/useResizeObserver';
import './DataCoverageTree.css';

const DEFAULT_AVAILABILITY_COLORS = {
  root:       '#244855',
  both:       '#874F41',
  restricted: '#E64833',
  public:     '#90AEAD',
  category:   '#90AEAD',
};

export default function DataCoverageTree({
  data,
  width,
  height,
  availabilityColors,
  className = '',
}: DataCoverageTreeProps) {
  // Merge caller overrides with defaults — open for extension (OCP)
  const colors = { ...DEFAULT_AVAILABILITY_COLORS, ...availabilityColors };
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, rect } = useResizeObserver<HTMLDivElement>();
  const [tooltip, setTooltip] = useState<{ visible: boolean; content: any; x: number; y: number }>({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });

  const containerWidth  = width  || Math.max(800, rect.width  - 40);
  const containerHeight = height || Math.max(600, rect.height - 40);

  useEffect(() => {
    if (!svgRef.current || !data || containerWidth <= 0 || containerHeight <= 0) return;

    // Responsive scaling
    const isMobile = containerWidth < 768;
    const isTablet = containerWidth >= 768 && containerWidth < 1024;

    const nodeSpacingX = isMobile ? 160 : isTablet ? 200 : 250;
    const nodeSpacingY = isMobile ? 140 : isTablet ? 160 : 180;
    const nodeRadius = isMobile ? 8 : isTablet ? 10 : 12;
    const fontSize = isMobile ? 12 : isTablet ? 13 : 14;
    const categoryFontSize = isMobile ? 14 : isTablet ? 15 : 16;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${containerWidth / 2}, 80)`);

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setTooltip({ visible: false, content: null, x: 0, y: 0 });
      });

    svg.call(zoom);

    const root = d3.hierarchy(data) as any;
    root.x0 = 0;
    root.y0 = 0;

    // Start with root expanded, first level collapsed
    if (root.children) {
      root.children.forEach((child: any) => {
        if (child.children) {
          child._children = child.children;
          child.children = null;
        }
      });
    }

    const treeLayout = d3.tree<any>().nodeSize([nodeSpacingX, nodeSpacingY]);

    function update(source: any) {
      const duration = 600;
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      nodes.forEach((d: any) => (d.y = d.depth * nodeSpacingY));

      // Links
      const link = g.selectAll('.link').data(links, (d: any) => d.target.data.title);

      const linkEnter = link
        .enter()
        .insert('g', 'g')
        .attr('class', 'link');

      // Dual-path links with thick borders (like example)
      const linkStrokeWidth = isMobile ? 16 : isTablet ? 20 : 24;
      const linkOverlayWidth = isMobile ? 10 : isTablet ? 12 : 16;

      linkEnter
        .append('path')
        .attr('class', 'link-base')
        .attr('fill', 'none')
        .attr('stroke', (d: any) => {
          const av = d.target.data.availability;
          if (av === 'both') return colors.both;
          if (av === 'restricted') return colors.restricted;
          return colors.public;
        })
        .attr('stroke-width', linkStrokeWidth)
        .attr('opacity', 0.3)
        .attr('stroke-linecap', 'round')
        .attr('d', (d: any) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      linkEnter.each(function (d: any) {
        const linkGroup = d3.select(this);
        const availability = d.target.data.availability;

        let overlayColor = colors.public;
        if (availability === 'both') {
          overlayColor = colors.both;
        } else if (availability === 'restricted') {
          overlayColor = colors.restricted;
        }

        linkGroup
          .append('path')
          .attr('class', 'link-overlay')
          .attr('fill', 'none')
          .attr('stroke', overlayColor)
          .attr('stroke-width', linkOverlayWidth)
          .attr('opacity', 0.6)
          .attr('stroke-linecap', 'round')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });
      });

      const linkUpdate = linkEnter.merge(link as any);

      linkUpdate
        .select('.link-base')
        .transition()
        .duration(duration)
        .attr('d', diagonal);

      linkUpdate
        .select('.link-overlay')
        .transition()
        .duration(duration)
        .attr('d', diagonal);

      link
        .exit()
        .transition()
        .duration(duration)
        .attr('opacity', 0)
        .remove();

      // Nodes
      const node = g.selectAll('.node').data(nodes, (d: any) => d.data.title);

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('click', (event, d: any) => {
          event.stopPropagation();

          if (d.children || d._children) {
            const isExpanding = !d.children && !!d._children;

            // Only collapse siblings when we are expanding — not when collapsing
            if (isExpanding && d.parent) {
              d.parent.children?.forEach((child: any) => {
                if (child !== d && child.children) {
                  child._children = child.children;
                  child.children = null;
                }
              });
            }

            // Toggle current node
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else {
              d.children = d._children;
              d._children = null;
            }
            update(d);
          }
        })
        .on('mouseenter', function (event, d: any) {
          if (d.data.description || d.data.details) {
            const circle = d3.select(this).select('circle').node() as SVGCircleElement;
            const rect = circle.getBoundingClientRect();

            setTooltip({
              visible: true,
              content: d.data,
              x: rect.left + rect.width / 2,
              y: rect.top,
            });
          }

          d3.select(this).select('circle').transition().duration(200).attr('r', nodeRadius * 1.3);
        })
        .on('mouseleave', function (event, d: any) {
          setTooltip({ visible: false, content: null, x: 0, y: 0 });
          d3.select(this).select('circle').transition().duration(200).attr('r', nodeRadius);
        });

      // Node circles with new color palette
      nodeEnter.each(function (d: any, i: number) {
        const nodeGroup = d3.select(this);
        const availability = d.data.availability;
        const isCategory = d.data.category && d.depth > 0;
        const isRoot = d.depth === 0;

        let fillColor = colors.public;

        if (isRoot) {
          fillColor = colors.root;
        } else if (availability === 'both') {
          fillColor = colors.both;
        } else if (availability === 'restricted') {
          fillColor = colors.restricted;
        } else if (isCategory) {
          fillColor = colors.category;
        }

        nodeGroup
          .append('circle')
          .attr('r', nodeRadius)
          .attr('fill', fillColor)
          .attr('stroke', '#FBE9D0')
          .attr('stroke-width', 2.5)
          .style('cursor', d.children || d._children ? 'pointer' : 'default')
          .style('filter', 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))');

        // Add expand indicator for collapsible nodes
        if (d._children || d.children) {
          nodeGroup
            .append('text')
            .attr('class', 'node-indicator')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#FBE9D0')
            .attr('font-size', `${nodeRadius * 1.2}px`)
            .attr('font-weight', 'bold')
            .style('pointer-events', 'none')
            .text(d._children ? '+' : '−');
        }
      });

      // Node labels
      nodeEnter.each(function (d: any) {
        const nodeGroup = d3.select(this);
        const isCategory = d.data.category && d.depth > 0;
        const currentFontSize = d.depth === 0 ? 18 : isCategory ? categoryFontSize : fontSize;
        const labelY = nodeRadius + 25;

        const text = nodeGroup
          .append('text')
          .attr('y', labelY)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'system-ui, -apple-system, sans-serif')
          .attr('font-size', `${currentFontSize}px`)
          .attr('font-weight', d.depth === 0 ? '700' : isCategory ? '600' : '500')
          .attr('fill', '#1e293b')
          .style('pointer-events', 'none');

        // Word wrap
        const words = d.data.title.split(/\s+/);
        const maxWidth = isMobile ? 120 : isTablet ? 140 : 160;
        const lines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          text.text(testLine);
          const testWidth = (text.node() as SVGTextElement).getComputedTextLength();

          if (testWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        text.remove();

        lines.forEach((line, i) => {
          const text = nodeGroup
            .append('text')
            .attr('y', labelY + i * (currentFontSize + 2))
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Montserrat, system-ui, sans-serif')
            .attr('font-size', `${currentFontSize}px`)
            .attr('font-weight', d.depth === 0 ? '700' : isCategory ? '600' : '500')
            .attr('fill', '#244855')
            .style('pointer-events', 'none')
            .text(line);

          // Add text outline for better readability
          text
            .style('paint-order', 'stroke')
            .style('stroke', '#FBE9D0')
            .style('stroke-width', isMobile ? '3px' : '4px')
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round');
        });

        // Availability is already encoded by node circle colour — no badge needed
      });

      const nodeUpdate = nodeEnter.merge(node as any);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

      // Update expand/collapse indicators
      nodeUpdate.select('.node-indicator').text((d: any) => (d._children ? '+' : '−'));

      node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', () => `translate(${source.x},${source.y})`)
        .remove();

      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function diagonal(d: any) {
      return `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`;
    }

    update(root);

    svg.on('click', () => {
      setTooltip({ visible: false, content: null, x: 0, y: 0 });
    });
  }, [data, containerWidth, containerHeight]);

  return (
    <div ref={containerRef} className={`data-coverage-tree ${className}`}>
      <svg ref={svgRef}></svg>
      {tooltip.visible && tooltip.content && (
        <div
          className="data-coverage-tree__tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 10}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="data-coverage-tree__tooltip-title">{tooltip.content.title}</div>
          {tooltip.content.description && (
            <div className="data-coverage-tree__tooltip-description">{tooltip.content.description}</div>
          )}
          {tooltip.content.details && (
            <div className="data-coverage-tree__tooltip-details">{tooltip.content.details}</div>
          )}
        </div>
      )}
    </div>
  );
}
