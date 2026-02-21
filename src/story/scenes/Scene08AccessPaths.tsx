/**
 * Scene 08: Access Paths for Researchers
 *
 * Serpentine timeline showing comparison between public download path
 * and RDC (Research Data Center) access path for NAMCS HC data.
 * Features flowing alternating steps connected by curved paths.
 */

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Scene08AccessPaths.css';

interface AccessPath {
  id: string;
  title: string;
  color: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    timeframe: string;
    cost?: string;
    complexity: 'low' | 'medium' | 'high';
    width: number; // Width for alluvial flow
  }>;
  benefits: string[];
  limitations: string[];
}

const accessPaths: AccessPath[] = [
  {
    id: 'public',
    title: 'Public Use Data File',
    color: '#874F41', // Terracotta from palette
    steps: [
      {
        step: 1,
        title: 'Visit NCHS Website',
        description: 'Navigate to NCHS data and documentation portal',
        timeframe: '5 minutes',
        cost: 'Free',
        complexity: 'low',
        width: 100
      },
      {
        step: 2,
        title: 'Register Account',
        description: 'Create user account for download access',
        timeframe: '5 minutes',
        cost: 'Free',
        complexity: 'low',
        width: 85
      },
      {
        step: 3,
        title: 'Download Dataset',
        description: 'Download 5% sample public use file directly',
        timeframe: '10 minutes',
        complexity: 'low',
        width: 80
      }
    ],
    benefits: [
      'Immediate access',
      'No approval process',
      'Free access',
      'Full analysis flexibility'
    ],
    limitations: [
      'Only 5% sample',
      'Limited variables',
      'No geographic identifiers',
      'No linkage capability'
    ]
  },
  {
    id: 'restricted',
    title: 'Restricted Use Data (RDC)',
    color: '#E64833',
    steps: [
      {
        step: 1,
        title: 'IRB Approval',
        description: 'Obtain Institutional Review Board approval for research',
        timeframe: '4-8 weeks',
        cost: 'Institution fees',
        complexity: 'high',
        width: 120
      },
      {
        step: 2,
        title: 'Prepare Proposal',
        description: 'Develop detailed research proposal and justification',
        timeframe: '2-4 weeks',
        cost: 'Time investment',
        complexity: 'high',
        width: 125
      },
      {
        step: 3,
        title: 'NCHS Review',
        description: 'Proposal undergoes scientific and disclosure review',
        timeframe: '8-12 weeks',
        complexity: 'medium',
        width: 140
      },
      {
        step: 4,
        title: 'RDC Analysis',
        description: 'Conduct analysis in secure Research Data Center',
        timeframe: 'Days to months',
        cost: 'Hourly RDC fees',
        complexity: 'high',
        width: 160
      }
    ],
    benefits: [
      'Full dataset (100% sample)',
      'Complete variable set',
      'Geographic identifiers',
      'Linkage opportunities',
      'Enhanced analytic power'
    ],
    limitations: [
      'Lengthy approval process',
      'Significant costs',
      'Restricted analysis environment',
      'Output review required'
    ]
  }
];

