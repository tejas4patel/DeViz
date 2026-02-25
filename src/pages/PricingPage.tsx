/**
 * Pricing Page
 */

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

// Brand palette constants
const P = '#244855';   // brand primary (dark teal)
const S = '#E64833';   // brand secondary (coral)
const A = '#90AEAD';   // brand accent (muted teal)
const C = '#FBE9D0';   // cream

function CheckIcon({ color = S }: { color?: string }) {
  return (
    <Check size={16} color={color} strokeWidth={3} className="flex-shrink-0 mt-0.5" />
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold pr-4" style={{ color: P }}>{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform duration-200"
          style={{
            borderColor: P,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <Plus size={12} color={P} strokeWidth={3} className="transition-transform duration-200" style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }} />
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    q: 'How does document transformation work?',
    a: 'Upload any document (PDF, Word, PowerPoint, etc.) and DeViz automatically extracts key information, identifies data patterns, and generates interactive visual stories — in minutes.',
  },
  {
    q: 'Can I customize the generated visualizations?',
    a: 'Yes! All visualizations are fully customizable. Adjust colors, layouts, add annotations, and modify data presentations to perfectly match your brand and needs.',
  },
  {
    q: 'Is there a free trial?',
    a: '14-day free trial of our Professional plan — no credit card required. Transform up to 10 documents during your trial period.',
  },
  {
    q: 'What file formats do you support?',
    a: "PDF, Word, PowerPoint, Excel, and plain text formats are fully supported. We're continuously expanding our format library.",
  },
  {
    q: 'Is my data secure?',
    a: "Absolutely. Enterprise-grade encryption, SOC2 compliance, and full data sovereignty — your documents are never used for model training.",
  },
];

