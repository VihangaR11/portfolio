import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const projects = [
{
  title: 'CloudSync Dashboard',
  description:
  'Real-time cloud infrastructure monitoring platform with live metrics, alerts, and automated scaling insights.',
  role: 'Lead DevOps Engineer',
  duration: '6 months',
  tags: ['React', 'TypeScript', 'AWS'],
  liveUrl: 'https://example.com/cloudsync',
  repoUrl: 'https://github.com/VihangaR11/cloudsync-dashboard',
  stars: 420,
  commits: 230,
  status: 'Production',
  story: {
    metrics: ['Reduced MTTR by 40%', 'Scaled 8k+ concurrent users', 'Cost dropped 22% by auto-scaling policies'],
    challenge: 'Create a single pane of glass for multi-cloud infra metrics with sub-minute alerting.',
    roleAndResults: 'Led architecture + CI/CD; built robust ops dashboards, cut incident response time by 2x.'
  },
  screenshots: ['/screenshots/cloudsync-1.png', '/screenshots/cloudsync-2.png', '/screenshots/cloudsync-3.png'],
  gradient: 'from-cyan-500 to-blue-600'
},
{
  title: 'PixelForge',
  description:
  'AI-powered image editing tool featuring intelligent background removal, style transfer, and batch processing.',
  role: 'Full Stack Developer',
  duration: '5 months',
  tags: ['Python', 'TensorFlow', 'React'],
  liveUrl: 'https://example.com/pixelforge',
  repoUrl: 'https://github.com/VihangaR11/pixelforge',
  stars: 812,
  commits: 320,
  status: 'MVP',
  story: {
    metrics: ['Achieved 50k daily processed images', 'Model improved removal accuracy to 94%', 'Pipeline cost < $0.01/image'],
    challenge: 'Integrate several ML pipelines without losing throughput for batch jobs.',
    roleAndResults: 'Led ML integration and frontend ux with efficient async batching, increasing retention by 20%.'
  },
  screenshots: ['/screenshots/pixelforge-1.png', '/screenshots/pixelforge-2.png', '/screenshots/pixelforge-3.png'],
  gradient: 'from-violet-500 to-purple-600'
},
{
  title: 'DevFlow',
  description:
  'Developer productivity suite with integrated task management, code snippets, and team collaboration features.',
  role: 'Product Architect',
  duration: '4 months',
  tags: ['Node.js', 'GraphQL', 'Docker'],
  liveUrl: 'https://example.com/devflow',
  repoUrl: 'https://github.com/VihangaR11/devflow',
  stars: 650,
  commits: 289,
  status: 'In development',
  story: {
    metrics: ['Reduced team context switches 60%', 'Live adoption 300+ daily active teams', 'Average sprint throughput 20% higher'],
    challenge: 'Build a holistic developer workflow with integrated chat, snippet library, and CI status.',
    roleAndResults: 'Owned product architecture; enabled fast sync across teams and 30% faster delivery.'
  },
  screenshots: ['/screenshots/devflow-1.png', '/screenshots/devflow-2.png', '/screenshots/devflow-3.png'],
  gradient: 'from-cyan-400 to-violet-500'
},
{
  title: 'EcoTrack',
  description:
  'Sustainability tracking app helping users monitor and reduce their carbon footprint with personalized insights.',
  role: 'Mobile Engineer',
  duration: '5 months',
  tags: ['React Native', 'Firebase'],
  liveUrl: 'https://example.com/ecotrack',
  repoUrl: 'https://github.com/VihangaR11/ecotrack',
  stars: 510,
  commits: 198,
  status: 'Production',
  story: {
    metrics: ['90% user goal completion', '60k monthly actives', '20% churn reduction with insights'],
    challenge: 'Deliver offline-first tracking for users in low-connectivity regions.',
    roleAndResults: 'Developed cross-platform mobile sync and analytics pipeline, raising retention by 18%.'
  },
  screenshots: ['/screenshots/ecotrack-1.png', '/screenshots/ecotrack-2.png', '/screenshots/ecotrack-3.png'],
  gradient: 'from-green-500 to-cyan-500'
},
{
  title: 'SoundScape',
  description:
  'Immersive music visualization engine creating real-time 3D graphics synchronized to audio frequencies.',
  role: 'Frontend Engineer',
  duration: '4 months',
  tags: ['Three.js', 'Web Audio API'],
  liveUrl: 'https://example.com/soundscape',
  repoUrl: 'https://github.com/VihangaR11/soundscape',
  stars: 380,
  commits: 165,
  status: 'MVP',
  story: {
    metrics: ['Video engagement up 4x', 'Render latency < 40ms', '50k uniques monthly'],
    challenge: 'Create smooth 3D visualizations for low-end GPU devices in browser.',
    roleAndResults: 'Implemented performance optimized deferred rendering pipeline and adaptive quality scaling.'
  },
  screenshots: ['/screenshots/soundscape-1.png', '/screenshots/soundscape-2.png', '/screenshots/soundscape-3.png'],
  gradient: 'from-pink-500 to-violet-600'
},
{
  title: 'CodeMentor AI',
  description:
  'AI pair programming assistant providing intelligent code suggestions, explanations, and debugging help.',
  role: 'AI Specialist',
  duration: '3 months',
  tags: ['OpenAI', 'TypeScript', 'Next.js'],
  liveUrl: 'https://example.com/codementor-ai',
  repoUrl: 'https://github.com/VihangaR11/codementor-ai',
  stars: 920,
  commits: 410,
  status: 'Production',
  story: {
    metrics: ['75% user problem resolution', '24/7 auto code suggestions', '70% dev time saved'],
    challenge: 'Build contextual code assistant with minimal prompt latency and high relevance.',
    roleAndResults: 'Designed LLM pipeline with caching + semantic search; boosted accuracy and reduced API cost 45%.'
  },
  screenshots: ['/screenshots/codementor-ai-1.png', '/screenshots/codementor-ai-2.png', '/screenshots/codementor-ai-3.png'],
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
  const [caseStudyMode, setCaseStudyMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [prefersReduceMotion, setPrefersReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReduceMotion(mq.matches || document.body.classList.contains('reduce-motion'));
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    selected: { boxShadow: '0 0 20px rgba(6, 182, 212, 0.45)', scale: 1.03, transition: { duration: 0.3 } }
  };

  const handleProjectSelect = (project) => {
    if (project.title !== selectedProject.title) {
      setCaseStudyMode(true);
      setTimeout(() => {
        setSelectedProject(project);
        setScreenshotIndex(0);
      }, 120);
    }
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="projects-heading">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">

            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for
            building great products
          </p>
        </motion.div>

        {/* Case Study Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-white">Mode:</span>
            <button
              onClick={() => setCaseStudyMode(false)}
              className={`px-3 py-1 rounded-full ${!caseStudyMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-gray-300'} transition`}>Cards</button>
            <button
              onClick={() => setCaseStudyMode(true)}
              className={`px-3 py-1 rounded-full ${caseStudyMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-gray-300'} transition`}>Case Study</button>
          </div>

          <div className="text-sm text-gray-400">
            Select project for case study breadcrumb: <span className="text-cyan-300 font-medium">{selectedProject.title}</span>
          </div>
        </div>

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
            onClick={() => handleProjectSelect(project)}
            whileHover={prefersReduceMotion ? {} : { rotateX: 2, rotateY: 5, scale: 1.02 }}
            whileTap={prefersReduceMotion ? {} : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 220, damping: 15 }}
            className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-white/20 ${selectedProject.title === project.title ? 'ring ring-cyan-300/40 ring-offset-2 ring-offset-[#0d1117]' : ''}`}>


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

        {caseStudyMode && selectedProject && (
          <div className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Case Study: {selectedProject.title}</h3>
                <p className="text-gray-400 mt-1">{selectedProject.role} • {selectedProject.duration}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 rounded-lg text-sm hover:bg-cyan-500/25 transition">
                  <ExternalLinkIcon className="w-4 h-4" /> Live Demo
                </a>
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm hover:bg-white/20 transition">
                  <GithubIcon className="w-4 h-4" /> Source
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={selectedProject.screenshots[screenshotIndex]}
                    alt={`${selectedProject.title} screenshot ${screenshotIndex + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setScreenshotIndex((prev) => (prev - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setScreenshotIndex((prev) => (prev + 1) % selectedProject.screenshots.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {selectedProject.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setScreenshotIndex(i)}
                      className={`w-3 h-3 rounded-full ${screenshotIndex === i ? 'bg-cyan-400' : 'bg-white/30'}`}/>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl h-fit">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full ${selectedProject.status === 'Production' ? 'bg-green-500/20 text-green-300' : selectedProject.status === 'MVP' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}">{selectedProject.status}</span>
                  <span className="text-xs text-gray-400">90s story deck</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{selectedProject.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Success metrics</h4>
                  <ul className="list-disc pl-5 text-gray-300 text-sm">
                    {selectedProject.story.metrics.map((item, idx) => (
                      <li key={idx} className="mb-1">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Technical challenge</h4>
                  <p className="text-gray-300 text-sm">{selectedProject.story.challenge}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Role → Journey → Results</h4>
                  <p className="text-gray-300 text-sm">{selectedProject.story.roleAndResults}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/10 border border-white/10 rounded-lg">
                    <p className="text-xs text-gray-400 uppercase">Stars</p>
                    <p className="text-lg font-semibold text-cyan-300">{selectedProject.stars}</p>
                  </div>
                  <div className="p-3 bg-white/10 border border-white/10 rounded-lg">
                    <p className="text-xs text-gray-400 uppercase">Commits</p>
                    <p className="text-lg font-semibold text-violet-300">{selectedProject.commits}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

}