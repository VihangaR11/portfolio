import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const numParticles = 120;
    const maxDistance = 120;

    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // 🔥 Profile image attraction point (adjust if needed)
    const imageTarget = {
      x: window.innerWidth * 0.7,
      y: window.innerHeight * 0.5,
    };

    // ✍️ VR shape points
    const vrPoints = [];
    for (let i = 0; i < 200; i++) {
      vrPoints.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
      });
    }

    class Particle {
      constructor(i) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = vrPoints[i]?.x || this.x;
        this.baseY = vrPoints[i]?.y || this.y;
        this.size = Math.random() * 2 + 1;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Apple-style smooth motion
        let targetX = this.baseX;
        let targetY = this.baseY;

        // After 3s → move toward profile image
        if (performance.now() > 3000) {
          targetX = imageTarget.x;
          targetY = imageTarget.y;
        }

        // Attraction
        this.vx += (targetX - this.x) * 0.002;
        this.vy += (targetY - this.y) * 0.002;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            this.vx += dx * 0.002;
            this.vy += dy * 0.002;
          }
        }

        // Damping (smooth)
        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 12;

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(i));
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;

            ctx.strokeStyle =
              Math.random() > 0.5
                ? `rgba(6,182,212,${opacity})`
                : `rgba(139,92,246,${opacity})`;

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();

      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}