const tableRows = [
  { feature: 'Monthly transformations', starter: '25', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Visualization types',     starter: 'Core (15+)', pro: 'Premium (50+)', enterprise: 'Premium + Custom' },
  { feature: 'Team collaboration',      starter: '—', pro: '✓', enterprise: '✓' },
  { feature: 'API access',              starter: '—', pro: 'Basic', enterprise: 'Full + Custom' },
  { feature: 'Custom branding',         starter: '—', pro: '✓', enterprise: '✓' },
  { feature: 'Support',                 starter: 'Email (48h)', pro: 'Priority (4h)', enterprise: 'Dedicated' },
  { feature: 'SLA guarantee',           starter: '—', pro: '—', enterprise: '99.9% uptime' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const starter = annual ? 31 : 39;
  const pro = annual ? 119 : 149;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pb-36 pt-20" style={{ background: P }}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Coral glow */}
        <div
          className="absolute top-0 left-1/2 pointer-events-none"
          style={{
            width: 800, height: 400,
            transform: 'translateX(-50%)',
            background: `radial-gradient(ellipse, ${S}40, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative container mx-auto px-6 text-center">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/80 text-sm font-medium px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: A }} />
            No credit card required · Cancel anytime
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
            Simple,&nbsp;transparent
            <span className="block mt-2" style={{ color: S }}>pricing</span>
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            From quick document snapshots to enterprise-scale visual storytelling.
            Start free, scale as you grow.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            {[
              { num: '10,000+', label: 'Documents transformed' },
              { num: '500+',    label: 'Teams trust DeViz' },
              { num: '4.9 / 5', label: 'Average rating' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white">{num}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-4 border border-white/20 rounded-2xl px-6 py-3"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="text-sm font-medium" style={{ color: !annual ? '#fff' : 'rgba(255,255,255,0.45)' }}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
              style={{ background: annual ? S : 'rgba(255,255,255,0.3)' }}
              aria-label="Toggle billing cycle"
            >
              <span
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: annual ? '28px' : '4px' }}
              />
            </button>
            <span className="text-sm font-medium" style={{ color: annual ? '#fff' : 'rgba(255,255,255,0.45)' }}>
              Annual
            </span>
            {annual && (
              <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: S }}>
                Save 20%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Pricing Cards (overlap hero) ─────────────────────────────────── */}
      <div className="relative -mt-20 container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* Starter */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1" style={{ color: P }}>Starter</h3>
              <p className="text-sm text-slate-500">For individuals getting started</p>
            </div>
            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold" style={{ color: P }}>${starter}</span>
                <span className="text-slate-500 mb-2">/ mo</span>
              </div>
              {annual && <p className="text-sm text-slate-400 mt-1">Billed ${starter * 12} / year</p>}
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                '25 transformations / month',
                'Core visualization library (15+ types)',
                'HTML, PDF, PNG exports',
                'Email support within 48h',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="block text-center py-3 px-6 rounded-xl border-2 font-semibold transition-all duration-200"
              style={{ borderColor: P, color: P }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = P;
                (e.currentTarget as HTMLAnchorElement).style.color = C;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '';
                (e.currentTarget as HTMLAnchorElement).style.color = P;
              }}
            >
              Start Free Trial
            </Link>
          </div>

          {/* Professional — featured */}
          <div
            className="relative rounded-2xl p-8 flex flex-col"
            style={{
              background: `linear-gradient(140deg, #2a5565 0%, ${P} 100%)`,
              boxShadow: `0 30px 60px -12px ${P}80`,
              transform: 'scale(1.03)',
              zIndex: 10,
            }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span
                className="text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg uppercase tracking-wide"
                style={{ background: `linear-gradient(135deg, ${S}, #c23a26)` }}
              >
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Professional</h3>
              <p className="text-sm" style={{ color: A }}>Advanced storytelling for teams</p>
            </div>
            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-white">${pro}</span>
                <span className="mb-2" style={{ color: A }}>/ mo</span>
              </div>
              {annual && <p className="text-sm mt-1" style={{ color: A }}>Billed ${pro * 12} / year</p>}
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                'Unlimited transformations',
                'Premium visualization suite (50+ types)',
                'Team collaboration & sharing',
                'Priority support (4h response)',
                'Basic REST API access',
                'Custom branding & colors',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                  <CheckIcon color={S} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="block text-center py-3 px-6 rounded-xl font-bold transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${C}, #f5e0c0)`, color: P }}
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1" style={{ color: P }}>Enterprise</h3>
              <p className="text-sm text-slate-500">Scalable for large organizations</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold" style={{ color: P }}>Custom</span>
              <p className="text-sm text-slate-400 mt-1">Volume pricing available</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                'Everything in Professional',
                'Custom integrations & APIs',
                'Dedicated account manager',
                'SLA & SOC2 compliance',
                'On-premises deployment option',
                'Volume seat discounts',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="block text-center py-3 px-6 rounded-xl border-2 font-semibold transition-all duration-200"
              style={{ borderColor: P, color: P }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = P;
                (e.currentTarget as HTMLAnchorElement).style.color = C;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '';
                (e.currentTarget as HTMLAnchorElement).style.color = P;
              }}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* ── Comparison Table ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-20 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: P }}>Compare Plans</h2>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4" style={{ background: P }}>
            <div className="p-5 text-sm font-semibold text-white/70">Feature</div>
            <div className="p-5 text-center text-sm font-semibold text-white/70">Starter</div>
            <div
              className="p-5 text-center text-sm font-bold text-white border-x"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              Professional
            </div>
            <div className="p-5 text-center text-sm font-semibold text-white/70">Enterprise</div>
          </div>
          {tableRows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-4 border-t border-slate-100"
              style={{ background: i % 2 === 1 ? 'rgba(36,72,85,0.025)' : '#fff' }}
            >
              <div className="p-5 text-sm font-medium text-slate-700">{row.feature}</div>
              <div className="p-5 text-center text-sm text-slate-500">{row.starter}</div>
              <div
                className="p-5 text-center text-sm font-semibold border-x border-slate-100"
                style={{ color: P, background: `${P}08` }}
              >
                {row.pro}
              </div>
              <div className="p-5 text-center text-sm text-slate-500">{row.enterprise}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-20 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: P }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-24 max-w-4xl">
        <div
          className="rounded-2xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${P} 0%, #1a3540 100%)` }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-16 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `${S}30`, filter: 'blur(60px)' }}
          />
          <h2 className="relative text-4xl font-bold mb-4">Transform Your Documents Today</h2>
          <p className="relative text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Join thousands of professionals creating compelling visual stories with DeViz.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="py-4 px-8 rounded-xl font-bold text-lg transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${C}, #f5e0c0)`, color: P }}
            >
              Start Free Trial
            </Link>
            <Link
              to="/demo"
              className="py-4 px-8 rounded-xl font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
