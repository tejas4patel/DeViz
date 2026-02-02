import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

import { useResizeObserver } from '../viz/useResizeObserver';
import graphData from '../data/scene01-graph.json';

// Types for the graph data
type GraphNode = {
  id: string;
  label: string;
  detail: string;
  group: 'hub' | 'pillar' | 'sub';
  who?: string;
  what?: string;
  when?: string;
  where?: string;
  why?: string;
  which?: string;
  how?: string;
};

type GraphLink = {
  source: string;
  target: string;
  type: string;
};

// Type aliases for D3 simulation
type SimNode = GraphNode & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode> & { type: string };

export default function Scene01Introduction() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Load graph data from JSON
  const data = useMemo(() => {
    const nodes = (graphData.nodes as GraphNode[]).map((n) => ({ ...n }));
    const links = (graphData.links as GraphLink[]).map((l) => ({ ...l }));
    return { nodes, links };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(860, rect.width);
    const height = Math.max(400, rect.height);

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    // Create a container group for zoom/pan transformations
    const container = root.append('g').attr('class', 'zoom-container');

    // Add gradients and arrow markers with stunning colors
    const defs = root.append('defs');

    // Color palette from image with lighter satellite versions
    const gradients = [
      { id: 'hubGradient', colors: ['#244855', '#2d5a6b'] }, // Dark teal gradient for hub
      { id: 'pillarGradient', colors: ['#E64833', '#f05a42'] }, // Coral red gradient for pillars
      { id: 'subGradient', colors: ['#90AEAD', '#a5c3c2'] }, // Sage teal gradient for subs
      { id: 'hubSatelliteGradient', colors: ['#5a7d8a', '#7a9aa8'] }, // Lighter teal for hub satellites
      { id: 'pillarSatelliteGradient', colors: ['#f28b7a', '#f7a698'] }, // Lighter coral for pillar satellites
      { id: 'subSatelliteGradient', colors: ['#b8d4d3', '#cde3e2'] }, // Lighter sage for sub satellites
      { id: 'glowGradient', colors: ['#244855', '#2d5a6b', 'transparent'] }
    ];

    gradients.forEach(({ id, colors }) => {
      const gradient = defs.append('linearGradient')
        .attr('id', id)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      colors.forEach((color, i) => {
        gradient.append('stop')
          .attr('offset', `${(i / (colors.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });
    });

    const linkColors: Record<string, string> = {
      partOf: '#244855',
      contains: '#E64833',
      default: '#90AEAD',
    };

    Object.entries(linkColors).forEach(([type, color]) => {
      defs
        .append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 15)
        .attr('refY', 5)
        .attr('markerWidth', 2.5)
        .attr('markerHeight', 2.5)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M0,0 L10,5 L0,10 L3,5 Z')
        .attr('fill', color);
    });

    const simNodes = data.nodes.map((n) => ({ ...n })) as SimNode[];
    const simLinks = data.links.map((l) => ({ ...l })) as SimLink[];

    const simulation = d3
      .forceSimulation(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => {
            const source = d.source as SimNode;
            const target = d.target as SimNode;
            const s = source.group;
            const t = target.group;
            if (s === 'hub' || t === 'hub') return 255;
            if (s === 'pillar' && t === 'sub') return 173;
            return 210;
          }),
      )
      .force('charge', d3.forceManyBody().strength(-520))
      .force(
        'collide',
        d3.forceCollide().radius((d) => {
          const node = d as SimNode;
          if (node.group === 'hub') return 70;
          if (node.group === 'pillar') return 52;
          return 38;
        }),
      )
      .force('center', d3.forceCenter(width * 0.5, height * 0.5))
      .force('x', d3.forceX(width * 0.5).strength(0.05))
      .force('y', d3.forceY(height * 0.5).strength(0.05));

    // Add zoom and pan behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    root.call(zoom);

    // Set initial zoom to fit all content with padding
    const initialScale = 0.85;
    const initialTransform = d3.zoomIdentity
      .translate(width * 0.1, height * 0.08)
      .scale(initialScale);
    root.call(zoom.transform, initialTransform);

    // Double-click to reset zoom
    root.on('dblclick.zoom', () => {
      root.transition()
        .duration(750)
        .call(zoom.transform, initialTransform);
    });

    const linkGroup = container.append('g').attr('class', 'links');
    const nodeGroup = container.append('g').attr('class', 'nodes');
    const satelliteLayer = container.append('g').attr('class', 'satellites');

    // Draw links with dual-layer styling (base + overlay) like TreeChartWithPopovers
    const linkData = linkGroup
      .selectAll('g.link')
      .data(simLinks)
      .join('g')
      .attr('class', 'link');

    // Base layer (thicker, lighter color)
    linkData
      .append('path')
      .attr('class', 'link-base')
      .attr('fill', 'none')
      .attr('stroke', '#A4B6C1') // Light gray-blue base
      .attr('stroke-width', 20)
      .attr('opacity', 0.6)
      .attr('stroke-linecap', 'round');

    // Overlay layer (thinner, darker color based on type)
    const link = linkData
      .append('path')
      .attr('class', 'link-overlay')
      .attr('fill', 'none')
      .attr('stroke', (d) => linkColors[d.type] || linkColors.default)
      .attr('stroke-width', 12)
      .attr('opacity', 0.5)
      .attr('stroke-linecap', 'round');

    // Function to show satellites around a node with stunning styling
    function showSatellites(nodeData: SimNode) {
      // Clear any pending timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      satelliteLayer.selectAll('*').remove();
      const tooltip = tooltipRef.current;
      if (tooltip) tooltip.style.display = 'none';

      const wKeys = ['who', 'what', 'when', 'where', 'why', 'which', 'how'] as const;
      const present = wKeys.filter(k => nodeData[k] && nodeData[k]!.trim().length > 0);
      if (present.length === 0) return;

      // Calculate satellite distance from outer periphery of node's glow
      const nodeGlowRadius = nodeData.group === 'hub' ? 72 : nodeData.group === 'pillar' ? 56 : 44;
      const satelliteDistance = 30; // Distance from outer edge
      const satelliteRadius = nodeGlowRadius + satelliteDistance;
      const angleStep = (Math.PI * 2) / present.length;
      const cx = nodeData.x || width / 2;
      const cy = nodeData.y || height / 2;

      const satelliteData = present.map((k, i) => ({
        key: k,
        label: k,
        text: nodeData[k] || '',
        x: cx + satelliteRadius * Math.cos(i * angleStep - Math.PI / 2),
        y: cy + satelliteRadius * Math.sin(i * angleStep - Math.PI / 2)
      }));

      // Determine satellite gradient based on parent node
      const satelliteGradientId = nodeData.group === 'hub' ? 'hubSatelliteGradient' :
                                   nodeData.group === 'pillar' ? 'pillarSatelliteGradient' :
                                   'subSatelliteGradient';

      // Add connecting lines from node to satellites
      satelliteLayer.selectAll('line.satellite-connector')
        .data(satelliteData)
        .join('line')
        .attr('class', 'satellite-connector')
        .attr('x1', cx)
        .attr('y1', cy)
        .attr('x2', d => d.x)
        .attr('y2', d => d.y)
        .attr('stroke', `url(#${satelliteGradientId})`)
        .attr('stroke-width', 2)
        .attr('opacity', 0.4)
        .attr('stroke-dasharray', '4,4');

      const groups = satelliteLayer
        .selectAll('g.satellite')
        .data(satelliteData)
        .join('g')
        .attr('class', 'satellite')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer');

      // Add outer glow for satellites (same pattern as main nodes)
      groups
        .append('circle')
        .attr('r', 20)
        .attr('fill', `url(#${satelliteGradientId})`)
        .attr('opacity', 0.25);

      // Add satellite circles with lighter gradient (same pattern as main nodes)
      groups
        .append('circle')
        .attr('r', 16)
        .attr('fill', `url(#${satelliteGradientId})`)
        .attr('opacity', 0.85)
        .attr('stroke', (d) => {
          if (nodeData.group === 'hub') return '#3d5a66';
          if (nodeData.group === 'pillar') return '#d46b5c';
          return '#8bb0af';
        })
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0px 4px 8px rgba(36, 72, 85, 0.3))');

      // Add satellite labels with full word and smaller font
      groups
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('font-size', 9)
        .attr('font-weight', 700)
        .attr('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        .attr('fill', '#ffffff')
        .style('pointer-events', 'none')
        .style('text-shadow', '0px 1px 3px rgba(0,0,0,0.5)')
        .style('letter-spacing', '0.3px')
        .text(d => d.label.charAt(0).toUpperCase() + d.label.slice(1).toLowerCase());

      // Add hover handlers for satellites
      groups.on('mouseenter', (evt, d) => {
        // Cancel any pending hide
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        // Map keys to full questions
        const questionMap: Record<string, string> = {
          who: 'Who is involved?',
          what: 'What is it?',
          when: 'When does it occur?',
          where: 'Where does it happen?',
          why: 'Why does it matter?',
          which: 'Which options are available?',
          how: 'How does it work?'
        };

        const tooltip = tooltipRef.current;
        const containerElement = ref.current;
        if (!tooltip || !containerElement) return;

        const fullQuestion = questionMap[d.key] || d.key;
        tooltip.innerHTML = `<div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; color: #244855; margin-bottom: 10px; font-size: 13px; letter-spacing: 0.3px;">${fullQuestion}</div><div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #244855; font-weight: 400; font-size: 12px;">${d.text}</div>`;
        tooltip.style.display = 'block';

        // Calculate position relative to container
        const containerRect = containerElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const offset = 15;

        // Position relative to container, not viewport
        let tooltipLeft = evt.pageX - containerRect.left + offset;
        let tooltipTop = evt.pageY - containerRect.top + offset;

        // Ensure tooltip stays within container bounds
        const margin = 10;
        if (tooltipLeft + tooltipRect.width > containerRect.width - margin) {
          tooltipLeft = evt.pageX - containerRect.left - tooltipRect.width - offset;
        }
        if (tooltipTop + tooltipRect.height > containerRect.height - margin) {
          tooltipTop = evt.pageY - containerRect.top - tooltipRect.height - offset;
        }
        if (tooltipLeft < margin) {
          tooltipLeft = margin;
        }
        if (tooltipTop < margin) {
          tooltipTop = margin;
        }

        tooltip.style.left = tooltipLeft + 'px';
        tooltip.style.top = tooltipTop + 'px';

        // Scale up the satellite on hover
        d3.select(evt.currentTarget as any)
          .select('circle:nth-child(2)')
          .transition()
          .duration(200)
          .attr('r', 18);
      });

      groups.on('mouseleave', () => {
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';

        // Scale back down
        d3.selectAll('.satellite circle:nth-child(2)')
          .transition()
          .duration(200)
          .attr('r', 16);
      });

      // Add mouseenter/leave to satellite layer to keep it visible
      satelliteLayer.on('mouseenter', () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      });

      satelliteLayer.on('mouseleave', () => {
        hoverTimeoutRef.current = window.setTimeout(() => {
          satelliteLayer.selectAll('*').remove();
          const tooltip = tooltipRef.current;
          if (tooltip) tooltip.style.display = 'none';
        }, 100);
      });
    }

    // Add drag behavior for nodes
    const drag = d3.drag<SVGGElement, SimNode>()
      .on('start', function(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(this).style('cursor', 'grabbing');
        // Hide satellites and popover while dragging
        satelliteLayer.selectAll('*').remove();
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';
        const popover = popoverRef.current;
        if (popover) popover.style.display = 'none';
      })
      .on('drag', function(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', function(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d3.select(this).style('cursor', 'grab');
        // Keep nodes fixed after dragging
        // Uncomment the next two lines to release nodes after dragging
        // d.fx = null;
        // d.fy = null;
      });

    const node = nodeGroup
      .selectAll('g')
      .data(simNodes)
      .join('g')
      .style('cursor', 'grab')
      .call(drag)
      .on('mouseenter', function (event, d) {
        // Cancel any pending hide timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        d3.select(this).selectAll('circle').transition().duration(200).attr('r', function() {
          const currentR = parseFloat(d3.select(this).attr('r'));
          return currentR * 1.15;
        });

        const nodeData = d as SimNode;
        showSatellites(nodeData);

        // Show popover for main node - ensure it's always fully visible
        const popover = popoverRef.current;
        if (popover) {
          // Set content first to get accurate dimensions
          popover.innerHTML = `
            <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 15px; margin-bottom: 10px; letter-spacing: 0.3px; background: linear-gradient(135deg, #244855 0%, #E64833 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${nodeData.label}</div>
            <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #244855; font-weight: 400; font-size: 13px;">${nodeData.detail || ''}</div>
          `;

          popover.style.display = 'block';

          // Get SVG bounding box to calculate position
          const svgElement = svgRef.current;
          const containerElement = ref.current;
          if (svgElement && containerElement && nodeData.x !== undefined && nodeData.y !== undefined) {
            const svgRect = svgElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            const viewBox = svgElement.getAttribute('viewBox')?.split(' ').map(Number) || [0, 0, width, height];
            const scaleX = svgRect.width / viewBox[2];
            const scaleY = svgRect.height / viewBox[3];

            // Get current zoom transform
            const transform = d3.zoomTransform(svgElement);

            // Apply zoom transform to node coordinates
            const transformedX = transform.applyX(nodeData.x);
            const transformedY = transform.applyY(nodeData.y);

            // Calculate position relative to the container (not viewport)
            const nodeX = svgRect.left - containerRect.left + transformedX * scaleX;
            const nodeY = svgRect.top - containerRect.top + transformedY * scaleY;

            // Get popover dimensions (force reflow to get accurate size)
            const popoverRect = popover.getBoundingClientRect();
            const popoverWidth = popoverRect.width;
            const popoverHeight = popoverRect.height;

            // Calculate node radius in screen coordinates (accounting for zoom)
            const nodeRadius = nodeData.group === 'hub' ? 60 : nodeData.group === 'pillar' ? 44 : 32;
            const nodeRadiusScreen = nodeRadius * scaleX * transform.k;

            // Container dimensions with safe margins
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;
            const margin = 15; // Safe margin from edges
            const offset = 10; // Spacing from node

            // Try positioning to the right first
            let popoverLeft = nodeX + nodeRadiusScreen + offset;
            let popoverTop = nodeY - popoverHeight / 2; // Center vertically with node

            // Check if popover fits on the right side
            if (popoverLeft + popoverWidth > containerWidth - margin) {
              // Try left side
              popoverLeft = nodeX - nodeRadiusScreen - popoverWidth - offset;
            }

            // If still doesn't fit on left, clamp to safe area
            if (popoverLeft < margin) {
              popoverLeft = margin;
            }

            // Ensure it doesn't exceed right edge after clamping
            if (popoverLeft + popoverWidth > containerWidth - margin) {
              popoverLeft = Math.max(margin, containerWidth - popoverWidth - margin);
            }

            // Check vertical positioning - ensure it's within container
            if (popoverTop < margin) {
              popoverTop = margin;
            }
            if (popoverTop + popoverHeight > containerHeight - margin) {
              popoverTop = Math.max(margin, containerHeight - popoverHeight - margin);
            }

            popover.style.left = popoverLeft + 'px';
            popover.style.top = popoverTop + 'px';
          }
        }
      })
      .on('mouseleave', function (_, d) {
        const node = d as SimNode;
        d3.select(this).select('circle.glow').transition().duration(200).attr('r',
          node.group === 'hub' ? 72 : node.group === 'pillar' ? 56 : 44
        );
        d3.select(this).select('circle:not(.glow)').transition().duration(200).attr('r',
          node.group === 'hub' ? 60 : node.group === 'pillar' ? 44 : 32
        );

        // Hide popover
        const popover = popoverRef.current;
        if (popover) popover.style.display = 'none';

        // Delayed hide for satellites
        hoverTimeoutRef.current = window.setTimeout(() => {
          satelliteLayer.selectAll('*').remove();
          const tooltip = tooltipRef.current;
          if (tooltip) tooltip.style.display = 'none';
        }, 100);
      });

    // Add glow effect (larger transparent circle) with stunning gradients
    node
      .append('circle')
      .attr('class', 'glow')
      .attr('r', (d: SimNode) => {
        if (d.group === 'hub') return 72;
        if (d.group === 'pillar') return 56;
        return 44;
      })
      .attr('fill', (d: SimNode) => {
        if (d.group === 'hub') return 'url(#hubGradient)';
        if (d.group === 'pillar') return 'url(#pillarGradient)';
        return 'url(#subGradient)';
      })
      .attr('opacity', 0.25);

    // Add main node circle with same color as glow but more opaque
    node
      .append('circle')
      .attr('r', (d: SimNode) => {
        if (d.group === 'hub') return 60;
        if (d.group === 'pillar') return 44;
        return 32;
      })
      .attr('fill', (d: SimNode) => {
        if (d.group === 'hub') return 'url(#hubGradient)';
        if (d.group === 'pillar') return 'url(#pillarGradient)';
        return 'url(#subGradient)';
      })
      .attr('opacity', 0.85)
      .attr('stroke', (d: SimNode) => {
        if (d.group === 'hub') return '#1a3540';
        if (d.group === 'pillar') return '#b8361f';
        return '#6b8584';
      })
      .attr('stroke-width', (d: SimNode) => (d.group === 'hub' ? 4 : 3))
      .style('filter', 'drop-shadow(0px 6px 12px rgba(36, 72, 85, 0.4))');

    // Helper function to convert text to proper case (preserves acronyms)
    function toProperCase(text: string): string {
      return text
        .split(' ')
        .map((word) => {
          // Preserve all-caps words (acronyms like NAMCS, HC, HUD, NDI, EHR)
          if (word === word.toUpperCase() && word.length > 1) {
            return word;
          }
          // Convert to proper case
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    }

    // Helper function to wrap text
    function wrapText(text: string, maxCharsPerLine: number): string[] {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines;
    }

    node.each(function (d: SimNode) {
      const fontSize = d.group === 'hub' ? 14 : d.group === 'pillar' ? 13 : 11;
      const maxChars = d.group === 'hub' ? 12 : d.group === 'pillar' ? 10 : 9;
      const properCaseLabel = toProperCase(d.label);
      const lines = wrapText(properCaseLabel, maxChars);
      const lineHeight = 1.4;

      const textElement = d3
        .select(this)
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('font-size', fontSize)
        .attr('font-weight', d.group === 'sub' ? 700 : 800)
        .attr('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        .attr('fill', 'white')
        .style('pointer-events', 'none')
        .style('text-shadow', '0px 2px 6px rgba(0,0,0,0.5)')
        .style('letter-spacing', d.group === 'hub' ? '0.3px' : '0.2px');

      // Position each line with absolute y coordinates centered around 0
      lines.forEach((line, i) => {
        const y = (i - (lines.length - 1) / 2) * fontSize * lineHeight;
        textElement
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('y', y);
      });
    });

    // Curved path for links
    function curve(d: SimLink) {
      const source = d.source as SimNode;
      const target = d.target as SimNode;
      const dx = target.x! - source.x!;
      const dy = target.y! - source.y!;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.1;
      return `M${source.x},${source.y} A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
    }

    simulation.on('tick', () => {
      // Update both base and overlay link paths
      linkData.selectAll('path').attr('d', curve);
      node.attr('transform', (d: SimNode) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, rect.width, rect.height]);

  return (
    <div ref={ref} style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <svg ref={svgRef} width="100%" height="100%" style={{ flex: 1, minHeight: 0, cursor: 'move', overflow: 'hidden' }} />

      {/* Popover for main nodes */}
      <div
        ref={popoverRef}
        style={{
          position: 'absolute',
          display: 'none',
          background: 'linear-gradient(135deg, #ffffff 0%, #fef9f5 100%)',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #244855 0%, #E64833 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: '12px',
          padding: '16px 18px',
          fontSize: '13px',
          maxWidth: '320px',
          pointerEvents: 'none',
          boxShadow: '0 10px 40px rgba(36, 72, 85, 0.25), 0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1001
        }}
      />

      {/* Tooltip for satellites */}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          display: 'none',
          background: 'linear-gradient(135deg, #ffffff 0%, #fffcf8 100%)',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #FBE9D0 0%, #874F41 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: '10px',
          padding: '12px 14px',
          fontSize: '12px',
          maxWidth: '300px',
          pointerEvents: 'none',
          boxShadow: '0 8px 32px rgba(251, 233, 208, 0.35), 0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      />
    </div>
  );
}
