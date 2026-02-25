/**
 * Contact Page
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CreditCard, Settings, Users, CheckCircle, Mail, MessageSquare, MapPin, Loader2 } from 'lucide-react';

const P = '#244855';
const S = '#E64833';
const A = '#90AEAD';
const C = '#FBE9D0';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'sales' | 'support' | 'partnership';
}

const inquiryTypes: {
  value: FormData['inquiryType'];
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'general',
    label: 'General Inquiry',
    desc: 'Questions about DeViz',
    icon: <MessageCircle size={20} strokeWidth={2} />,
  },
  {
    value: 'sales',
    label: 'Sales & Pricing',
    desc: 'Plans and pricing info',
    icon: <CreditCard size={20} strokeWidth={2} />,
  },
  {
    value: 'support',
    label: 'Technical Support',
    desc: 'Help with your account',
    icon: <Settings size={20} strokeWidth={2} />,
  },
  {
    value: 'partnership',
    label: 'Partnership',
    desc: 'Collaboration opportunities',
    icon: <Users size={20} strokeWidth={2} />,
  },
];

const responseTimes = [
  { label: 'General Inquiries', time: '24 hours' },
  { label: 'Sales Questions',   time: '2 hours' },
  { label: 'Technical Support', time: '4 hours' },
  { label: 'Enterprise',        time: '1 hour' },
];

function InputField({
  label, id, type = 'text', name, value, onChange, required, placeholder,
}: {
  label: string; id: string; type?: string; name: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2" style={{ color: P }}>
        {label}{required && <span style={{ color: S }}> *</span>}
      </label>
      <input
        type={type} id={id} name={name} value={value}
        onChange={onChange} required={required} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
        style={{
          background: `${P}06`,
          border: `1.5px solid #d4c4a8`,
          color: P,
        }}
        onFocus={e => (e.currentTarget.style.borderColor = P)}
        onBlur={e => (e.currentTarget.style.borderColor = '#d4c4a8')}
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', company: '', subject: '', message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: `linear-gradient(135deg, ${C} 0%, #f5e0c0 100%)` }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${S}15` }}
          >
            <CheckCircle size={40} color={S} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: P }}>Message Sent!</h2>
          <p className="text-slate-600 mb-2">
            Thanks for reaching out, <strong>{formData.name || 'there'}</strong>.
          </p>
          <p className="text-sm text-slate-500 mb-8">We'll get back to you within 24 hours.</p>
          <Link
            to="/"
            className="inline-block py-3 px-8 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${P}, #1a3540)` }}
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
          style={{ background: `${A}25`, filter: 'blur(80px)', transform: 'translate(30%, -30%)' }}
        />
        <div className="relative container mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/75 text-sm font-medium px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            We typically reply within a few hours
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Let&apos;s talk
          </h1>
          <p className="text-xl max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Have a question, a project in mind, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-14 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left sidebar (2 cols) ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Inquiry type selector */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: A }}>
                What can we help with?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {inquiryTypes.map(({ value, label, desc, icon }) => {
                  const active = formData.inquiryType === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, inquiryType: value }))}
                      className="flex flex-col items-start gap-1.5 p-3.5 rounded-xl text-left transition-all duration-150 border-2"
                      style={
                        active
                          ? { background: `${P}`, borderColor: P, color: '#fff', boxShadow: `0 4px 16px ${P}40` }
                          : { background: `${P}06`, borderColor: 'transparent', color: P }
                      }
                    >
                      <span style={{ color: active ? '#fff' : S }}>{icon}</span>
                      <span className="text-xs font-bold leading-tight">{label}</span>
                      <span className="text-xs opacity-70 leading-tight">{desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: A }}>
                Direct contact
              </h3>
              {[
                {
                  icon: <Mail size={20} />,
                  label: 'Email',
                  value: 'hello@deviz.io',
                  bg: `${S}15`,
                  fg: S,
                },
                {
                  icon: <MessageSquare size={20} />,
                  label: 'Live Chat',
                  value: 'Mon–Fri, 9 AM–6 PM EST',
                  bg: `${A}25`,
                  fg: P,
                },
                {
                  icon: <MapPin size={20} />,
                  label: 'Office',
                  value: 'San Francisco, CA',
                  bg: `${P}12`,
                  fg: P,
                },
              ].map(({ icon, label, value, bg, fg }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg, color: fg }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-sm font-semibold" style={{ color: P }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response times */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${P} 0%, #1a3540 100%)` }}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: A }}>
                Response times
              </h3>
              <div className="space-y-3">
                {responseTimes.map(({ label, time }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-white/70">{label}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${S}30`, color: '#fca5a5' }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Contact Form (3 cols) ─────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: P }}>Send us a message</h2>
              <p className="text-sm text-slate-500 mb-8">
                Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Your Name" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required placeholder="Jane Smith"
                  />
                  <InputField
                    label="Email Address" id="email" type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required placeholder="jane@company.com"
                  />
                </div>

                {/* Company + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Company" id="company" name="company"
                    value={formData.company} onChange={handleChange}
                    placeholder="Acme Corp (optional)"
                  />
                  <InputField
                    label="Subject" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    required placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: P }}>
                    Message<span style={{ color: S }}> *</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={6}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us more about what you're working on..."
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none"
                    style={{
                      background: `${P}06`,
                      border: '1.5px solid #d4c4a8',
                      color: P,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = P)}
                    onBlur={e => (e.currentTarget.style.borderColor = '#d4c4a8')}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl font-bold text-base text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: `linear-gradient(135deg, ${P} 0%, #1a3540 100%)` }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 size={20} className="animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="text-xs text-center text-slate-400">
                  By submitting, you agree to our{' '}
                  <Link to="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
