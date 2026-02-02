import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import TimelinePopover from './TimelinePopover';

const UShapedFlowLine = ({ config = {} }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [popover, setPopover] = useState({ visible: false, node: null, x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);
  const isMouseOverPopoverRef = useRef(false);
  const currentNodeRef = useRef(null);

  const events = config.events || [];

  // Function to format date as Mon-DD (e.g., "Sep-19", "Oct-01")
  // Replace the formatDate function in UShapedFlowLine.jsx
  const formatDate = (dateString) => {
    // Split the date string to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[month - 1]; // month is 1-indexed in the string
    const dayFormatted = String(day).padStart(2, '0');
    return `${monthName}-${dayFormatted}`;
  };


  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = 220;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0) return;

    const { width, height } = dimensions;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const linkStrokeWidth = isMobile ? 16 : isTablet ? 20 : 24;
    const linkOverlayWidth = isMobile ? 10 : isTablet ? 12 : 16;
    const nodeRadius = isMobile ? 8 : isTablet ? 10 : 12;
    const glowRadius = isMobile ? 15 : isTablet ? 18 : 21; // Reduced by 25%


    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 5, right: 40, bottom: 15, left: 40 }; 
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const lineLength = innerWidth * 0.85;
    const verticalSpacing = innerHeight / 4;
    const radius = verticalSpacing / 2;
    const startX = (innerWidth - lineLength) / 2;

    const y1 = verticalSpacing;
    const y2 = y1 + verticalSpacing;
    const y3 = y2 + verticalSpacing;

    const pathData = `
      M ${startX} ${y1}
      L ${startX + lineLength} ${y1}
      A ${radius} ${radius} 0 0 1 ${startX + lineLength} ${y2}
      L ${startX} ${y2}
      A ${radius} ${radius} 0 0 0 ${startX} ${y3}
      L ${startX + lineLength} ${y3}
    `.trim();

    const linkGroup = g.append('g').attr('class', 'link');

    linkGroup.append('path')
      .attr('class', 'link-base')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', '#A4B6C1')
      .attr('stroke-width', linkStrokeWidth)
      .attr('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    linkGroup.append('path')
      .attr('class', 'link-overlay')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', '#2E598F')
      .attr('stroke-width', linkOverlayWidth)
      .attr('opacity', 0.5)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    if (events.length === 0) {
      return;
    }

    const calculateNodePositions = () => {
      const positions = [];
      const totalEvents = events.length;
      const eventsPerLine = Math.ceil(totalEvents / 3);

      events.forEach((event, i) => {
        const lineIndex = Math.floor(i / eventsPerLine);
        const positionInLine = i % eventsPerLine;
        const totalInLine = Math.min(eventsPerLine, totalEvents - lineIndex * eventsPerLine);

        let x, y;

        if (lineIndex === 0) {
          const fraction = totalInLine > 1 ? positionInLine / (totalInLine - 1) : 0.5;
          x = startX + lineLength * fraction;
          y = y1;
        } else if (lineIndex === 1) {
          const fraction = totalInLine > 1 ? positionInLine / (totalInLine - 1) : 0.5;
          x = startX + lineLength - lineLength * fraction;
          y = y2;
        } else {
          const fraction = totalInLine > 1 ? positionInLine / (totalInLine - 1) : 0.5;
          x = startX + lineLength * fraction;
          y = y3;
        }

        positions.push({ x, y, event, index: i });
      });

      return positions;
    };

    const nodePositions = calculateNodePositions();

    const getNodeColor = (event) => {
      const type = event.type?.toLowerCase() || '';
      if (type === 'shutdown') return '#B22234';
      if (type === 'economic') return '#3C3B6E';
      if (type === 'political') return '#0A3161';
      return '#6B7280';
    };

    const nodesGroup = g.append('g').attr('class', 'nodes');

    const nodes = nodesGroup.selectAll('.event-node')
      .data(nodePositions)
      .enter()
      .append('g')
      .attr('class', 'event-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer');

    nodes.append('circle')
      .attr('r', glowRadius)
      .attr('fill', d => getNodeColor(d.event))
      .attr('opacity', 0.15);

    nodes.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', d => getNodeColor(d.event))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9);

    // Date labels under nodes in Mon-DD format
    nodes.append('text')
      .attr('y', nodeRadius + 16)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'Roboto, sans-serif')
      .attr('fill', '#64748B')
      .attr('font-weight', '500')
      .text(d => formatDate(d.event.date));

    nodes.on('mouseenter', function(event, d) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      currentNodeRef.current = d;

      d3.select(this).select('circle:last-child')
        .transition()
        .duration(200)
        .attr('r', nodeRadius + 3)
        .attr('opacity', 1);

      const rect = event.currentTarget.getBoundingClientRect();

      setPopover({
        visible: true,
        node: {
          date: formatDate(d.event.date),
          label: d.event.label,           // Changed from 'name'
          note: d.event.note,              // Changed from 'description'
          type: d.event.type,
          key_names: d.event.key_names || [],
          bullets: d.event.bullets || [],  // ADDED
          cost: d.event.cost || null       // ADDED
        },
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    })
    .on('mouseleave', function(event, d) {
      d3.select(this).select('circle:last-child')
        .transition()
        .duration(200)
        .attr('r', nodeRadius)
        .attr('opacity', 0.9);

      hoverTimeoutRef.current = setTimeout(() => {
        if (!isMouseOverPopoverRef.current) {
          setPopover(prev => ({ ...prev, visible: false }));
          currentNodeRef.current = null;
        }
      }, 300);
    });

  }, [dimensions, events]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handlePopoverMouseEnter = () => {
    isMouseOverPopoverRef.current = true;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    isMouseOverPopoverRef.current = false;
    hoverTimeoutRef.current = setTimeout(() => {
      setPopover(prev => ({ ...prev, visible: false }));
      currentNodeRef.current = null;
    }, 300);
  };

  return (
    <div ref={containerRef} style={{ 
      width: '100%', 
      height: '220px',
      position: 'relative',
      marginTop: '0',
      paddingTop: '0'
    }}>
      <svg ref={svgRef} />
      {popover.visible && popover.node && (
        <TimelinePopover
          node={popover.node}
          x={popover.x}
          y={popover.y}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        />
      )}
    </div>
  );
};

export default UShapedFlowLine;
