import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { USMapProps, FQHCSite } from './types';
import {
  defaultMapStyleConfig,
  defaultProjectionConfig,
  defaultTooltipConfig,
  defaultZoomConfig,
  defaultChoroplethConfig,
} from './defaults';
import '../../common-styles.css';
import './USMap.css';

export default function USMap({
  data,
  topology,
  countyTopology,
  countyData,
  choroplethConfig = {},
  mapStyleConfig = {},
  projectionConfig = {},
  tooltipConfig = {},
  zoomConfig = {},
  width = 960,
  height = 600,
  minWidth = 800,
  minHeight = 500,
  enableZoom = true,
  enableTooltip = true,
  onSiteClick,
  onSiteHover,
  className = '',
  tooltipClassName = '',
}: USMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const zoomBehaviorRef = useRef<any>(null);
  const currentZoomScale = useRef<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Merge configs with defaults
  const styleConfig = { ...defaultMapStyleConfig, ...mapStyleConfig };
  const projConfig = { ...defaultProjectionConfig, ...projectionConfig };
  const tipConfig = { ...defaultTooltipConfig, ...tooltipConfig };
  const zConfig = { ...defaultZoomConfig, ...zoomConfig };
  const chorConfig = { ...defaultChoroplethConfig, ...choroplethConfig };

  // Zoom control handlers
  const handleZoomIn = () => {
    if (zoomBehaviorRef.current) {
      const { svg, zoom } = zoomBehaviorRef.current;
      svg.transition().duration(300).call(zoom.scaleBy, 1.5);
    }
  };

  const handleZoomOut = () => {
    if (zoomBehaviorRef.current) {
      const { svg, zoom } = zoomBehaviorRef.current;
      svg.transition().duration(300).call(zoom.scaleBy, 0.67);
    }
  };

  const handleResetZoom = () => {
    if (zoomBehaviorRef.current) {
      const { svg, zoom } = zoomBehaviorRef.current;
      svg
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity);
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    try {
      const svg = d3.select(svgRef.current);
      const tooltip = tooltipRef.current ? d3.select(tooltipRef.current) : null;

      // Clear previous content
      svg.selectAll('*').remove();

      // Create main group for zoom
      const g = svg.append('g').attr('class', 'us-map__main-group');

      // Setup projection
      const projection = d3
        .geoAlbersUsa()
        .scale(projConfig.scale || 1000)
        .translate(projConfig.translate || [width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      // Render county choropleth if data provided
      if (countyTopology && countyData && chorConfig.enabled) {
        const countiesFeature = feature(
          countyTopology,
          countyTopology.objects.counties as GeometryCollection
        );

        // Create color scale for poverty rates
        const colorScale = d3
          .scaleQuantize<string>()
          .domain([chorConfig.minValue || 0, chorConfig.maxValue || 25])
          .range(chorConfig.colorScheme || defaultChoroplethConfig.colorScheme!);

        g.append('g')
          .attr('class', 'us-map__counties')
          .selectAll('path')
          .data(countiesFeature.features)
          .join('path')
          .attr('class', 'us-map__county')
          .attr('d', path)
          .attr('fill', (d: any) => {
            const fips = d.id;
            const county = countyData[fips];
            return county ? colorScale(county.povertyRate) : '#e2e8f0';
          })
          .attr('opacity', chorConfig.opacity || 0.7)
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.25);
      }

      // Render map using topology prop
      const statesFeature = feature(
        topology,
        topology.objects.states as GeometryCollection
      );

        // Render states
        g.append('g')
          .attr('class', 'us-map__states')
          .selectAll('path')
          .data(statesFeature.features)
          .join('path')
          .attr('class', 'us-map__state')
          .attr('d', path)
          .attr('fill', countyTopology && countyData && chorConfig.enabled ? 'none' : styleConfig.stateFill)
          .attr('stroke', styleConfig.stateStroke)
          .attr('stroke-width', countyTopology && countyData && chorConfig.enabled ? 1.5 : styleConfig.stateStrokeWidth)
          .on('mouseenter', function () {
            if (styleConfig.stateHoverFill && !(countyTopology && countyData && chorConfig.enabled)) {
              d3.select(this).attr('fill', styleConfig.stateHoverFill);
            }
          })
          .on('mouseleave', function () {
            if (!(countyTopology && countyData && chorConfig.enabled)) {
              d3.select(this).attr('fill', styleConfig.stateFill);
            }
          });

        // Render FQHC sites
        const pointsGroup = g.append('g').attr('class', 'us-map__points');

        // Pre-compute projected coordinates once per site (avoids 4 projection calls per point)
        const projectedSites = data.sites
          .map(site => {
            const proj = projection(site.coordinates);
            return proj ? { site, px: proj[0], py: proj[1] } : null;
          })
          .filter((d): d is { site: FQHCSite; px: number; py: number } => d !== null);

        // Render invisible larger hit areas first
        const hitRadius = 8; // Larger hit area for better hover detection
        pointsGroup
          .selectAll('circle.us-map__point-hit')
          .data(projectedSites)
          .join('circle')
          .attr('class', 'us-map__point-hit')
          .attr('cx', d => d.px)
          .attr('cy', d => d.py)
          .attr('r', hitRadius)
          .attr('data-target-r', hitRadius)
          .attr('fill', 'transparent')
          .attr('opacity', 0)
          .style('cursor', 'pointer')
          .on('mouseenter', function (event: MouseEvent, d: { site: FQHCSite; px: number; py: number }) {
            const scale = currentZoomScale.current;
            const index = projectedSites.indexOf(d);
            const visibleCircle = d3.select(pointsGroup.selectAll('circle.us-map__point').nodes()[index]);

            // Hover effect on visible point
            if (styleConfig.pointHoverRadius) {
              visibleCircle
                .attr('r', styleConfig.pointHoverRadius / scale)
                .attr('data-target-r', styleConfig.pointHoverRadius);
            }
            if (styleConfig.pointHoverOpacity !== undefined) {
              visibleCircle.attr('opacity', styleConfig.pointHoverOpacity);
            }
            visibleCircle.attr('stroke-width', 2.5 / scale).attr('stroke', '#2d3748');

            // Show tooltip
            if (enableTooltip && tooltip) {
              tooltip
                .style('opacity', '1')
                .classed('us-map__tooltip--visible', true)
                .html(
                  `
                  <div class="us-map__tooltip-content">
                    <div class="us-map__tooltip-name">${d.site.name}</div>
                    <div class="us-map__tooltip-detail">${d.site.address}</div>
                    <div class="us-map__tooltip-detail">${d.site.county}, ${d.site.state}</div>
                  </div>
                `
                );
            }

            // Callback
            if (onSiteHover) {
              onSiteHover(d.site);
            }
          })
          .on('mousemove', function (event: MouseEvent) {
            // Position tooltip near cursor
            if (enableTooltip && tooltip && svgRef.current?.parentElement) {
              const containerElement = svgRef.current.parentElement;
              const containerRect = containerElement.getBoundingClientRect();
              const tooltipNode = tooltip.node() as HTMLDivElement;
              
              if (tooltipNode) {
                const tooltipRect = tooltipNode.getBoundingClientRect();
                const offset = 15;
                const margin = 10;

                let tooltipLeft = event.pageX - containerRect.left + offset;
                let tooltipTop = event.pageY - containerRect.top - offset;

                // Adjust if goes off screen
                if (tooltipLeft + tooltipRect.width > containerRect.width - margin) {
                  tooltipLeft = event.pageX - containerRect.left - tooltipRect.width - offset;
                }
                if (tooltipTop < margin) {
                  tooltipTop = event.pageY - containerRect.top + offset;
                }
                if (tooltipLeft < margin) tooltipLeft = margin;

                tooltip
                  .style('left', `${tooltipLeft}px`)
                  .style('top', `${tooltipTop}px`);
              }
            }
          })
          .on('mouseleave', function (event: MouseEvent, d: { site: FQHCSite; px: number; py: number }) {
            const scale = currentZoomScale.current;
            const index = projectedSites.indexOf(d);
            const visibleCircle = d3.select(pointsGroup.selectAll('circle.us-map__point').nodes()[index]);

            // Reset visible point
            visibleCircle
              .attr('r', styleConfig.pointRadius / scale)
              .attr('data-target-r', styleConfig.pointRadius)
              .attr('opacity', styleConfig.pointOpacity)
              .attr('stroke-width', 1.5 / scale)
              .attr('stroke', '#718096');

            // Hide tooltip
            if (enableTooltip && tooltip) {
              tooltip.style('opacity', '0').classed('us-map__tooltip--visible', false);
            }

            // Callback
            if (onSiteHover) {
              onSiteHover(null);
            }
          })
          .on('click', function (event: MouseEvent, d: { site: FQHCSite; px: number; py: number }) {
            if (onSiteClick) {
              onSiteClick(d.site);
            }
          });

        // Render visible styled circles (no events - handled by hit areas above)
        pointsGroup
          .selectAll('circle.us-map__point')
          .data(projectedSites)
          .join('circle')
          .attr('class', 'us-map__point')
          .attr('cx', d => d.px)
          .attr('cy', d => d.py)
          .attr('r', styleConfig.pointRadius)
          .attr('data-target-r', styleConfig.pointRadius)
          .attr('fill', styleConfig.pointColor)
          .attr('opacity', styleConfig.pointOpacity)
          .attr('stroke', '#718096')
          .attr('stroke-width', 1.5)
          .style('pointer-events', 'none'); // Don't capture events - let hit areas handle it

      // Setup zoom
      if (enableZoom) {
        const zoom = d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent(zConfig.scaleExtent || [1, 8])
          .translateExtent(
            zConfig.translateExtent || [
              [-100, -100],
              [width + 100, height + 100],
            ]
          )
          .on('zoom', (event) => {
            const scale = event.transform.k;
            currentZoomScale.current = scale;

            g.attr('transform', event.transform.toString());

            // Counter-scale all circles (both hit areas and visible circles) to maintain constant visual size
            pointsGroup.selectAll('circle')
              .attr('r', function() {
                const currentR = parseFloat(d3.select(this).attr('data-target-r') || styleConfig.pointRadius.toString());
                return currentR / scale;
              });

            // Counter-scale stroke-width only on visible circles
            pointsGroup.selectAll('circle.us-map__point')
              .attr('stroke-width', 1.5 / scale);
          });

        svg.call(zoom);
        zoomBehaviorRef.current = { zoom, svg, g };
      }
    } catch (err) {
      console.error('Error rendering map:', err);
      setError('Failed to render map');
    }
  }, [
    data,
    topology,
    countyTopology,
    countyData,
    width,
    height,
    styleConfig,
    projConfig,
    tipConfig,
    zConfig,
    chorConfig,
    enableZoom,
    enableTooltip,
    onSiteClick,
    onSiteHover,
  ]);

  if (error) {
    return <div className="us-map__error">{error}</div>;
  }

  return (
    <div className={`us-map ${className}`.trim()}>
      {enableZoom && (
        <div className="us-map__zoom-controls">
          <button
            className="us-map__zoom-button"
            onClick={handleZoomIn}
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            className="us-map__zoom-button"
            onClick={handleZoomOut}
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
          <div className="us-map__zoom-divider" />
          <button
            className="us-map__zoom-button"
            onClick={handleResetZoom}
            title="Reset zoom"
            aria-label="Reset zoom"
            style={{ fontSize: '14px' }}
          >
            ⟲
          </button>
        </div>
      )}
      <svg
        ref={svgRef}
        className="us-map__svg"
        width={width}
        height={height}
        style={{
          minWidth: `${minWidth}px`,
          minHeight: `${minHeight}px`,
          backgroundColor: styleConfig.backgroundColor,
        }}
      />
      {enableTooltip && (
        <div
          ref={tooltipRef}
          className={`us-map__tooltip ${tooltipClassName}`.trim()}
          style={{
            backgroundColor: tipConfig.backgroundColor,
            color: tipConfig.textColor,
            border: `1px solid ${tipConfig.borderColor}`,
            borderRadius: tipConfig.borderRadius,
            padding: tipConfig.padding,
            fontSize: tipConfig.fontSize,
          }}
        />
      )}
      {countyTopology && countyData && chorConfig.enabled && (
        <div className="us-map__legend">
          <div className="us-map__legend-title">County Poverty Rate (%)</div>
          <div className="us-map__legend-scale">
            {chorConfig.colorScheme?.map((color, i) => {
              const minVal = chorConfig.minValue || 0;
              const maxVal = chorConfig.maxValue || 25;
              const step = (maxVal - minVal) / (chorConfig.colorScheme?.length || 1);
              const value = minVal + step * i;
              return (
                <div key={i} className="us-map__legend-item">
                  <div
                    className="us-map__legend-color"
                    style={{ backgroundColor: color }}
                  />
                  <div className="us-map__legend-label">{value.toFixed(0)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
