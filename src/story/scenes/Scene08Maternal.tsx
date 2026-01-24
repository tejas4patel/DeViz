import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../viz/useResizeObserver';
import { axisBottom, axisLeft } from '../viz/chartAxes';

type Row = {
  age: string;
  maternal_rate: number;
  gdm_rate: number;
};

export default function Scene08Maternal() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const rows = useMemo<Row[]>(() => {
    return [
      { age: '12 to 19', maternal_rate: 29.7, gdm_rate: 0.1 },
      { age: '20 to 29', maternal_rate: 134.6, gdm_rate: 2.6 },
      { age: '30 to 39', maternal_rate: 101.0, gdm_rate: 4.3 },
      { age: '40 to 55', maternal_rate: 20.3, gdm_rate: 0.8 },
    ];
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(720, rect.width);
    const height = 420;
    const margin = { top: 18, right: 18, bottom: 58, left: 64 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    const g = root.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x0 = d3
      .scaleBand<string>()
      .domain(rows.map(r => r.age))
      .range([0, innerW])
      .padding(0.22);

    const x1 = d3
      .scaleBand<string>()
      .domain(['maternal', 'gdm'])
      .range([0, x0.bandwidth()])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(rows, r => Math.max(r.maternal_rate, r.gdm_rate))! * 1.18])
      .range([innerH, 0]);

    const gx = g.append('g').attr('transform', `translate(0, ${innerH})`);
    axisBottom(gx.node() as SVGGElement | null, x0);

    const gy = g.append('g');
    axisLeft(gy.node() as SVGGElement | null, y);

    g.append('text')
      .attr('x', 0)
      .attr('y', -4)
      .attr('fontSize', 12)
      .attr('fontWeight', 700)
      .text('Rate per 1,000 women');

    const groups = g
      .selectAll('g.group')
      .data(rows)
      .join('g')
      .attr('class', 'group')
      .attr('transform', d => `translate(${x0(d.age)}, 0)`);

    groups
      .selectAll('rect')
      .data(d => [
        { key: 'maternal', value: d.maternal_rate },
        { key: 'gdm', value: d.gdm_rate },
      ])
      .join('rect')
      .attr('x', d => x1(d.key)!)
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => innerH - y(d.value))
      .attr('rx', 10)
      .attr('fill', d =>
        d.key === 'maternal' ? 'rgba(20, 70, 160, 0.22)' : 'rgba(160, 70, 20, 0.22)',
      )
      .attr('stroke', d =>
        d.key === 'maternal' ? 'rgba(20, 70, 160, 0.55)' : 'rgba(160, 70, 20, 0.55)',
      );

    const legend = g.append('g').attr('transform', `translate(${innerW - 240}, 8)`);

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 16)
      .attr('height', 16)
      .attr('fill', 'rgba(20, 70, 160, 0.22)')
      .attr('stroke', 'rgba(20, 70, 160, 0.55)');

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 12)
      .attr('fontSize', 12)
      .text('Maternal health visits');

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 24)
      .attr('width', 16)
      .attr('height', 16)
      .attr('fill', 'rgba(160, 70, 20, 0.22)')
      .attr('stroke', 'rgba(160, 70, 20, 0.55)');

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 36)
      .attr('fontSize', 12)
      .text('Gestational diabetes visits');
  }, [rows, rect.width]);

  return (
    <div ref={ref}>
      <svg ref={svgRef} width="100%" height="420" />
      <div className="small" style={{ marginTop: 10 }}>
        Starter rates come from Table 2, maternal health visits and visits with gestational diabetes
      </div>
    </div>
  );
}
