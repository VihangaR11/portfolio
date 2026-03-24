import React, { Children, Component } from 'react';
import { motion } from 'framer-motion';
import {
  Code2Icon,
  FileCodeIcon,
  ServerIcon,
  BrainIcon,
  PaletteIcon,
  CloudIcon,
  ContainerIcon,
  GitBranchIcon,
  Share2Icon,
  PaintbrushIcon,
  DatabaseIcon,
  LeafIcon } from
'lucide-react';
const skills = [
{
  name: 'React',
  icon: Code2Icon,
  color: 'cyan'
},
{
  name: 'TypeScript',
  icon: FileCodeIcon,
  color: 'violet'
},
{
  name: 'Node.js',
  icon: ServerIcon,
  color: 'cyan'
},
{
  name: 'Python',
  icon: BrainIcon,
  color: 'violet'
},
{
  name: 'Figma',
  icon: PaletteIcon,
  color: 'cyan'
},
{
  name: 'AWS',
  icon: CloudIcon,
  color: 'violet'
},
{
  name: 'Docker',
  icon: ContainerIcon,
  color: 'cyan'
},
{
  name: 'Git',
  icon: GitBranchIcon,
  color: 'violet'
},
{
  name: 'GraphQL',
  icon: Share2Icon,
  color: 'cyan'
},
{
  name: 'TailwindCSS',
  icon: PaintbrushIcon,
  color: 'violet'
},
{
  name: 'PostgreSQL',
  icon: DatabaseIcon,
  color: 'cyan'
},
{
  name: 'MongoDB',
  icon: LeafIcon,
  color: 'violet'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="skills-heading">

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 0.6
          }}>

          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4">

            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A collection of technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2
          }}>

          {skills.map((skill) => {
            const IconComponent = skill.icon;
            const glowColor =
            skill.color === 'cyan' ?
            'shadow-cyan-500/20' :
            'shadow-violet-500/20';
            const iconColor =
            skill.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400';
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:${glowColor} hover:border-white/20`}>

                <div
                  className={`p-3 rounded-lg bg-white/5 ${iconColor} group-hover:scale-110 transition-transform duration-300`}>

                  <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-white font-medium text-sm md:text-base">
                  {skill.name}
                </span>
              </motion.div>);

          })}
        </motion.div>
      </div>
    </section>);

}