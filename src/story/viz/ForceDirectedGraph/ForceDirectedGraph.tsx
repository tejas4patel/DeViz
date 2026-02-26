import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '../useResizeObserver';
import {
  ForceDirectedGraphProps,
  SimNode,
  SimLink,
  GraphNode,
  NodeGroupConfig,
} from './types';
import {
  defaultLinkStyleConfig,
  defaultForceConfig,
  defaultSatelliteConfig,
  defaultZoomConfig,
  mergeConfig,
} from './defaults';
import '../../common-styles.css';
import './ForceDirectedGraph.css';

// TODO: Option B Enhancement - More className props for customization
// When implementing Option B, add these props to function signature:
// - className (container)
// - svgClassName (SVG element)
// - nodeClassName (node groups)
// - linkClassName (link groups)
// - satelliteClassName (satellite nodes)
// - styles object for inline style overrides
// This would allow fine-grained styling without overriding the entire CSS file.
// See types.ts for the full interface definition.

export default function ForceDirectedGraph({
  data,
  nodeGroupConfigs,
  linkStyleConfig,
  forceConfig,
  satelliteConfig,
  zoomConfig,
  minWidth = 860,
  minHeight = 400,
  enableDrag = true,
  enableZoom = true,
  enableSatellites = true,
  popoverClassName,
  tooltipClassName,
  onNodeClick,
  onNodeHover,
}: ForceDirectedGraphProps) {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const linkPopoverRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Merge configurations with defaults
  const linkConfig = mergeConfig(defaultLinkStyleConfig, linkStyleConfig);
  const forces = mergeConfig(defaultForceConfig, forceConfig);
  const satellites = mergeConfig(defaultSatelliteConfig, satelliteConfig);
  const zoom = mergeConfig(defaultZoomConfig, zoomConfig);

  // Prepare graph data
  const graphData = useMemo(() => {
    const nodes = data.nodes.map((n) => ({ ...n }));
    const links = data.links.map((l) => ({ ...l }));
    return { nodes, links };
  }, [data]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = Math.max(minWidth, rect.width);
    const height = Math.max(minHeight, rect.height);

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const root = d3.select(svg);
    root.selectAll('*').remove();

    // Create container for zoom/pan
    const container = root.append('g').attr('class', 'zoom-container');

    // Add gradients for all node groups
    const defs = root.append('defs');

    Object.entries(nodeGroupConfigs).forEach(([groupName, config]) => {
      // Main gradient
      const mainGradient = defs
        .append('linearGradient')
        .attr('id', `${groupName}Gradient`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      config.gradient.forEach((color, i) => {
        mainGradient
          .append('stop')
          .attr('offset', `${(i / (config.gradient.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });

      // Satellite gradient
      const satGradient = defs
        .append('linearGradient')
        .attr('id', `${groupName}SatelliteGradient`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      config.satelliteGradient.forEach((color, i) => {
        satGradient
          .append('stop')
          .attr('offset', `${(i / (config.satelliteGradient.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });
    });

    // Create simulation nodes and links
    const simNodes = graphData.nodes.map((n) => ({ ...n })) as SimNode[];
    const simLinks = graphData.links.map((l) => ({ ...l })) as SimLink[];

    // Setup force simulation
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
            return forces.linkDistance(source.group, target.group);
          })
      )
      .force('charge', d3.forceManyBody().strength(forces.chargeStrength))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d) => {
            const node = d as SimNode;
            const config = nodeGroupConfigs[node.group];
            return config ? config.collisionRadius : 50;
          })
          .strength(forces.collisionStrength)
          .iterations(forces.collisionIterations)
      )
      .force('center', d3.forceCenter(width * 0.5, height * 0.5))
      .force('x', d3.forceX(width * 0.5).strength(forces.centerStrength.x))
      .force('y', d3.forceY(height * 0.5).strength(forces.centerStrength.y));

    // Setup zoom if enabled
    if (enableZoom) {
      const zoomBehavior = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent(zoom.scaleExtent)
        .on('zoom', (event) => {
          container.attr('transform', event.transform);
        });

      root.call(zoomBehavior);

      const initialTransform = d3.zoomIdentity
        .translate(width * zoom.initialTranslate.x, height * zoom.initialTranslate.y)
        .scale(zoom.initialScale);
      root.call(zoomBehavior.transform, initialTransform);

      // Double-click to reset zoom
      root.on('dblclick.zoom', () => {
        root
          .transition()
          .duration(zoom.transitionDuration)
          .call(zoomBehavior.transform, initialTransform);
      });
    }

    const linkGroup = container.append('g').attr('class', 'links');
    const nodeGroup = container.append('g').attr('class', 'nodes');
    const satelliteLayer = container.append('g').attr('class', 'satellites');

    // Draw dual-layer links
    const linkData = linkGroup
      .selectAll('g.link')
      .data(simLinks)
      .join('g')
      .attr('class', 'link');

    // Base layer
    linkData
      .append('path')
      .attr('class', 'link-base')
      .attr('fill', 'none')
      .attr('stroke', linkConfig.baseColor)
      .attr('stroke-width', linkConfig.baseWidth)
      .attr('opacity', linkConfig.baseOpacity)
      .attr('stroke-linecap', 'round');

    // Overlay layer
    linkData
      .append('path')
      .attr('class', 'link-overlay')
      .attr('fill', 'none')
      .attr('stroke', (d) => linkConfig.colors[d.type || 'default'] || linkConfig.colors.default)
      .attr('stroke-width', linkConfig.overlayWidth)
      .attr('opacity', linkConfig.overlayOpacity)
      .attr('stroke-linecap', 'round');

    // Add invisible wider path for easier hover detection on links
    linkData
      .append('path')
      .attr('class', 'link-hover-target')
      .attr('fill', 'none')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .style('cursor', 'pointer');

    // Link hover handlers
    linkData
      .on('mouseenter', function (event, d) {
        const linkPopover = linkPopoverRef.current;
        const containerElement = ref.current;
        if (!linkPopover || !containerElement) return;

        // Hide other popovers
        const nodePopover = popoverRef.current;
        if (nodePopover) nodePopover.style.display = 'none';

        const source = d.source as SimNode;
        const target = d.target as SimNode;
        const relationship = d.relationship || d.type || 'connects to';
        const description = d.description || `${source.label} ${relationship.toLowerCase()} ${target.label}`;

        linkPopover.innerHTML = `
          <div class="force-directed-graph__link-popover-header">
            <span class="force-directed-graph__link-popover-source">${source.label}</span>
            <span class="force-directed-graph__link-popover-arrow">→</span>
            <span class="force-directed-graph__link-popover-target">${target.label}</span>
          </div>
          <div class="force-directed-graph__link-popover-relationship">${relationship}</div>
          <div class="force-directed-graph__link-popover-description">${description}</div>
        `;
        linkPopover.style.display = 'block';

        // Position the popover near the mouse
        const containerRect = containerElement.getBoundingClientRect();
        const popoverRect = linkPopover.getBoundingClientRect();
        const offset = 15;
        const margin = 10;

        let popoverLeft = event.clientX - containerRect.left + offset;
        let popoverTop = event.clientY - containerRect.top + offset;

        // Adjust if goes off screen
        if (popoverLeft + popoverRect.width > containerRect.width - margin) {
          popoverLeft = event.clientX - containerRect.left - popoverRect.width - offset;
        }
        if (popoverTop + popoverRect.height > containerRect.height - margin) {
          popoverTop = event.clientY - containerRect.top - popoverRect.height - offset;
        }
        if (popoverLeft < margin) popoverLeft = margin;
        if (popoverTop < margin) popoverTop = margin;

        linkPopover.style.left = popoverLeft + 'px';
        linkPopover.style.top = popoverTop + 'px';

        // Highlight the link
        d3.select(this)
          .select('.link-overlay')
          .transition()
          .duration(200)
          .attr('stroke-width', linkConfig.overlayWidth * 2)
          .attr('opacity', 1);

        d3.select(this)
          .select('.link-base')
          .transition()
          .duration(200)
          .attr('stroke-width', linkConfig.baseWidth * 1.5);
      })
      .on('mousemove', function (event) {
        const linkPopover = linkPopoverRef.current;
        const containerElement = ref.current;
        if (!linkPopover || !containerElement) return;

        const containerRect = containerElement.getBoundingClientRect();
        const popoverRect = linkPopover.getBoundingClientRect();
        const offset = 15;
        const margin = 10;

        let popoverLeft = event.clientX - containerRect.left + offset;
        let popoverTop = event.clientY - containerRect.top + offset;

        if (popoverLeft + popoverRect.width > containerRect.width - margin) {
          popoverLeft = event.clientX - containerRect.left - popoverRect.width - offset;
        }
        if (popoverTop + popoverRect.height > containerRect.height - margin) {
          popoverTop = event.clientY - containerRect.top - popoverRect.height - offset;
        }
        if (popoverLeft < margin) popoverLeft = margin;
        if (popoverTop < margin) popoverTop = margin;

        linkPopover.style.left = popoverLeft + 'px';
        linkPopover.style.top = popoverTop + 'px';
      })
      .on('mouseleave', function () {
        const linkPopover = linkPopoverRef.current;
        if (linkPopover) linkPopover.style.display = 'none';

        // Reset link style
        d3.select(this)
          .select('.link-overlay')
          .transition()
          .duration(200)
          .attr('stroke-width', linkConfig.overlayWidth)
          .attr('opacity', linkConfig.overlayOpacity);

        d3.select(this)
          .select('.link-base')
          .transition()
          .duration(200)
          .attr('stroke-width', linkConfig.baseWidth);
      });

    // Function to show satellites
    function showSatellites(nodeData: SimNode) {
      if (!enableSatellites) return;

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      satelliteLayer.selectAll('*').remove();
      const tooltip = tooltipRef.current;
      if (tooltip) tooltip.style.display = 'none';

      const present = satellites.keys.filter(
        (k) => nodeData[k] && String(nodeData[k]).trim().length > 0
      );
      if (present.length === 0) return;

      const nodeConfig = nodeGroupConfigs[nodeData.group];
      if (!nodeConfig) return;

      const satelliteRadius = nodeConfig.glowRadius + satellites.distance;
      const angleStep = (Math.PI * 2) / present.length;
      const cx = nodeData.x || width / 2;
      const cy = nodeData.y || height / 2;

      const satelliteData = present.map((k, i) => ({
        key: k,
        label: k,
        text: String(nodeData[k] || ''),
        x: cx + satelliteRadius * Math.cos(i * angleStep - Math.PI / 2),
        y: cy + satelliteRadius * Math.sin(i * angleStep - Math.PI / 2),
      }));

      const satelliteGradientId = `${nodeData.group}SatelliteGradient`;

      // Connecting lines
      satelliteLayer
        .selectAll('line.satellite-connector')
        .data(satelliteData)
        .join('line')
        .attr('class', 'satellite-connector')
        .attr('x1', cx)
        .attr('y1', cy)
        .attr('x2', (d) => d.x)
        .attr('y2', (d) => d.y)
        .attr('stroke', `url(#${satelliteGradientId})`)
        .attr('stroke-width', satellites.strokeWidth)
        .attr('opacity', 0.4)
        .attr('stroke-dasharray', '4,4');

      const groups = satelliteLayer
        .selectAll('g.satellite')
        .data(satelliteData)
        .join('g')
        .attr('class', 'satellite')
        .attr('transform', (d) => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer');

      // Satellite glow
      groups
        .append('circle')
        .attr('r', satellites.glowRadius)
        .attr('fill', `url(#${satelliteGradientId})`)
        .attr('opacity', 0.25);

      // Satellite circle
      groups
        .append('circle')
        .attr('r', satellites.radius)
        .attr('fill', `url(#${satelliteGradientId})`)
        .attr('opacity', 0.85)
        .attr('stroke', nodeConfig.stroke)
        .attr('stroke-width', satellites.strokeWidth)
        .style('filter', 'drop-shadow(0px 4px 8px rgba(36, 72, 85, 0.3))');

      // Satellite labels
      groups
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('font-size', satellites.fontSize)
        .attr('font-weight', 700)
        .attr('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        .attr('fill', '#ffffff')
        .style('pointer-events', 'none')
        .style('text-shadow', '0px 1px 3px rgba(0,0,0,0.5)')
        .style('letter-spacing', '0.3px')
        .text((d) => d.label.charAt(0).toUpperCase() + d.label.slice(1).toLowerCase());

      // Satellite hover handlers
      groups.on('mouseenter', (evt, d) => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        const tooltip = tooltipRef.current;
        const containerElement = ref.current;
        if (!tooltip || !containerElement) return;

        const fullQuestion = satellites.questionMap[d.key] || d.key;
        tooltip.innerHTML = `
          <div class="force-directed-graph__tooltip-question">${fullQuestion}</div>
          <div class="force-directed-graph__tooltip-answer">${d.text}</div>
        `;
        tooltip.style.display = 'block';

        const containerRect = containerElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const offset = 15;
        const margin = 10;

        let tooltipLeft = evt.clientX - containerRect.left + offset;
        let tooltipTop = evt.clientY - containerRect.top + offset;

        if (tooltipLeft + tooltipRect.width > containerRect.width - margin) {
          tooltipLeft = evt.clientX - containerRect.left - tooltipRect.width - offset;
        }
        if (tooltipTop + tooltipRect.height > containerRect.height - margin) {
          tooltipTop = evt.clientY - containerRect.top - tooltipRect.height - offset;
        }
        if (tooltipLeft < margin) tooltipLeft = margin;
        if (tooltipTop < margin) tooltipTop = margin;

        tooltip.style.left = tooltipLeft + 'px';
        tooltip.style.top = tooltipTop + 'px';

        d3.select(evt.currentTarget as any)
          .select('circle:nth-child(2)')
          .transition()
          .duration(200)
          .attr('r', satellites.radius + 2);
      });

      groups.on('mouseleave', () => {
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';

        d3.selectAll('.satellite circle:nth-child(2)')
          .transition()
          .duration(200)
          .attr('r', satellites.radius);
      });

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

    // Drag behavior
    const drag = d3
      .drag<SVGGElement, SimNode>()
      .on('start', function (event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(this).style('cursor', 'grabbing');
        satelliteLayer.selectAll('*').remove();
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';
        const popover = popoverRef.current;
        if (popover) popover.style.display = 'none';
      })
      .on('drag', function (event, d) {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', function (event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d3.select(this).style('cursor', 'grab');
      });

    // Create nodes
    const node = nodeGroup
      .selectAll('g')
      .data(simNodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', enableDrag ? 'grab' : 'pointer');

    if (enableDrag) {
      node.call(drag);
    }

    // Node interaction handlers
    node
      .on('mouseenter', function (event, d) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        d3.select(this)
          .selectAll('circle')
          .transition()
          .duration(200)
          .attr('r', function () {
            const currentR = parseFloat(d3.select(this).attr('r'));
            return currentR * 1.15;
          });

        const nodeData = d as SimNode;
        showSatellites(nodeData);

        if (onNodeHover) onNodeHover(nodeData);

        // Show popover
        const popover = popoverRef.current;
        if (popover && nodeData.detail) {
          popover.innerHTML = `
            <div class="force-directed-graph__popover-title">${nodeData.label}</div>
            <div class="force-directed-graph__popover-content">${nodeData.detail}</div>
          `;
          popover.style.display = 'block';

          const containerElement = ref.current;
          if (containerElement) {
            const containerRect = containerElement.getBoundingClientRect();
            const popoverRect = popover.getBoundingClientRect();
            const offset = 15;
            const margin = 10;

            let popoverLeft = event.clientX - containerRect.left + offset;
            let popoverTop = event.clientY - containerRect.top + offset;

            // Adjust if goes off screen
            if (popoverLeft + popoverRect.width > containerRect.width - margin) {
              popoverLeft = event.clientX - containerRect.left - popoverRect.width - offset;
            }
            if (popoverTop + popoverRect.height > containerRect.height - margin) {
              popoverTop = event.clientY - containerRect.top - popoverRect.height - offset;
            }
            if (popoverLeft < margin) popoverLeft = margin;
            if (popoverTop < margin) popoverTop = margin;

            popover.style.left = popoverLeft + 'px';
            popover.style.top = popoverTop + 'px';
          }
        }
      })
      .on('mousemove', function (event, d) {
        const popover = popoverRef.current;
        const containerElement = ref.current;
        const nodeData = d as SimNode;
        
        if (popover && nodeData.detail && containerElement) {
          const containerRect = containerElement.getBoundingClientRect();
          const popoverRect = popover.getBoundingClientRect();
          const offset = 15;
          const margin = 10;

          let popoverLeft = event.clientX - containerRect.left + offset;
          let popoverTop = event.clientY - containerRect.top + offset;

          // Adjust if goes off screen
          if (popoverLeft + popoverRect.width > containerRect.width - margin) {
            popoverLeft = event.clientX - containerRect.left - popoverRect.width - offset;
          }
          if (popoverTop + popoverRect.height > containerRect.height - margin) {
            popoverTop = event.clientY - containerRect.top - popoverRect.height - offset;
          }
          if (popoverLeft < margin) popoverLeft = margin;
          if (popoverTop < margin) popoverTop = margin;

          popover.style.left = popoverLeft + 'px';
          popover.style.top = popoverTop + 'px';
        }
      })
      .on('mouseleave', function (_, d) {
        const nodeData = d as SimNode;
        const nodeConfig = nodeGroupConfigs[nodeData.group];

        if (nodeConfig) {
          d3.select(this)
            .select('circle.glow')
            .transition()
            .duration(200)
            .attr('r', nodeConfig.glowRadius);
          d3.select(this)
            .select('circle:not(.glow)')
            .transition()
            .duration(200)
            .attr('r', nodeConfig.radius);
        }

        const popover = popoverRef.current;
        if (popover) popover.style.display = 'none';

        if (onNodeHover) onNodeHover(null);

        hoverTimeoutRef.current = window.setTimeout(() => {
          satelliteLayer.selectAll('*').remove();
          const tooltip = tooltipRef.current;
          if (tooltip) tooltip.style.display = 'none';
        }, 100);
      })
      .on('click', (_, d) => {
        if (onNodeClick) onNodeClick(d as GraphNode);
      });

    // Draw node circles
    node.each(function (d) {
      const nodeData = d as SimNode;
      const config = nodeGroupConfigs[nodeData.group];
      if (!config) return;

      const nodeGroup = d3.select(this);

      // Glow circle
      nodeGroup
        .append('circle')
        .attr('class', 'glow')
        .attr('r', config.glowRadius)
        .attr('fill', `url(#${nodeData.group}Gradient)`)
        .attr('opacity', 0.25);

      // Main circle
      nodeGroup
        .append('circle')
        .attr('r', config.radius)
        .attr('fill', `url(#${nodeData.group}Gradient)`)
        .attr('opacity', 0.85)
        .attr('stroke', config.stroke)
        .attr('stroke-width', 3)
        .style('filter', 'drop-shadow(0px 6px 12px rgba(36, 72, 85, 0.4))');

      // Text label
      const words = nodeData.label.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= config.maxChars) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);

      const textElement = nodeGroup
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('font-size', config.fontSize)
        .attr('font-weight', 800)
        .attr('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        .attr('fill', 'white')
        .style('pointer-events', 'none')
        .style('text-shadow', '0px 2px 6px rgba(0,0,0,0.5)')
        .style('letter-spacing', '0.3px');

      lines.forEach((line, i) => {
        const y = (i - (lines.length - 1) / 2) * config.fontSize * 1.4;
        textElement.append('tspan').text(line).attr('x', 0).attr('y', y);
      });
    });

    // Curved path function
    function curve(d: SimLink) {
      const source = d.source as SimNode;
      const target = d.target as SimNode;
      const dx = target.x! - source.x!;
      const dy = target.y! - source.y!;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.1;
      return `M${source.x},${source.y} A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
    }

    // Simulation tick
    simulation.on('tick', () => {
      linkData.selectAll('path').attr('d', curve);
      node.attr('transform', (d: SimNode) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [
    graphData,
    nodeGroupConfigs,
    linkConfig,
    forces,
    satellites,
    zoom,
    rect.width,
    rect.height,
    minWidth,
    minHeight,
    enableDrag,
    enableZoom,
    enableSatellites,
    onNodeClick,
    onNodeHover,
  ]);

  // TODO: Option B Enhancement - Apply additional className props
  // When implementing Option B, merge additional className props here:
  // const containerClass = className
  //   ? `force-directed-graph ${className}`
  //   : 'force-directed-graph';
  // const svgClass = svgClassName
  //   ? `force-directed-graph__svg ${svgClassName}`
  //   : 'force-directed-graph__svg';
  // Also apply nodeClassName, linkClassName, satelliteClassName in the D3 code above

  const popoverClass = popoverClassName
    ? `force-directed-graph__popover ${popoverClassName}`
    : 'force-directed-graph__popover';
  const tooltipClass = tooltipClassName
    ? `force-directed-graph__tooltip ${tooltipClassName}`
    : 'force-directed-graph__tooltip';

  return (
    <div ref={ref} className="force-directed-graph" style={{ minHeight }}>
      <svg ref={svgRef} width="100%" height="100%" className="force-directed-graph__svg" />
      <div ref={popoverRef} className={popoverClass} />
      <div ref={linkPopoverRef} className="force-directed-graph__link-popover" />
      <div ref={tooltipRef} className={tooltipClass} />
    </div>
  );
}
