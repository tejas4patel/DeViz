import * as d3 from "d3"

export function axisBottom(g: SVGGElement, scale: d3.AxisScale<d3.AxisDomain>) {
  d3.select(g).call(d3.axisBottom(scale as any).ticks(6))
}

export function axisLeft(g: SVGGElement, scale: d3.AxisScale<d3.AxisDomain>) {
  d3.select(g).call(d3.axisLeft(scale as any).ticks(6))
}
