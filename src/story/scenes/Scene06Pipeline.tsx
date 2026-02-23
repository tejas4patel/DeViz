/**
 * Scene 06: Data Collection Pipeline
 *
 * Snake / curved-timeline visualization of the 5-stage process for
 * onboarding health centers into NAMCS HC EHR-based data collection.
 */

import { PipelineFlow } from '../components/PipelineFlow';
import type { PipelineStage } from '../components/PipelineFlow';
import { useResizeObserver } from '../viz/useResizeObserver';
import pipelineStagesRaw from '../data/scene06-pipeline.json';

const pipelineStages = pipelineStagesRaw as PipelineStage[];

export default function Scene06Pipeline() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();

  const width  = Math.max(800,  Math.min(1400, rect.width  - 40));
  const height = Math.max(360,  Math.min(480,  rect.height - 100));

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #dce8f5 100%)',
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%',
        gap: '16px',
      }}
    >
      <h2 style={{
        margin: 0,
        fontSize: '26px',
        fontWeight: 800,
        color: '#1e293b',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        letterSpacing: '-0.3px',
        flexShrink: 0,
      }}>
        Data Collection Pipeline
      </h2>
      <PipelineFlow
        stages={pipelineStages}
        width={width}
        height={height}
      />
    </div>
  );
}
