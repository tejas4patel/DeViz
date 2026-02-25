import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Document',
      description:
        'Upload a PDF, Word document, or dataset. We support clinical reports, research papers, policy documents, and structured data exports.',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description:
        'Our engine parses content structure, identifies conceptual units, maps terminology, and builds a dependency graph of ideas.',
    },
    {
      number: '03',
      title: 'Story Generation',
      description:
        'We apply content engineering principles to scaffold complexity progressively, calibrate density, and encode semantic relationships.',
    },
    {
      number: '04',
      title: 'Interactive Story',
      description:
        'Your document becomes a navigable, scene-based story with adaptive detail levels, cross-references, and keyboard navigation.',
    },
  ];

  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>How It Works</h1>
          <p className="page-lead">
            From raw document to structured story in four steps.
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
