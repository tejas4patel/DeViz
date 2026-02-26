/**
 * Privacy Policy Page
 */

import { Link } from 'react-router-dom';
import { Mail, User, FileText, BarChart3, CreditCard, CheckCircle, Shield } from 'lucide-react';

const P = '#244855';
const S = '#E64833';
const A = '#90AEAD';

const sections = [
  { id: 'introduction',   title: 'Introduction' },
  { id: 'what-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use',     title: 'How We Use Your Information' },
  { id: 'sharing',        title: 'Sharing & Disclosure' },
  { id: 'retention',      title: 'Data Retention' },
  { id: 'security',       title: 'Security Measures' },
  { id: 'rights',         title: 'Your Rights & Choices' },
  { id: 'cookies',        title: 'Cookies & Tracking' },
  { id: 'international',  title: 'International Transfers' },
  { id: 'contact',        title: 'Contact Us' },
];

function SectionNumber({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold mr-3 flex-shrink-0"
      style={{ background: A }}
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

function DataCard({ icon, title, items }: {
  icon: React.ReactNode; title: string; items: string[];
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: P }}>{icon}</span>
        <span className="text-sm font-bold" style={{ color: P }}>{title}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: A }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-4 rounded-xl border-l-4 text-sm"
      style={{ background: `${A}18`, borderColor: A, color: P }}
    >
      {children}
    </div>
  );
}

