export default function GlobalParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <ParticleCanvas />
      
      {/* global vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(13,17,23,0.85) 100%)",
        }}
      />

      {/* floating ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl animate-float-1" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-3xl animate-float-2" />
      </div>
    </div>
  );
}