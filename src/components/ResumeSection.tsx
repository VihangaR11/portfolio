import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  ServerIcon,
  CodeIcon,
  LaptopIcon,
  UsersIcon,
  GitBranchIcon,
  Music2Icon,
  TrophyIcon,
  AwardIcon,
  BadgeIcon
} from 'lucide-react';
type TabType = 'experience' | 'education' | 'volunteering' | 'awards' | 'certifications';
interface ResumeItem {
  title: string;
  institution?: string;
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
  title: 'BComp(Hons.) in Information Systems',
  institution: 'University of Sri Jayewardenepura',
  date: 'June 2023 - Present',
  description:
  'CGPA: 3.28',
  icon: GraduationCapIcon
},
{
  title: 'BSE(Hons.)',
  institution: 'Open University of Sri Lanka',
  date: 'March 2023 - Present',
  description: 'CGPA: 3.40',
  icon: GraduationCapIcon
},
{
  title: 'Pearson AssuredDiploma in Information Technology',
  institution: 'ESOFT Metro Campus',
  date: 'May 2022 - May 2023',
  description:
  'Class: Distinction',
  icon: LaptopIcon
},
{
  title: 'Vadya Visharada in Hindustani Classical Music',
  institution: 'Bhatkhande Sangeet Vidyapith',
  date: 'March 2011 - November 2017',
  description:
  'Class: Second Upper Division',
  icon: Music2Icon
}
];

const volunteeringData: ResumeItem[] = [
{
  title: 'President',
  institution: 'Cultural Sub Committee |Student Union | University of Sri Jayewardenepura',
  date: 'April 2025 - March 2026',
  description:
  'Organizing workshops and mentoring junior developers in web technologies and cloud infrastructure.',
  icon: UsersIcon
},
{
  title: 'Secretary',
  institution: 'Flair Club | Career Guidance Unit | University of Sri Jayewardenepura',
  date: 'March 2025 - Present',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Co-Founder & Secretary',
  institution: 'Association of Computing Students| Faculty of Computing |University of Sri Jayewardenepura',
  date: 'March 2024 - March 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Founder & Chairperson | Project EduACS',
  institution: 'Association of Computing Students|Faculty of Computing |University of Sri Jayewardenepura',
  date: 'January 2024 - May 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Faculty Board Representative',
  institution: ' Faculty of Computing|University of Sri Jayewardenepura',
  date: 'January 2024 - June 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'University Ambassador|University of Sri Jayewardenepura',
  institution: ' Road to Rights | G17 Global',
  date: 'October 2023 - October 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'University Ambassador|University of Sri Jayewardenepura',
  institution: ' INSL',
  date: 'October 2023 - October 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Faculty Ambassador|Faculty of Computing ',
  institution: 'IEEE SB USJ',
  date: 'October 2023 - October 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'University Student Ambassador|University of Sri Jayewardenepura',
  institution: 'National Child Protection Authority',
  date: 'November 2023 - October 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Faculty Ambassador|Faculty of Computing ',
  institution: 'Flair Club | Career Guidance Unit | University of Sri Jayewardenepura',
  date: 'November 2023 - October 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Programming Committee Member|Project Heenayata Saviyak',
  institution: 'IEEE SB USJ',
  date: 'November 2023 - October 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Logistics Crew Executive|Project Dhaara',
  institution: 'Flair Club | Career Guidance Unit | University of Sri Jayewardenepura',
  date: 'May 2024 - November 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Co Founder | Project Poyata Padamak ',
  institution: 'Sasnaka Sansada Organization',
  date: 'May 2023 - November 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Liason Officer',
  institution: 'International Solar Alliance',
  date: 'May 2025',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Chief Editor | Project Speak & Spark',
  institution: 'Jpura Voice Club | University of Sri Jayewardenepura',
  date: 'December 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Logistics Crew Member |Project Road To Legacy ',
  institution: 'IT Legacy',
  date: 'October 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},
{
  title: 'Mathematics Teacher ',
  institution: 'Mo/Malwattawela National School',
  date: 'October 2023 - October 2024',
  description:
  'Active contributor to various open-source projects, focusing on documentation and bug fixes.',
  icon: GitBranchIcon
},


  

];

const awardsData: ResumeItem[] = [
{
  title: 'Logistics & Facilitation Excellence Award',
  institution: 'Flair Club | Career Guidance Unit | University of Sri Jayewardenepura',
  date: '2025',
  description:
  'Recognized for outstanding academic performance and leadership in computing studies.',
  icon: TrophyIcon
},
{
  title: 'Ambassador of the Month',
  institution: 'G17 Global',
  date: '2023',
  description:
  'First place in the National Coding Challenge for innovative web application development.',
  icon: AwardIcon
},
{
  title: 'Presidential Award',
  institution: 'Central Environmental Authority ',
  date: '2017',
  description:
  'First place in the National Coding Challenge for innovative web application development.',
  icon: AwardIcon
}];

const certificationsData: ResumeItem[] = [
{
  title: 'AWS Certified Solutions Architect',
  institution: 'Amazon Web Services',
  date: '2024',
  description:
  'Professional certification demonstrating expertise in designing distributed systems on AWS.',
  icon: BadgeIcon
},
{
  title: 'Google Cloud Professional Developer',
  institution: 'Google Cloud',
  date: '2023',
  description:
  'Certification validating skills in building scalable applications on Google Cloud Platform.',
  icon: BadgeIcon
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
},
{
  id: 'awards',
  label: 'Awards',
  icon: TrophyIcon
},
{
  id: 'certifications',
  label: 'Certifications',
  icon: BadgeIcon
}];

const tabContent: Record<TabType, ResumeItem[]> = {
  experience: experienceData,
  education: educationData,
  volunteering: volunteeringData,
  awards: awardsData,
  certifications: certificationsData
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
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        {/* Institution */}
                        {item.institution && (
                          <p className="text-sm font-medium text-cyan-300 mb-2">
                            <span className="text-cyan-200/70">🏫 </span>
                            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                              {item.institution}
                            </span>
                          </p>
                        )}

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