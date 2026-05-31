import React, { useCallback, useEffect, useRef } from 'react';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}
export function BackgroundOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000
  });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const dimensionsRef = useRef({
    width: 0,
    height: 0
  });
  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
  const CONNECTION_DISTANCE = 150;
  const MOUSE_RADIUS = 200;
  const MOUSE_LINE_RADIUS = 180;
  const REPULSION_STRENGTH = 0.8;
  const COLORS = ['#4da6ff', '#c8a03c', '#4da6ff', '#e8c56a'];
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
    particlesRef.current = particles;
  }, []);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = {
      x: -1000,
      y: -1000
    };
  }, []);
  const handleClick = useCallback((e: MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    const burstRadius = 250;
    const burstStrength = 8;
    particlesRef.current.forEach((particle) => {
      const dx = particle.x - clickX;
      const dy = particle.y - clickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < burstRadius && distance > 0) {
        const force = (1 - distance / burstRadius) * burstStrength;
        particle.vx += dx / distance * force;
        particle.vy += dy / distance * force;
      }
    });
  }, []);
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = dimensionsRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    // Update particles
    particles.forEach((particle) => {
      // Apply mouse repulsion
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MOUSE_RADIUS && distance > 0) {
        const force =
        (MOUSE_RADIUS - distance) / MOUSE_RADIUS * REPULSION_STRENGTH;
        particle.vx += dx / distance * force;
        particle.vy += dy / distance * force;
      }
      // Apply friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      // Add slight drift
      particle.vx += (Math.random() - 0.5) * 0.02;
      particle.vy += (Math.random() - 0.5) * 0.02;
      // Clamp velocity
      const maxVel = 3;
      particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
      particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      // Wrap around edges
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;
    });
    // Draw connections between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < CONNECTION_DISTANCE) {
          const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    // Draw mouse connections and glow
    if (mouse.x > 0 && mouse.y > 0) {
      // Draw radial glow around cursor
      const glowGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        120
      );
      glowGradient.addColorStop(0, 'rgba(30, 107, 196, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
      glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      // Draw lines from mouse to nearby particles
      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < MOUSE_LINE_RADIUS) {
          const opacity = (1 - distance / MOUSE_LINE_RADIUS) * 0.4;
          const gradient = ctx.createLinearGradient(
            mouse.x,
            mouse.y,
            particle.x,
            particle.y
          );
          gradient.addColorStop(0, `rgba(30, 107, 196, ${opacity})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.5})`);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }
    // Draw particles
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      const hex = particle.color;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
      ctx.fill();
      // Add glow effect to particles
      const glowGradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 3
      );
      glowGradient.addColorStop(
        0,
        `rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.5})`
      );
      glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    });
    ctx.restore();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameRef.current);
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      dimensionsRef.current = {
        width,
        height
      };
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initParticles, handleMouseMove, handleMouseLeave, handleClick, animate]);
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true">

      {/* Ambient gradient orbs - behind canvas */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-3xl animate-float-1" />
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500 to-amber-500 opacity-20 blur-3xl animate-float-2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-amber-600 to-blue-500 opacity-15 blur-3xl animate-float-4" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 via-amber-500 to-amber-500 opacity-10 blur-3xl animate-float-3" />

      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: 'screen'
        }} />

    </div>);

}