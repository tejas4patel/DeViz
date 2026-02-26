import { Link } from 'react-router-dom';
import { Cpu, Share2, RotateCcw, Zap } from 'lucide-react';
import YouTubeCard from '../components/YouTubeCard';

const VIDEO_ID = 'fx_0RVWlSmU';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Content',
      description: 'Drop in any PDF, Word doc, or dataset. Our system handles complex reports, research papers, and data files.',
      details: ['PDF documents', 'Word files', 'CSV datasets', 'Text files'],
    },
    {
      number: '02',
      title: 'Agentic Workflow Transforms & Structures',
      description: 'Our engine reads your content, identifies key insights, and rebuilds it as an interactive, scene-based story.',
      details: ['Content analysis', 'Scene generation', 'Visual mapping', 'Narrative flow'],
    },
    {
      number: '03',
      title: 'Share Interactive Story',
      description: 'Readers navigate at their own pace, surface detail on demand, and explore every insight visually.',
      details: ['Interactive navigation', 'On-demand details', 'Visual exploration', 'Sharable links'],
    },
  ];

  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>See Deviz in Action</h1>
          <p className="page-lead">
            Watch how we transform complex documents into engaging visual stories in minutes, not hours.
          </p>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="demo-video-section">
        <div className="container">
          <div className="video-container">
            <YouTubeCard
              videoId={VIDEO_ID}
              title="Watch DeViz"
              customPosterUrl="/assets/deviz-demo-poster.jpg"
            />
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>The Simple Process</h2>
            <p className="section-subtitle">Three steps. No technical knowledge required. Powerful results every time.</p>
          </div>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step.number} className="step-card">
                <div className="step-visual">
                  <div className="step-number-large">{step.number}</div>
                  {index < steps.length - 1 && <div className="step-connector"></div>}
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <ul className="step-features">
                    {step.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">
                <Zap size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Instant Results</h3>
              <p>Go from raw document to interactive story in seconds</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <Cpu size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Precision Agentic Workflow</h3>
              <p>Maintains accuracy while creating engaging narratives</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <Share2 size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Share Anywhere</h3>
              <p>Works perfectly on desktop, tablet, and mobile</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <RotateCcw size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Always Updated</h3>
              <p>Edit source, story updates automatically</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container cta-section">
          <h2>Ready to transform your documents?</h2>
          <p className="cta-subtitle">Join thousands of professionals who've revolutionized how they share complex information.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary large">Get Started Free</Link>
            <Link to="/demo" className="btn-secondary large">View Live Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
