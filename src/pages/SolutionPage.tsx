import { Link } from 'react-router-dom';

export default function SolutionPage() {
  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>The Solution</h1>
          <p className="page-lead">
            Content engineering transforms raw data into structured narratives that
            align with how humans learn and how machines retrieve.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Structure Is Not Cosmetic. It Is Infrastructure.</h2>
          <p>
            We apply the principles of cognitive load theory, behavioral science, and
            AI retrieval architecture to every story we generate. The result is content
            that is understood, retained, and reliably retrieved.
          </p>

          <div className="solution-grid">
            <div className="solution-card">
              <h3>Structural Modeling</h3>
              <p>
                Every document is analyzed and reorganized around cognitive schemas —
                not arbitrary sections. Complexity is introduced progressively so
                foundational understanding stabilizes before integration.
              </p>
            </div>
            <div className="solution-card">
              <h3>Density Calibration</h3>
              <p>
                Information density is tuned to the audience. Beginner and expert
                modes expose different layers of detail without sacrificing rigor at
                either level.
              </p>
            </div>
            <div className="solution-card">
              <h3>Semantic Encoding</h3>
              <p>
                Terminology is controlled and consistent, producing strong embeddings
                and reliable retrieval in AI-mediated knowledge environments.
              </p>
            </div>
            <div className="solution-card">
              <h3>Cross-Referencing</h3>
              <p>
                Related concepts are explicitly linked, enabling readers to build
                schema connections across the full knowledge graph of a document.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container cta-section">
          <h2>See It in Action</h2>
          <p>View a live example using NAMCS healthcare survey data.</p>
          <Link to="/demo" className="btn-primary large">View Demo</Link>
        </div>
      </section>
    </div>
  );
}
