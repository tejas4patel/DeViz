import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const STEPS = [
  'Parsing document structure',
  'Identifying conceptual units',
  'Mapping terminology and schemas',
  'Calibrating information density',
  'Generating story scenes',
  'Building cross-references',
];

export default function ProcessingPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      // TODO: replace with real job polling
      const mockStoryId = jobId ?? 'demo-story-001';
      navigate(`/dashboard/story/${mockStoryId}`, { replace: true });
      return;
    }
    const timer = setTimeout(() => setCurrentStep(s => s + 1), 900);
    return () => clearTimeout(timer);
  }, [currentStep, jobId, navigate]);

  const progress = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="processing-page">
      <div className="processing-card">
        <div className="processing-icon">🤖</div>
        <h1>Generating your story</h1>
        <p className="processing-sub">Job ID: {jobId}</p>

        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-label">{progress}%</div>

        <ul className="step-list">
          {STEPS.map((step, i) => (
            <li key={step} className={`step-item-sm ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
              <span className="step-dot">{i < currentStep ? '✓' : i === currentStep ? '…' : '○'}</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
