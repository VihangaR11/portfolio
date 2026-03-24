import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, RocketIcon, HeartIcon, SparklesIcon } from 'lucide-react';

const features = [
  {
    icon: CodeIcon,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code is my passion',
    color: 'cyan'
  },
  {
    icon: RocketIcon,
    title: 'Fast Delivery',
    description: 'Delivering high-quality projects on time, every time',
    color: 'violet'
  },
  {
    icon: HeartIcon,
    title: 'User-Centric',
    description: 'Building experiences that users love and enjoy',
    color: 'cyan'
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description: 'Always exploring new technologies and approaches',
    color: 'violet'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            About{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
              Hi there! I'm <span className="text-cyan-400 font-semibold">Vihanga Rathnayake</span>, 
              a passionate software engineer specializing in full-stack development and DevOps. 
              I love turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With experience in modern web technologies and cloud infrastructure, I build 
              scalable applications that make a real impact. Currently pursuing my Bachelor's 
              degree in Software Engineering while working on exciting projects that push the 
              boundaries of what's possible.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or mentoring aspiring developers in the tech community.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-gray-300 text-sm">Available for freelance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300 text-sm">Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature) => {
              const IconComponent = feature.icon;
              const glowColor = feature.color === 'cyan' ? 'shadow-cyan-500/20' : 'shadow-violet-500/20';
              const iconColor = feature.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400';
              
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:${glowColor} hover:border-white/20`}
                >
                  <div className={`p-3 rounded-lg bg-white/5 ${iconColor} inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
