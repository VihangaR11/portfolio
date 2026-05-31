import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, UsersIcon, AwardIcon, CoffeeIcon } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  color: 'blue' | 'amber';
}

const stats: Stat[] = [
  {
    icon: CodeIcon,
    value: 50,
    label: 'Projects Completed',
    suffix: '+',
    color: 'blue'
  },
  {
    icon: UsersIcon,
    value: 20,
    label: 'Happy Clients',
    suffix: '+',
    color: 'amber'
  },
  {
    icon: AwardIcon,
    value: 15,
    label: 'Certifications',
    suffix: '+',
    color: 'blue'
  },
  {
    icon: CoffeeIcon,
    value: 8,
    label: 'Years of Learning',
    suffix: '+',
    color: 'amber'
  },
];

function CountUpAnimation({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <div ref={ref}>{count}</div>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            const glowColor = stat.color === 'blue' ? 'shadow-blue-500/20' : 'shadow-amber-500/20';
            const iconColor = stat.color === 'blue' ? 'text-blue-400' : 'text-amber-400';
            const gradientColor = stat.color === 'blue' 
              ? 'from-blue-400 to-blue-700' 
              : 'from-amber-500 to-blue-400';

            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:${glowColor} hover:border-white/20`}
              >
                <div className={`inline-flex p-4 rounded-xl bg-white/5 ${iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent mb-2`}>
                  <CountUpAnimation value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
