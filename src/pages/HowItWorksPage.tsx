import { Link } from 'react-router-dom';
import { Clock, Cpu, Share2, RotateCcw, Play } from 'lucide-react';

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
      title: 'AI Transforms & Structures',
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
            <div className="video-placeholder">
              <div className="video-overlay">
                <div className="play-button">
                  <Play size={60} color="#244855" fill="#244855" />
                </div>
                <h3>Watch: PDF to Interactive Story</h3>
                <p>See a real transformation from complex report to engaging visual narrative</p>
              </div>
              {/* Replace this div with actual video component */}
              <div className="video-bg">
                <img src="/api/placeholder/800/450" alt="Video thumbnail showing document transformation" />
              </div>
            </div>
            
            <div className="video-details">
              <div className="video-stats">
                <div className="stat">
                  <span className="stat-number">2:30</span>
                  <span className="stat-label">Demo Length</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Real</span>
                  <span className="stat-label">Live System</span>
                </div>
                <div className="stat">
                  <span className="stat-number">60s</span>
                  <span className="stat-label">Processing Time</span>
                </div>
              </div>
            </div>
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
                <Clock size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Lightning Fast</h3>
              <p>Transform documents in under 60 seconds</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <Cpu size={32} color="#244855" strokeWidth={2.5} />
              </div>
              <h3>Precision AI</h3>
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