function SerpentinePath({ path, width = 500, height = 200, pathIndex, title }: { path: AccessPath, width?: number, height?: number, pathIndex: number, title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    console.log(`Rendering ${path.title} with ${path.steps.length} steps`);
    
    if (!svgRef.current) {
      console.log('SVG ref is null, returning early');
      return;
    }

    try {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const margin = { top: 45, right: 100, bottom: 5, left: 100 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const g = svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Calculate step positions for vertical wavy flow
      const stepSpacing = innerHeight / (path.steps.length + 1);

      // Add title header to this SVG - positioned for vertical layout
      // Use fixed Y position to ensure horizontal alignment across both paths
      g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', -15)
        .attr('text-anchor', 'middle')
        .attr('fill', path.color)
        .attr('font-size', '20px')
        .attr('font-weight', '800')
        .attr('letter-spacing', '0.5px')
        .text(title);

      // Create defs for any gradients if needed in future
      const defs = svg.append('defs');
      const pathCenterX = innerWidth / 2;
      
      console.log(`Step spacing: ${stepSpacing}, Center X: ${pathCenterX}`);
      
      // Draw smooth flowing curves with rounded serpentine style - flowing vertically
      if (path.steps.length > 1) {
        console.log(`Drawing vertical smooth flowing path for ${path.title} with ${path.steps.length} steps`);

        // Clean simple path generation
        let pathDataString = '';

        // Generate wave points for vertical flow with increased amplitude for rounder curves
        const wavePoints = path.steps.map((step, stepIndex) => {
          const y = stepSpacing * (stepIndex + 1);
          const x = stepIndex % 2 === 0 ? pathCenterX - 50 : pathCenterX + 50; // Increased from 40 to 50
          return { x, y };
        });

        // Start the path
        if (wavePoints.length > 0) {
          pathDataString = `M ${wavePoints[0].x} ${wavePoints[0].y}`;
        }

        // Create smooth flowing curves without acute angles - vertical flow with rounder bends
        for (let i = 1; i < wavePoints.length; i++) {
          const current = wavePoints[i];
          const previous = wavePoints[i - 1];

          // Calculate smooth control points for gentle vertical curves
          const deltaX = current.x - previous.x;
          const deltaY = current.y - previous.y;

          // Create gentle, flowing curves with extended control points for smoother, rounder vertical curves
          const controlExtension = deltaY * 0.75; // Increased from 0.6 to 0.75 for rounder curves

          // Control points positioned to create smooth S-curves without sharp angles
          const cp1X = previous.x; // Keep at same level as previous point
          const cp1Y = previous.y + controlExtension;

          const cp2X = current.x; // Keep at same level as current point
          const cp2Y = current.y - controlExtension;

          // Create smooth cubic Bézier curve
          pathDataString += ` C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${current.x} ${current.y}`;
        }

        // Draw single rounded path like reference image
        g.append('path')
          .attr('d', pathDataString)
          .attr('stroke', path.color)
          .attr('stroke-width', 18) // Thicker, more prominent path
          .attr('opacity', 0.85)
          .attr('fill', 'none')
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round') // Smooth joins
          .attr('stroke-dasharray', `0, 1000`)
          .transition()
          .duration(3000)
          .ease(d3.easeQuadInOut)
          .attr('stroke-dasharray', `1000, 0`);
      }
      
      // Draw step nodes positioned on the vertical wave
      path.steps.forEach((step, stepIndex) => {
        const y = stepSpacing * (stepIndex + 1);
        const x = stepIndex % 2 === 0 ? pathCenterX - 50 : pathCenterX + 50; // Match new wave amplitude
        const isLeft = stepIndex % 2 === 0;

        console.log(`Drawing step ${stepIndex + 1} for ${path.title} at (${x}, ${y})`);

        const nodeGroup = g.append('g')
          .attr('transform', `translate(${x}, ${y})`)
          .style('cursor', 'pointer')
          .style('opacity', 0);

        // Animate nodes in sequence with staggered timing
        nodeGroup
          .transition()
          .delay(stepIndex * 300)
          .duration(600)
          .ease(d3.easeBackOut)
          .style('opacity', 1);

        // Rounded circle style matching reference image
        nodeGroup
          .append('circle')
          .attr('r', 24)  // Larger circles like reference image
          .attr('fill', path.color)
          .attr('stroke', 'white')
          .attr('stroke-width', 3)
          .style('filter', 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16))')
          .style('cursor', 'pointer');

        // Step number with clean styling
        nodeGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', 'white')
          .attr('font-size', '14px')
          .attr('font-weight', '700')
          .style('pointer-events', 'none')
          .text(step.step);
        
        // Step label container positioned for vertical flow
        const labelGroup = nodeGroup
          .append('g')
          .attr('transform', `translate(${isLeft ? -95 : 95}, 0)`);
        
        // Background for step label - adjusted for vertical layout
        const labelRect = labelGroup
          .append('rect')
          .attr('x', -65)
          .attr('y', -26)
          .attr('width', 130)
          .attr('height', 52)
          .attr('rx', 10)
          .attr('fill', '#ffffff')
          .attr('stroke', path.color)
          .attr('stroke-width', 1.5)
          .style('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))')
          .style('opacity', 0.96);
        
        // Step title with better sizing
        labelGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('y', -10)
          .attr('fill', path.color)
          .attr('font-size', '11px')
          .attr('font-weight', '700')
          .text(step.title);

        // Step timeframe
        labelGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('y', 2)
          .attr('fill', '#244855')  // Dark teal from palette
          .attr('font-size', '10px')
          .attr('font-weight', '500')
          .text(step.timeframe);

        // Cost information if available
        if (step.cost) {
          labelGroup
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 13)
            .attr('fill', '#244855')  // Dark teal from palette
            .attr('font-size', '9px')
            .text(step.cost);
        }
        
        // Enhanced hover interactions
        nodeGroup
          .on('mouseover', function() {
            setHoveredStep(stepIndex);
            d3.select(this)
              .transition()
              .duration(200)
              .attr('transform', `translate(${x}, ${y}) scale(1.15)`);
          })
          .on('mouseout', function() {
            setHoveredStep(null);
            d3.select(this)
              .transition()
              .duration(200)
              .attr('transform', `translate(${x}, ${y}) scale(1)`);
          });
      });
      
      console.log(`Processed path: ${path.title}`);

    } catch (error) {
      console.error(`Error in ${path.title} useEffect:`, error);
    }
  }, [path, width, height]);

  // Render hover details
  const hoveredStepData = hoveredStep !== null ? path.steps[hoveredStep] : null;

  return (
    <div className="serpentine-path">
      <svg ref={svgRef} />
      {hoveredStepData && (
        <div className="step-tooltip">
          <h4>{hoveredStepData.title}</h4>
          <p>{hoveredStepData.description}</p>
          <div className="step-meta">
            <span>⏱️ {hoveredStepData.timeframe}</span>
            {hoveredStepData.cost && <span>💰 {hoveredStepData.cost}</span>}
            <span className={`complexity-${hoveredStepData.complexity}`}>
              🎯 {hoveredStepData.complexity} complexity
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Scene08AccessPaths() {
  console.log('Scene08AccessPaths rendering', { accessPaths });
  
  if (!accessPaths || accessPaths.length === 0) {
    return <div>Loading access paths...</div>;
  }
  
  return (
    <div className="scene08-access-paths">
      <div className="scene08-access-paths__container">
        <div className="serpentine-sections">
          {/* Public Use Data File Section */}
          <div className="path-section public-section">
            <SerpentinePath path={accessPaths[0]} width={600} height={420} pathIndex={0} title="PUBLIC USE DATA FILE" />
          </div>

          {/* Restricted Use Data RDC Section */}
          <div className="path-section rdc-section">
            <SerpentinePath path={accessPaths[1]} width={600} height={420} pathIndex={1} title="RESTRICTED USE DATA RDC" />
          </div>
        </div>
        
        <div className="scene08-access-paths__decision-help">
          <h3>Which Path is Right for You?</h3>
          <div className="scene08-access-paths__recommendations">
            {accessPaths.map(path => (
              <div key={path.id} className="scene08-access-paths__recommendation">
                <div className="path-summary" style={{borderColor: path.color}}>
                  <h4 style={{color: path.color}}>{path.title}</h4>
                  <div className="benefits-limitations">
                    <div className="benefits">
                      <strong>Benefits:</strong>
                      <ul>
                        {path.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                      </ul>
                    </div>
                    <div className="limitations">
                      <strong>Limitations:</strong>
                      <ul>
                        {path.limitations.map((limitation, i) => <li key={i}>{limitation}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
