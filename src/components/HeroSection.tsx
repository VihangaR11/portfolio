import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, MailIcon, DownloadIcon, MapPinIcon } from 'lucide-react';

// ─── Roles cycling ────────────────────────────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Creative Technologist',
  'Software Engineer',
];

// ─── Tech stack pills ─────────────────────────────────────────────────────
const techStack = [
  { name: 'React',      color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind',   color: '#38bdf8' },
  { name: 'Node.js',    color: '#68a063' },
  { name: 'AWS',        color: '#f59e0b' },
  { name: 'Vite',       color: '#646cff' },
];

// ─── Quick stats ──────────────────────────────────────────────────────────
const quickStats = [
  { value: '2',   label: 'Degrees',     color: '#8b5cf6' },
  { value: '3+',  label: 'Awards',      color: '#f59e0b' },
  { value: '5+',  label: 'Leadership',  color: '#10b981' },
  { value: '8+',  label: 'Years exp.',  color: '#06b6d4' },
];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isAvailable] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
      aria-label="Hero section"
    >

      {/* ── Decorative background grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-3xl animate-float-1" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-violet-500/8 rounded-full blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

          {/* ══ LEFT — Content ══ */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            style={{ y: contentY, opacity }}
          >

            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{
                background: 'rgba(16,185,129,0.1)',
                borderColor: 'rgba(16,185,129,0.3)',
                color: '#10b981',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Available for opportunities · Sri Lanka
              <MapPinIcon className="w-3 h-3 opacity-60" />
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="text-cyan-400 font-mono text-sm tracking-[0.2em] mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
                Vihanga
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Rathnayake
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              className="h-9 mb-5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  className="flex items-center justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <span
                    className="w-8 h-px"
                    style={{ background: 'linear-gradient(to right, #06b6d4, transparent)' }}
                  />
                  <span className="text-lg sm:text-xl text-gray-300 font-light tracking-wide">
                    {roles[currentRoleIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-gray-400 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed text-sm sm:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Undergraduate at <span className="text-cyan-400 font-medium">USJ</span> &{' '}
              <span className="text-violet-400 font-medium">OUSL</span> — building polished,
              accessible web experiences with React, TypeScript, and cloud technologies.
              Presidential award winner. Community builder. Always shipping.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              className="grid grid-cols-4 gap-2 sm:gap-3 mb-7 max-w-sm mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {quickStats.map(s => (
                <div
                  key={s.label}
                  className="text-center rounded-xl border border-white/8 bg-white/3 py-3 px-1"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-gray-600 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech stack */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    borderColor: `${tech.color}30`,
                    background: `${tech.color}10`,
                    color: tech.color,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button
                onClick={() => scrollTo('#projects')}
                className="group px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="/Vihanga_Rathnayake_CV.pdf"
                download
                className="px-7 py-3.5 border border-white/15 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:bg-white/8 hover:border-white/25 flex items-center justify-center gap-2"
              >
                <DownloadIcon className="w-4 h-4" />
                Download CV
              </a>

              <button
                onClick={() => scrollTo('#contact')}
                className="px-7 py-3.5 border border-cyan-500/25 rounded-xl font-semibold text-cyan-400 text-sm transition-all duration-300 hover:bg-cyan-500/8 hover:border-cyan-500/40 flex items-center justify-center gap-2"
              >
                <MailIcon className="w-4 h-4" />
                Hire Me
              </button>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — Profile image ══ */}
          <motion.div
            className="flex-shrink-0 order-1 lg:order-2"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative">

              {/* Outer decorative ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-20 blur-xl"
                style={{ background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #06b6d4)' }}
              />

              {/* Spinning dashed ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-dashed opacity-20"
                style={{ borderColor: '#06b6d4' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow border */}
              <div
                className="relative p-1.5 rounded-full animate-glow-border"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #06b6d4)' }}
              >
                {/* Image container — LARGER than before */}
                <div
                  className="rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center"
                  style={{ width: '340px', height: '340px' }}
                >
                  {!imageError ? (
                    <img
                      src="/profile.jpeg"
                      alt="Vihanga Rathnayake — Software Engineer"
                      className="w-full h-full object-cover object-top rounded-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                      VR
                    </span>
                  )}
                </div>
              </div>

              {/* Floating badge — Available */}
              <motion.div
                className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold"
                style={{
                  background: 'rgba(8,12,16,0.95)',
                  borderColor: 'rgba(16,185,129,0.4)',
                  color: '#10b981',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to work
              </motion.div>

              {/* Floating badge — Location */}
              <motion.div
                className="absolute -top-2 -left-2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium"
                style={{
                  background: 'rgba(8,12,16,0.95)',
                  borderColor: 'rgba(6,182,212,0.3)',
                  color: '#06b6d4',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <MapPinIcon className="w-3 h-3" />
                Sri Lanka
              </motion.div>

              {/* Floating badge — Award */}
              <motion.div
                className="absolute top-1/2 -right-6 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium whitespace-nowrap"
                style={{
                  background: 'rgba(8,12,16,0.95)',
                  borderColor: 'rgba(245,158,11,0.3)',
                  color: '#f59e0b',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                🏅 Presidential Medalist
              </motion.div>

              {/* Decorative corner dots */}
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-cyan-400 rounded-full blur-md opacity-40 animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-violet-500 rounded-full blur-md opacity-40 animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </motion.div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollTo('#about')}
        >
          <span className="text-gray-600 text-xs font-mono tracking-widest">scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-cyan-400"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}