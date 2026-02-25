function IconBrain() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="8" stroke="#244855" strokeWidth="1.8" fill="none" />
      <path d="M12 18c0-3.31 2.69-6 6-6M24 18c0 3.31-2.69 6-6 6" stroke="#244855" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2.5" fill="#E64833" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="11" y="5" width="14" height="26" rx="3" stroke="#244855" strokeWidth="1.8" fill="none" />
      <circle cx="18" cy="28" r="1.5" fill="#244855" />
      <rect x="15" y="9" width="6" height="1.5" rx="0.75" fill="#244855" opacity="0.5" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="10" width="16" height="16" rx="3" stroke="#244855" strokeWidth="1.8" fill="none" />
      <circle cx="14" cy="18" r="1.5" fill="#E64833" />
      <circle cx="18" cy="18" r="1.5" fill="#E64833" />
      <circle cx="22" cy="18" r="1.5" fill="#E64833" />
      <path d="M14 10 v-4M18 10 v-4M22 10 v-4M14 26 v4M18 26 v4M22 26 v4M10 14 h-4M10 22 h-4M26 14 h4M26 22 h4" stroke="#244855" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ProblemPage() {
  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1>The Problem</h1>
          <p className="page-lead">
            Complex data is rich with insight, but most organizations cannot access its value —
            not because it is hidden, but because it is incomprehensible.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="two-column">
            <div>
              <h2>Data Without Structure Is Noise</h2>
              <p>
                Reports, surveys, and research datasets contain insights that could transform
                strategy, improve decisions, and create real competitive advantage. But dense
                tables and technical language lock that value behind a wall of cognitive friction.
              </p>
              <p>
                Human working memory has strict limits. When content is not structured
                to respect those limits, comprehension fails — not because readers lack
                intelligence, but because the content lacks engineering.
              </p>
            </div>
            <div className="stat-stack">
              <div className="stat-card">
                <div className="stat-number">80%</div>
                <div className="stat-label">of complex reports are never read past the executive summary</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3 to 7</div>
                <div className="stat-label">cognitive elements working memory can hold simultaneously</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">data generated annually, with no corresponding increase in human capacity</div>
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
              <div className="problem-icon"><IconBrain /></div>
              <h3>Cognitive Limits</h3>
              <p>
                Working memory capacity is fixed. Dense, unstructured content
                overloads it before meaning can be extracted.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon"><IconPhone /></div>
              <h3>Attention Economics</h3>
              <p>
                Digital platforms optimize for engagement velocity. Serious content
                with delayed payoff loses visibility by design.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon"><IconCpu /></div>
              <h3>Insights That Never Surface</h3>
              <p>
                Once filed, dense documents go dark. Colleagues skip them, search
                tools miss what matters, and the knowledge inside never reaches
                the decisions it was meant to inform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
