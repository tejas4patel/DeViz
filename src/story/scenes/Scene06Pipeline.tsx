/**
 * Scene 06: Data Collection Pipeline
 *
 * Visual flow showing the 5-stage process of onboarding health centers
 * into the NAMCS HC EHR-based data collection system.
 */

import { PipelineFlow, PipelineStage } from '../components/PipelineFlow';
import { useResizeObserver } from '../viz/useResizeObserver';

const pipelineStages: PipelineStage[] = [
  {
    id: 'recruit',
    title: 'Strategic Recruitment',
    description: 'Identify high-potential health centers through advanced analytics and engage them with personalized outreach for EHR-based data participation.',
    icon: '👥',
    status: 'completed',
    metrics: [
      { value: '150+', label: 'Centers Targeted' },
      { value: '95%', label: 'Response Rate' },
    ],
  },
  {
    id: 'questionnaire',
    title: 'Digital Assessment',
    description: 'Deploy intelligent questionnaires capturing organizational structure, technical infrastructure, and workflow patterns through adaptive forms.',
    icon: '📋',
    status: 'completed',
    metrics: [
      { value: '25+', label: 'Data Points' },
      { value: '24hrs', label: 'Avg Completion' },
    ],
  },
  {
    id: 'install',
    title: 'HL7 Integration',
    description: 'Seamlessly deploy cutting-edge HL7 FHIR extraction engines with zero-downtime integration into existing clinical workflows.',
    icon: '⚙️',
    status: 'active',
    metrics: [
      { value: '12', label: 'EHR Systems' },
      { value: '48hr', label: 'Deployment' },
    ],
  },
  {
    id: 'test',
    title: 'Quality Validation',
    description: 'Execute comprehensive multi-layer testing protocols ensuring pristine data quality, completeness, and regulatory compliance.',
    icon: '🧪',
    status: 'active',
    metrics: [
      { value: '99.7%', label: 'Quality Score' },
      { value: '1-2d', label: 'Validation' },
    ],
  },
  {
    id: 'submit',
    title: 'Live Production',
    description: 'Activate continuous automated data streams delivering real-time encounter data to NCHS secure infrastructure with 24/7 monitoring.',
    icon: '📤',
    status: 'active',
    metrics: [
      { value: 'Real-time', label: 'Data Flow' },
      { value: '12M+', label: 'Records' },
    ],
  },
];

export default function Scene06Pipeline() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  
  // Calculate responsive dimensions
  const width = Math.max(800, Math.min(1400, rect.width - 40));
  const height = Math.max(500, Math.min(700, rect.height - 80));
  
  return (
    <>
      <div 
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '20px',
          boxSizing: 'border-box',
          width: '100%',
        }}>
        <PipelineFlow 
          stages={pipelineStages} 
          width={width} 
          height={height} 
        />
      </div>
    </>
  );
}
