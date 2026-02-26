/**
 * Landing Page
 */

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CircleArrowRight } from 'lucide-react';

const scenes = [
  {
    title: "Raw Information Is Cognitively Expensive",
    description: "Dense documents overload working memory. Without structure, readers must mentally organize ideas themselves, increasing cognitive friction and reducing retention."
  },
  {
    title: "Structure Reduces Extraneous Load",
    description: "When ideas are sequenced and grouped intentionally, the brain processes them more efficiently. Story-driven visuals externalize structure and lower comprehension cost."
  },
  {
    title: "Visual Stories Accelerate Understanding",
    description: "Humans recognize patterns faster than they parse paragraphs. Visual sequencing transforms complex relationships into immediately graspable schemas."
  },
  {
    title: "Narrative Creates Retention",
    description: "Information attached to a narrative arc is remembered longer. Structured story progression converts isolated facts into meaningful mental models."
  },
  {
    title: "Progressive Disclosure Controls Density",
    description: "Introducing complexity step by step prevents overload. Each scene stabilizes a concept before layering additional relationships."
  },
  {
    title: "Engagement Follows Perceived Reward",
    description: "Modern platforms favor fast feedback loops. Story segmentation provides early cognitive payoff, keeping users engaged without sacrificing depth."
  },
  {
    title: "Semantic Clarity Improves Agentic Workflow Retrieval",
    description: "Well-structured content creates stable conceptual boundaries. This improves embedding precision and strengthens retrieval in agentic workflow-driven systems."
  },
  {
    title: "Structure Determines Which Ideas Travel",
    description: "In high-velocity ecosystems, ideas compete for attention. Structured, visualized knowledge is more durable, portable, and shareable than unengineered text."
  }
];

function IconBrain() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="rgba(36,72,85,0.08)" />
      <path d="M14 20c0-3.31 2.69-6 6-6 1.66 0 3.17.68 4.26 1.77M26 20c0 3.31-2.69 6-6 6a5.98 5.98 0 0 1-4.26-1.77" stroke="#244855" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 14v2M20 24v2M14 20h2M24 20h2" stroke="#244855" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2.5" fill="#E64833" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="rgba(36,72,85,0.08)" />
      <path d="M22 11 L14 22 h6 L18 29 L26 18 h-6 Z" fill="#E64833" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="rgba(36,72,85,0.08)" />
      <path d="M20 12 L29 17 L20 22 L11 17 Z" fill="#244855" opacity="0.9" />
      <path d="M11 21 L20 26 L29 21" stroke="#244855" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M11 25 L20 30 L29 25" stroke="#E64833" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function StoryPreviewCard() {
  const [idx, setIdx] = useState(0);
  const scene = scenes[idx];
  const progress = ((idx + 1) / scenes.length) * 100;

  return (
    <div className="story-preview-card">
      <div className="story-preview-header">
        <div className="story-preview-dot coral" />
        <div className="story-preview-dot muted" />
        <div className="story-preview-dot muted" />
        <span className="story-preview-label">{idx + 1} of {scenes.length}</span>
      </div>
      <div className="story-preview-title" style={{ height: '3.5rem', display: 'flex', alignItems: 'flex-start' }}>{scene.title}</div>
      <div className="story-preview-body" style={{ height: '5rem', display: 'flex', alignItems: 'flex-start' }}>{scene.description}</div>
      <div className="story-preview-progress">
        <div className="story-preview-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="story-preview-nav">
        <button
          className="story-preview-btn"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          style={{ opacity: idx === 0 ? 0.35 : 1 }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          className="story-preview-btn primary"
          onClick={() => setIdx(i => Math.min(scenes.length - 1, i + 1))}
          disabled={idx === scenes.length - 1}
          style={{ opacity: idx === scenes.length - 1 ? 0.35 : 1 }}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">Cognitive Information Design</div>
          <h1 className="hero-title">
            Transform Documents into
            <span className="hero-accent"> Interactive Stories</span>
          </h1>
          <p className="hero-description">
            Upload a PDF or Word file and DeViz reorganizes it into engaging, structured
            narratives built for understanding and retention.
          </p>
          <div className="hero-actions">
            <Link to="/demo" className="btn-primary large">See Live Demo</Link>
            <Link to="/register" className="btn-secondary large">Get Started Free</Link>
          </div>
        </div>
        <div className="hero-visual">
          <StoryPreviewCard />
        </div>
      </section>

      {/* ── Stats teaser ── */}
      <section className="landing-stats">
        <div className="container">
          <div className="landing-stats-row">
            <div className="landing-stat">
              <div className="landing-stat-num">80%</div>
              <div className="landing-stat-label">of complex reports never read past the executive summary</div>
            </div>
            <div className="landing-stat-divider" />
            <div className="landing-stat">
              <div className="landing-stat-num">3–7</div>
              <div className="landing-stat-label">cognitive elements working memory can hold at once</div>
            </div>
            <div className="landing-stat-divider" />
            <div className="landing-stat">
              <div className="landing-stat-num">∞</div>
              <div className="landing-stat-label">content produced annually — zero increase in human processing capacity</div>
            </div>
          </div>
          <div className="landing-stats-link">
            <Link to="/problem" className="landing-learn-link">Understand why this matters <ChevronRight size={15} strokeWidth={2.5} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why DeViz?</h2>
          <p className="section-lead">
            Built on cognitive science research to make complex information genuinely digestible — for human readers and agentic workflow systems alike.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap"><IconBrain /></div>
              <h3>Cognitive Engineering</h3>
              <p>Built on cognitive load theory to present exactly the right amount of information at each step.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap"><IconZap /></div>
              <h3>Agentic Workflow Powered</h3>
              <p>Advanced algorithms automatically structure content for optimal comprehension and retention.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap"><IconLayers /></div>
              <h3>Progressive Disclosure</h3>
              <p>Readers choose their depth. Surface level or deep dive — the same story adapts to every need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing-cta">
        <div className="container">
          <h2>Ready to see it in action?</h2>
          <div className="landing-cta-links">
            <Link to="/problem" className="landing-cta-card">
              <span className="landing-cta-label">The Problem</span>
              <span className="landing-cta-desc">Why raw information fails readers and agentic workflow systems</span>
              <CircleArrowRight size={20} strokeWidth={1.5} className="landing-cta-arrow" />
            </Link>
            <Link to="/solution" className="landing-cta-card">
              <span className="landing-cta-label">The Solution</span>
              <span className="landing-cta-desc">Five engineering practices that fix it</span>
              <CircleArrowRight size={20} strokeWidth={1.5} className="landing-cta-arrow" />
            </Link>
            <Link to="/demo" className="landing-cta-card accent">
              <span className="landing-cta-label">Live Demo</span>
              <span className="landing-cta-desc">See a real document transformed in seconds</span>
              <CircleArrowRight size={20} strokeWidth={1.5} className="landing-cta-arrow" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