export default function PrivacyPage() {
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
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `${A}20`, filter: 'blur(80px)', transform: 'translate(30%, -30%)' }}
        />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            Last updated: February 25, 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have over your data.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { icon: '🔒', label: 'End-to-end encrypted' },
              { icon: '✓', label: 'SOC 2 compliant' },
              { icon: '🚫', label: 'Never sold to third parties' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-white/80 border border-white/15 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <span>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sticky TOC */}
          <aside className="lg:w-60 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-md border border-slate-200 p-5">
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
                      style={{ background: `${A}25`, color: P }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-tight">{s.title}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <a
                  href="mailto:privacy@deviz.io"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: A }}
                >
                  <Mail size={16} />
                  privacy@deviz.io
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 bg-white rounded-2xl shadow-md border border-slate-200 px-8 py-6">

            <Section id="introduction" n={1} title="Introduction">
              <p>
                DeViz, Inc. ("DeViz," "we," "us," or "our") is committed to protecting your personal information. This Privacy Policy describes how we collect, use, store, and share information when you use the DeViz platform and related services ("Service").
              </p>
              <p>
                By using the Service, you consent to the data practices described in this policy. If you do not agree, please do not use the Service.
              </p>
              <Highlight>
                <strong>Our commitment:</strong> We never sell your personal data. Your documents are processed solely to provide the Service and are not used to train our AI models without your explicit consent.
              </Highlight>
            </Section>

            <Section id="what-we-collect" n={2} title="Information We Collect">
              <p>We collect information in the following categories:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <DataCard
                  icon={<User size={16} />}
                  title="Account Information"
                  items={['Name and email address', 'Company name (optional)', 'Password (hashed)', 'Profile preferences']}
                />
                <DataCard
                  icon={<FileText size={16} strokeWidth={2} />}
                  title="Content & Documents"
                  items={['Uploaded files and documents', 'Generated visual stories', 'Annotations and edits', 'Exported outputs']}
                />
                <DataCard
                  icon={<BarChart3 size={16} strokeWidth={2} />}
                  title="Usage Data"
                  items={['Features used and actions taken', 'Processing job logs', 'Error and performance data', 'Session duration']}
                />
                <DataCard
                  icon={<CreditCard size={16} strokeWidth={2} />}
                  title="Billing Data"
                  items={['Payment method details (via Stripe)', 'Billing address', 'Transaction history', 'Plan and subscription status']}
                />
              </div>
            </Section>

            <Section id="how-we-use" n={3} title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  'Provide, operate, and improve the Service',
                  'Process your documents and generate visual outputs',
                  'Authenticate your identity and manage your account',
                  'Process payments and send billing communications',
                  'Send product updates, security alerts, and support messages',
                  'Analyse aggregate usage patterns to improve our product (anonymised data only)',
                  'Comply with legal obligations and enforce our Terms of Service',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: A }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Highlight>
                We do <strong>not</strong> use your uploaded documents or generated stories to train AI models without your explicit opt-in consent.
              </Highlight>
            </Section>

            <Section id="sharing" n={4} title="Sharing & Disclosure">
              <p>
                We do not sell, rent, or trade your personal information. We may share your data only in the following limited circumstances:
              </p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  { title: 'Service providers', desc: 'Trusted vendors (e.g., Stripe for payments, AWS for hosting) under strict data-processing agreements' },
                  { title: 'Legal requirements', desc: 'When required by law, court order, or to protect the rights and safety of DeViz and its users' },
                  { title: 'Business transfers', desc: 'In connection with a merger, acquisition, or sale of assets — you will be notified before any such transfer' },
                  { title: 'With your consent', desc: 'When you explicitly authorise us to share information with a third party' },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: A }} />
                    <span><strong style={{ color: P }}>{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="retention" n={5} title="Data Retention">
              <p>
                We retain your personal data for as long as your account is active or as needed to provide the Service. Specific retention windows:
              </p>
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
                {[
                  { type: 'Account information', period: 'Duration of account + 30 days after deletion' },
                  { type: 'Uploaded documents', period: 'Per your storage settings (default: 90 days)' },
                  { type: 'Generated stories', period: 'Indefinitely while account is active' },
                  { type: 'Billing records', period: '7 years (legal requirement)' },
                  { type: 'Usage/analytics logs', period: '12 months (anonymised after 90 days)' },
                ].map((row, i) => (
                  <div
                    key={row.type}
                    className="flex justify-between items-center px-4 py-3 text-sm border-b border-slate-100 last:border-0"
                    style={{ background: i % 2 === 0 ? '#fff' : `${A}08` }}
                  >
                    <span className="font-medium" style={{ color: P }}>{row.type}</span>
                    <span className="text-slate-500 text-right ml-4">{row.period}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3">
                You may request deletion of your account and associated data at any time from your account settings or by contacting us.
              </p>
            </Section>

            <Section id="security" n={6} title="Security Measures">
              <p>
                We implement industry-standard technical and organisational measures to protect your data, including:
              </p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  'TLS 1.3 encryption for all data in transit',
                  'AES-256 encryption for data at rest',
                  'Regular third-party security audits and penetration testing',
                  'SOC 2 Type II compliance',
                  'Role-based access controls for internal staff',
                  'Automated threat detection and incident response procedures',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Shield size={16} color={A} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                No method of transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we work diligently to protect your information.
              </p>
            </Section>

            <Section id="rights" n={7} title="Your Rights & Choices">
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  { right: 'Access', desc: 'Request a copy of the personal data we hold about you' },
                  { right: 'Correction', desc: 'Request correction of inaccurate or incomplete data' },
                  { right: 'Deletion', desc: 'Request deletion of your personal data ("right to be forgotten")' },
                  { right: 'Portability', desc: 'Request your data in a structured, machine-readable format' },
                  { right: 'Objection', desc: 'Object to processing based on legitimate interests' },
                  { right: 'Restriction', desc: 'Request restriction of processing in certain circumstances' },
                ].map(({ right, desc }) => (
                  <div key={right} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="text-sm font-bold mb-1" style={{ color: P }}>{right}</div>
                    <div className="text-xs text-slate-500">{desc}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@deviz.io" className="underline font-medium" style={{ color: S }}>
                  privacy@deviz.io
                </a>. We will respond within 30 days.
              </p>
            </Section>

            <Section id="cookies" n={8} title="Cookies & Tracking">
              <p>
                We use cookies and similar tracking technologies to operate and improve the Service. Types of cookies we use:
              </p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  { name: 'Essential cookies', desc: 'Required for authentication and core service functionality. Cannot be disabled.' },
                  { name: 'Analytics cookies', desc: 'Help us understand how users interact with the Service (anonymised). Can be opted out via settings.' },
                  { name: 'Preference cookies', desc: 'Remember your settings and customisations. Optional.' },
                ].map(({ name, desc }) => (
                  <li key={name} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: A }} />
                    <span><strong style={{ color: P }}>{name}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                You can manage cookie preferences in your account settings or via your browser settings.
              </p>
            </Section>

            <Section id="international" n={9} title="International Transfers">
              <p>
                DeViz is based in the United States. If you access the Service from outside the US, your data may be transferred to and processed in the US and other countries where our service providers operate.
              </p>
              <p>
                For users in the European Economic Area (EEA) or United Kingdom, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission to lawfully transfer personal data outside the EEA.
              </p>
            </Section>

            <Section id="contact" n={10} title="Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out:
              </p>
              <div
                className="mt-4 rounded-xl p-5 border border-slate-200"
                style={{ background: `${P}06` }}
              >
                <p className="font-bold mb-1" style={{ color: P }}>DeViz Privacy Team</p>
                <p className="text-sm">
                  Email:{' '}
                  <a href="mailto:privacy@deviz.io" className="underline font-medium" style={{ color: S }}>
                    privacy@deviz.io
                  </a>
                </p>
                <p className="text-sm mt-1">Atlanta, GA, USA</p>
                <p className="text-sm mt-3 text-slate-500">
                  You may also submit a request via our{' '}
                  <Link to="/contact" className="underline" style={{ color: S }}>contact page</Link>.
                  We respond to all privacy requests within 30 days.
                </p>
              </div>
            </Section>

          </article>
        </div>
      </div>
    </div>
  );
}
