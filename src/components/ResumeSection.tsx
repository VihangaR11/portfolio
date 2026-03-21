import React, { useState, Children, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  ServerIcon,
  CodeIcon,
  LaptopIcon,
  UsersIcon,
  GitBranchIcon } from
'lucide-react';
type TabType = 'experience' | 'education' | 'volunteering';
interface ResumeItem {
  title: string;
  date?: string;
  description: string;
  icon: React.ElementType;
}
const experienceData: ResumeItem[] = [
{
  title: 'DevOps Engineer',
  description:
  'A DevOps Engineer experienced in deploying full-stack applications on AWS using CI/CD pipelines, GitHub Actions, and Docker.',
  icon: ServerIcon
},
{
  title: 'Full-Stack Developer',
  description:
  'A full-stack developer with hands-on experience building web applications using MERN stack, Next.js, Laravel, and pure HTML, CSS, and JavaScript.',
  icon: CodeIcon
}];

const educationData: ResumeItem[] = [
{
  title: 'BComp(Hons.) in Software Engineering',
  date: 'June 2023 - Present',
  description:
  'Currently pursuing a Bachelor of Computing (Hons.) in Software Engineering at the University of Sri Jayewardenepura.',
  icon: GraduationCapIcon
},
{
  title: 'Diploma in Information Technology',
  date: 'May 2022 - May 2023',
  description:
  'Successfully completed the Assured Diploma in Information Technology (DITEC) at ESOFT Metro Campus.',
  icon: LaptopIcon
}];

const volunteeringData: ResumeItem[] = [
{
  title: 'Tech Community Lead',
  date: '2023 - Present',
  description:
  'Organizing workshops and mentoring junior developers in web technologies and cloud infrastructure.',
  icon: UsersIcon
},
{
  title: 'Open Source Contributor',
  date: '2022 - Present',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
}];

const tabs: {
  id: TabType;
  label: string;
  icon: React.ElementType;
}[] = [
{
  id: 'experience',
  label: 'Experience',
  icon: BriefcaseIcon
},
{
  id: 'education',
  label: 'Education',
  icon: GraduationCapIcon
},
{
  id: 'volunteering',
  label: 'Volunteering',
  icon: HeartIcon
}];

const tabContent: Record<TabType, ResumeItem[]> = {
  experience: experienceData,
  education: educationData,
  volunteering: volunteeringData
};
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
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
export function ResumeSection() {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  return (
    <section
      id="resume"
      className="py-24 md:py-32 relative"
      aria-labelledby="resume-heading">

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
            id="resume-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4">

            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A journey through my professional experience, education, and
            community involvement
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5,
            delay: 0.2
          }}>

          <div className="inline-flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1.5">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                  aria-selected={isActive}
                  role="tab">

                  {isActive &&
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-white/10 rounded-full"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6
                    }} />

                  }
                  <IconComponent className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:inline">
                    {tab.label}
                  </span>
                </button>);

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
              className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {tabContent[activeTab].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="group bg-[#111827]/80 backdrop-blur-lg border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">

                    <div className="flex gap-5">
                      {/* Icon Box */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-[#0f172a] border border-white/5 rounded-xl flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Date Badge */}
                        {item.date &&
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full mb-3">
                            {item.date}
                          </span>
                        }

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>);

              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>);

}