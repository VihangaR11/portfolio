import { useEffect, useRef, useCallback } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 0;
      opacity = 0;
      pulseOffset = 0;

      constructor() {
        if (canvas) this.reset(canvas);
      }

      reset(canvas: HTMLCanvasElement) {
        this.x           = Math.random() * canvas.width;
        this.y           = Math.random() * canvas.height;
        this.vx          = (Math.random() - 0.5) * 0.4;
        this.vy          = (Math.random() - 0.5) * 0.4;
        this.size        = Math.random() * 1.8 + 0.8;
        this.opacity     = Math.random() * 0.5 + 0.3;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(t: number, canvas: HTMLCanvasElement, mouseRef: React.MutableRefObject<{x: number, y: number}>) {
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

      draw(ctx: CanvasRenderingContext2D) {
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

    const animate = (t: number) => {
      if (!canvas) return;
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

    const onMouseMove = (e: MouseEvent) => {
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
