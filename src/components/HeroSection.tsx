import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownIcon,
  BriefcaseBusinessIcon,
  DownloadIcon,
  MapPinIcon,
} from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

const capabilities = [
  'BPMN',
  'Requirements',
  'Systems Analysis',
  'ERP / Odoo',
  'UAT',
  'Stakeholder Workshops',
];

const roles = [
  'Digital Transformation & BA Intern',
  'Business Systems Analyst',
  'Requirements & Process Analyst',
  'ERP Functional Consultant',
  'Implementation Analyst',
];

const quickStats = [
  { value: '2', label: 'Degrees' },
  { value: '1', label: 'GovTech Internship' },
  { value: '3', label: 'Case Studies' },
  { value: '5+', label: 'Leadership Roles' },
];

export function HeroSection() {
  const [imageError, setImageError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative pt-20 overflow-hidden"
      aria-label="Introduction"
    >
      <ParticleCanvas />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 65% 35%, rgba(30,107,196,0.12), transparent 38%), radial-gradient(ellipse at center, transparent 35%, rgba(6,13,26,0.78) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-blue-400 font-mono text-sm tracking-[0.2em] mb-3">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold leading-[1.02] tracking-tight mb-5">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-700 bg-clip-text text-transparent">
                Vihanga
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-blue-400 bg-clip-text text-transparent">
                Rathnayake
              </span>
            </h1>
            <div
              className="h-9 mb-6 flex items-center justify-center lg:justify-start gap-4"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="w-10 h-px bg-gradient-to-r from-blue-400 to-transparent" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[roleIndex]}
                  className="text-gray-200 text-lg sm:text-xl font-light tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-7">
              Undergraduate at <span className="font-semibold text-blue-400">USJ</span> &amp;{' '}
              <span className="font-semibold text-amber-400">OUSL</span> — analysing business
              processes, mapping As-Is and To-Be workflows, engineering requirements, and
              translating organizational needs into secure digital solutions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 max-w-2xl mx-auto lg:mx-0">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="min-h-[4.5rem] rounded-xl border border-white/15 bg-white/[0.025] px-3 py-2.5 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.08 }}
                >
                  <span
                    className={`text-2xl font-bold ${
                      index % 3 === 0
                        ? 'text-amber-400'
                        : index % 3 === 1
                          ? 'text-blue-400'
                          : 'text-emerald-400'
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-gray-500 mt-1 text-center">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {capabilities.map((capability, index) => (
                <span
                  key={capability}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium ${
                    index === 3
                      ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
                      : index === 4
                        ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                        : 'border-blue-400/20 bg-blue-400/10 text-blue-300'
                  }`}
                >
                  {capability}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('#projects')}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-semibold text-white text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDownIcon className="w-4 h-4" />
              </button>
              <a
                href="/portfolio/portfolio/Vihanga%20Rathnayake_CV.pdf"
                download
                className="px-7 py-3.5 border border-white/15 bg-white/5 rounded-xl font-semibold text-white text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <DownloadIcon className="w-4 h-4" />
                Download CV
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-7 py-3.5 border border-amber-400/20 bg-amber-400/10 rounded-xl font-semibold text-amber-200 text-sm hover:bg-amber-400/15 transition-all flex items-center justify-center gap-2"
              >
                <BriefcaseBusinessIcon className="w-4 h-4" />
                Discuss a Role
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-full opacity-20 blur-xl"
                style={{ background: 'conic-gradient(from 0deg, #4da6ff, #c8a03c, #4da6ff)' }}
              />
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <div
                className="relative p-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #4da6ff, #c8a03c, #4da6ff)' }}
              >
                <div className="rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] lg:w-[390px] lg:h-[390px] xl:w-[420px] xl:h-[420px]">
                  {!imageError ? (
                    <img
                      src="/portfolio/profile.jpeg"
                      alt="Vihanga Rathnayake — Business Systems Analyst"
                      className="w-full h-full object-cover object-top rounded-full"
                      width="360"
                      height="360"
                      fetchPriority="high"
                      loading="eager"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent block">
                        VR
                      </span>
                      <p className="text-xs text-gray-400 mt-2 tracking-widest font-mono">
                        VIHANGA RATHNAYAKE
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <motion.div
                className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-400/40 bg-[#081426]/95 text-emerald-400 text-xs font-semibold backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to work
              </motion.div>

              <motion.div
                className="absolute -top-2 -left-2 flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-400/30 bg-[#081426]/95 text-blue-300 text-xs font-medium backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <MapPinIcon className="w-3 h-3" />
                Sri Lanka
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-2 sm:-right-8 -translate-y-1/2 px-3 py-2 rounded-xl border border-amber-400/30 bg-[#081426]/95 text-amber-300 text-xs font-medium whitespace-nowrap backdrop-blur-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                🏅 Presidential Medalist
              </motion.div>

              <div className="absolute -top-5 -right-5 w-10 h-10 bg-blue-400 rounded-full blur-md opacity-40 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-amber-500 rounded-full blur-md opacity-40 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
