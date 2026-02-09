/**
 * Scene 06: Data Collection Pipeline
 *
 * Visual flow showing the 5-stage process of onboarding health centers
 * into the NAMCS HC EHR-based data collection system.
 */

import { PipelineFlow, PipelineStage } from '../components/PipelineFlow';

const pipelineStages: PipelineStage[] = [
  {
    id: 'recruit',
    title: 'Recruit',
    description: 'Identify and engage health centers to participate in EHR-based encounter data submission.',
    icon: '👥',
    status: 'completed',
    metrics: [
      { value: '95', label: 'Centers' },
      { value: '100%', label: 'Success' },
    ],
  },
  {
    id: 'questionnaire',
    title: 'Questionnaire',
    description: 'Collect organizational and technical details through structured data collection forms.',
    icon: '📋',
    status: 'completed',
    metrics: [
      { value: '12', label: 'Fields' },
      { value: '2-3d', label: 'Duration' },
    ],
  },
  {
    id: 'install',
    title: 'HL7 Install',
    description: 'Deploy and configure HL7 FHIR extraction tools integrated with existing EHR systems.',
    icon: '⚙️',
    status: 'active',
    metrics: [
      { value: '5', label: 'Systems' },
      { value: '1-2w', label: 'Setup' },
    ],
  },
  {
    id: 'test',
    title: 'Test',
    description: 'Validate data quality, completeness, and compliance with NAMCS HC specifications.',
    icon: '🧪',
    status: 'active',
    metrics: [
      { value: '95%', label: 'Pass Rate' },
      { value: '3-5d', label: 'Testing' },
    ],
  },
  {
    id: 'submit',
    title: 'Submit',
    description: 'Ongoing automated submission of encounter data to NCHS secure data pipeline.',
    icon: '📤',
    status: 'active',
    metrics: [
      { value: '24/7', label: 'Active' },
      { value: '9M+', label: 'Records' },
    ],
  },
];

export default function Scene06Pipeline() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}>
            Data Collection Pipeline
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: '500',
            lineHeight: '1.6',
          }}>
            From recruitment to continuous submission: The five-stage journey of onboarding
            health centers into automated EHR-based encounter data collection
          </p>
        </div>

        <PipelineFlow stages={pipelineStages} width={1400} height={400} />

        <div style={{
          marginTop: '48px',
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '16px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#1a202c',
            marginBottom: '16px',
          }}>
            Pipeline Highlights
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#667eea', marginBottom: '4px' }}>
                4-6 weeks
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                Average onboarding time from recruitment to first submission
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#56ab2f', marginBottom: '4px' }}>
                Automated
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                Continuous year-round data flow with minimal manual intervention
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#f5576c', marginBottom: '4px' }}>
                Secure
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                HIPAA-compliant transmission with de-identification protocols
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
