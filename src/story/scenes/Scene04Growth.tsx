import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../viz/useResizeObserver';
import { axisBottom, axisLeft } from '../viz/chartAxes';
import { Scene04Row } from '../storyTypes';
import { scene04Rows } from '../sceneData';

export default function Scene04Growth() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const rows = useMemo<Scene04Row[]>(() => {
    return scene04Rows;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(620, rect.width);
    const height = 380;
    const margin = { top: 16, right: 18, bottom: 44, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    const g = root.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand<number>()
      .domain(rows.map(r => r.year))
      .range([0, innerW])
      .padding(0.25);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(rows, r => r.visits_millions)! * 1.15])
      .range([innerH, 0]);

    const gx = g.append('g').attr('transform', `translate(0, ${innerH})`);
    axisBottom(gx.node() as SVGGElement | null, x);

    const gy = g.append('g');
    axisLeft(gy.node() as SVGGElement | null, y);

    g.append('text')
      .attr('x', 0)
      .attr('y', -2)
      .attr('fontSize', 12)
      .attr('fontWeight', 700)
      .text('Visits in millions');

    g.selectAll('rect')
      .data(rows)
      .join('rect')
      .attr('x', d => x(d.year)!)
      .attr('y', d => y(d.visits_millions))
      .attr('width', x.bandwidth())
      .attr('height', d => innerH - y(d.visits_millions))
      .attr('rx', 10)
      .attr('fill', 'rgba(20, 70, 160, 0.22)')
      .attr('stroke', 'rgba(20, 70, 160, 0.55)');

    g.selectAll('text.value')
      .data(rows)
      .join('text')
      .attr('class', 'value')
      .attr('x', d => x(d.year)! + x.bandwidth() / 2)
      .attr('y', d => y(d.visits_millions) - 8)
      .attr('textAnchor', 'middle')
      .attr('fontSize', 12)
      .attr('fontWeight', 700)
      .text(d => `${d.visits_millions.toFixed(2)}M`);

    g.selectAll('text.centers')
      .data(rows)
      .join('text')
      .attr('class', 'centers')
      .attr('x', d => x(d.year)! + x.bandwidth() / 2)
      .attr('y', () => innerH + 34)
      .attr('textAnchor', 'middle')
      .attr('fontSize', 12)
      .text(d => `Centers ${d.centers_total}`)
      // use d if needed, otherwise ignore. removing unused var.


  }, [rows, rect.width]);

  return (
    <div ref={ref}>
      <svg ref={svgRef} width="100%" height="380" />
      <div className="small" style={{ marginTop: 10 }}>
        Starter values come from Table 1 totals for 2021 through 2023
      </div>
    </div>
  );
}
