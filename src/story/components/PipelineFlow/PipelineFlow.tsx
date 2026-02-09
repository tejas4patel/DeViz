import { useState } from 'react';
import type { PipelineStage, PipelineFlowProps } from './types';
import { PipelineIconMap } from './PipelineIcons';
import './PipelineFlow.css';

export default function PipelineFlow({
  stages,
  width = 1000,
  height = 300,
  orientation = 'horizontal',
  className = '',
}: PipelineFlowProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return '#56ab2f';
      case 'active':
        return '#667eea';
      case 'pending':
        return '#cbd5e0';
      default:
        return '#667eea';
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

  return (
    <div className={`pipeline-flow ${className}`} style={{ width: '100%', maxWidth: `${width}px` }}>
      <div className="pipeline-flow__container">
        {stages.map((stage, index) => {
          const IconComponent = PipelineIconMap[getIconKey(stage.icon)];
          const isHovered = hoveredStage === stage.id;
          const statusColor = getStatusColor(stage.status);

          return (
            <div key={stage.id} className="pipeline-flow__stage-wrapper">
              {/* Stage Card */}
              <div
                className={`pipeline-flow__stage ${isHovered ? 'pipeline-flow__stage--hovered' : ''}`}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                style={{
                  '--stage-color': statusColor,
                  animationDelay: `${index * 0.1}s`,
                } as React.CSSProperties}
              >
                {/* Stage Number Badge */}
                <div className="pipeline-flow__stage-number" style={{ backgroundColor: statusColor }}>
                  {index + 1}
                </div>

                {/* Icon Circle */}
                <div className="pipeline-flow__icon-container" style={{ borderColor: statusColor }}>
                  <div className="pipeline-flow__icon-glow" style={{ backgroundColor: statusColor }} />
                  {IconComponent && <IconComponent size={34} color="#fff" />}
                </div>

                {/* Stage Content */}
                <div className="pipeline-flow__content">
                  <h3 className="pipeline-flow__title">{stage.title}</h3>
                  <p className="pipeline-flow__description">{stage.description}</p>

                  {/* Metrics */}
                  {stage.metrics && stage.metrics.length > 0 && (
                    <div className="pipeline-flow__metrics">
                      {stage.metrics.map((metric, i) => (
                        <div key={i} className="pipeline-flow__metric">
                          <span className="pipeline-flow__metric-value">{metric.value}</span>
                          <span className="pipeline-flow__metric-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status Badge */}
                  {stage.status && (
                    <div className="pipeline-flow__status" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
                      {stage.status}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Arrow */}
              {index < stages.length - 1 && (
                <div className="pipeline-flow__connector">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="pipeline-flow__arrow">
                    <defs>
                      <linearGradient id={`arrow-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={getStatusColor(stages[index].status)} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={getStatusColor(stages[index + 1].status)} stopOpacity="0.8" />
                      </linearGradient>
                      <marker
                        id={`arrowhead-${index}`}
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill={getStatusColor(stages[index + 1].status)} />
                      </marker>
                    </defs>
                    <path
                      d="M 10 30 Q 30 20, 50 30"
                      stroke={`url(#arrow-grad-${index})`}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      markerEnd={`url(#arrowhead-${index})`}
                      className="pipeline-flow__arrow-path"
                    />
                    {/* Animated dots */}
                    <circle r="3" fill={getStatusColor(stages[index].status)} className="pipeline-flow__flow-dot">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M 10 30 Q 30 20, 50 30" />
                    </circle>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
