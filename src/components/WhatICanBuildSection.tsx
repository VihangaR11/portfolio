import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeIcon, PlayIcon, ExternalLinkIcon } from 'lucide-react';

interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
  tools: string[];
}

interface IndustryOption {
  id: string;
  name: string;
  description: string;
  techStack: TechStack;
  codeExample: {
    title: string;
    description: string;
    stackblitzUrl: string;
    technologies: string[];
  };
}

const industries: IndustryOption[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Platform',
    description: 'Online stores, marketplaces, and retail solutions',
    techStack: {
      frontend: ['React', 'Next.js', 'Tailwind CSS', 'Stripe Elements'],
      backend: ['Node.js', 'Express', 'GraphQL', 'Stripe API'],
      database: ['PostgreSQL', 'Redis', 'MongoDB'],
      deployment: ['Vercel', 'AWS', 'Docker'],
      tools: ['TypeScript', 'Jest', 'Cypress', 'Storybook']
    },
    codeExample: {
      title: 'Next.js E-commerce Store',
      description: 'Full-stack e-commerce with payment integration',
      stackblitzUrl: 'https://stackblitz.com/edit/nextjs-ecommerce-demo?file=pages%2Findex.tsx',
      technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'TypeScript']
    }
  },
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Software as a Service platforms and business tools',
    techStack: {
      frontend: ['React', 'TypeScript', 'Material-UI', 'Redux Toolkit'],
      backend: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
      database: ['PostgreSQL', 'Prisma ORM', 'Redis'],
      deployment: ['Vercel', 'Railway', 'AWS ECS'],
      tools: ['TypeScript', 'Jest', 'Playwright', 'Swagger']
    },
    codeExample: {
      title: 'SaaS Dashboard with Auth',
      description: 'Multi-tenant SaaS with user management',
      stackblitzUrl: 'https://stackblitz.com/edit/nextjs-saas-dashboard?file=pages%2Fdashboard.tsx',
      technologies: ['Next.js', 'NextAuth.js', 'Prisma', 'Tailwind CSS']
    }
  },
  {
    id: 'fintech',
    name: 'FinTech Solution',
    description: 'Financial technology and banking applications',
    techStack: {
      frontend: ['React', 'TypeScript', 'Chart.js', 'Material-UI'],
      backend: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      database: ['PostgreSQL', 'TimescaleDB', 'MongoDB'],
      deployment: ['AWS', 'Kubernetes', 'Docker'],
      tools: ['Python', 'Pandas', 'pytest', 'Docker']
    },
    codeExample: {
      title: 'FinTech Analytics Dashboard',
      description: 'Real-time financial data visualization',
      stackblitzUrl: 'https://stackblitz.com/edit/react-fintech-dashboard?file=src%2FApp.tsx',
      technologies: ['React', 'Chart.js', 'TypeScript', 'Tailwind CSS']
    }
  },
  {
    id: 'healthtech',
    name: 'HealthTech Platform',
    description: 'Healthcare and medical technology solutions',
    techStack: {
      frontend: ['React', 'TypeScript', 'Recharts', 'Material-UI'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      database: ['MongoDB', 'PostgreSQL', 'Redis'],
      deployment: ['AWS', 'Heroku', 'Docker'],
      tools: ['TypeScript', 'Jest', 'Cypress', 'Postman']
    },
    codeExample: {
      title: 'Health Monitoring App',
      description: 'Patient dashboard with real-time vitals',
      stackblitzUrl: 'https://stackblitz.com/edit/react-health-dashboard?file=src%2FDashboard.tsx',
      technologies: ['React', 'Socket.io', 'Chart.js', 'TypeScript']
    }
  },
  {
    id: 'edtech',
    name: 'EdTech Platform',
    description: 'Educational technology and learning management',
    techStack: {
      frontend: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      database: ['MongoDB', 'PostgreSQL', 'Redis'],
      deployment: ['Vercel', 'Netlify', 'AWS'],
      tools: ['TypeScript', 'Jest', 'Cypress', 'Figma']
    },
    codeExample: {
      title: 'Interactive Learning Platform',
      description: 'Gamified learning experience with progress tracking',
      stackblitzUrl: 'https://stackblitz.com/edit/nextjs-edtech-platform?file=pages%2Fcourse.tsx',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript']
    }
  }
];

export function WhatICanBuildSection() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryOption | null>(null);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const handleIndustrySelect = (industry: IndustryOption) => {
    setSelectedIndustry(industry);
    setShowCodePreview(false);
  };

  return (
    <section className="py-20 px-6" id="what-i-can-build">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
            What I Can Build
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Explore industry-specific solutions with recommended tech stacks and live code previews
          </p>
        </motion.div>

        {/* Industry Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 cursor-pointer group ${
                selectedIndustry?.id === industry.id
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
              onClick={() => handleIndustrySelect(industry)}
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {industry.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {industry.description}
              </p>
              {selectedIndustry?.id === industry.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Display */}
        <AnimatePresence>
          {selectedIndustry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tech Stack */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Recommended Tech Stack for {selectedIndustry.name}
                  </h3>

                  <div className="space-y-6">
                    {Object.entries(selectedIndustry.techStack).map(([category, technologies]) => (
                      <div key={category}>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3 capitalize">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm font-medium border border-violet-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Preview */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Live Code Preview
                    </h3>
                    <button
                      onClick={() => setShowCodePreview(!showCodePreview)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
                    >
                      <CodeIcon className="w-4 h-4" />
                      {showCodePreview ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {selectedIndustry.codeExample.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {selectedIndustry.codeExample.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedIndustry.codeExample.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {showCodePreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 rounded-lg overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-800">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Live Preview</span>
                            <a
                              href={selectedIndustry.codeExample.stackblitzUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                            >
                              <ExternalLinkIcon className="w-4 h-4" />
                              Open in StackBlitz
                            </a>
                          </div>
                        </div>
                        <div className="aspect-video">
                          <iframe
                            src={`${selectedIndustry.codeExample.stackblitzUrl}?embed=1&view=preview`}
                            className="w-full h-full border-0"
                            title={`${selectedIndustry.codeExample.title} Preview`}
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showCodePreview && (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <PlayIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                      <p className="text-gray-400">
                        Click "Show Preview" to see the live code demo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}