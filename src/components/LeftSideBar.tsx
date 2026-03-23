import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react'; // npm install lucide-react if not installed

export default function LeftSocialBar() {
  return (
    <div
      className={`
        fixed 
        left-4 sm:left-6 lg:left-8 
        top-[80px] bottom-0      /* ← change 80px to your navbar height + extra space */
        z-40 
        hidden md:flex           /* hidden below md (768px), visible from md+ */
        flex-col 
        items-center 
        pointer-events-auto
      `}
    >
      {/* Vertical "Follow Me" text – pinned at top */}
      <div className="absolute top-0 -left-10 lg:-left-12 z-50">
        <span
          className={`
            text-xs sm:text-sm font-medium 
            tracking-[0.35em] uppercase text-gray-400/80
            transform -rotate-90 origin-bottom-left
            inline-block whitespace-nowrap
            select-none
          `}
        >
          Follow Me
        </span>
      </div>

      {/* Social icons + line container – starts below the text */}
      <div className="mt-28 sm:mt-32 flex flex-col items-center gap-7 pt-2">
        {/* Optional small top line segment */}
        <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-400/40 to-transparent" />

        <motion.a
          href="https://github.com/YOUR_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -3 }}
          aria-label="GitHub"
        >
          <Github size={26} strokeWidth={1.7} />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/YOUR_PROFILE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -3 }}
          aria-label="LinkedIn"
        >
          <Linkedin size={26} strokeWidth={1.7} />
        </motion.a>

        <motion.a
          href="https://twitter.com/YOUR_HANDLE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -3 }}
          aria-label="Twitter / X"
        >
          <Twitter size={26} strokeWidth={1.7} />
        </motion.a>

        {/* Main vertical connecting line – stretches to bottom */}
        <div className="w-0.5 flex-1 bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent min-h-[150px]" />
      </div>
    </div>
  );
}