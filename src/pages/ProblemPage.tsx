export default function ProblemPage() {
  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>The Problem</h1>
          <p className="page-lead">
            Healthcare data is rich, complex, and critically important. But most people
            can't access it — not because it's hidden, but because it's incomprehensible.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="two-column">
            <div>
              <h2>Data Without Structure Is Noise</h2>
              <p>
                Reports, surveys, and clinical datasets contain insights that could
                transform policy, improve care, and save lives. But dense tables and
                technical language lock that value behind a wall of cognitive friction.
              </p>
              <p>
                Human working memory has strict limits. When content isn't structured
                to respect those limits, comprehension fails — not because readers lack
                intelligence, but because the content lacks engineering.
              </p>
            </div>
            <div className="stat-stack">
              <div className="stat-card">
                <div className="stat-number">80%</div>
                <div className="stat-label">of healthcare reports are never read past the executive summary</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3–7</div>
                <div className="stat-label">cognitive elements working memory can hold simultaneously</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">data generated annually — with no corresponding increase in human capacity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <h2>Three Forces Working Against You</h2>
          <div className="three-column">
            <div className="problem-card">
              <div className="problem-icon">🧠</div>
              <h3>Cognitive Limits</h3>
              <p>
                Working memory capacity is fixed. Dense, unstructured content
                overloads it before meaning can be extracted.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📱</div>
              <h3>Attention Economics</h3>
              <p>
                Digital platforms optimize for engagement velocity. Serious content
                with delayed payoff curves loses visibility by design.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🤖</div>
              <h3>AI Retrieval Fragility</h3>
              <p>
                Unstructured documents produce weak embeddings, ambiguous retrieval,
                and contextual drift in RAG-based systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
