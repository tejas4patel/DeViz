/**
 * Landing Page - Main homepage with hero section
 */

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Documents into 
            <span className="hero-accent"> Interactive Stories</span>
          </h1>
          <p className="hero-description">
            Upload any PDF or Word document and our AI transforms it into an engaging, 
            digestible story experience that respects human cognitive limits.
          </p>
          <div className="hero-actions">
            <button className="btn-primary large">Get Started Free</button>
            <button className="btn-secondary large">View Demo</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="document-preview">
            📄 → 🤖 → 📚
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose DeViz?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Cognitive Engineering</h3>
              <p>Built on cognitive load theory to make complex information digestible</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>AI-Powered</h3>
              <p>Advanced algorithms automatically structure content for optimal comprehension</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Interactive Experience</h3>
              <p>Progressive disclosure and cross-references build deeper understanding</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}