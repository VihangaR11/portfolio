import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const projects = [
  {
    title: 'Image Classifier App',
    description:
      'Deep learning image classification system using PyTorch with a React frontend — supports multi-class prediction with confidence scores and real-time inference.',
    role: 'ML Engineer & Full-Stack Developer',
    duration: '3 months',
    tags: ['Python', 'PyTorch', 'React', 'FastAPI'],
    liveUrl: 'https://github.com/VihangaR11/image_classifier_project',
    repoUrl: 'https://github.com/VihangaR11/image_classifier_project',
    status: 'Production',
    story: {
      metrics: ['95%+ classification accuracy', 'Sub-200ms inference time', 'Supports 10+ image categories'],
      challenge: 'Build an end-to-end ML pipeline from data preprocessing to a production-ready REST API with a clean web interface.',
      roleAndResults: 'Designed the CNN architecture, built the FastAPI backend, and created the React frontend — delivered a fully working classifier as a deployable web app.',
    },
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Pit Classification System',
    description:
      'Computer vision system for detecting and classifying road pits/potholes from images using transfer learning — built for infrastructure assessment use cases.',
    role: 'Computer Vision Engineer',
    duration: '2 months',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Jupyter'],
    liveUrl: 'https://github.com/VihangaR11/pit_classification',
    repoUrl: 'https://github.com/VihangaR11/pit_classification',
    status: 'MVP',
    story: {
      metrics: ['92% detection accuracy', 'Works on low-res road images', 'Automated severity scoring'],
      challenge: 'Classify pit severity from noisy real-world road photos with limited labelled training data.',
      roleAndResults: 'Applied transfer learning with MobileNetV2, built custom data augmentation pipelines, achieved strong accuracy with a small dataset.',
    },
    gradient: 'from-amber-500 to-amber-500',
  },
  {
    title: 'Developer Portfolio',
    description:
      'This portfolio site — a performant, accessible, animated single-page app with PWA support, particle canvas, GitHub live stats, and a contact form.',
    role: 'Frontend Developer',
    duration: 'Ongoing',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Framer Motion'],
    liveUrl: 'https://vihangar11.github.io/portfolio/',
    repoUrl: 'https://github.com/VihangaR11/portfolio',
    status: 'Production',
    story: {
      metrics: ['90+ Lighthouse performance', 'PWA-enabled with offline support', 'Code-split into 8+ lazy chunks'],
      challenge: 'Build a visually impressive portfolio without sacrificing load time or accessibility.',
      roleAndResults: 'Designed and built everything from scratch — particle systems, skill radars, resume timeline, live GitHub data, and smooth animations.',
    },
    gradient: 'from-blue-400 to-blue-700',
  },
  {
    title: 'ACS Community Platform',
    description:
      'Web platform for the Association of Computing Students at USJ — event listings, member sign-ups, seminar resources, and club announcements.',
    role: 'Co-Founder & Lead Developer',
    duration: '4 months',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://github.com/VihangaR11',
    repoUrl: 'https://github.com/VihangaR11',
    status: 'In development',
    story: {
      metrics: ['100+ active student members', 'Streamlined 5+ events per semester', 'EduACS seminar materials hosted'],
      challenge: 'Build a lightweight club management platform that non-technical committee members could actually use and maintain.',
      roleAndResults: 'Co-founded the club and led the technical team; built the MERN-stack platform that became the operational backbone of ACS.',
    },
    gradient: 'from-emerald-500 to-blue-500',
  },
  {
    title: 'LearnLift',
    description:
      'Educational resource platform connecting university students with study materials, peer tutoring slots, and academic community support.',
    role: 'Full-Stack Developer',
    duration: '3 months',
    tags: ['React', 'Firebase', 'Tailwind'],
    liveUrl: 'https://github.com/VihangaR11',
    repoUrl: 'https://github.com/VihangaR11',
    status: 'MVP',
    story: {
      metrics: ['50+ resources shared in first month', 'Real-time peer collaboration', 'Mobile-responsive PWA'],
      challenge: 'Build a community-first study platform that works offline and on low-bandwidth mobile connections.',
      roleAndResults: 'Designed and built the Firebase-backed frontend with offline-first caching and real-time updates, targeting underserved student communities.',
    },
    gradient: 'from-pink-500 to-blue-700',
  },
  {
    title: 'DevOps CI/CD Toolkit',
    description:
      'A reusable collection of GitHub Actions workflows, Docker Compose templates, and AWS deployment scripts for rapid project bootstrapping.',
    role: 'DevOps Engineer',
    duration: '2 months',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Bash'],
    liveUrl: 'https://github.com/VihangaR11',
    repoUrl: 'https://github.com/VihangaR11',
    status: 'Production',
    story: {
      metrics: ['Cuts new project setup from hours to minutes', 'Used across 5+ personal projects', 'Automated test-build-deploy on every push'],
      challenge: 'Eliminate repetitive DevOps setup work and create a personal toolkit for consistent, reliable deployments.',
      roleAndResults: 'Built modular GitHub Actions workflows and Docker templates — now the starting point for every new project I ship.',
    },
    gradient: 'from-amber-500 to-orange-600',
  },
];

