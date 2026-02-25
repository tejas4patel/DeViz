import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
// import TimelinePopover from './TimelinePopover'; // removed
import type { Scene } from './storyTypes'

type Props = {


  scenes: Scene[];
  activeIdx: number;
  onSelectSlide: (idx: number) => void;
};

type PopState = {
  visible: boolean
  node: {
    date: string
    label: string
    note: string
    type: string
  } | null
  x: number
  y: number
}


const IconFirst = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 6v12M18 6l-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPrev = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M15 6l-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconNext = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M9 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLast = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M18 6v12M6 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DeckSlideRailFlowLine(props: Props) {
  const { scenes, activeIdx, onSelectSlide, viewMode = 'story' } = props;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [, setPopoverState] = useState<PopState>({
    visible: false,
    node: null,
    x: 0,
    y: 0,
  })


  const hoverTimeoutRef = useRef<number | null>(null)

  const isMouseOverPopoverRef = useRef(false);

  const clipIdRef = useRef(`deckRailClip_${Math.random().toString(16).slice(2)}`);
  const [windowStart, setWindowStart] = useState(0);

  const total = scenes.length;
  const lastIdx = Math.max(0, total - 1);

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  useEffect(() => {
    const updateDimensions = () => {
      if (!hostRef.current) return;
      const fullWidth = hostRef.current.clientWidth;
      // User request: SVG takes 80% of parent width
      const width = fullWidth * 0.8;
      const height = 92; // MORE ROOM so labels never clip
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const layout = useMemo(() => {
    const width = dimensions.width;
    const isMobile = width < 720;
    const isTablet = width >= 720 && width < 1024;

    // reduce left/right margins so the svg drawing can get closer to the host edges
    const margin = { top: 10, right: 6, bottom: 28, left: 6 };
    const innerWidth = Math.max(0, width - margin.left - margin.right);

    const linkStrokeWidth = isMobile ? 12 : isTablet ? 14 : 16;
    const linkOverlayWidth = isMobile ? 7 : isTablet ? 8 : 10;

    const nodeRadius = isMobile ? 7 : isTablet ? 8 : 9;
    const glowRadius = isMobile ? 13 : isTablet ? 14 : 16;

    const minNodeGap = isMobile ? 36 : isTablet ? 42 : 46;
    const maxVisibleOverall =
      innerWidth <= 0 ? 3 : Math.max(3, Math.floor(innerWidth / minNodeGap) + 1);
    const maxVisibleMiddle = Math.max(0, maxVisibleOverall - 2);

    return {
      isMobile,
      margin,
      innerWidth,
      height: dimensions.height,
      linkStrokeWidth,
      linkOverlayWidth,
      nodeRadius,
      glowRadius,
      maxVisibleMiddle,
    };
  }, [dimensions.width, dimensions.height]);

  const middleCount = Math.max(0, total - 2);

  const middleWindow = useMemo(() => {
    if (middleCount <= 0) return { start: 0, endExclusive: 0 };
    if (layout.maxVisibleMiddle <= 0) return { start: 0, endExclusive: 0 };
    if (middleCount <= layout.maxVisibleMiddle) return { start: 0, endExclusive: middleCount };

    const maxStart = Math.max(0, middleCount - layout.maxVisibleMiddle);
    const start = clamp(windowStart, 0, maxStart);
    const endExclusive = Math.min(middleCount, start + layout.maxVisibleMiddle);
    return { start, endExclusive };
  }, [middleCount, layout.maxVisibleMiddle, windowStart]);

  const ensureVisible = useMemo(() => {
    return (idx: number) => {
      if (middleCount <= 0) return

      if (idx <= 0) {
        setWindowStart(0)
        return
      }

      if (idx >= lastIdx) {
        const maxStart = Math.max(0, middleCount - layout.maxVisibleMiddle)
        setWindowStart(maxStart)
        return
      }

      if (layout.maxVisibleMiddle <= 0) return

      const local = idx - 1
      const start = middleWindow.start
      const end = middleWindow.endExclusive - 1

      if (local < start) setWindowStart(local)
      else if (local > end) setWindowStart(local - (layout.maxVisibleMiddle - 1))
    }
  }, [middleCount, lastIdx, layout.maxVisibleMiddle, middleWindow])

  useEffect(() => {
    ensureVisible(activeIdx)
  }, [activeIdx, ensureVisible])

  const selectIdx = useMemo(() => {
    return (idx: number) => {
      const next = clamp(idx, 0, lastIdx)
      ensureVisible(next)
      onSelectSlide(next)
    }
  }, [lastIdx, ensureVisible, onSelectSlide])

  const canPrev = activeIdx > 0 && viewMode === 'story';

  const canNext = activeIdx < lastIdx && viewMode === 'story';

  const onPrev = () => viewMode === 'story' && selectIdx(activeIdx - 1);
  const onNext = () => viewMode === 'story' && selectIdx(activeIdx + 1);
  const onFirst = () => viewMode === 'story' && selectIdx(0);
  const onLast = () => viewMode === 'story' && selectIdx(lastIdx);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    if (dimensions.width === 0) return;

    const {
      margin,
      innerWidth,
      height,
      linkStrokeWidth,
      linkOverlayWidth,
      nodeRadius,
      glowRadius,
    } = layout;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    svg
      .attr('width', dimensions.width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${dimensions.width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const clipId = clipIdRef.current;
    const defs = svg.append('defs');

    // clip area should match the drawing area (inside margins)
    defs
      .append('clipPath')
      .attr('id', clipId)
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', innerWidth)
      .attr('height', Math.max(0, height - margin.top - margin.bottom));

    // outer group: do NOT translate — draw in svg coordinates so the group's
    // bounding box can span the full svg host (no transform-based clipping).
    const g = svg.append('g');

    // ensure the group's bounding box spans the full svg host — add a transparent
    // rect that covers the entire svg area (absolute coordinates)
    g.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('fill', 'transparent')
      .attr('pointer-events', 'none');

    const y = 26;
    if (total === 0) return;

    const indices: number[] = [];
    indices.push(0);

    const middleStartIdx = 1 + middleWindow.start;
    const middleEndExclusive = 1 + middleWindow.endExclusive;
    for (let i = middleStartIdx; i < middleEndExclusive; i++) {
      if (i > 0 && i < lastIdx) indices.push(i);
    }

    if (lastIdx !== 0) indices.push(lastIdx)
    const renderIndices = Array.from(new Set(indices)).sort((a, b) => a - b)

    // draw across the full available inner width so the <g> covers the svg area
    // const edgePad = glowRadius + 2; // Unused
    const leftBound = 0
    const rightBound = innerWidth


    const xScale = d3
      .scalePoint<number>()
      .domain(renderIndices.map((_, i) => i))
      .range([leftBound, rightBound])
      .padding(0);

    const nodesData = renderIndices.map((globalIndex, posIndex) => {
      return {
        scene: scenes[globalIndex],
        globalIndex,
        // draw in svg coords: offset by left/top margins
        x: (xScale(posIndex) ?? leftBound) + margin.left,
        y: y + margin.top,
      };
    });

    const firstX = nodesData.length > 0 ? nodesData[0].x : leftBound;
    const lastX = nodesData.length > 0 ? nodesData[nodesData.length - 1].x : rightBound;
    const pathData = `M ${firstX} ${y} L ${lastX} ${y}`;

    const linkGroup = g.append('g').attr('class', 'link').attr('clip-path', `url(#${clipId})`);

    linkGroup
      .append('path')
      .attr('class', 'link-base')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', '#A4B6C1')
      .attr('stroke-width', linkStrokeWidth)
      .attr('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    linkGroup
      .append('path')
      .attr('class', 'link-overlay')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', '#2E598F')
      .attr('stroke-width', linkOverlayWidth)
      .attr('opacity', 0.55)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    const nodesGroup = g.append('g').attr('class', 'nodes').attr('clip-path', `url(#${clipId})`);

    const nodes = nodesGroup
      .selectAll('.event-node')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class', 'event-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')

    interface Datum {
      scene: Scene
      globalIndex: number
      x: number
      y: number
    }
    const getNodeColor = (d: Datum) => (d.globalIndex === activeIdx ? '#2E598F' : '#6B7280')

    nodes
      .append('circle')

      .attr('r', glowRadius)
      .attr('fill', d => getNodeColor(d))
      .attr('opacity', d => (d.globalIndex === activeIdx ? 0.22 : 0.14))

    nodes
      .append('circle')
      .attr('r', nodeRadius)
      .attr('fill', d => getNodeColor(d))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.92)

    nodes
      .append('text')
      .attr('y', nodeRadius + 21) // move label UP so it never clips
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-family', 'Inter, system-ui, Roboto, sans-serif')
      .attr('fill', '#64748B')
      .attr('font-weight', '700')
      .text(d => `${d.globalIndex + 1}`)

    nodes
      .on('click', (_evt, d: unknown) => {
        selectIdx((d as Datum).globalIndex)
      })
      .on('mouseenter', function (evt: MouseEvent, d: unknown) {
        if (hoverTimeoutRef.current) {
          window.clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }

        d3.select(this)
          .select('circle:last-child')
          .transition()
          .duration(160)
          .attr('r', nodeRadius + 3)
          .attr('opacity', 1)

        const rect = (evt.currentTarget as Element).getBoundingClientRect()
        const datum = d as Datum

        setPopoverState({
          visible: true,
          node: {
            date: `Slide ${datum.globalIndex + 1}`,
            label: datum.scene.title,
            note: datum.scene.subtitle || '',
            type: 'slide',
          },
          x: rect.left + rect.width / 2,
          y: rect.top,
        })
      })
      .on('mouseleave', function () {
        d3.select(this)
          .select('circle:last-child')
          .transition()
          .duration(160)
          .attr('r', nodeRadius)
          .attr('opacity', 0.92)

        hoverTimeoutRef.current = window.setTimeout(() => {
          if (!isMouseOverPopoverRef.current) {
            setPopoverState(prev => ({ ...prev, visible: false }))
          }
        }, 220)
      })
  }, [
    dimensions.width,
    dimensions.height,
    layout,
    scenes,
    total,
    activeIdx,
    middleWindow.start,
    middleWindow.endExclusive,
    lastIdx,
    selectIdx,
  ])


  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  return (
    <div className="deckRailLayout" ref={containerRef}>
      <div style={{
        display: 'flex',
        gap: '6px',
        alignItems: 'center'
      }}>
        <button
          disabled={!canPrev}
          onClick={onFirst}
          aria-label="First Slide"
          style={{
            fontSize: '11px',
            padding: '6px 8px',
            border: `2px solid #d1d5db`,
            borderRadius: '20px',
            background: '#ffffff',
            color: '#374151',
            cursor: viewMode === 'source' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '600',
            opacity: viewMode === 'source' ? 0.3 : (canPrev ? 1 : 0.5),
            minWidth: '36px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconFirst />
        </button>

        <button
          disabled={!canPrev}
          onClick={onPrev}
          aria-label="Previous Slide"
          style={{
            fontSize: '11px',
            padding: '6px 8px',
            border: `2px solid #d1d5db`,
            borderRadius: '20px',
            background: '#ffffff',
            color: '#374151',
            cursor: viewMode === 'source' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '600',
            opacity: viewMode === 'source' ? 0.3 : (canPrev ? 1 : 0.5),
            minWidth: '36px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconPrev />
        </button>

        <button
          disabled={!canNext}
          onClick={onNext}
          aria-label="Next Slide"
          style={{
            fontSize: '11px',
            padding: '6px 8px',
            border: `2px solid #d1d5db`,
            borderRadius: '20px',
            background: '#ffffff',
            color: '#374151',
            cursor: viewMode === 'source' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '600',
            opacity: viewMode === 'source' ? 0.3 : (canNext ? 1 : 0.5),
            minWidth: '36px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconNext />
        </button>

        <button
          disabled={!canNext}
          onClick={onLast}
          aria-label="Last Slide"
          style={{
            fontSize: '11px',
            padding: '6px 8px',
            border: `2px solid #d1d5db`,
            borderRadius: '20px',
            background: '#ffffff',
            color: '#374151',
            cursor: viewMode === 'source' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '600',
            opacity: viewMode === 'source' ? 0.3 : (canNext ? 1 : 0.5),
            minWidth: '36px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconLast />
        </button>
      </div>
    </div>
  )
}

