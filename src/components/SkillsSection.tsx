import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, FileCode, Server, Brain, Palette, Cloud, Container,
  GitBranch, Share2, Paintbrush, Database, Leaf
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';

const skills = [
  { name: 'React', icon: Code2, color: 'cyan', level: 92 },
  { name: 'TypeScript', icon: FileCode, color: 'violet', level: 88 },
  { name: 'Node.js', icon: Server, color: 'cyan', level: 82 },
  { name: 'Python', icon: Brain, color: 'violet', level: 78 },
  { name: 'Figma', icon: Palette, color: 'cyan', level: 85 },
  { name: 'AWS', icon: Cloud, color: 'violet', level: 76 },
  { name: 'Docker', icon: Container, color: 'cyan', level: 83 },
  { name: 'Git', icon: GitBranch, color: 'violet', level: 90 },
  { name: 'GraphQL', icon: Share2, color: 'cyan', level: 72 },
  { name: 'TailwindCSS', icon: Paintbrush, color: 'violet', level: 94 },
  { name: 'PostgreSQL', icon: Database, color: 'cyan', level: 77 },
  { name: 'MongoDB', icon: Leaf, color: 'violet', level: 80 },
];

// Radar Data
type Category = 'frontend' | 'design' | 'leadership' | 'tools';

interface SkillSet {
  label: string;
  color: string;
  glowColor: string;
  description: string;
  data: { subject: string; level: number; fullMark: number }[];
  highlights: { name: string; years: string }[];
}

