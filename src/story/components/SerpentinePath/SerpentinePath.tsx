import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../../viz/useResizeObserver';
import type { SerpentinePathProps, AccessStep } from './types';

interface TooltipState {
  visible: boolean;
  step: AccessStep | null;
  x: number;
  y: number;
}

export default function SerpentinePath({ path, title, className = '' }: SerpentinePathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, rect } = useResizeObserver<HTMLDivElement>();
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, step: null, x: 0, y: 0 });

  const width = Math.max(260, rect.width);
  const height = Math.max(260, rect.height);

  useEffect(() => {
    if (!svgRef.current || width <= 0 || height <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 45, right: 100, bottom: 5, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const stepSpacing = innerHeight / (path.steps.length + 1);
    const pathCenterX = innerWidth / 2;

    // Column header
    g.append('text')
      .attr('x', pathCenterX)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('fill', path.color)
      .attr('font-size', '18px')
      .attr('font-weight', '800')
      .attr('letter-spacing', '0.5px')
      .text(title);

    // Build wave control points
    if (path.steps.length > 1) {
      const wavePoints = path.steps.map((_, i) => ({
        x: i % 2 === 0 ? pathCenterX - 50 : pathCenterX + 50,
        y: stepSpacing * (i + 1),
      }));

      let pathD = `M ${wavePoints[0].x} ${wavePoints[0].y}`;
      for (let i = 1; i < wavePoints.length; i++) {
        const prev = wavePoints[i - 1];
        const curr = wavePoints[i];
        const ext = (curr.y - prev.y) * 0.75;
        pathD += ` C ${prev.x} ${prev.y + ext} ${curr.x} ${curr.y - ext} ${curr.x} ${curr.y}`;
      }

      // Base layer — wide, low opacity (matches DataCoverageTree link-base style)
      g.append('path')
        .attr('d', pathD)
        .attr('stroke', path.color)
        .attr('stroke-width', 20)
        .attr('opacity', 0.3)
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');

      // Overlay layer — narrower, animated draw (matches DataCoverageTree link-overlay style)
      const overlay = g.append('path')
        .attr('d', pathD)
        .attr('stroke', path.color)
        .attr('stroke-width', 12)
        .attr('opacity', 0.6)
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');

      const totalLen = (overlay.node() as SVGPathElement).getTotalLength();
      overlay
        .attr('stroke-dasharray', totalLen)
        .attr('stroke-dashoffset', totalLen)
        .transition()
        .duration(2000)
        .ease(d3.easeQuadInOut)
        .attr('stroke-dashoffset', 0);
    }

    // Step nodes
    path.steps.forEach((step, i) => {
      const y = stepSpacing * (i + 1);
      const x = i % 2 === 0 ? pathCenterX - 50 : pathCenterX + 50;
      const isLeft = i % 2 === 0;

      const ng = g.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .style('cursor', 'pointer')
        .style('opacity', 0);

      ng.transition()
        .delay(i * 300)
        .duration(600)
        .ease(d3.easeBackOut)
        .style('opacity', 1);

      ng.append('circle')
        .attr('r', 24)
        .attr('fill', path.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .style('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.16))');

      ng.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-size', '14px')
        .attr('font-weight', '700')
        .style('pointer-events', 'none')
        .text(step.step);

      const lg = ng.append('g')
        .attr('transform', `translate(${isLeft ? -95 : 95}, 0)`);

      lg.append('rect')
        .attr('x', -65).attr('y', -26)
        .attr('width', 130).attr('height', 52)
        .attr('rx', 10)
        .attr('fill', '#ffffff')
        .attr('stroke', path.color)
        .attr('stroke-width', 1.5)
        .style('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))')
        .style('opacity', 0.96);

      lg.append('text')
        .attr('text-anchor', 'middle').attr('y', -10)
        .attr('fill', path.color)
        .attr('font-size', '11px').attr('font-weight', '700')
        .text(step.title);

      lg.append('text')
        .attr('text-anchor', 'middle').attr('y', 2)
        .attr('fill', '#244855')
        .attr('font-size', '10px').attr('font-weight', '500')
        .text(step.timeframe);

      if (step.cost) {
        lg.append('text')
          .attr('text-anchor', 'middle').attr('y', 13)
          .attr('fill', '#244855').attr('font-size', '9px')
          .text(step.cost);
      }

      // Hover — fixed-position tooltip (escapes any overflow:hidden parent)
      ng
        .on('mouseover', function () {
          d3.select(this).transition().duration(200)
            .attr('transform', `translate(${x}, ${y}) scale(1.15)`);
          const circle = d3.select(this).select('circle').node() as SVGCircleElement;
          const r = circle.getBoundingClientRect();
          setTooltip({ visible: true, step, x: r.left + r.width / 2, y: r.top - 8 });
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200)
            .attr('transform', `translate(${x}, ${y}) scale(1)`);
          setTooltip(t => ({ ...t, visible: false }));
        });
    });
  }, [path, width, height, title]);

  const complexityColor: Record<string, string> = {
    low: '#90AEAD',
    medium: '#874F41',
    high: '#E64833',
  };

  return (
    <div ref={containerRef} className={`serpentine-path ${className}`.trim()}>
      <svg ref={svgRef} />
      {tooltip.visible && tooltip.step && (
        <div
          className="step-tooltip"
          style={{ position: 'fixed', left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
        >
          <h4>{tooltip.step.title}</h4>
          <p>{tooltip.step.description}</p>
          <div className="step-meta">
            <span>⏱ {tooltip.step.timeframe}</span>
            {tooltip.step.cost && <span>💰 {tooltip.step.cost}</span>}
            <span style={{ color: complexityColor[tooltip.step.complexity] }}>
              🎯 {tooltip.step.complexity} complexity
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
