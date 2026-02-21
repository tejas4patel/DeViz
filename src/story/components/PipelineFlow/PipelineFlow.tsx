import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { PipelineStage, PipelineFlowProps } from './types';
import { PipelineIconMap } from './PipelineIcons';

interface NodeData extends PipelineStage {
  x: number;
  y: number;
  radius: number;
  index: number;
}

interface ParticleData {
  id: string;
  source: NodeData;
  target: NodeData;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export default function PipelineFlow({
  stages,
  width = 1600,
  height = 800,
  orientation = 'horizontal',
  className = '',
}: PipelineFlowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return {
          primary: '#10b981',
          secondary: '#34d399',
          glow: '#a7f3d0'
        };
      case 'active':
        return {
          primary: '#3b82f6',
          secondary: '#60a5fa',
          glow: '#93c5fd'
        };
      case 'pending':
        return {
          primary: '#94a3b8',
          secondary: '#cbd5e1',
          glow: '#e2e8f0'
        };
      default:
        return {
          primary: '#6366f1',
          secondary: '#818cf8',
          glow: '#a5b4fc'
        };
    }
  };

  const getIconKey = (icon: string): string => {
    const iconMap: Record<string, string> = {
      '👥': 'recruit',
      '📋': 'questionnaire',
      '⚙️': 'install',
      '🧪': 'test',
      '📤': 'submit',
    };
    return iconMap[icon] || 'recruit';
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Setup dimensions with minimal margins
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    console.log('SVG dimensions:', { width, height, innerWidth, innerHeight }); // Debug log

    // Create main group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create gradient definitions
    const defs = svg.append('defs');
    
    // Background gradient
    const bgGradient = defs
      .append('radialGradient')
      .attr('id', 'bg-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '80%');
    
    bgGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f8fafc')
      .attr('stop-opacity', 0.1);
    
    bgGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1e293b')
      .attr('stop-opacity', 0.02);

    // Add CSS animations for flow effects
    const style = document.createElement('style');
    style.textContent = `
      @keyframes dash-flow {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: -100; }
      }
      .flow-animation {
        animation: dash-flow 2s linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Add background
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#bg-gradient)')
      .attr('rx', 24);

    // Add title and subtitle as SVG text
    const titleGroup = g.append('g').attr('class', 'title-group');
    
    // Create gradient for title text
    const titleGradient = defs
      .append('linearGradient')
      .attr('id', 'title-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%');
    
    titleGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#667eea');
    
    titleGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#764ba2');

    // Main title
    titleGroup
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', 'url(#title-gradient)')
      .attr('font-size', '42px')
      .attr('font-weight', '900')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .text('Data Collection Pipeline');

    // Subtitle - split into multiple lines
    const subtitleLines = [
      'Experience the intricate five-stage journey of transforming health centers',
      'into automated EHR-based data collection powerhouses through our sophisticated pipeline'
    ];

    subtitleLines.forEach((line, i) => {
      titleGroup
        .append('text')
        .attr('x', innerWidth / 2)
        .attr('y', 60 + (i * 18))
        .attr('text-anchor', 'middle')
        .attr('fill', '#475569')
        .attr('font-size', '18px')
        .attr('font-weight', '500')
        .attr('font-family', 'system-ui, -apple-system, sans-serif')
        .attr('opacity', 0.8)
        .text(line);
    });

    // Add Pipeline Excellence Metrics
    const metricsGroup = g.append('g').attr('class', 'metrics-group');
    const metricsY = innerHeight - 80;
    
    // Metrics title
    metricsGroup
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', metricsY - 50)
      .attr('text-anchor', 'middle')
      .attr('fill', 'url(#title-gradient)')
      .attr('font-size', '28px')
      .attr('font-weight', '800')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .text('Pipeline Excellence Metrics');

    // Metrics data
    const metrics = [
      { value: '4-6 weeks', label: 'Lightning-fast onboarding time', color: '#667eea' },
      { value: 'Autonomous', label: 'Self-sustaining data streams', color: '#10b981' },
      { value: 'Fort Knox', label: 'Military-grade security', color: '#f5576c' }
    ];

    metrics.forEach((metric, i) => {
      const metricX = (innerWidth / 4) + (i * innerWidth / 4);
      const metricGroup = metricsGroup.append('g');

      // Metric background
      metricGroup
        .append('rect')
        .attr('x', metricX - 80)
        .attr('y', metricsY - 25)
        .attr('width', 160)
        .attr('height', 50)
        .attr('rx', 12)
        .attr('fill', metric.color)
        .attr('opacity', 0.1)
        .attr('stroke', metric.color)
        .attr('stroke-width', 1.5);

      // Metric value
      metricGroup
        .append('text')
        .attr('x', metricX)
        .attr('y', metricsY - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', metric.color)
        .attr('font-size', '18px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'system-ui, -apple-system, sans-serif')
        .text(metric.value);

      // Metric label
      metricGroup
        .append('text')
        .attr('x', metricX)
        .attr('y', metricsY + 12)
        .attr('text-anchor', 'middle')
        .attr('fill', '#64748b')
        .attr('font-size', '11px')
        .attr('font-weight', '500')
        .attr('font-family', 'system-ui, -apple-system, sans-serif')
        .text(metric.label);
    });

    // Prepare node data with responsive positioning
    const nodeSpacing = Math.max(200, innerWidth / stages.length); // Minimum spacing of 200px
    const actualWidth = nodeSpacing * (stages.length - 1);
    const startX = (innerWidth - actualWidth) / 2;
    
    const nodeData: NodeData[] = stages.map((stage, i) => ({
      ...stage,
      x: startX + (i * nodeSpacing),
      y: innerHeight / 2,
      radius: Math.min(60, Math.max(40, nodeSpacing / 4)), // Responsive radius
      index: i,
    }));

    // Create flowing connections
    const connections = g.append('g').attr('class', 'connections');
    
    for (let i = 0; i < nodeData.length - 1; i++) {
      const source = nodeData[i];
      const target = nodeData[i + 1];
      const sourceColor = getStatusColor(source.status);
      const targetColor = getStatusColor(target.status);

      // Create gradient for each connection
      const connectionGradient = defs
        .append('linearGradient')
        .attr('id', `connection-grad-${i}`)
        .attr('x1', '0%')
        .attr('x2', '100%');
      
      connectionGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', sourceColor.primary);
      
      connectionGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', targetColor.primary);

      // Create arrow marker
      const arrowMarker = defs
        .append('marker')
        .attr('id', `arrow-${i}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 8)
        .attr('refY', 3)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .attr('markerUnits', 'strokeWidth');
      
      arrowMarker
        .append('path')
        .attr('d', 'M0,0 L0,6 L9,3 z')
        .attr('fill', targetColor.primary);

      // Create curved path with better control points
      const path = d3.path();
      const midX = (source.x + target.x) / 2;
      const controlY = source.y - 60; // Reduced curve height
      
      path.moveTo(source.x + source.radius * 0.8, source.y);
      path.quadraticCurveTo(midX, controlY, target.x - target.radius * 0.8, target.y);

      // Main connection path with arrow - COMPLETELY HIDDEN initially
      const connectionPath = connections
        .append('path')
        .attr('d', path.toString())
        .attr('stroke', `url(#connection-grad-${i})`)
        .attr('stroke-width', 6)
        .attr('fill', 'none')
        .attr('opacity', 0)
        .attr('stroke-linecap', 'round')
        .attr('marker-end', `url(#arrow-${i})`)
        .style('visibility', 'hidden'); // Extra hidden state

      // Store connection for progressive rendering - using source+1 as target
      connectionPath.attr('data-target-index', i + 1);
      connectionPath.attr('data-source-index', i);

      // Animated glow effect - COMPLETELY HIDDEN initially
      const glowPath = connections
        .append('path')
        .attr('d', path.toString())
        .attr('stroke', sourceColor.glow)
        .attr('stroke-width', 12)
        .attr('fill', 'none')
        .attr('opacity', 0)
        .attr('stroke-linecap', 'round')
        .attr('filter', 'blur(4px)')
        .style('visibility', 'hidden'); // Extra hidden state

      // Store glow connection for progressive rendering
      glowPath.attr('data-target-index', i + 1);
      glowPath.attr('data-source-index', i);

      // Add flowing dash animation (simple approach)
      const pathLength = connectionPath.node()?.getTotalLength() || 0;
      if (pathLength > 0) {
        const flowPath = connections
          .append('path')
          .attr('d', path.toString())
          .attr('stroke', sourceColor.secondary)
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr('stroke-dasharray', '6 12')
          .attr('stroke-dashoffset', 0)
          .attr('opacity', 0)
          .attr('stroke-linecap', 'round')
          .attr('data-target-index', i + 1)
          .attr('data-source-index', i)
          .attr('class', 'flow-animation')
          .style('visibility', 'hidden'); // Extra hidden state
      }
    }

    // Create nodes
    const nodes = g.append('g').attr('class', 'nodes');
    
    console.log('Node data:', nodeData); // Debug log
    
    nodeData.forEach((node, i) => {
      const colors = getStatusColor(node.status);
      
      console.log(`Creating node ${i}:`, node.title, 'at position:', node.x, node.y); // Debug log
      
      // Create node group - start completely hidden
      const nodeGroup = nodes
        .append('g')
        .attr('transform', `translate(${node.x},${node.y})`)
        .attr('cursor', 'pointer')
        .style('opacity', 0); // Start hidden to prevent flash

      // Main background circle (larger and more prominent)
      const mainCircle = nodeGroup
        .append('circle')
        .attr('r', node.radius)
        .attr('fill', '#ffffff')
        .attr('stroke', colors.primary)
        .attr('stroke-width', 4)
        .attr('opacity', 0)
        .attr('data-node-index', i); // Add identifier

      // Stage number (larger)
      nodeGroup
        .append('circle')
        .attr('r', 20)
        .attr('cy', -node.radius + 15)
        .attr('fill', colors.primary)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 3)
        .attr('opacity', 0); // Start hidden

      nodeGroup
        .append('text')
        .attr('cy', -node.radius + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-weight', 'bold')
        .attr('font-size', '16px')
        .text(i + 1)
        .attr('opacity', 0); // Start hidden

      // Icon (larger)
      nodeGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', '32px')
        .attr('fill', colors.primary)
        .text(node.icon)
        .attr('opacity', 0); // Start hidden

      // Stage title (larger and better positioned)
      nodeGroup
        .append('text')
        .attr('y', node.radius + 30)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.primary)
        .attr('font-weight', 'bold')
        .attr('font-size', '16px')
        .text(node.title)
        .attr('opacity', 0); // Start hidden

      // Add metrics back with larger size
      if (node.metrics) {
        const metricsGroup = nodeGroup
          .append('g')
          .attr('class', 'metrics-group')
          .attr('transform', `translate(0, ${node.radius + 75})`)
          .attr('opacity', 0); // Start completely hidden

        node.metrics.forEach((metric, metricIndex) => {
          const metricSpacing = Math.min(100, nodeSpacing / 3); // Responsive metric spacing
          const metricX = (metricIndex - (node.metrics!.length - 1) / 2) * metricSpacing;
          const metricGroup = metricsGroup
            .append('g')
            .attr('transform', `translate(${metricX}, 0)`);

          // Metric background (larger)
          metricGroup
            .append('rect')
            .attr('x', -40)
            .attr('y', -20)
            .attr('width', 80)
            .attr('height', 40)
            .attr('rx', 10)
            .attr('fill', colors.glow)
            .attr('opacity', 0.2)
            .attr('stroke', colors.primary)
            .attr('stroke-width', 1.5);

          // Metric value (larger font)
          metricGroup
            .append('text')
            .attr('y', -3)
            .attr('text-anchor', 'middle')
            .attr('fill', colors.primary)
            .attr('font-weight', 'bold')
            .attr('font-size', '14px')
            .text(metric.value);

          // Metric label (larger font)
          metricGroup
            .append('text')
            .attr('y', 12)
            .attr('text-anchor', 'middle')
            .attr('fill', '#64748b')
            .attr('font-size', '11px')
            .text(metric.label);
        });
      }

      // Enhanced hover effects
      nodeGroup
        .on('mouseenter', function() {
          setHoveredStage(node.id);
          mainCircle.attr('stroke-width', 6);
          d3.select(this).style('filter', 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))');
        })
        .on('mouseleave', function() {
          setHoveredStage(null);
          mainCircle.attr('stroke-width', 4);
          d3.select(this).style('filter', 'none');
        });
    });

    // Animated particles flowing between nodes (temporarily disabled for debugging)
    /*
    const particlesData: ParticleData[] = [];
    
    for (let i = 0; i < nodeData.length - 1; i++) {
      for (let j = 0; j < 3; j++) {
        particlesData.push({
          id: `particle-${i}-${j}`,
          source: nodeData[i],
          target: nodeData[i + 1],
          progress: Math.random(),
          speed: 0.008 + Math.random() * 0.004,
          color: getStatusColor(nodeData[i].status).secondary,
          size: 3 + Math.random() * 2,
        });
      }
    }

    const particles = g.append('g').attr('class', 'particles');
    
    function animateParticles() {
      const particleSelection = particles
        .selectAll('circle.particle')
        .data(particlesData, (d: any) => d.id);

      particleSelection
        .enter()
        .append('circle')
        .attr('class', 'particle')
        .attr('r', (d: ParticleData) => d.size)
        .attr('fill', (d: ParticleData) => d.color)
        .attr('opacity', 0.7)
        .attr('filter', 'blur(0.5px)');

      particleSelection
        .attr('cx', (d: ParticleData) => {
          const midX = (d.source.x + d.target.x) / 2;
          const controlY = d.source.y - 80;
          
          // Quadratic Bezier curve calculation
          const t = d.progress;
          const x = (1 - t) * (1 - t) * d.source.x + 2 * (1 - t) * t * midX + t * t * d.target.x;
          return x;
        })
        .attr('cy', (d: ParticleData) => {
          const midX = (d.source.x + d.target.x) / 2;
          const controlY = d.source.y - 80;
          
          const t = d.progress;
          const y = (1 - t) * (1 - t) * d.source.y + 2 * (1 - t) * t * controlY + t * t * d.target.y;
          return y;
        });

      // Update particle progress
      particlesData.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
    */

    // Ensure ALL connections start completely hidden
    connections.selectAll('path')
      .attr('opacity', 0)
      .style('visibility', 'hidden');

    // Progressive animation - wait for MAIN CIRCLE completion before showing edges
    
    // Animate only main circles first, one by one
    nodeData.forEach((node, i) => {
      // Get the specific main circle for this node using attribute selector
      const mainCircle = nodes.select('circle[data-node-index=\"' + i + '\"]');
      
      console.log(`Animating main circle ${i}`);
      
      // Animate the main circle with delay
      mainCircle
        .transition()
        .duration(800)
        .delay(i * 700)
        .ease(d3.easeBackOut)
        .attr('opacity', 1)
        .on('end', function() {
          console.log(`MAIN CIRCLE ${i} completely rendered - now animating other elements`);
          
          // First make the entire node group visible and animate other elements
          const nodeGroup = d3.select(this.parentNode);
          nodeGroup.style('opacity', 1);
          
          // Animate secondary circle elements
          nodeGroup.selectAll('circle:not([data-node-index])')
            .transition()
            .delay(100)
            .duration(400)
            .attr('opacity', 1);
          
          // Animate text elements
          nodeGroup.selectAll('text')
            .transition()
            .delay(200)
            .duration(400)
            .attr('opacity', 1);
            
          // Animate metrics group if it exists
          if (node.metrics) {
            nodeGroup.select('.metrics-group')
              .transition()
              .delay(300)
              .duration(400)
              .attr('opacity', 1);
          }
            
          // WAIT for main circle + additional buffer before showing incoming edge
          if (i > 0) {
            setTimeout(() => {
              console.log(`Main circle ${i} fully complete - showing edge FROM ${i-1} TO ${i}`);
              
              // Show all connection elements for the edge coming TO this node
              connections.selectAll('path[data-target-index=\"' + i + '\"]')
                .style('visibility', 'visible')
                .transition()
                .duration(600)
                .attr('opacity', function() {
                  const strokeWidth = d3.select(this).attr('stroke-width');
                  if (strokeWidth === '6') return 0.7;   // Main path
                  if (strokeWidth === '12') return 0.15; // Glow
                  if (strokeWidth === '2') return 0.5;   // Flow animation
                  return 0.5;
                })
                .on('end', function() {
                  // Start particle animation only on main path
                  if (d3.select(this).attr('stroke-width') === '6') {
                    startParticleAnimation(i - 1, i);
                  }
                });
            }, 300); // Extra buffer after main circle completion
          }
        });
    });

    // Function to start particle animation along a path
    function startParticleAnimation(sourceIndex: number, targetIndex: number) {
      const source = nodeData[sourceIndex];
      const target = nodeData[targetIndex];
      
      // Create particle group
      const particleGroup = g.append('g').attr('class', `particles-${sourceIndex}-${targetIndex}`);
      
      // Create multiple particles with different styles
      for (let p = 0; p < 4; p++) {
        const particle = particleGroup
          .append('circle')
          .attr('r', 4 + (p % 2)) // Varying sizes
          .attr('fill', getStatusColor(source.status).primary)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 1)
          .attr('cx', source.x)
          .attr('cy', source.y)
          .attr('opacity', 0.9)
          .style('filter', 'drop-shadow(0 0 6px currentColor)');
        
        // Animate particle along the path
        function animateParticle() {
          const duration = 1500 + (p * 150); // Varying speeds
          
          particle
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween('cx', function() {
              return d3.interpolate(source.x, target.x);
            })
            .attrTween('cy', function() {
              // Curved path calculation - matches the path curve
              const controlY = source.y - 60;
              
              return function(t: number) {
                // Quadratic Bezier curve for Y coordinate
                const y = (1-t)*(1-t)*source.y + 2*(1-t)*t*controlY + t*t*target.y;
                return y;
              };
            })
            .attrTween('opacity', function() {
              return d3.interpolate(0.9, 0.4);
            })
            .on('end', function() {
              // Reset particle position and animate again
              particle
                .attr('cx', source.x)
                .attr('cy', source.y)
                .attr('opacity', 0.9);
              
              // Restart animation after a brief delay with randomness
              setTimeout(animateParticle, 200 + Math.random() * 300);
            });
        }
        
        // Start animation with staggered delay
        setTimeout(() => animateParticle(), (p * 400) + Math.random() * 200);
      }
    }

  }, [stages, width, height, hoveredStage]);

  return (
    <div 
      className={`pipeline-flow-d3 ${className}`} 
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
