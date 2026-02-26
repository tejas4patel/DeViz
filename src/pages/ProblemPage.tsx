import { Link } from 'react-router-dom';
import { Brain, Smartphone, Cpu, Zap, MoveRight } from 'lucide-react';

export default function ProblemPage() {
  return (
    <div className="page-content">

      {/* ── Hero ── */}
      <section className="prob-hero">
        <div className="container">
          <div className="prob-hero-eyebrow">Cognitive Load Theory × Attention Economy × Agentic Workflow Retrieval</div>
          <blockquote className="prob-hero-quote">
            <span className="prob-quote-mark">"</span>
            <span className="prob-quote-text">
              We cook food before we eat it.<br />
              Why do we consume information raw?
            </span>
            <span className="prob-quote-mark close">"</span>
          </blockquote>
          <p className="prob-hero-sub">
            As agentic workflow systems increasingly mediate how knowledge is discovered, interpreted, and synthesized,
            structure is no longer optional. Three forces — cognitive, motivational, and computational —
            determine which ideas travel, which endure, and which quietly fade.
          </p>
        </div>
      </section>

      {/* ── Three Forces ── */}
      <section className="content-section">
        <div className="container">
          <div className="section-label">The Core Problem</div>
          <h2>Three Forces Working Against Understanding</h2>
          <p className="section-intro-text">
            Most content fails not because it lacks value, but because it was never designed to align
            with how minds and machines actually process information.
          </p>

          <div className="force-cards-grid">

            <div className="force-card">
              <div className="force-card-accent" style={{ background: '#244855' }} />
              <div className="force-card-inner">
                <div className="force-card-num">01</div>
                <div className="force-card-icon"><Brain size={32} color="#244855" strokeWidth={2} /></div>
                <h3>Cognitive Limits</h3>
                <p className="force-card-intro">
                  Human working memory is fixed. Dense content overloads it before meaning can form.
                </p>
                <div className="force-card-detail">
                  <p>
                    Cognitive Load Theory demonstrates that working memory can process only a few interacting
                    elements simultaneously. Content that imposes high <em>extraneous cognitive load</em> — load
                    due to poor structure rather than genuine complexity — slows comprehension and reduces retention.
                  </p>
                  <p>
                    Expert compression — the tendency of specialists to omit foundational explanation —
                    creates barriers not because the ideas are bad, but because they are poorly scaffolded
                    for general comprehension. Each concept, terminology cluster, or implicit assumption becomes
                    a pressure point that risks overload before understanding can form.
                  </p>
                </div>
                <div className="force-insight">
                  <span className="force-insight-label">Research</span>
                  Sweller (1988) identified that poor instructional design can double the cognitive effort
                  required to process the same material, regardless of its intrinsic complexity.
                </div>
              </div>
            </div>

            <div className="force-card">
              <div className="force-card-accent" style={{ background: '#E64833' }} />
              <div className="force-card-inner">
                <div className="force-card-num">02</div>
                <div className="force-card-icon"><Smartphone size={32} color="#244855" strokeWidth={2} /></div>
                <h3>Dopamine Economics</h3>
                <p className="force-card-intro">
                  Digital platforms are engineered for variable reward. Serious content with delayed payoff
                  is structurally disadvantaged from the start.
                </p>
                <div className="force-card-detail">
                  <p>
                    Endless scroll, personalized feeds, and real-time recommendations create cycles of novelty
                    that continuously activate reward pathways. Research indicates prolonged use engages brain
                    reward systems in ways similar to addictive behavior, altering attention and emotional regulation.
                  </p>
                  <p>
                    Audiences develop characteristic behavioral patterns: rapid stimulus switching, preference
                    for low-effort pathways, and reduced tolerance for sustained cognitive effort — exactly
                    what dense, valuable content demands.
                  </p>
                </div>
                <div className="force-insight">
                  <span className="force-insight-label">Research</span>
                  Berridge &amp; Robinson (1998) showed dopamine drives <em>wanting</em> and anticipation,
                  not just pleasure — explaining why scroll mechanics create such persistent engagement loops.
                </div>
              </div>
            </div>

            <div className="force-card">
              <div className="force-card-accent" style={{ background: '#90AEAD' }} />
              <div className="force-card-inner">
                <div className="force-card-num">03</div>
                <div className="force-card-icon"><Cpu size={32} color="#244855" strokeWidth={2} /></div>
                <h3>Algorithmic Invisibility</h3>
                <p className="force-card-intro">
                  Poorly structured content produces weak embeddings in agentic workflow systems — becoming invisible
                  to the retrieval mechanisms now mediating discovery.
                </p>
                <div className="force-card-detail">
                  <p>
                    In agentic workflow-mediated discovery — especially RAG (Retrieval-Augmented Generation) systems —
                    structural quality directly influences algorithmic performance. Embedding models perform
                    better on content with clear logical segmentation, stable terminology, and rich metadata.
                  </p>
                  <p>
                    Poorly engineered content produces ambiguous embeddings and weak semantic anchors,
                    increasing the risk of incorrect retrieval or hallucinated summaries — directly
                    undermining the trustworthiness of any agentic workflow knowledge system built on that content.
                  </p>
                </div>
                <div className="force-insight">
                  <span className="force-insight-label">Implication</span>
                  In high-velocity information ecosystems, ideas compete algorithmically. Unstructured content,
                  no matter how valuable, loses — to retrieval systems and human attention alike.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Foreign Domain Gap ── */}
      <section className="content-section alt">
        <div className="container">
          <div className="two-column">
            <div>
              <div className="section-label">The Expertise Problem</div>
              <h2>The Foreign Domain Gap</h2>
              <p>
                Content that is dense, highly technical, or domain-deep can make perfect sense to experts —
                because years of experience allow them to internalize schemas that chunk many concepts
                into single cognitive units.
              </p>
              <p>
                For readers outside that expertise, each new term and concept becomes a separate element
                competing for limited cognitive resources. Each terminology cluster or implicit assumption
                risks overload before understanding can form.
              </p>
              <p>
                This is not a reading problem. It is a structural design problem. The content is not
                wrong — it is engineered for the wrong audience, without scaffolding for general comprehension.
              </p>
            </div>
            <div className="domain-gap-visual">
              <div className="domain-gap-card expert">
                <div className="dgv-label">Expert Reader</div>
                <div className="dgv-schema">
                  <span className="dgv-chunk">Schema A</span>
                  <span className="dgv-chunk">Schema B</span>
                  <span className="dgv-chunk">Schema C</span>
                </div>
                <div className="dgv-result success">Comprehension ✓</div>
              </div>
              <div className="domain-gap-arrow"><MoveRight size={26} strokeWidth={1.75} /></div>
              <div className="domain-gap-card novice">
                <div className="dgv-label">Novice Reader — same document</div>
                <div className="dgv-schema">
                  <span className="dgv-chunk overload">Term 1</span>
                  <span className="dgv-chunk overload">Term 2</span>
                  <span className="dgv-chunk overload">Term 3</span>
                  <span className="dgv-chunk overload">Term 4</span>
                  <span className="dgv-chunk overload">+12 more</span>
                </div>
                <div className="dgv-result failure">Cognitive Overload ✗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Attention Economy ── */}
      <section className="content-section">
        <div className="container">
          <div className="attention-callout">
            <div className="attention-callout-icon"><Zap size={32} color="#E64833" strokeWidth={2} /></div>
            <div className="attention-callout-body">
              <h3>Attention is a Shared Societal Resource Under Strain</h3>
              <p>
                Digital platforms strategically shape engagement patterns to extract attention as a commodity.
                Features like endless scroll remove natural stopping points, contributing to persistent distraction
                and reduced ability to engage with cognitively demanding material. This is not merely a personal
                productivity challenge — it has systemic implications for which expertise gets heard and which
                ideas shape policy and decisions.
              </p>
              <p>Modern audiences systematically develop these behavioral patterns:</p>
              <div className="attention-patterns">
                <div className="pattern-item">
                  <span className="pattern-dot red" />
                  Rapid stimulus switching — average engaged time on digital content measured in seconds
                </div>
                <div className="pattern-item">
                  <span className="pattern-dot red" />
                  Preference for low-effort pathways — skimming, scanning, abandoning at friction
                </div>
                <div className="pattern-item">
                  <span className="pattern-dot red" />
                  Reduced tolerance for sustained cognitive effort — delayed rewards reliably lose to instant ones
                </div>
                <div className="pattern-item">
                  <span className="pattern-dot red" />
                  Delayed reward aversion — exactly the dynamic serious, substantive content must overcome
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="content-section alt">
        <div className="container cta-section">
          <h2>The Future Belongs to Structured Ideas</h2>
          <p>
            In high-velocity ecosystems, structure determines which ideas travel, which endure,
            and which quietly fade. Content engineering is the discipline that resolves the mismatch.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/solution" className="btn-primary large">See the Solution</Link>
            <Link to="/demo" className="btn-secondary large">View Live Demo</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
