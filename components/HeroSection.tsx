import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, MailIcon, DownloadIcon, MapPinIcon } from 'lucide-react';

const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Creative Technologist',
  'Software Engineer',
];

const techStack = [
  { name: 'React',      color: '#4da6ff' },
  { name: 'TypeScript', color: '#1e6bc4' },
  { name: 'Tailwind',   color: '#4da6ff' },
  { name: 'Node.js',    color: '#68a063' },
  { name: 'AWS',        color: '#f59e0b' },
  { name: 'Vite',       color: '#1e6bc4' },
];

const quickStats = [
  { value: '2',  label: 'Degrees',    color: '#c8a03c' },
  { value: '3+', label: 'Awards',     color: '#f59e0b' },
  { value: '5+', label: 'Leadership', color: '#10b981' },
  { value: '8+', label: 'Years exp.', color: '#4da6ff' },
];

// ═══════════════════════════════════════════════════════════════════════════
//  PARTICLE CONSTELLATION CANVAS
// ═══════════════════════════════════════════════════════════════════════════
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const NUM_PARTICLES = window.innerWidth < 768 ? 50 : 110;
    const MAX_DIST      = 130;
    const MOUSE_RADIUS  = 140;

    class Particle {
      constructor() {
        this.reset(canvas);
      }

      reset(canvas) {
        this.x           = Math.random() * canvas.width;
        this.y           = Math.random() * canvas.height;
        this.vx          = (Math.random() - 0.5) * 0.4;
        this.vy          = (Math.random() - 0.5) * 0.4;
        this.size        = Math.random() * 1.8 + 0.8;
        this.opacity     = Math.random() * 0.5 + 0.3;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(t, canvas, mouseRef) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0)             this.x = canvas.width;
        if (this.x > canvas.width)  this.x = 0;
        if (this.y < 0)             this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        const mx   = mouseRef.current.x;
        const my   = mouseRef.current.y;
        const dx   = this.x - mx;
        const dy   = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.6;
          this.vy += Math.sin(angle) * force * 0.6;
        }

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2.5) {
          this.vx = (this.vx / speed) * 2.5;
          this.vy = (this.vy / speed) * 2.5;
        }
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.opacity = 0.3 + Math.sin(t * 0.002 + this.pulseOffset) * 0.2;
      }

      draw(ctx) {
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        grad.addColorStop(0,   `rgba(30,107,196,${this.opacity})`);
        grad.addColorStop(0.4, `rgba(200,160,60,${this.opacity * 0.6})`);
        grad.addColorStop(1,   'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,215,255,${this.opacity + 0.3})`;
        ctx.fill();
      }
    }

    let particles = Array.from({ length: NUM_PARTICLES }, () => new Particle());

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx   = particles[a].x - particles[b].x;
          const dy   = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.45;
            ctx.strokeStyle = (a + b) % 3 !== 0
              ? `rgba(30,107,196,${alpha})`
              : `rgba(200,160,60,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const connectMouse = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx === -9999) return;
      particles.forEach(p => {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS * 1.3) {
          const alpha = (1 - dist / (MOUSE_RADIUS * 1.3)) * 0.7;
          ctx.strokeStyle = `rgba(30,107,196,${alpha})`;
          ctx.lineWidth   = 0.9;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connect();
      connectMouse();
      particles.forEach(p => { p.update(t, canvas, mouseRef); p.draw(ctx); });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      setSize();
      particles = Array.from({ length: NUM_PARTICLES }, () => new Particle());
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cleanup = initCanvas();

    const onMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cleanup?.();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════
export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Particle constellation */}
      <ParticleCanvas />

      {/* Vignette to keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13,17,23,0.6) 100%)' }}
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-3xl animate-float-1" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-3xl animate-float-2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

          {/* LEFT — Content */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            style={{ y: contentY, opacity }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Available for opportunities · Sri Lanka
              <MapPinIcon className="w-3 h-3 opacity-60" />
            </motion.div>

            <motion.p className="text-blue-400 font-mono text-sm tracking-[0.2em] mb-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Hello, I'm
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-700 bg-clip-text text-transparent">Vihanga</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-blue-400 bg-clip-text text-transparent">Rathnayake</span>
            </motion.h1>

            <motion.div className="h-9 mb-5 overflow-hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <AnimatePresence mode="wait">
                <motion.div key={currentRoleIndex}
                  className="flex items-center justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                  <span className="w-8 h-px flex-shrink-0" style={{ background: 'linear-gradient(to right, #4da6ff, transparent)' }} />
                  <span className="text-lg sm:text-xl text-gray-300 font-light tracking-wide">{roles[currentRoleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.p className="text-gray-400 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed text-sm sm:text-base"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              Undergraduate at <span className="text-blue-400 font-medium">USJ</span> &{' '}
              <span className="text-amber-400 font-medium">OUSL</span> — building polished,
              accessible web experiences with React, TypeScript, and cloud technologies.
              Presidential award winner. Community builder. Always shipping.
            </motion.p>

            <motion.div className="grid grid-cols-4 gap-2 sm:gap-3 mb-7 max-w-sm mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
              {quickStats.map(s => (
                <div key={s.label} className="text-center rounded-xl border border-white/8 py-3 px-1"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-xl sm:text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-600 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
              {techStack.map((tech, i) => (
                <motion.span key={tech.name}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{ borderColor: `${tech.color}30`, background: `${tech.color}12`, color: tech.color }}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }}>
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
              <button onClick={() => scrollTo('#projects')}
                className="group px-7 py-3.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                View My Work
                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a href="/portfolio/Vihanga_Rathnayake_CV.pdf" download
                className="px-7 py-3.5 border border-white/15 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:bg-white/8 hover:border-white/25 flex items-center justify-center gap-2">
                <DownloadIcon className="w-4 h-4" /> Download CV
              </a>
              <button onClick={() => scrollTo('#contact')}
                className="px-7 py-3.5 border border-blue-500/25 rounded-xl font-semibold text-blue-400 text-sm transition-all duration-300 hover:bg-blue-500/8 hover:border-blue-500/40 flex items-center justify-center gap-2">
                <MailIcon className="w-4 h-4" /> Hire Me
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile image */}
          <motion.div className="flex-shrink-0 order-1 lg:order-2" style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full opacity-20 blur-xl"
                style={{ background: 'conic-gradient(from 0deg, #4da6ff, #c8a03c, #4da6ff)' }} />
              <motion.div className="absolute -inset-3 rounded-full border-2 border-dashed opacity-20"
                style={{ borderColor: '#4da6ff' }} animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
              <div className="relative p-1.5 rounded-full animate-glow-border"
                style={{ background: 'linear-gradient(135deg, #4da6ff, #c8a03c, #4da6ff)' }}>
                <div className="rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center"
                  style={{ width: '360px', height: '360px' }}>
                  {!imageError ? (
                    <img src="/portfolio/profile.jpeg" alt="Vihanga Rathnayake — Software Engineer"
                      className="w-full h-full object-cover object-top rounded-full"
                      width="360" height="360"
                      fetchPriority="high"
                      loading="eager"
                      onError={() => setImageError(true)} />
                  ) : (
                    <div className="text-center">
                      <span className="text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent block">VR</span>
                      <p className="text-xs text-gray-400 mt-2 tracking-widest font-mono">VIHANGA RATHNAYAKE</p>
                    </div>
                  )}
                </div>
              </div>

              <motion.div className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold"
                style={{ background: 'rgba(8,12,16,0.95)', borderColor: 'rgba(16,185,129,0.4)', color: '#10b981', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open to work
              </motion.div>

              <motion.div className="absolute -top-2 -left-2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium"
                style={{ background: 'rgba(8,12,16,0.95)', borderColor: 'rgba(30,107,196,0.3)', color: '#4da6ff', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, scale: 0.8, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
                <MapPinIcon className="w-3 h-3" /> Sri Lanka
              </motion.div>

              <motion.div className="absolute top-1/2 -right-6 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium whitespace-nowrap"
                style={{ background: 'rgba(8,12,16,0.95)', borderColor: 'rgba(245,158,11,0.3)', color: '#f59e0b', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
                🏅 Presidential Medalist
              </motion.div>

              <div className="absolute -top-5 -right-5 w-10 h-10 bg-blue-400 rounded-full blur-md opacity-40 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-amber-500 rounded-full blur-md opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          onClick={() => scrollTo('#about')}>
          <span className="text-gray-600 text-xs font-mono tracking-widest">scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <motion.div className="w-1 h-2 rounded-full bg-blue-400"
              animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}