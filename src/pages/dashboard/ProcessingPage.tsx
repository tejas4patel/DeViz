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
        <div className="processing-icon">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="52" height="52" rx="13" fill="rgba(36,72,85,0.08)" />
            <rect x="14" y="18" width="24" height="18" rx="4" fill="#244855" opacity="0.15" stroke="#244855" strokeWidth="1.5" />
            <circle cx="20" cy="27" r="2" fill="#244855" />
            <circle cx="26" cy="27" r="2" fill="#244855" />
            <circle cx="32" cy="27" r="2" fill="#244855" />
            <path d="M20 18 v-4M26 18 v-4M32 18 v-4" stroke="#244855" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 36 v3M26 36 v3M35 36 v3" stroke="#244855" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="14" r="5" fill="#E64833" opacity="0.9" />
            <path d="M38 14 h4M40 12 v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
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