const statusColors: Record<string, string> = {
  Production:      'bg-green-500/20 text-green-300 border border-green-500/30',
  MVP:             'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  'In development':'bg-blue-500/20 text-blue-300 border border-blue-500/30',
};

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function ProjectsSection() {
  const [caseStudyMode, setCaseStudyMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [prefersReduceMotion, setPrefersReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReduceMotion(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleProjectSelect = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setCaseStudyMode(true);
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">— What I've built</p>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Real projects spanning machine learning, full-stack web, DevOps, and community platforms
          </p>
        </motion.div>

        {/* View mode controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-white">View:</span>
            <button
              onClick={() => setCaseStudyMode(false)}
              className={`px-3 py-1 rounded-full transition ${!caseStudyMode ? 'bg-blue-500/20 text-blue-300' : 'bg-white/10 text-gray-300'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setCaseStudyMode(true)}
              className={`px-3 py-1 rounded-full transition ${caseStudyMode ? 'bg-blue-500/20 text-blue-300' : 'bg-white/10 text-gray-300'}`}
            >
              Case Study
            </button>
          </div>
          {caseStudyMode && (
            <p className="text-sm text-gray-400">
              Viewing: <span className="text-blue-300 font-medium">{selectedProject.title}</span>
            </p>
          )}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              onClick={() => handleProjectSelect(project)}
              whileHover={prefersReduceMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReduceMotion ? {} : { scale: 0.97 }}
              className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-white/20 ${
                selectedProject.title === project.title && caseStudyMode
                  ? 'ring ring-blue-300/40 ring-offset-2 ring-offset-[#060d1a]'
                  : ''
              }`}
            >
              {/* Project banner */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-7xl font-bold select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {/* Status badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[project.status] ?? statusColors['In development']}`}>
                  {project.status}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label={`View ${project.title} source code`}
                  >
                    <GithubIcon />
                  </a>
                </div>
              </div>

              {/* Project content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Case Study Panel */}
        {caseStudyMode && selectedProject && (
          <motion.div
            key={selectedProject.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Case Study: {selectedProject.title}</h3>
                <p className="text-gray-400 mt-1">{selectedProject.role} · {selectedProject.duration}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-lg text-sm hover:bg-blue-500/30 transition"
                >
                  <ExternalLinkIcon className="w-4 h-4" /> View Project
                </a>
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm hover:bg-white/20 transition"
                >
                  <GithubIcon /> Source Code
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project gradient banner */}
              <div className="lg:col-span-2">
                <div className={`rounded-xl h-56 bg-gradient-to-br ${selectedProject.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <span className="text-white/20 text-9xl font-bold select-none">{selectedProject.title.charAt(0)}</span>
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[selectedProject.status] ?? statusColors['In development']}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Technical Challenge</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.story.challenge}</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Role → Results</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.story.roleAndResults}</p>
                  </div>
                </div>
              </div>

              {/* Metrics & tags */}
              <div className="space-y-4">
                <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Key Outcomes</h4>
                  <ul className="space-y-2">
                    {selectedProject.story.metrics.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/VihangaR11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <GithubIcon />
            See all projects on GitHub
            <ExternalLinkIcon className="w-4 h-4 opacity-60" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