const SKILL_SETS: Record<Category, SkillSet> = {
  frontend: {
    label: 'Frontend Development',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    description: 'Building fast, beautiful, and accessible web experiences.',
    data: [
      { subject: 'React', level: 92, fullMark: 100 },
      { subject: 'TypeScript', level: 88, fullMark: 100 },
      { subject: 'Tailwind CSS', level: 95, fullMark: 100 },
      { subject: 'Framer Motion', level: 86, fullMark: 100 },
      { subject: 'Next.js', level: 82, fullMark: 100 },
      { subject: 'UI Architecture', level: 87, fullMark: 100 },
    ],
    highlights: [
      { name: 'React + Vite', years: '1.5 yrs' },
      { name: 'Advanced Animations', years: '10 mo' },
    ],
  },
  design: {
    label: 'UI/UX Design',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    description: 'Designing intuitive and delightful user interfaces.',
    data: [
      { subject: 'Figma', level: 88, fullMark: 100 },
      { subject: 'Design Systems', level: 82, fullMark: 100 },
      { subject: 'Prototyping', level: 85, fullMark: 100 },
      { subject: 'Accessibility', level: 80, fullMark: 100 },
      { subject: 'Typography', level: 90, fullMark: 100 },
    ],
    highlights: [
      { name: 'Figma Expert', years: '1.5 yrs' },
      { name: 'Design Systems', years: '1 yr' },
    ],
  },
  leadership: {
    label: 'Leadership & Community',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    description: 'Leading teams and building strong communities.',
    data: [
      { subject: 'Team Leadership', level: 88, fullMark: 100 },
      { subject: 'Event Organization', level: 92, fullMark: 100 },
      { subject: 'Mentoring', level: 85, fullMark: 100 },
      { subject: 'Communication', level: 90, fullMark: 100 },
    ],
    highlights: [
      { name: 'ACS Co-Founder', years: '1 yr' },
      { name: 'University Ambassador', years: '2 yrs' },
    ],
  },
  tools: {
    label: 'Tools & Infrastructure',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    description: 'The powerful toolkit behind every successful project.',
    data: [
      { subject: 'Git & GitHub', level: 90, fullMark: 100 },
      { subject: 'AWS', level: 78, fullMark: 100 },
      { subject: 'Docker', level: 83, fullMark: 100 },
      { subject: 'CI/CD', level: 80, fullMark: 100 },
    ],
    highlights: [
      { name: 'AWS Certified', years: '2024' },
      { name: 'Docker & CI/CD', years: '1 yr' },
    ],
  },
};

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'grid' | 'radar'>('grid');
  const [activeRadar, setActiveRadar] = useState<Category>('frontend');

  const skillSet = SKILL_SETS[activeRadar];
  const averageLevel = Math.round(skillSet.data.reduce((sum, item) => sum + item.level, 0) / skillSet.data.length);

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Technical mastery meets leadership and design thinking
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-9 py-3.5 rounded-3xl text-sm font-semibold transition-all ${activeTab === 'grid' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              All Skills
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-9 py-3.5 rounded-3xl text-sm font-semibold transition-all ${activeTab === 'radar' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Proficiency Radar
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Grid Tab */}
          {activeTab === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
            >
              {skills.map((skill, i) => {
                const IconComponent = skill.icon;
                const isCyan = skill.color === 'cyan';

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -12, scale: 1.04 }}
                    className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${isCyan ? 'from-cyan-500/10' : 'from-violet-500/10'} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />

                    <div className="relative flex flex-col items-center text-center">
                      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${isCyan ? 'bg-cyan-500/10 text-cyan-400' : 'bg-violet-500/10 text-violet-400'}`}>
                        <IconComponent className="w-12 h-12" />
                      </div>

                      <h3 className="text-white font-semibold text-2xl mb-5 tracking-tight">{skill.name}</h3>

                      <div className="w-full mt-auto">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                          <span>Proficiency</span>
                          <span className="font-mono font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-violet-400'}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Radar Tab */}
          {activeTab === 'radar' && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-12"
            >
              {/* Category Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(SKILL_SETS).map((key) => {
                  const cat = SKILL_SETS[key as Category];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveRadar(key as Category)}
                      className={`px-8 py-4 rounded-3xl font-medium transition-all duration-300 ${activeRadar === key ? 'scale-105 shadow-2xl' : 'hover:scale-105'}`}
                      style={{
                        background: activeRadar === key ? `${cat.color}15` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${activeRadar === key ? cat.color : 'rgba(255,255,255,0.12)'}`,
                        color: activeRadar === key ? cat.color : '#cbd5e1',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Radar Chart */}
                <div className="lg:col-span-7">
                  <div 
                    className="relative rounded-3xl p-10 border backdrop-blur-3xl"
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      borderColor: `${skillSet.color}40`,
                      boxShadow: `0 0 90px ${skillSet.glowColor}`,
                    }}
                  >
                    <ResponsiveContainer width="100%" height={480}>
                      <RadarChart data={skillSet.data} margin={{ top: 30, right: 50, bottom: 30, left: 50 }}>
                        <PolarGrid stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="4 4" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: '#e2e8f0', fontSize: 13.5, fontWeight: 500 }} 
                        />
                        <PolarRadiusAxis 
                          domain={[0, 100]} 
                          tickCount={5} 
                          stroke="rgba(148, 163, 184, 0.2)" 
                          tick={{ fill: '#64748b', fontSize: 11 }} 
                        />
                        <Tooltip content={<CustomTooltip color={skillSet.color} />} />
                        <Radar
                          dataKey="level"
                          stroke={skillSet.color}
                          fill={skillSet.color}
                          fillOpacity={0.28}
                          strokeWidth={4.5}
                          dot={{ fill: skillSet.color, r: 6, stroke: '#fff', strokeWidth: 2 }}
                          activeDot={{ r: 9, fill: skillSet.color, stroke: '#fff', strokeWidth: 3 }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="lg:col-span-5 space-y-10">
                  <div>
                    <h3 className="text-5xl font-bold mb-4 tracking-tighter" style={{ color: skillSet.color }}>
                      {skillSet.label}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {skillSet.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-6">
                    <div className="text-8xl font-bold font-mono tracking-tighter" style={{ color: skillSet.color }}>
                      {averageLevel}
                    </div>
                    <div>
                      <p className="text-2xl text-white/80">Average Proficiency</p>
                      <p className="text-gray-500">across {skillSet.data.length} key areas</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">Notable Experience</p>
                    <div className="space-y-4">
                      {skillSet.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: skillSet.color }} />
                          <div>
                            <p className="font-medium text-white">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.years}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Custom Tooltip Component (Only declared once)
const CustomTooltip = ({ active, payload, color }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-950/95 backdrop-blur-2xl px-6 py-4 rounded-2xl border shadow-2xl" style={{ borderColor: color + '60' }}>
      <p className="font-semibold text-white text-lg">{payload[0].payload.subject}</p>
      <p className="text-5xl font-bold mt-1" style={{ color }}>{payload[0].value}</p>
      <p className="text-xs text-gray-400">/ 100</p>
    </div>
  );
};