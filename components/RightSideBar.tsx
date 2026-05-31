import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RightSideBar() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedHigh = localStorage.getItem('highContrast');
    const isHigh = savedHigh === 'true';
    setHighContrast(isHigh);
    document.documentElement.setAttribute('data-theme', isHigh ? 'high-contrast' : '');
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('reduceMotion');
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReduced = saved === 'true' || prefersReduce;
    setReduceMotion(isReduced);
    document.body.classList.toggle('reduce-motion', isReduced);
  }, []);

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem('highContrast', `${next}`);
      document.documentElement.setAttribute('data-theme', next ? 'high-contrast' : '');
      return next;
    });
  };

  const toggleReduceMotion = () => {
    setReduceMotion((prev) => {
      const next = !prev;
      localStorage.setItem('reduceMotion', `${next}`);
      document.body.classList.toggle('reduce-motion', next);
      return next;
    });
  };

  return (
    <div
      className={`
        fixed 
        right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 
        top-[60px] sm:top-[70px] md:top-[80px] bottom-0
        z-40 
        hidden md:flex           /* hidden below md (768px), visible from md+ */
        flex-col 
        items-center 
        pointer-events-auto
      `}
    >
      {/* Vertical "Settings" text – pinned at top */}
      <div className="absolute top-0 -right-8 md:-right-10 lg:-right-12 z-50">
        <span
          className={`
            text-xs md:text-sm font-medium 
            tracking-[0.2em] md:tracking-[0.35em] uppercase text-gray-400/80
            transform rotate-90 origin-bottom-right
            inline-block whitespace-nowrap
            select-none
          `}
        >
          Settings
        </span>
      </div>

      {/* Buttons container – starts below the text */}
      <div className="mt-20 md:mt-28 lg:mt-32 flex flex-col items-center gap-4 md:gap-6 pt-2">
        {/* Optional small top line segment */}
        <div className="w-0.5 h-10 bg-gradient-to-b from-blue-400/40 to-transparent" />

        {/* Reduced Motion Button */}
        <motion.button
          onClick={toggleReduceMotion}
          aria-pressed={reduceMotion}
          className={`
            px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-xs font-semibold 
            transition-all duration-300 whitespace-nowrap
            border border-white/20 min-w-max
            ${
              reduceMotion
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-lg shadow-blue-500/20'
                : 'bg-white/10 text-gray-100 hover:bg-white/20 border-white/20'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {reduceMotion ? 'Reduced Motion Enabled' : 'Enable Reduced Motion'}
        </motion.button>

        {/* High Contrast Button */}
        <motion.button
          onClick={toggleHighContrast}
          aria-pressed={highContrast}
          className={`
            px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-xs font-semibold 
            transition-all duration-300 whitespace-nowrap
            border border-white/20 min-w-max
            ${
              highContrast
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-lg shadow-amber-500/20'
                : 'bg-white/10 text-gray-100 hover:bg-white/20 border-white/20'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {highContrast ? 'High Contrast Enabled' : 'Enable High Contrast'}
        </motion.button>

        {/* Main vertical connecting line – stretches to bottom */}
        <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-400/50 via-blue-400/20 to-transparent min-h-[150px]" />
      </div>
    </div>
  );
}
