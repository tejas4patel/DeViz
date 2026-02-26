import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

export default function SolutionPage() {
  return (
    <div className="page-content">

      {/* ── Hero ── */}
      <section className="sol-hero">
        <div className="container">
          <div className="sol-hero-eyebrow">Content Engineering as Cognitive Infrastructure</div>
          <h1>
            Structure is Not Cosmetic.<br />
            It is Infrastructure.
          </h1>
          <p className="sol-hero-thesis">
            "Content engineering is not editing. It is structural design — the difference between
            content that is merely published and content that is understood, retained, and reliably retrieved."
          </p>
          <p className="sol-hero-sub">
            DeViz applies five engineering practices — grounded in cognitive science, behavioral economics,
            and agentic workflow retrieval architecture — to transform raw documents into structured knowledge that survives
            the three forces working against it.
          </p>
        </div>
      </section>

      {/* ── What CE Is ── */}
      <section className="content-section">
        <div className="container">
          <div className="section-label">Defining the Discipline</div>
          <h2>Content Engineering: What It Is and Isn't</h2>
          <p className="section-intro-text">
            Content engineering is structural neuro-design — the intentional alignment of content with
            how minds and attention systems work. It operates at the intersection of human cognition,
            behavioral reinforcement systems, and agentic workflow retrieval architectures.
          </p>
          <div className="sol-concept-grid">
            <div className="sol-concept-card is">
              <div className="sol-concept-label">Content Engineering IS</div>
              <ul className="sol-concept-list">
                <li className="sol-concept-item yes">Structural design of knowledge artifacts</li>
                <li className="sol-concept-item yes">Alignment with cognitive architecture and memory limits</li>
                <li className="sol-concept-item yes">Progressive complexity sequencing for any audience</li>
                <li className="sol-concept-item yes">Semantic infrastructure for agentic workflow retrieval and RAG systems</li>
                <li className="sol-concept-item yes">Attention-aware engagement design that counters dopamine loops</li>
                <li className="sol-concept-item yes">Terminology control for consistency, precision, and embedding quality</li>
              </ul>
            </div>
            <div className="sol-concept-card is-not">
              <div className="sol-concept-label">Content Engineering IS NOT</div>
              <ul className="sol-concept-list">
                <li className="sol-concept-item no">Editing, copyediting, or proofreading</li>
                <li className="sol-concept-item no">Visual formatting or graphic design</li>
                <li className="sol-concept-item no">SEO keyword stuffing or optimization</li>
                <li className="sol-concept-item no">Content marketing, branding, or tone adjustment</li>
                <li className="sol-concept-item no">Summarization or oversimplification</li>
                <li className="sol-concept-item no">Arbitrary sectioning or performative bullet points</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Five Practices ── */}
      <section className="content-section alt">
        <div className="container">
          <div className="section-label">The Core Methodology</div>
          <h2>Five Engineering Practices</h2>
          <p className="section-intro-text">
            These practices reduce extraneous cognitive load, increase early value perception, and create
            structural pathways that support sustained engagement — for both human readers and agentic workflow retrieval systems.
          </p>

          <div className="practice-list">

            <div className="practice-item">
              <div className="practice-num">01</div>
              <div className="practice-content">
                <span className="practice-tag">Foundation</span>
                <h3>Structural Modeling Before Writing</h3>
                <p>
                  Define essential components — problem, context, mechanisms, evidence, implications —
                  before drafting begins. This reduces ambiguity, clarifies logical flow, and produces
                  content with an inherent cognitive architecture. Readers orient themselves quickly because
                  the structure is a map, not an afterthought. Without this step, even excellent ideas
                  are buried inside documents that readers cannot navigate. DeViz performs this structural
                  analysis automatically on every uploaded document.
                </p>
              </div>
            </div>

            <div className="practice-item">
              <div className="practice-num">02</div>
              <div className="practice-content">
                <span className="practice-tag">Consistency</span>
                <h3>Terminology Control</h3>
                <p>
                  Introduce key terms once and use them consistently throughout. Avoid semantic drift where
                  multiple near-synonyms inflate processing costs. Uncontrolled terminology forces readers
                  to mentally map equivalences — burning working memory that should be spent on comprehension.
                  Controlled vocabulary also directly improves agentic workflow embedding precision by creating stable
                  semantic anchors in the vector space, reducing retrieval ambiguity and the risk of
                  hallucinated or misattributed summaries.
                </p>
              </div>
            </div>

            <div className="practice-item">
              <div className="practice-num">03</div>
              <div className="practice-content">
                <span className="practice-tag">Calibration</span>
                <h3>Density Calibration</h3>
                <p>
                  Regulate how many new conceptual elements readers encounter simultaneously. For novice
                  readers, excessive term density early on causes cognitive interference and disengagement
                  before any value can be delivered. DeViz automatically modulates information density across
                  scenes, ensuring each new concept has space to stabilize before the next is introduced —
                  respecting the 3–7 element limit of working memory at every stage of comprehension.
                  Expert readers can choose to dive deeper; novice readers are not abandoned at the first page.
                </p>
              </div>
            </div>

            <div className="practice-item">
              <div className="practice-num">04</div>
              <div className="practice-content">
                <span className="practice-tag">Architecture</span>
                <h3>Layered Disclosure</h3>
                <p>
                  Begin with high-level orientation, then progressively include deeper detail. This
                  acknowledges that immediate comprehension and delayed mastery require different cognitive
                  approaches. Layered disclosure provides early cognitive payoffs — small, meaningful rewards
                  that counter dopamine-driven abandonment — while preserving rigorous depth for readers
                  who continue. It is the structural answer to the attention economy: make the first insight
                  immediate, make every subsequent scene worth staying for.
                </p>
              </div>
            </div>

            <div className="practice-item">
              <div className="practice-num">05</div>
              <div className="practice-content">
                <span className="practice-tag">Retrieval</span>
                <h3>Semantic Encoding for Agentic Workflow Retrieval</h3>
                <p>
                  Use clear headings, logical categories, and rich metadata. This makes content more
                  discoverable both for humans scanning and for agentic workflow retrieval systems. In RAG architectures,
                  content with strong semantic encoding produces high-quality embeddings with minimal
                  ambiguity — the difference between an agentic workflow system that reliably surfaces the right passage
                  and one that hallucinates context. Content engineering is infrastructure for trustworthy agentic workflow:
                  reducing noise in vector spaces and strengthening signal for accurate contextual retrieval.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Agentic Workflow / RAG ── */}
      <section className="content-section">
        <div className="container">
          <div className="section-label">Agentic Workflow &amp; Retrieval</div>
          <h2 className="rag-section-title">Content Engineering as Agentic Workflow Infrastructure</h2>
          <p className="rag-intro">
            In agentic workflow-mediated discovery — especially Retrieval-Augmented Generation (RAG) systems —
            the structural quality of content directly influences algorithmic performance.
            Well-engineered content is infrastructure for trustworthy agentic workflow, not just easier reading.
          </p>
          <div className="rag-grid">
            <div className="rag-card">
              <h4>Clear Logical Segmentation</h4>
              <p>
                Defined sections and logical boundaries allow embedding models to create precise,
                non-overlapping vector representations — so each concept occupies its own semantic space.
              </p>
            </div>
            <div className="rag-card">
              <h4>Stable Terminology</h4>
              <p>
                Consistent vocabulary creates reliable semantic anchors in vector spaces,
                reducing retrieval ambiguity and improving contextual accuracy at query time.
              </p>
            </div>
            <div className="rag-card">
              <h4>Rich Metadata</h4>
              <p>
                Structured headings, categories, and labels provide retrieval signals that guide
                agentic workflow systems toward the correct passages under semantically complex queries.
              </p>
            </div>
          </div>
          <div className="rag-warning">
            <strong>Without content engineering:</strong> Poorly structured content produces ambiguous embeddings
            and weak semantic anchors, increasing the risk of incorrect retrieval or hallucinated summaries —
            directly undermining the trustworthiness of any agentic workflow knowledge system built on that content.
          </div>
        </div>
      </section>

      {/* ── Three-Force Resolution ── */}
      <section className="content-section alt">
        <div className="container">
          <div className="section-label">The Resolution</div>
          <h2>How Content Engineering Mediates All Three Forces</h2>
          <p className="section-intro-text">
            Three forces shape modern knowledge survival. Content engineering is the single discipline
            that addresses all three simultaneously — through structure, not effort.
          </p>
          <div className="resolution-grid">

            <div className="resolution-item">
              <div>
                <div className="resolution-force-label">Cognitive Constraints</div>
                <div className="resolution-force">Fixed working memory limits comprehension of dense, unstructured content</div>
              </div>
              <div className="resolution-arrow"><MoveRight size={26} strokeWidth={1.75} /></div>
              <div className="resolution-solution">
                <strong>Structural Modeling + Density Calibration</strong>
                Reduces extraneous cognitive load by organizing content to match how the brain builds
                schemas — one stable concept at a time.
              </div>
            </div>

            <div className="resolution-item">
              <div>
                <div className="resolution-force-label">Motivational Constraints</div>
                <div className="resolution-force">Dopamine-driven attention economies favor instant, low-cost stimuli over deep content</div>
              </div>
              <div className="resolution-arrow"><MoveRight size={26} strokeWidth={1.75} /></div>
              <div className="resolution-solution">
                <strong>Layered Disclosure + Early Value Design</strong>
                Provides immediate cognitive payoffs at each scene to counter abandonment, while
                preserving depth for committed readers who continue.
              </div>
            </div>

            <div className="resolution-item">
              <div>
                <div className="resolution-force-label">Computational Constraints</div>
                <div className="resolution-force">Agentic workflow retrieval requires structural clarity for accurate embedding and contextual recall</div>
              </div>
              <div className="resolution-arrow"><MoveRight size={26} strokeWidth={1.75} /></div>
              <div className="resolution-solution">
                <strong>Semantic Encoding + Terminology Control</strong>
                Creates stable, high-precision vector representations that power reliable retrieval
                and prevent hallucination in agentic workflow-mediated knowledge systems.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="content-section">
        <div className="container cta-section">
          <h2>See Content Engineering in Action</h2>
          <p>
            Watch DeViz transform a real research document into a structured, cognitively-engineered
            interactive story — automatically, in seconds.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/demo" className="btn-primary large">View Live Demo</Link>
            <Link to="/register" className="btn-secondary large">Get Started Free</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
