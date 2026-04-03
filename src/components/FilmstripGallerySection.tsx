import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon } from 'lucide-react';

// ============================================================
// HOW TO ADD YOUR PHOTOS:
// 1. Create a folder: public/gallery/
// 2. Add your images there (jpg, jpeg, png, webp all work)
// 3. Update the `src` paths and `caption` text below
// 4. Set the correct `category` for each photo
// ============================================================

type Category = 'event' | 'university' | 'team' | 'personal';

interface Photo {
  id: number;
  src: string;
  caption: string;
  subcaption: string;
  category: Category;
  year: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: '/gallery/speaking1.jpg',         // 📁 replace with your file
    caption: 'Public Speaking',
    subcaption: 'USJ Event — Flair Club',
    category: 'event',
    year: '2025',
  },
  {
    id: 2,
    src: '/gallery/campus1.jpg',
    caption: 'Campus Life',
    subcaption: 'University of Sri Jayewardenepura',
    category: 'university',
    year: '2024',
  },
  {
    id: 3,
    src: '/gallery/team1.jpg',
    caption: 'ACS Team',
    subcaption: 'Association of Computing Students',
    category: 'team',
    year: '2024',
  },
  {
    id: 4,
    src: '/gallery/event1.jpg',
    caption: 'G17 Global',
    subcaption: 'University Ambassador Programme',
    category: 'event',
    year: '2024',
  },
  {
    id: 5,
    src: '/gallery/personal1.jpg',
    caption: 'Personal Moments',
    subcaption: 'Buttala, Sri Lanka',
    category: 'personal',
    year: '2024',
  },
  {
    id: 6,
    src: '/gallery/event2.jpg',
    caption: 'Solar Alliance',
    subcaption: 'International Solar Alliance — Liaison',
    category: 'event',
    year: '2025',
  },
  {
    id: 7,
    src: '/gallery/team2.jpg',
    caption: 'Flair Club',
    subcaption: 'Secretary — USJ Flair Club',
    category: 'team',
    year: '2025',
  },
  {
    id: 8,
    src: '/gallery/campus2.jpg',
    caption: 'Study Sessions',
    subcaption: 'Open University of Sri Lanka',
    category: 'university',
    year: '2024',
  },
  {
    id: 9,
    src: '/gallery/personal2.jpg',
    caption: 'Tabla Performance',
    subcaption: 'Bhathkande Sangeet Vidyapith',
    category: 'personal',
    year: '2017',
  },
  {
    id: 10,
    src: '/gallery/event3.jpg',
    caption: 'Award Ceremony',
    subcaption: 'Environmental Pioneer Medal — 2017',
    category: 'event',
    year: '2017',
  },
];

