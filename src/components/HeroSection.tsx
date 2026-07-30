import { motion } from 'framer-motion';
import {
  ArrowDownIcon,
  BriefcaseBusinessIcon,
  DownloadIcon,
  MapPinIcon,
  WorkflowIcon,
} from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

const capabilities = [
  'Requirements Engineering',
  'BPMN & BPR',
  'Systems Analysis',
  'ERP / Odoo',
  'UAT & Validation',
  'Stakeholder Facilitation',
];

const proofPoints = [
  { value: '2', label: 'Honours degrees' },
  { value: 'GovTech', label: 'Transformation exposure' },
  { value: 'BPMN', label: 'Process modelling' },
  { value: 'ERP', label: 'Functional pathway' },
];

export function HeroSection() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 text-xs font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to associate-level opportunities
              <MapPinIcon className="w-3.5 h-3.5" />
            </div>

            <p className="text-blue-400 font-mono text-sm tracking-[0.2em] uppercase mb-3">
              Business systems · ERP · Digital transformation
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.04] tracking-tight text-white mb-6">
              I turn complex workflows into{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">
                practical digital systems.
              </span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-medium mb-4">
              Vihanga Rathnayake — Business Systems Analyst & Digital Transformation Professional
            </p>
            <p className="text-gray-400 max-w-2xl leading-relaxed mb-8">
              I analyse As-Is operations, facilitate stakeholder discovery, model To-Be
              processes, define clear requirements, and help teams move from organizational
              problems to secure, implementable solutions. My software engineering background
              helps me communicate effectively with both decision-makers and technical teams.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="px-3 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-200 text-xs font-medium"
                >
                  {capability}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('#projects')}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-semibold text-white text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Explore Case Studies
                <ArrowDownIcon className="w-4 h-4" />
              </button>
              <a
                href="/portfolio/portfolio/CV_Vihanga%20Rathnayake.pdf"
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

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
            aria-label="Professional focus"
          >
            <div className="absolute -inset-8 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-white/10 bg-[#0a1628]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center">
                  <WorkflowIcon className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Target pathway</p>
                  <h2 className="text-white font-semibold">Business analysis to transformation</h2>
                </div>
              </div>

              <div className="space-y-3 mb-7">
                {[
                  'Associate Business Analyst',
                  'Business / Systems Analyst',
                  'Associate Functional Consultant',
                  'Implementation or Solutions Analyst',
                ].map((role, index) => (
                  <div
                    key={role}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-300 text-xs font-mono flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-gray-300">{role}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {proofPoints.map((point) => (
                  <div key={point.label} className="rounded-xl bg-white/[0.035] border border-white/10 p-3">
                    <div className="text-blue-300 font-bold text-sm">{point.value}</div>
                    <div className="text-gray-500 text-[11px] mt-1">{point.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
