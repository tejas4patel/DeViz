import * as d3 from 'd3';

export function axisBottom(g: SVGGElement | null, scale: any) {
  if (!g) return;
  d3.select(g).call(d3.axisBottom(scale).ticks(6));
}

export function axisLeft(g: SVGGElement | null, scale: any) {
  if (!g) return;
  d3.select(g).call(d3.axisLeft(scale).ticks(6));
}
