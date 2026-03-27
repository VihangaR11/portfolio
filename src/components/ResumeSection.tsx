import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  ServerIcon,
  CodeIcon,
  UsersIcon,
  GitBranchIcon,
  Music2Icon,
  TrophyIcon,
  AwardIcon,
  BadgeIcon,
  ArrowRightIcon
} from 'lucide-react';

type TabType = 'experience' | 'education' | 'volunteering' | 'awards' | 'certifications';

interface ResumeItem {
  title: string;
  institution?: string;
  date?: string;
  description: string;
  icon: React.ElementType;
  substackUrl?: string;   // ← Add your Substack link here for each item
}

const experienceData: ResumeItem[] = [
  {
    title: 'DevOps Engineer',
    description: 'A DevOps Engineer experienced in deploying full-stack applications on AWS using CI/CD pipelines, GitHub Actions, and Docker.',
    icon: ServerIcon,
    // substackUrl: 'https://your-substack-link-here.com/p/article-slug'
  },
  {
    title: 'Full-Stack Developer',
    description: 'A full-stack developer with hands-on experience building web applications using MERN stack, Next.js, Laravel, and pure HTML, CSS, and JavaScript.',
    icon: CodeIcon,
    // substackUrl: 'https://your-substack-link-here.com/p/article-slug'
  }
];

const educationData: ResumeItem[] = [
  {
    title: 'BComp(Hons.) in Information Systems',
    institution: 'University of Sri Jayewardenepura',
    date: 'June 2023 - Present',
    description: 'CGPA: 3.28',
    icon: GraduationCapIcon,
    substackUrl: 'https://open.substack.com/pub/vihangarathnayake/p/from-first-batch-to-final-year-my?r=81itsg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true'
  },
  {
    title: 'BSE(Hons.)',
    institution: 'Open University of Sri Lanka',
    date: 'March 2023 - Present',
    description: 'CGPA: 3.40',
    icon: GraduationCapIcon,
    // substackUrl: ''
  },
  // Add substackUrl to any education items you want
];

const volunteeringData: ResumeItem[] = [
  {
    title: 'President',
    institution: 'Cultural Sub Committee |Student Union | University of Sri Jayewardenepura',
    date: 'April 2025 - March 2026',
    description: 'Organizing workshops and mentoring junior developers in web technologies and cloud infrastructure.',
    icon: UsersIcon,
    // substackUrl: 'https://...'
  },
  // Continue adding substackUrl for other volunteering items where you have Substack content
  // ... (keep all your existing volunteering items and just add substackUrl where needed)
];

const awardsData: ResumeItem[] = [
  {
    title: 'Logistics & Facilitation Excellence Award',
    institution: 'Flair Club | Career Guidance Unit | University of Sri Jayewardenepura',
    date: '2025',
    description: 'Recognized for outstanding academic performance and leadership in computing studies.',
    icon: TrophyIcon,
    // substackUrl: ''
  },
  // Add links for awards that have detailed Substack posts
];

const certificationsData: ResumeItem[] = [
  {
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services',
    date: '2024',
    description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
    icon: BadgeIcon,
    // substackUrl: ''
  },
  // Add links as needed
];

const tabs: {
  id: TabType;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
  { id: 'education', label: 'Education', icon: GraduationCapIcon },
  { id: 'volunteering', label: 'Volunteering', icon: HeartIcon },
  { id: 'awards', label: 'Awards', icon: TrophyIcon },
  { id: 'certifications', label: 'Certifications', icon: BadgeIcon }
];

const tabContent: Record<TabType, ResumeItem[]> = {
  experience: experienceData,
  education: educationData,
  volunteering: volunteeringData,
  awards: awardsData,
  certifications: certificationsData
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState<TabType>('experience');

  return (
    <section
      id="resume"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="resume-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="resume-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A journey through my professional experience, education, and community involvement
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1.5">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-white/10 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <IconComponent className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {tabContent[activeTab].map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <motion.div
                    key={`${item.title}-${index}`}
                    variants={itemVariants}
                    className="group bg-[#111827]/80 backdrop-blur-lg border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 flex flex-col"
                  >
                    <div className="flex gap-5 flex-1">
                      {/* Icon Box */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-[#0f172a] border border-white/5 rounded-xl flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {item.date && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full mb-3">
                            {item.date}
                          </span>
                        )}

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>

                        {item.institution && (
                          <p className="text-sm font-medium text-cyan-300 mb-2">
                            <span className="text-cyan-200/70">🏫 </span>
                            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                              {item.institution}
                            </span>
                          </p>
                        )}

                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Read More Button - Only shows if substackUrl exists */}
                    {item.substackUrl && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <a
                          href={item.substackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-white transition-all hover:gap-3 group/btn"
                        >
                          Read More on Substack
                          <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}