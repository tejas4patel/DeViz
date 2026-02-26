/**
 * Terms of Service Page
 */

import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const P = '#244855';
const S = '#E64833';
const A = '#90AEAD';

const sections = [
  { id: 'introduction',    title: 'Introduction & Acceptance' },
  { id: 'service',         title: 'Description of Service' },
  { id: 'accounts',        title: 'User Accounts' },
  { id: 'acceptable-use',  title: 'Acceptable Use' },
  { id: 'ip',              title: 'Intellectual Property' },
  { id: 'payment',         title: 'Payment Terms' },
  { id: 'availability',    title: 'Service Availability' },
  { id: 'liability',       title: 'Limitation of Liability' },
  { id: 'termination',     title: 'Termination' },
  { id: 'governing-law',   title: 'Governing Law' },
];

function SectionNumber({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold mr-3 flex-shrink-0"
      style={{ background: S }}
    >
      {n}
    </span>
  );
}

function Section({ id, n, title, children }: {
  id: string; n: number; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-10 pb-8 border-b border-slate-100 last:border-0 scroll-mt-24">
      <div className="flex items-center mb-4">
        <SectionNumber n={n} />
        <h2 className="text-xl font-bold" style={{ color: P }}>{title}</h2>
      </div>
      <div className="ml-10 space-y-3 text-slate-600 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-4 rounded-xl border-l-4 text-sm"
      style={{ background: `${S}08`, borderColor: S, color: P }}
    >
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="relative overflow-hidden pt-16 pb-20" style={{ background: P }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            Last updated: February 25, 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Please read these terms carefully before using DeViz. By accessing our service, you agree to be bound by the conditions below.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sticky TOC */}
          <aside className="lg:w-60 flex-shrink-0">
            <div
              className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-md border border-slate-200 p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: A }}>
                On this page
              </p>
              <nav className="space-y-1">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-slate-50"
                    style={{ color: '#64748b' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = P;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#64748b';
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${S}15`, color: S }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-tight">{s.title}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: S }}
                >
                  <MessageCircle size={16} />
                  Questions? Contact us
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 bg-white rounded-2xl shadow-md border border-slate-200 px-8 py-6">

            <Section id="introduction" n={1} title="Introduction & Acceptance">
              <p>
                Welcome to DeViz. These Terms of Service ("Terms") govern your access to and use of the DeViz platform, including all related websites, mobile applications, and services (collectively, the "Service") operated by DeViz, Inc. ("DeViz," "we," "us," or "our").
              </p>
              <p>
                By creating an account or using the Service in any way, you confirm that you are at least 18 years old, have read and understood these Terms, and agree to be bound by them. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
              </p>
              <Highlight>
                <strong>Important:</strong> These Terms contain a limitation of liability clause and a binding arbitration provision. Please read them carefully.
              </Highlight>
            </Section>

            <Section id="service" n={2} title="Description of Service">
              <p>
                DeViz is an agentic workflow-powered platform that transforms documents — including PDFs, Word files, PowerPoint presentations, and spreadsheets — into interactive visual stories, dashboards, and narratives designed for comprehension and engagement.
              </p>
              <p>
                The Service includes document upload and processing, agentic workflow-driven insight extraction, visualization generation, export capabilities, and collaboration tools. Features available to you depend on your subscription plan.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with reasonable notice where practicable.
              </p>
            </Section>

            <Section id="accounts" n={3} title="User Accounts">
              <p>
                To access most features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at <a href="mailto:hello@deviz.io" className="underline" style={{ color: S }}>hello@deviz.io</a> if you suspect unauthorized access.
              </p>
              <p>
                You may not share your account credentials with others. Each account is for the individual or entity that created it. Team plans include multiple seats as specified in your plan.
              </p>
            </Section>

            <Section id="acceptable-use" n={4} title="Acceptable Use">
              <p>You agree not to use the Service to:</p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  'Upload content you do not have the rights to use or distribute',
                  'Violate any applicable local, state, national, or international law or regulation',
                  'Transmit harmful, offensive, defamatory, or fraudulent content',
                  'Attempt to reverse-engineer, decompile, or extract the underlying AI models',
                  'Scrape, crawl, or use automated means to access the Service beyond normal use',
                  'Circumvent any security or authentication measures',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: S }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate accounts that violate these conditions without notice.
              </p>
            </Section>

            <Section id="ip" n={5} title="Intellectual Property">
              <p>
                <strong style={{ color: P }}>Your content:</strong> You retain full ownership of all documents and data you upload to DeViz. By uploading content, you grant DeViz a limited, non-exclusive license to process your content solely for the purpose of providing the Service to you.
              </p>
              <p>
                <strong style={{ color: P }}>Our service:</strong> The DeViz platform, including its software, design, algorithms, and generated visualization templates, is owned by DeViz, Inc. and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without our express written permission.
              </p>
              <p>
                <strong style={{ color: P }}>Your outputs:</strong> Visual stories and outputs generated from your documents belong to you. We do not claim ownership over your outputs.
              </p>
            </Section>

            <Section id="payment" n={6} title="Payment Terms">
              <p>
                Paid plans are billed in advance on a monthly or annual basis. All prices are in USD. By providing payment information, you authorize us to charge your payment method for all fees incurred.
              </p>
              <p>
                Subscriptions renew automatically unless cancelled before the renewal date. You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period — no partial-period refunds are provided.
              </p>
              <Highlight>
                We offer a <strong>14-day free trial</strong> for the Professional plan. No charge until the trial ends. Cancel before the trial period ends to avoid any charge.
              </Highlight>
            </Section>

            <Section id="availability" n={7} title="Service Availability">
              <p>
                We strive to maintain high availability but do not guarantee uninterrupted access to the Service. Scheduled maintenance, unexpected outages, and third-party service failures may affect availability.
              </p>
              <p>
                Enterprise plans include specific uptime commitments defined in a separate Service Level Agreement (SLA). Starter and Professional plans do not include SLA guarantees.
              </p>
              <p>
                We will make reasonable efforts to notify users in advance of scheduled maintenance that significantly impacts service availability.
              </p>
            </Section>

            <Section id="liability" n={8} title="Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, DeViz and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
              </p>
              <p>
                Our total aggregate liability for any claims arising out of or relating to these Terms or the Service shall not exceed the greater of (a) the amount you paid to us in the twelve months preceding the claim, or (b) $100.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or limitations on liability. In those jurisdictions, our liability is limited to the extent permitted by law.
              </p>
            </Section>

            <Section id="termination" n={9} title="Termination">
              <p>
                You may terminate your account at any time from your account settings. We may suspend or terminate your access to the Service with or without notice if you breach these Terms, engage in fraudulent activity, or for any other reason at our sole discretion.
              </p>
              <p>
                Upon termination, your right to use the Service ceases immediately. We will retain your data for 30 days following termination to allow for data export, after which it may be permanently deleted.
              </p>
            </Section>

            <Section id="governing-law" n={10} title="Governing Law">
              <p>
                These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved through binding arbitration under the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction.
              </p>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
              <p className="text-sm" style={{ color: A }}>
                Questions about these Terms? Reach us at{' '}
                <a href="mailto:hello@deviz.io" className="underline" style={{ color: S }}>hello@deviz.io</a>{' '}
                or visit our <Link to="/contact" className="underline" style={{ color: S }}>contact page</Link>.
              </p>
            </Section>

          </article>
        </div>
      </div>
    </div>
  );
}