const categoryConfig: Record<Category, { label: string; color: string; glow: string }> = {
  event:      { label: 'Event',      color: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10',    glow: 'rgba(6,182,212,0.4)' },
  university: { label: 'University', color: 'text-violet-300 border-violet-500/40 bg-violet-500/10', glow: 'rgba(139,92,246,0.4)' },
  team:       { label: 'Team',       color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10', glow: 'rgba(16,185,129,0.4)' },
  personal:   { label: 'Personal',   color: 'text-rose-300 border-rose-500/40 bg-rose-500/10',    glow: 'rgba(244,63,94,0.4)' },
};

type FilterType = 'all' | Category;

export function FilmstripGallerySection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  const scroll = (dir: 'left' | 'right') => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  const lbIndex = lightbox ? filtered.findIndex(p => p.id === lightbox.id) : -1;
  const prevPhoto = () => lbIndex > 0 && setLightbox(filtered[lbIndex - 1]);
  const nextPhoto = () => lbIndex < filtered.length - 1 && setLightbox(filtered[lbIndex + 1]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Frames', value: 'all' },
    { label: 'Events', value: 'event' },
    { label: 'University', value: 'university' },
    { label: 'Team', value: 'team' },
    { label: 'Personal', value: 'personal' },
  ];

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 relative overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
              — Life beyond the screen
            </p>
            <h2
              id="gallery-heading"
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Cinematic{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Memories
              </span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-md">
              Scroll through the filmstrip — hover to zoom, click to expand.
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                filter === f.value
                  ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Filmstrip ── */}
      <div className="relative">

        {/* Top sprocket holes row */}
        <div className="flex gap-0 overflow-hidden h-6 bg-[#080c10] border-y border-white/5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-10 flex items-center justify-center">
              <div className="w-5 h-3 rounded-sm bg-[#0d1117] border border-white/10" />
            </div>
          ))}
        </div>

        {/* Main scrollable strip */}
        <div
          className="bg-[#080c10] border-y border-white/5 py-6"
        >
          <div
            ref={stripRef}
            className="flex gap-4 overflow-x-auto pb-2 px-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Frame number at start */}
            <div className="flex-shrink-0 flex items-center justify-center w-12 text-white/10 font-mono text-xs writing-mode-vertical select-none">
              {'▶ VIHANGA RATHNAYAKE ◀ MEMORIES'.split('').map((c, i) => (
                <span key={i} style={{ writingMode: 'vertical-rl', letterSpacing: '2px', fontSize: '9px' }}>{c}</span>
              ))}
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.map((photo, idx) => (
                <FilmFrame
                  key={photo.id}
                  photo={photo}
                  index={idx}
                  isHovered={hoveredId === photo.id}
                  onHover={() => setHoveredId(photo.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setLightbox(photo)}
                />
              ))}
            </AnimatePresence>

            {/* End marker */}
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white/10 font-mono text-xs select-none">
              <span style={{ writingMode: 'vertical-rl', fontSize: '9px', letterSpacing: '3px' }}>◼ END ◼</span>
            </div>
          </div>
        </div>

        {/* Bottom sprocket holes row */}
        <div className="flex gap-0 overflow-hidden h-6 bg-[#080c10] border-y border-white/5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-10 flex items-center justify-center">
              <div className="w-5 h-3 rounded-sm bg-[#0d1117] border border-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Frame count */}
      <div className="max-w-7xl mx-auto px-6 mt-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-gray-600 font-mono text-xs">
          {filtered.length} frame{filtered.length !== 1 ? 's' : ''} — scroll to explore
        </span>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Film frame border */}
              <div className="bg-[#080c10] p-4 rounded-lg border border-white/10">
                {/* Top sprockets */}
                <div className="flex justify-between mb-3 px-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-8 h-4 rounded-sm bg-[#0d1117] border border-white/15" />
                  ))}
                </div>

                {/* Image */}
                <div className="aspect-video bg-[#0d1117] rounded overflow-hidden relative">
                  <img
                    src={lightbox.src}
                    alt={lightbox.caption}
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/800x450/080c10/06b6d4?text=${encodeURIComponent(lightbox.caption)}`;
                    }}
                  />
                  {/* Cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">{lightbox.caption}</p>
                    <p className="text-gray-300 text-sm">{lightbox.subcaption}</p>
                  </div>
                  {/* Category + year */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full border backdrop-blur-sm ${categoryConfig[lightbox.category].color}`}>
                      {categoryConfig[lightbox.category].label}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full border border-white/20 bg-black/40 text-gray-300 backdrop-blur-sm font-mono">
                      {lightbox.year}
                    </span>
                  </div>
                </div>

                {/* Bottom sprockets */}
                <div className="flex justify-between mt-3 px-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-8 h-4 rounded-sm bg-[#0d1117] border border-white/15" />
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between mt-4 px-1">
                <button
                  onClick={prevPhoto}
                  disabled={lbIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                >
                  <ChevronLeftIcon className="w-4 h-4" /> Previous
                </button>
                <span className="text-gray-600 font-mono text-sm">
                  {lbIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={nextPhoto}
                  disabled={lbIndex === filtered.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                >
                  Next <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-[#0d1117] border border-white/20 text-gray-400 hover:text-white transition-all"
                aria-label="Close"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Individual film frame ──────────────────────────────────

interface FilmFrameProps {
  photo: Photo;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function FilmFrame({ photo, index, isHovered, onHover, onLeave, onClick }: FilmFrameProps) {
  const { label, color, glow } = categoryConfig[photo.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex-shrink-0 cursor-pointer group"
      style={{ width: '240px' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative"
        style={{
          boxShadow: isHovered ? `0 20px 50px ${glow}, 0 0 0 1px rgba(255,255,255,0.1)` : 'none',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Frame number strip */}
        <div className="bg-[#050810] px-2 py-1 flex items-center justify-between">
          <span className="text-white/20 font-mono text-[9px]">
            {String(index + 1).padStart(4, '0')}
          </span>
          <span className="text-white/20 font-mono text-[9px]">{photo.year}</span>
        </div>

        {/* Photo */}
        <div
          className="relative overflow-hidden bg-[#0d1117]"
          style={{ height: '180px' }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            style={{
              filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.85) saturate(0.9)',
              transition: 'filter 0.3s ease',
            }}
            onError={e => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/240x180/0d1117/06b6d4?text=${encodeURIComponent(photo.caption)}`;
            }}
          />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* Hover play icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white ml-0.5" />
            </div>
          </motion.div>

          {/* Bottom gradient + caption */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-3"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            <p className="text-white text-xs font-semibold leading-tight">{photo.caption}</p>
            <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{photo.subcaption}</p>
          </motion.div>
        </div>

        {/* Category strip */}
        <div className={`px-3 py-1.5 flex items-center justify-between bg-[#050810]`}>
          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${color}`}>
            {label}
          </span>
          <span className="text-white/20 font-mono text-[9px]">VR-MEM</span>
        </div>
      </motion.div>
    </motion.div>
  );
}