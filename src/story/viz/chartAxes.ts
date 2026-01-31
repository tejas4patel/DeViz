import * as d3 from 'd3';

export function axisBottom<Domain extends d3.AxisDomain>(
  g: SVGGElement | null,
  scale: d3.AxisScale<Domain>,
) {
  if (!g) return;
  d3.select(g).call(d3.axisBottom(scale).ticks(6));
}

export function axisLeft<Domain extends d3.AxisDomain>(
  g: SVGGElement | null,
  scale: d3.AxisScale<Domain>,
) {
  if (!g) return;
  d3.select(g).call(d3.axisLeft(scale).ticks(6));
}
