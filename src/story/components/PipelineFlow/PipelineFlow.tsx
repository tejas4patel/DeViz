import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { PipelineStage, PipelineFlowProps, StageStatusColors } from './types';
import './PipelineFlow.css';

/** Layout-only fields computed during D3 pass — separate from the data model (ISP) */
interface NodeLayout {
  x: number;
  y: number;      // visual circle centre (used for drawing + labels)
  pathY: number;  // bezier extreme — pushed past the circle centre so the path curves around the node
  radius: number;
  index: number;
  isTop: boolean;
}

type NodeData = PipelineStage & NodeLayout;

const DEFAULT_STATUS_COLORS: Record<string, StageStatusColors> = {
  completed: { primary: '#10b981', bg: '#ecfdf5' },
  active:    { primary: '#3b82f6', bg: '#eff6ff' },
  pending:   { primary: '#94a3b8', bg: '#f8fafc' },
  default:   { primary: '#6366f1', bg: '#eef2ff' },
};

export default function PipelineFlow({
  stages,
  width = 1200,
  height = 580,
  title = 'Data Collection Pipeline',
  statusColors,
  className = '',
}: PipelineFlowProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Merge caller overrides with defaults — open for extension, closed for modification (OCP)
  const resolvedColors: Record<string, StageStatusColors> = { ...DEFAULT_STATUS_COLORS, ...statusColors };

  const getStatusColors = (status?: string): StageStatusColors =>
    resolvedColors[status ?? 'default'] ?? resolvedColors['default'];

  useEffect(() => {
    if (!svgRef.current || stages.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    // ── Dimensions ───────────────────────────────────────────────────────────
    // Generous top/bottom margins to give peak and valley labels room
    const margin = { top: 80, right: 65, bottom: 70, left: 65 };
    const W = width  - margin.left - margin.right;
    const H = height - margin.top  - margin.bottom;

    const g    = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const defs = svg.append('defs');

    // Drop-shadow filter for node circles
    const filter = defs.append('filter')
      .attr('id', 'node-shadow')
      .attr('x', '-40%').attr('y', '-40%')
      .attr('width', '180%').attr('height', '180%');
    filter.append('feDropShadow')
      .attr('dx', 0).attr('dy', 4)
      .attr('stdDeviation', 7)
      .attr('flood-color', 'rgba(0,0,0,0.14)');

    // ── Visual constants ──────────────────────────────────────────────────────
    const PATH_COLOR     = '#5b8dd9';
    const PATH_SHADOW    = '#3a6bb5';
    const PATH_HIGHLIGHT = '#a8c7f0';
    const PATH_STROKE    = 46;
    const arrowR         = 20;

    // ── Node positions — alternating peak / valley ────────────────────────────
    const nodeRadius = Math.min(42, Math.max(30, Math.min(W / (stages.length * 5), H * 0.11)));
    // The path peaks/valleys sit at yTop/yBot.
    // Node circles float fully above peaks or below valleys — no overlap with path band.
    const yTop = H * 0.30;   // path peak row
    const yBot = H * 0.70;   // path valley row
    const yMid = H * 0.50;   // entry / exit height (centre)
    const xPad = W * 0.15;

    // Minimum gap between path surface edge and node circle edge
    const stemGap = 14;
    // Total vertical offset of node circle centre from the path peak/valley
    const nodeOffset = PATH_STROKE / 2 + nodeRadius + stemGap;

    const nodeData: NodeData[] = stages.map((stage, i) => {
      const x =
        stages.length > 1
          ? xPad + (i / (stages.length - 1)) * (W - 2 * xPad)
          : W / 2;
      // Wave shape: even = peak (up), odd = valley (down) — unchanged from original
      const isWavePeak = i % 2 === 0;
      const pathY = isWavePeak ? yTop : yBot;
      // Node placement: FLIPPED from wave — even nodes sit below peak, odd nodes sit above valley
      const isTop = !isWavePeak;  // true = node in upper half (Site Assessment, QV)
      const y = isWavePeak
        ? yTop + nodeOffset   // below the peak (Recruitment, HL7, Production)
        : yBot - nodeOffset;  // above the valley (Site Assessment, QV)
      return { ...stage, x, y, pathY, radius: nodeRadius, index: i, isTop };
    });

    // ── Snake path — cubic bezier with horizontal tangents ────────────────────
    const pathStartX = arrowR + 8;
    const pathEndX   = W - arrowR - 8;

    const segPoints: [number, number][] = [
      [pathStartX, yMid],
      ...nodeData.map(n => [n.x, n.pathY] as [number, number]),
      [pathEndX, yMid],
    ];

    const rawPath = d3.path();
    rawPath.moveTo(segPoints[0][0], segPoints[0][1]);
    for (let i = 0; i < segPoints.length - 1; i++) {
      const [ax, ay] = segPoints[i];
      const [bx, by] = segPoints[i + 1];
      const cpx = ax + (bx - ax) * 0.5;
      rawPath.bezierCurveTo(cpx, ay, cpx, by, bx, by);
    }
    const pathD = rawPath.toString();

    // Shadow layer — thicker, darker, drawn first
    g.append('path')
      .attr('d', pathD)
      .attr('stroke', PATH_SHADOW)
      .attr('stroke-width', PATH_STROKE + 10)
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.18);

    // Highlight stripe — lighter, thinner, shifted slightly up for depth
    g.append('path')
      .attr('d', pathD)
      .attr('stroke', PATH_HIGHLIGHT)
      .attr('stroke-width', PATH_STROKE - 24)
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.55)
      .attr('transform', 'translate(0,-7)');

    // Main path — animated draw
    const mainPath = g.append('path')
      .attr('d', pathD)
      .attr('stroke', PATH_COLOR)
      .attr('stroke-width', PATH_STROKE)
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round');

    // CSS-animated white dashes flowing along the path
    g.append('path')
      .attr('d', pathD)
      .attr('stroke', 'rgba(255,255,255,0.35)')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('stroke-dasharray', '14 30')
      .attr('class', 'snake-flow-anim');

    // ── Entry / exit arrow circles ────────────────────────────────────────────
    [
      { x: 0,  y: yMid },   // left end of path
      { x: W,  y: yMid },   // right end of path
    ].forEach(({ x, y }) => {
      const ag = g.append('g').attr('transform', `translate(${x},${y})`);
      ag.append('circle')
        .attr('r', arrowR)
        .attr('fill', PATH_COLOR)
        .attr('stroke', 'white')
        .attr('stroke-width', 3);
      ag.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .text('→');
    });

    // ── Nodes ─────────────────────────────────────────────────────────────────
    const DRAW_MS = 2000;

    nodeData.forEach((node, i) => {
      const colors = getStatusColors(node.status);
      const r   = node.radius;
      const dir = node.isTop ? -1 : 1; // −1 = label above (peaks), +1 = label below (valleys)

      const ng = g.append('g')
        .attr('transform', `translate(${node.x},${node.y})`)
        .attr('opacity', 0)
        .attr('cursor', 'pointer');

      // Stem — thin connector from node circle edge to the path peak/valley
      const stemLocalY = node.pathY - node.y;
      const circleEdgeY = node.isTop ? node.radius : -node.radius;
      ng.append('line')
        .attr('x1', 0).attr('y1', circleEdgeY)
        .attr('x2', 0).attr('y2', stemLocalY)
        .attr('stroke', colors.primary)
        .attr('stroke-width', 2)
        .attr('opacity', 0.5);

      // Node circle — solid white fill so the icon is legible
      ng.append('circle')
        .attr('r', r)
        .attr('fill', 'white')
        .attr('stroke', colors.primary)
        .attr('stroke-width', 4)
        .attr('filter', 'url(#node-shadow)');

      // Emoji icon, centred
      ng.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', `${Math.round(r * 0.72)}px`)
        .text(node.icon);

      // Number badge (upper-right of circle)
      const badge = ng.append('g')
        .attr('transform', `translate(${r * 0.67},${-r * 0.67})`);
      badge.append('circle')
        .attr('r', 11)
        .attr('fill', colors.primary)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
      badge.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 4)
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .text(i + 1);

      // Stage title — above for peaks, below for valleys
      ng.append('text')
        .attr('y', dir * (r + 16))
        .attr('text-anchor', 'middle')
        .attr('fill', colors.primary)
        .attr('font-size', '13px')
        .attr('font-weight', '700')
        .attr('dominant-baseline', node.isTop ? 'auto' : 'hanging')
        .text(node.title);

      // Per-node metrics
      if (node.metrics) {
        node.metrics.forEach((m, mi) => {
          ng.append('text')
            .attr('y', dir * (r + 32 + mi * 15))
            .attr('text-anchor', 'middle')
            .attr('fill', '#64748b')
            .attr('font-size', '11px')
            .attr('dominant-baseline', node.isTop ? 'auto' : 'hanging')
            .text(`${m.value} · ${m.label}`);
        });
      }

      // Hover — pure D3 (no React state, avoids useEffect re-runs on hover)
      ng
        .on('mouseenter', function () {
          d3.select(this).transition().duration(180)
            .attr('transform', `translate(${node.x},${node.y}) scale(1.1)`);
        })
        .on('mouseleave', function () {
          d3.select(this).transition().duration(180)
            .attr('transform', `translate(${node.x},${node.y}) scale(1)`);
        });

      // Staggered appearance timed to roughly match the path draw progress
      const delay = DRAW_MS * (i + 1) / (stages.length + 1);
      const id = setTimeout(() => {
        ng.transition()
          .duration(460)
          .ease(d3.easeBackOut.overshoot(1.3))
          .attr('opacity', 1);
      }, delay);
      timeoutIds.push(id);
    });

    // ── Path draw animation ───────────────────────────────────────────────────
    const totalLen = (mainPath.node() as SVGPathElement).getTotalLength();
    mainPath
      .attr('stroke-dasharray', totalLen)
      .attr('stroke-dashoffset', totalLen)
      .transition()
      .duration(DRAW_MS)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [stages, width, height, title]);

  return (
    <div
      className={`pipeline-flow-d3 ${className}`}
      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
