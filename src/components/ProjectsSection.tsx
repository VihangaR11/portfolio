import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
const projects = [
{
  title: 'CloudSync Dashboard',
  description:
  'Real-time cloud infrastructure monitoring platform with live metrics, alerts, and automated scaling insights.',
  tags: ['React', 'TypeScript', 'AWS'],
  gradient: 'from-cyan-500 to-blue-600'
},
{
  title: 'PixelForge',
  description:
  'AI-powered image editing tool featuring intelligent background removal, style transfer, and batch processing.',
  tags: ['Python', 'TensorFlow', 'React'],
  gradient: 'from-violet-500 to-purple-600'
},
{
  title: 'DevFlow',
  description:
  'Developer productivity suite with integrated task management, code snippets, and team collaboration features.',
  tags: ['Node.js', 'GraphQL', 'Docker'],
  gradient: 'from-cyan-400 to-violet-500'
},
{
  title: 'EcoTrack',
  description:
  'Sustainability tracking app helping users monitor and reduce their carbon footprint with personalized insights.',
  tags: ['React Native', 'Firebase'],
  gradient: 'from-green-500 to-cyan-500'
},
{
  title: 'SoundScape',
  description:
  'Immersive music visualization engine creating real-time 3D graphics synchronized to audio frequencies.',
  tags: ['Three.js', 'Web Audio API'],
  gradient: 'from-pink-500 to-violet-600'
},
{
  title: 'CodeMentor AI',
  description:
  'AI pair programming assistant providing intelligent code suggestions, explanations, and debugging help.',
  tags: ['OpenAI', 'TypeScript', 'Next.js'],
  gradient: 'from-amber-500 to-orange-600'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative"
      aria-labelledby="projects-heading">

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
            id="projects-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4">

            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for
            building great products
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1
          }}>

          {projects.map((project) =>
          <motion.article
            key={project.title}
            variants={itemVariants}
            className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-white/20">

              {/* Project Image Placeholder */}
              <div
              className={`h-48 bg-gradient-to-br ${project.gradient} opacity-80 relative overflow-hidden`}>

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-6xl font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
                  aria-label={`View ${project.title} live demo`}>

                    <ExternalLinkIcon className="w-5 h-5" />
                  </button>
                  <button
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
                  aria-label={`View ${project.title} source code`}>

                    <GithubIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) =>
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300">

                      {tag}
                    </span>
                )}
                </div>
              </div>
            </motion.article>
          )}
        </motion.div>
      </div>
    </section>);

}