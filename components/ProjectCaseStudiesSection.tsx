import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLinkIcon, XIcon, TrendingUpIcon, UsersIcon, ZapIcon } from 'lucide-react';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface ProjectMetrics {
  users?: string;
  performance?: string;
  impact?: string;
}

interface ProjectDetails {
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  challenges: string;
  results: string;
  metrics: ProjectMetrics;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
}

const detailedProjects: ProjectDetails[] = [
  {
    title: 'CloudSync Dashboard',
    description: 'Real-time cloud infrastructure monitoring platform with live metrics, alerts, and automated scaling insights.',
    problem: 'Manual AWS monitoring wasted 10+ hours per week. Teams had no real-time visibility into infrastructure health.',
    solution: 'Built a real-time dashboard aggregating CloudWatch metrics with custom alerting and automated scaling recommendations.',
    technologies: ['React', 'TypeScript', 'AWS CloudWatch', 'WebSocket', 'Redis'],
    challenges: 'Handling real-time data from multiple AWS regions with minimal latency. Implemented efficient WebSocket connections and Redis caching.',
    results: 'Reduced monitoring time by 80%. Caught 95% of issues before customer impact. Automated 60% of scaling decisions.',
    metrics: {
      users: '500+ Engineers',
      performance: '80% Time Saved',
      impact: '95% Issue Detection'
    },
    gradient: 'from-blue-500 to-blue-600',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'PixelForge',
    description: 'AI-powered image editing tool featuring intelligent background removal, style transfer, and batch processing.',
    problem: 'Designers spent hours on repetitive image editing tasks. Manual background removal was slow and inconsistent.',
    solution: 'Developed ML-powered tool using TensorFlow for automated editing. Built efficient batch processing pipeline.',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'OpenCV'],
    challenges: 'Training custom ML models for accurate background detection. Optimized inference time from 30s to 2s per image.',
    results: 'Processed 100,000+ images. 10x faster than manual editing. 98% accuracy in background removal.',
    metrics: {
      users: '1,000+ Designers',
      performance: '10x Faster',
      impact: '100K+ Images Processed'
    },
    gradient: 'from-amber-500 to-amber-500',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'DevFlow',
    description: 'Developer productivity suite with integrated task management, code snippets, and team collaboration features.',
    problem: 'Developers juggled 5+ tools daily. No unified platform for tasks, code snippets, and collaboration.',
    solution: 'Created all-in-one productivity platform with smart task tracking, searchable snippet library, and real-time collaboration.',
    technologies: ['Node.js', 'GraphQL', 'Docker', 'PostgreSQL', 'Redis'],
    challenges: 'Real-time collaboration with offline support. Implemented CRDT for conflict-free synchronization.',
    results: 'Adopted by 50+ teams. 40% reduction in context switching. 25% productivity increase.',
    metrics: {
      users: '2,000+ Developers',
      performance: '40% Less Switching',
      impact: '25% More Productive'
    },
    gradient: 'from-blue-400 to-blue-700',
    liveUrl: '#',
    githubUrl: '#'
  }
];

export function ProjectCaseStudiesSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  return (
    <section
      id="case-studies"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="case-studies-heading"
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
            id="case-studies-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Project{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Deep dive into how I solve real-world problems
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {detailedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 hover:border-white/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className={`h-32 bg-gradient-to-br ${project.gradient} opacity-80 relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {project.metrics.users && (
                    <div className="text-center">
                      <div className="text-blue-400 text-lg font-bold">
                        <UsersIcon className="w-4 h-4 mx-auto mb-1" />
                      </div>
                      <div className="text-xs text-gray-500">{project.metrics.users}</div>
                    </div>
                  )}
                  {project.metrics.performance && (
                    <div className="text-center">
                      <div className="text-amber-400 text-lg font-bold">
                        <ZapIcon className="w-4 h-4 mx-auto mb-1" />
                      </div>
                      <div className="text-xs text-gray-500">{project.metrics.performance}</div>
                    </div>
                  )}
                  {project.metrics.impact && (
                    <div className="text-center">
                      <div className="text-green-400 text-lg font-bold">
                        <TrendingUpIcon className="w-4 h-4 mx-auto mb-1" />
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{project.metrics.impact}</div>
                    </div>
                  )}
                </div>

                <button className="w-full py-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">
                  Read Full Case Study →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#060d1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`relative h-48 bg-gradient-to-br ${selectedProject.gradient} opacity-90`}>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XIcon className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <div className="flex gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        className="inline-flex items-center gap-1 text-white/90 hover:text-white text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        className="inline-flex items-center gap-1 text-white/90 hover:text-white text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Problem */}
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-3">🎯 Problem</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.problem}</p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-3">💡 Solution</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.solution}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-3">🛠️ Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-xl font-bold text-orange-400 mb-3">⚡ Challenges</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.challenges}</p>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-3">🎉 Results</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{selectedProject.results}</p>
                  
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProject.metrics.users && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <UsersIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">
                          {selectedProject.metrics.users}
                        </div>
                        <div className="text-sm text-gray-400">Users Served</div>
                      </div>
                    )}
                    {selectedProject.metrics.performance && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <ZapIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">
                          {selectedProject.metrics.performance}
                        </div>
                        <div className="text-sm text-gray-400">Performance</div>
                      </div>
                    )}
                    {selectedProject.metrics.impact && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <TrendingUpIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">
                          {selectedProject.metrics.impact}
                        </div>
                        <div className="text-sm text-gray-400">Impact</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}