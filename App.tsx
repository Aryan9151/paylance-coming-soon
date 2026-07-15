import { useEffect, useMemo, useRef, useState } from 'react';
import { Mail, ArrowRight, X, Shield, FileText } from 'lucide-react';

const LOGO_SRC = '/WhatsApp_Image_2026-05-27_at_12.55.50_AM-removebg-preview.png';

/* ----------------------------- Floating Particles ----------------------------- */

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

function useParticles(count = 28) {
  return useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 20,
        drift: (Math.random() - 0.5) * 60,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return arr;
  }, [count]);
}

function Particles() {
  const particles = useParticles(30);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-neon-300 animate-floatUp"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 8px rgba(77, 166, 255, 0.8), 0 0 16px rgba(26, 140, 255, 0.4)',
            ['--tw-translate-x' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Background Layers ----------------------------- */

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden>
      {/* Deep radial glow from top */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid mask-fade-edges animate-gridMove opacity-60" />

      {/* Large ambient orbs */}
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neon-500/20 blur-[140px] animate-pulseGlow" />
      <div
        className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[120px] animate-pulseGlow"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-0 -right-32 h-[450px] w-[450px] rounded-full bg-neon-400/15 blur-[130px] animate-pulseGlow"
        style={{ animationDelay: '4s' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#03060f_100%)]" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ----------------------------- Logo ----------------------------- */

function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 opacity-0 animate-riseIn" style={{ animationDelay: '0.1s' }}>
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-neon-400 blur-md opacity-50 animate-pulseGlow" />
        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-ink-800 p-1.5 shadow-neon ring-1 ring-white/10">
          <img src={LOGO_SRC} alt="PaylanceX" className="h-full w-full object-contain" />
        </div>
      </div>
      <span className="font-display text-2xl font-bold tracking-tight text-gradient">
        PaylanceX
      </span>
    </div>
  );
}

/* ----------------------------- Status Pill ----------------------------- */

function StatusPill() {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 opacity-0 animate-riseIn"
      style={{ animationDelay: '0.25s' }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-300 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-300 shadow-neon-sm" />
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-neon-100">
        Launching Soon
      </span>
    </div>
  );
}

/* ----------------------------- Contact Modal ----------------------------- */

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

function ContactModal({ open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const email = 'support@paylancex.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="relative w-full max-w-md animate-fadeScale"
      >
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 shadow-glass">
          {/* Top glow line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-300/80 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-neon-100/60 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-neon-300/30 to-neon-600/20 ring-1 ring-white/10">
              <Mail className="h-5 w-5 text-neon-200" />
            </div>
            <div>
              <h2 id="contact-title" className="font-display text-lg font-semibold text-white">
                Get in touch
              </h2>
              <p className="text-sm text-neon-100/50">We'd love to hear from you.</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={copyEmail}
              className="group flex w-full items-center justify-between gap-3 rounded-2xl glass px-5 py-4 text-left transition hover:ring-1 hover:ring-neon-300/40"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-neon-300" />
                <span className="text-sm font-medium text-neon-50">{email}</span>
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-wider transition ${
                  copied ? 'text-accent-400' : 'text-neon-200/60 group-hover:text-neon-100'
                }`}
              >
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>

            <a
              href={`mailto:${email}`}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-400 to-neon-600 px-5 py-4 text-sm font-semibold text-white shadow-neon transition hover:shadow-neon-lg"
            >
              Send an email
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-neon-100/40">
            Press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Legal Modal ----------------------------- */

type LegalModalProps = {
  open: 'privacy' | 'terms' | null;
  onClose: () => void;
};

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    body: [
      'This Privacy Policy describes how PaylanceX ("we", "us") collects, uses, and shares information when you interact with our website and services.',
      'We may collect information you provide directly — such as your email address when you contact us — as well as technical data collected automatically, including device type, browser, and usage patterns.',
      'We use this information to operate, maintain, and improve our services, to respond to your inquiries, and to ensure the security of our platform.',
      'We do not sell your personal information. We may share data with trusted service providers who act on our behalf under appropriate confidentiality agreements.',
      'You may request access to, correction of, or deletion of your personal data at any time by contacting support@paylancex.com.',
      'This policy may be updated periodically. Material changes will be communicated on this page.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    body: [
      'These Terms of Service govern your access to and use of the PaylanceX website and any related services.',
      'By accessing our site, you agree to use it only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, any other party.',
      'All content, branding, and intellectual property displayed on this site are owned by PaylanceX and may not be reproduced without prior written consent.',
      'We reserve the right to modify or discontinue any aspect of our services at any time without prior notice.',
      'Our services are provided "as is" without warranties of any kind. To the fullest extent permitted by law, we are not liable for any indirect or consequential damages.',
      'Disputes arising from these terms shall be governed by applicable law in the jurisdiction where PaylanceX operates.',
    ],
  },
} as const;

function LegalModal({ open, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  const content = LEGAL_CONTENT[open];
  const Icon = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="relative w-full max-w-lg animate-fadeScale"
      >
        <div className="glass-strong relative max-h-[80vh] overflow-hidden rounded-3xl shadow-glass">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-300/80 to-transparent" />

          <div className="flex items-center justify-between border-b border-white/5 px-7 py-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-300/30 to-neon-600/20 ring-1 ring-white/10">
                <Icon className="h-4 w-4 text-neon-200" />
              </div>
              <h2 id="legal-title" className="font-display text-lg font-semibold text-white">
                {content.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full text-neon-100/60 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-7 py-6">
            <div className="space-y-4">
              {content.body.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-neon-100/70">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-6 text-xs text-neon-100/30">Last updated: January 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Footer ----------------------------- */

type FooterProps = {
  onLegal: (which: 'privacy' | 'terms') => void;
};

function Footer({ onLegal }: FooterProps) {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-8 opacity-0 animate-riseIn" style={{ animationDelay: '1.1s' }}>
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 overflow-hidden rounded-lg bg-ink-800 p-0.5 ring-1 ring-white/10">
            <img src={LOGO_SRC} alt="PaylanceX" className="h-full w-full object-contain" />
          </div>
          <span className="text-sm text-neon-100/50">
            © 2026 PaylanceX. All Rights Reserved.
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => onLegal('privacy')}
            className="rounded-lg px-3 py-2 text-sm text-neon-100/50 transition hover:text-neon-100"
          >
            Privacy Policy
          </button>
          <span className="text-neon-100/20">·</span>
          <button
            onClick={() => onLegal('terms')}
            className="rounded-lg px-3 py-2 text-sm text-neon-100/50 transition hover:text-neon-100"
          >
            Terms of Service
          </button>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------- App ----------------------------- */

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <Particles />

      {/* Main hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto w-full max-w-3xl">
          <Logo />

          <div className="mt-10 opacity-0 animate-riseIn" style={{ animationDelay: '0.25s' }}>
            <StatusPill />
          </div>

          <h1
            className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight text-gradient opacity-0 animate-riseIn sm:text-6xl md:text-7xl"
            style={{ animationDelay: '0.4s' }}
          >
            Something Extraordinary
            <br />
            Is Coming.
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-neon-100/60 opacity-0 animate-riseIn sm:text-xl"
            style={{ animationDelay: '0.55s' }}
          >
            We're building the future.
          </p>

          {/* CTA */}
          <div
            className="mt-12 flex flex-col items-center justify-center gap-4 opacity-0 animate-riseIn sm:flex-row"
            style={{ animationDelay: '0.7s' }}
          >
            <button
              onClick={() => setContactOpen(true)}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-neon-400 to-neon-600 px-8 py-4 text-sm font-semibold text-white shadow-neon transition-all duration-300 hover:shadow-neon-lg hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Mail className="h-4 w-4" />
              Contact Us
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>

            <a
              href="mailto:support@paylancex.com"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium text-neon-100/80 transition hover:text-white hover:ring-1 hover:ring-neon-300/40"
            >
              support@paylancex.com
            </a>
          </div>

          {/* Decorative orbiting ring */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-30 sm:h-[640px] sm:w-[640px]"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full border border-neon-300/20" />
            <div className="absolute inset-8 rounded-full border border-neon-300/10" />
            <div className="absolute inset-20 rounded-full border border-neon-300/5" />
          </div>
        </div>
      </main>

      <Footer onLegal={(w) => setLegalOpen(w)} />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(null)} />
    </div>
  );
}
