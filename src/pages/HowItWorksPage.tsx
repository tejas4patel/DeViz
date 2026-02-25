import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Upload',
      description: 'Drop in any PDF, Word doc, or dataset.',
    },
    {
      number: '02',
      title: 'We Transform It',
      description: 'Our engine reads your content and rebuilds it as a structured, scene-based story.',
    },
    {
      number: '03',
      title: 'Share and Explore',
      description: 'Readers navigate at their own pace and surface detail on demand.',
    },
  ];

  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>How It Works</h1>
          <p className="page-lead">
            Three steps. No technical knowledge required.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="steps-list">
            {steps.map((step) => (
              <div key={step.number} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container cta-section">
          <h2>Ready to transform your documents?</h2>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary large">Get Started Free</Link>
            <Link to="/demo" className="btn-secondary large">View Demo First</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
