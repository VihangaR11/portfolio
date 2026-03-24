import React from 'react';
import { motion } from 'framer-motion';

interface SkillData {
  name: string;
  level: number; // 0-100
  category: string;
}

const skillsData: SkillData[] = [
  // Frontend
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, category: 'Frontend' },
  { name: 'TailwindCSS', level: 88, category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', level: 82, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'REST APIs', level: 85, category: 'Backend' },
  { name: 'GraphQL', level: 70, category: 'Backend' },
  
  // Database
  { name: 'PostgreSQL', level: 80, category: 'Database' },
  { name: 'MongoDB', level: 75, category: 'Database' },
  
  // DevOps
  { name: 'Docker', level: 82, category: 'DevOps' },
  { name: 'AWS', level: 78, category: 'DevOps' },
  { name: 'CI/CD', level: 80, category: 'DevOps' },
  { name: 'Git', level: 92, category: 'DevOps' },
];

const categories = ['Frontend', 'Backend', 'Database', 'DevOps'];
const categoryColors = {
  'Frontend': 'from-cyan-400 to-blue-500',
  'Backend': 'from-violet-400 to-purple-500',
  'Database': 'from-green-400 to-emerald-500',
  'DevOps': 'from-orange-400 to-red-500',
};

export function SkillsRadarSection() {
  return (
    <section
      id="skills-radar"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="skills-radar-heading"
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
            id="skills-radar-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Skills{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Detailed breakdown of my technical expertise
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} bg-clip-text text-transparent`}>
                {category}
              </h3>

              <div className="space-y-6">
                {skillsData
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div key={skill.name}>
                      {/* Skill Name and Level */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm font-semibold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                        {/* Background grid pattern */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute top-0 bottom-0 w-px bg-white/20"
                              style={{ left: `${i * 10}%` }}
                            />
                          ))}
                        </div>

                        {/* Animated progress */}
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.1 * index,
                            ease: 'easeOut'
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>

                        {/* Glow effect */}
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} blur-sm opacity-50 rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.1 * index,
                            ease: 'easeOut'
                          }}
                        />
                      </div>

                      {/* Proficiency Label */}
                      <div className="mt-1 text-xs text-gray-500">
                        {skill.level >= 90 && 'Expert'}
                        {skill.level >= 75 && skill.level < 90 && 'Advanced'}
                        {skill.level >= 60 && skill.level < 75 && 'Intermediate'}
                        {skill.level < 60 && 'Beginner'}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              <span className="text-gray-400">90%+ Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
              <span className="text-gray-400">75-89% Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
              <span className="text-gray-400">60-74% Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
              <span className="text-gray-400">&lt;60% Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
