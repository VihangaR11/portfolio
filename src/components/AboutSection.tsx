import { motion } from 'framer-motion';
import {
  CodeIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MapPinIcon,
  MailIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  UsersIcon,
  ZapIcon,
  HeartIcon,
} from 'lucide-react';

// ─── LinkedIn SVG (removed from lucide-react v1) ──────────────────────────
const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ─── What I bring to the table ────────────────────────────────────────────
const strengths = [
  {
    icon: CodeIcon,
    title: 'Full-Stack Development',
    description: 'React, TypeScript, Node.js, and modern web technologies — building complete products from UI to deployment.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.25)',
  },
  {
    icon: ZapIcon,
    title: 'DevOps & Cloud',
    description: 'AWS, CI/CD pipelines, Docker, and GitHub Actions — automating workflows and shipping reliable software.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    icon: UsersIcon,
    title: 'Leadership & Teamwork',
    description: 'Co-founded ACS, led teams, coordinated international events — I thrive in collaborative environments.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    icon: HeartIcon,
    title: 'Community Impact',
    description: 'LearnLift, EduACS, G17 Global — I build things that matter beyond the screen.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.25)',
  },
];

// ─── Key facts ────────────────────────────────────────────────────────────
const facts = [
  { icon: GraduationCapIcon, label: 'Dual degrees', value: 'USJ + OUSL', color: '#8b5cf6' },
  { icon: BriefcaseIcon,     label: 'Status',       value: 'Open to work', color: '#10b981' },
  { icon: MapPinIcon,        label: 'Location',     value: 'Sri Lanka',    color: '#06b6d4' },
  { icon: CodeIcon,          label: 'Experience',   value: '2+ years',     color: '#f59e0b' },
];

// ─── What I'm looking for ─────────────────────────────────────────────────
const lookingFor = [
  'Frontend / Full-Stack Developer roles',
  'UI/UX focused engineering positions',
  'DevOps & Cloud engineering roles',
  'Graduate / junior positions with growth',
  'Internships in product-driven teams',
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            — Who I am
          </p>
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
          >
            About{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* ── Top: Bio + Facts ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium"
              style={{
                background: 'rgba(16,185,129,0.1)',
                borderColor: 'rgba(16,185,129,0.3)',
                color: '#10b981',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to work — available immediately
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              I'm <span className="text-cyan-400">Vihanga Rathnayake</span> —
              a software engineer who builds things that matter.
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I'm an undergraduate pursuing dual honours degrees in Information Systems
              at the University of Sri Jayewardenepura (CGPA 3.28) and Software Engineering
              at the Open University of Sri Lanka (CGPA 3.40). I specialise in building
              modern, accessible, and performant web applications using React, TypeScript,
              and cloud technologies.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Beyond code, I co-founded the Association of Computing Students at USJ,
              served as a Liaison Officer for the International Solar Alliance, and was
              recognised with the Environmental Pioneer Presidential Medal. I bring both
              technical depth and genuine leadership to every team I join.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:vihangasan221@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm"
              >
                <MailIcon className="w-4 h-4" />
                vihangasan221@gmail.com
              </a>
              <a
                href="https://github.com/VihangaR11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                <GithubSVG className="w-4 h-4" />
                GitHub
                <ExternalLinkIcon className="w-3 h-3 opacity-50" />
              </a>
              <a
                href="https://linkedin.com/in/vihanga-rathnayake-a6a652321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-blue-400 hover:border-blue-500/30 transition-all text-sm"
              >
                <LinkedInSVG className="w-4 h-4" />
                LinkedIn
                <ExternalLinkIcon className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </motion.div>

          {/* Facts + Looking for */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Key facts grid */}
            <div className="grid grid-cols-2 gap-3">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center gap-3"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: f.color }} />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{f.value}</div>
                      <div className="text-gray-500 text-xs">{f.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* What I'm looking for */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background: 'rgba(6,182,212,0.04)',
                borderColor: 'rgba(6,182,212,0.15)',
              }}
            >
              <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4 text-cyan-400" />
                What I'm looking for
              </h4>
              <ul className="space-y-2.5">
                {lookingFor.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircleIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/Vihanga_Rathnayake_CV.pdf"
                download
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-black transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
              >
                Download My CV
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom: What I bring ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-gray-500 text-xs font-mono tracking-widest uppercase mb-8">
            What I bring to your team
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strengths.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: s.bg,
                    borderColor: s.border,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}