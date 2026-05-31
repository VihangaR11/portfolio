import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  ServerIcon,
  CodeIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  ZapIcon,
  StarIcon,
  LayoutGridIcon,
  AlignLeftIcon,
  CalendarIcon,
} from 'lucide-react';

// ─── Removed brand icons (lucide-react v1) — inline SVGs ─────────────────
const BadgeSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
//  DATA — update all entries to match your real experience
// ═══════════════════════════════════════════════════════════════════════════

type TabType = 'experience' | 'education' | 'volunteering' | 'awards' | 'certifications';
type ViewMode = 'cards' | 'timeline';
type Category = 'award' | 'education' | 'leadership' | 'work' | 'project';

interface ResumeItem {
  title: string;
  institution?: string;
  date?: string;
  description: string;
  icon: React.ElementType;
  substackUrl?: string;
  tags?: string[];
  highlight?: boolean;
}

// ── Experience ────────────────────────────────────────────────────────────
const experienceData: ResumeItem[] = [
  {
    title: 'DevOps Engineer',
    description: 'Experienced in deploying full-stack applications on AWS using CI/CD pipelines, GitHub Actions, and Docker. Passionate about automating workflows and ensuring reliable, scalable deployments.',
    icon: ServerIcon,
    tags: ['AWS', 'CI/CD', 'Docker', 'GitHub Actions'],
    highlight: true,
  },
  {
    title: 'Full-Stack Developer',
    description: 'Hands-on experience building web applications using MERN stack, Next.js, Laravel, and pure HTML/CSS/JavaScript. Focus on performance, accessibility, and clean architecture.',
    icon: CodeIcon,
    tags: ['React', 'TypeScript', 'Node.js', 'Laravel'],
    highlight: true,
  },
];

// ── Education ─────────────────────────────────────────────────────────────
const educationData: ResumeItem[] = [
  {
    title: 'BComp (Hons) in Information Systems',
    institution: 'Faculty of Computing | University of Sri Jayewardenepura',
    date: 'June 2023 – Present',
    description: 'CGPA: 3.28 — Combining technical computing foundations with strategic information systems thinking.',
    icon: GraduationCapIcon,
    substackUrl: 'https://open.substack.com/pub/vihangarathnayake/p/from-first-batch-to-final-year-my?r=81itsg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true',
    tags: ['Information Systems', 'USJ', 'CGPA 3.28'],
    highlight: true,
  },
  {
    title: 'BSE (Hons) in Software Engineering',
    institution: 'Faculty of Engineering Technology | Open University of Sri Lanka',
    date: 'March 2023 – Present',
    description: 'CGPA: 3.40 — Parallel degree deepening software engineering principles, algorithms, and system design.',
    icon: GraduationCapIcon,
    substackUrl: 'https://open.substack.com/pub/vihangarathnayake/p/my-journey-at-the-open-university?r=81itsg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true',
    tags: ['Software Engineering', 'OUSL', 'CGPA 3.40'],
    highlight: true,
  },
  {
    title: 'Diploma in Information Technology',
    institution: 'ESOFT Metro Campus',
    date: 'November 2021 – October 2022',
    description: 'Distinction Pass — Foundation in IT covering networking, programming, and database systems.',
    icon: GraduationCapIcon,
    substackUrl: 'https://open.substack.com/pub/vihangarathnayake/p/foundation-in-it-pearson-assured?r=81itsg&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true',
    tags: ['IT Foundation', 'Distinction'],
  },
  {
    title: 'Vadya Visharad — Tabla Playing',
    institution: 'Bhathkande Sangeet Vidyapith, Lucknow, India',
    date: '2012 – 2017',
    description: 'Formal classical music qualification at one of India\'s most prestigious music institutions — a unique discipline that shaped my focus, patience, and creativity.',
    icon: ZapIcon,
    tags: ['Classical Music', 'India', 'Arts'],
  },
];

// ── Volunteering ──────────────────────────────────────────────────────────
const volunteeringData: ResumeItem[] = [
  {
    title: 'President — Cultural Sub Committee',
    institution: 'Student Union | University of Sri Jayewardenepura',
    date: 'April 2025 – March 2026',
    description: 'Leading cultural initiatives and events at faculty level, representing student voices and building community.',
    icon: UsersIcon,
    tags: ['Student Leadership', 'Culture', 'USJ'],
    highlight: true,
  },
  {
    title: 'Co-Founder & Secretary — ACS',
    institution: 'Association of Computing Students, USJ',
    date: 'March 2024 – June 2025',
    description: 'Co-founded the student computing association, overseeing event management, quality assurance, and community growth. Ran the EduACS seminar series for A/L students.',
    icon: UsersIcon,
    tags: ['Co-founder', 'Computing', 'Events'],
    highlight: true,
  },
  {
    title: 'University Ambassador',
    institution: 'G17 Global — Road to Rights',
    date: 'July 2024 – June 2025',
    description: 'Championed sustainable development goals on campus, bridging global frameworks with local student action.',
    icon: HeartIcon,
    tags: ['SDGs', 'Ambassador', 'Sustainability'],
  },
  {
    title: 'Liaison Officer',
    institution: 'International Solar Alliance',
    date: 'June – July 2025',
    description: 'Represented Sri Lanka in international renewable energy discussions, building cross-border relationships at a global platform.',
    icon: HeartIcon,
    tags: ['International', 'Renewable Energy', 'Diplomacy'],
    highlight: true,
  },
  {
    title: 'Secretary — Flair Club',
    institution: 'University of Sri Jayewardenepura',
    date: 'June 2025 – Present',
    description: 'Overseeing documentation, project coordination, and club operations for one of USJ\'s most active student clubs.',
    icon: UsersIcon,
    tags: ['Secretary', 'Club Management'],
  },
];

// ── Awards ────────────────────────────────────────────────────────────────
const awardsData: ResumeItem[] = [
  {
    title: 'Logistics & Facilitation Excellence Award',
    institution: 'Flair Club | Career Guidance Unit | USJ',
    date: '2025',
    description: 'Recognised for exceptional performance in logistics and event facilitation — demonstrating operational mastery and attention to detail.',
    icon: TrophyIcon,
    tags: ['Excellence', 'Facilitation', 'USJ'],
    highlight: true,
  },
  {
    title: 'Member of the Month',
    institution: 'G17 Global',
    date: 'June 2024',
    description: 'Recognised for outstanding contributions and commitment as a University Ambassador for the Road to Rights programme.',
    icon: StarIcon,
    tags: ['Recognition', 'Leadership'],
  },
  {
    title: 'Environmental Pioneer Presidential Medal',
    institution: 'Central Environmental Authority of Sri Lanka',
    date: 'November 2017',
    description: 'National-level recognition for outstanding contributions to environmental awareness and pioneering sustainability initiatives at a young age.',
    icon: TrophyIcon,
    tags: ['National Award', 'Presidential', 'Environment'],
    highlight: true,
  },
];

// ── Certifications ────────────────────────────────────────────────────────
const certificationsData: ResumeItem[] = [
  {
    title: 'SAP Certified Associate — Business Analyst',
    institution: 'SAP',
    date: '2025 — In Progress',
    description: 'Foundation in SAP S/4HANA business processes, configuration, and end-user workflows.',
    icon: BadgeSVG,
    tags: ['SAP S/4HANA', 'ERP Configuration', 'Business Processes'],
    highlight: true,
  },
  {
    title: 'Diploma in Information Technology',
    institution: 'ESOFT Metro Campus — Pearson Assured',
    date: 'Oct 2022',
    description: 'Distinction pass. Networking, programming, database systems, and IT fundamentals.',
    icon: BadgeSVG,
    tags: ['Networking', 'Databases', 'Programming'],
    highlight: true,
    substackUrl: 'https://open.substack.com/pub/vihangarathnayake/p/foundation-in-it-pearson-assured',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    institution: 'Amazon Web Services',
    date: '2024',
    description: 'Foundational AWS cloud concepts, services, security, and pricing models.',
    icon: BadgeSVG,
    tags: ['AWS', 'Cloud', 'EC2', 'S3', 'IAM'],
  },
  {
    title: 'Business Analysis Fundamentals',
    institution: 'LinkedIn Learning',
    date: '2024',
    description: 'Requirements gathering, stakeholder management, BPMN process modelling, and use case documentation.',
    icon: BadgeSVG,
    tags: ['Requirements', 'BPMN', 'Stakeholder Management'],
  },
  {
    title: 'Project Management Essentials',
    institution: 'Google / Coursera',
    date: '2024',
    description: 'Project lifecycle, Agile methodologies, risk management, and stakeholder communication.',
    icon: BadgeSVG,
    tags: ['Agile', 'Scrum', 'Risk Management', 'Project Planning'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const TAB_CONFIG: {
  id: TabType;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}[] = [
  { id: 'experience',     label: 'Experience',     icon: BriefcaseIcon,    color: '#4da6ff', bg: 'rgba(30,107,196,0.1)',   border: 'rgba(30,107,196,0.3)' },
  { id: 'education',      label: 'Education',      icon: GraduationCapIcon,color: '#c8a03c', bg: 'rgba(200,160,60,0.1)', border: 'rgba(200,160,60,0.3)' },
  { id: 'volunteering',   label: 'Volunteering',   icon: HeartIcon,        color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)' },
  { id: 'awards',         label: 'Awards',         icon: TrophyIcon,       color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  { id: 'certifications', label: 'Certifications', icon: BadgeSVG,         color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
];

const TAB_DATA: Record<TabType, ResumeItem[]> = {
  experience:     experienceData,
  education:      educationData,
  volunteering:   volunteeringData,
  awards:         awardsData,
  certifications: certificationsData,
};

// ═══════════════════════════════════════════════════════════════════════════
//  CARD VIEW — grid of resume cards
// ═══════════════════════════════════════════════════════════════════════════

function ResumeCard({ item, color, border, bg }: {
  item: ResumeItem;
  color: string;
  border: string;
  bg: string;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: item.highlight ? bg : 'rgba(255,255,255,0.03)',
        borderColor: item.highlight ? border : 'rgba(255,255,255,0.08)',
        boxShadow: item.highlight ? `0 8px 32px ${bg}` : 'none',
      }}
    >
      <div className="flex gap-4 flex-1">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {item.date && (
            <span
              className="inline-block px-2.5 py-0.5 text-xs font-mono rounded-full border mb-2"
              style={{ color, borderColor: border, background: bg }}
            >
              {item.date}
            </span>
          )}
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-opacity-80 transition-colors">
            {item.title}
          </h3>
          {item.institution && (
            <p className="text-xs mb-2 font-medium" style={{ color }}>
              {item.institution}
            </p>
          )}
          <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>

          {item.tags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-500">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {item.substackUrl && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <a
            href={item.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium transition-all hover:gap-3 group/btn"
            style={{ color }}
          >
            Read my story on Substack
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIMELINE VIEW — animated vertical timeline
// ═══════════════════════════════════════════════════════════════════════════

function TimelineItem({ item, index, isLeft, color, border, bg }: {
  item: ResumeItem;
  index: number;
  isLeft: boolean;
  color: string;
  border: string;
  bg: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <motion.div
        className={`w-[calc(50%-28px)] ${isLeft ? 'mr-auto pr-4' : 'ml-auto pl-4'}`}
        initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      >
        <div
          className="rounded-2xl p-5 border hover:scale-[1.02] transition-all duration-300"
          style={{
            background: item.highlight ? `linear-gradient(135deg, ${bg}, rgba(255,255,255,0.02))` : 'rgba(255,255,255,0.03)',
            borderColor: item.highlight ? border : 'rgba(255,255,255,0.08)',
            boxShadow: item.highlight ? `0 6px 24px ${bg}` : 'none',
          }}
        >
          {item.date && (
            <span className="inline-block text-xs font-mono px-2.5 py-0.5 rounded-full border mb-2 font-semibold"
              style={{ color, borderColor: border, background: bg }}>
              {item.date}
            </span>
          )}
          <h3 className="text-white font-semibold text-sm leading-snug mb-1">{item.title}</h3>
          {item.institution && (
            <p className="text-xs mb-2 font-medium" style={{ color }}>{item.institution}</p>
          )}
          <p className="text-gray-400 text-xs leading-relaxed mb-2">{item.description}</p>
          {item.tags && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-500">{t}</span>
              ))}
            </div>
          )}
          {item.substackUrl && (
            <a href={item.substackUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] mt-3 font-medium transition-all hover:gap-2.5"
              style={{ color }}>
              Read on Substack <ArrowRightIcon className="w-3 h-3" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Centre dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: '14px' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.06 + 0.1 }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-2"
          style={{
            background: '#060d1a',
            borderColor: color,
            boxShadow: `0 0 16px ${bg}, 0 0 0 4px rgba(13,17,23,0.9)`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </motion.div>
    </div>
  );
}

// Mobile timeline item
function MobileTimelineItem({ item, index, color, border, bg }: {
  item: ResumeItem; index: number; color: string; border: string; bg: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = item.icon;

  return (
    <motion.div ref={ref} className="relative flex gap-4 mb-5"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0"
          style={{ background: '#060d1a', borderColor: color, boxShadow: `0 0 12px ${bg}` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <div className="flex-1 rounded-xl p-4 border mb-2"
        style={{ background: item.highlight ? bg : 'rgba(255,255,255,0.03)', borderColor: item.highlight ? border : 'rgba(255,255,255,0.08)' }}>
        {item.date && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border font-semibold"
            style={{ color, borderColor: border, background: bg }}>{item.date}</span>
        )}
        <h3 className="text-white font-semibold text-sm mt-2 mb-1 leading-snug">{item.title}</h3>
        {item.institution && <p className="text-xs mb-1.5 font-medium" style={{ color }}>{item.institution}</p>}
        <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
        {item.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-500">{t}</span>
            ))}
          </div>
        )}
        {item.substackUrl && (
          <a href={item.substackUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] mt-2 font-medium" style={{ color }}>
            Read on Substack <ArrowRightIcon className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const tabCfg = TAB_CONFIG.find(t => t.id === activeTab)!;
  const items = TAB_DATA[activeTab];

  // Stats for the header
  const stats = [
    { label: 'Degrees',    value: '2',  color: '#c8a03c' },
    { label: 'Roles held', value: '15+', color: '#4da6ff' },
    { label: 'Awards',     value: '3',  color: '#f59e0b' },
    { label: 'Years',      value: '8+', color: '#10b981' },
  ];

  return (
    <section
      id="resume"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="resume-heading"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">— Skills & journey</p>
          <h2 id="resume-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full" />
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm">
            Experience, education, volunteering, awards — every facet of my journey, all in one place.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div className="grid grid-cols-4 gap-3 mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          {stats.map(s => (
            <div key={s.label} className="bg-white/3 border border-white/8 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Tabs + View Toggle ── */}
        <motion.div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>

          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {TAB_CONFIG.map(tab => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200"
                  style={{
                    background: isActive ? tab.bg : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? tab.border : 'rgba(255,255,255,0.1)',
                    color: isActive ? tab.color : '#6b7280',
                    boxShadow: isActive ? `0 0 16px ${tab.bg}` : 'none',
                  }}
                  aria-pressed={isActive}>
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 flex-shrink-0">
            <button onClick={() => setViewMode('cards')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: viewMode === 'cards' ? tabCfg.bg : 'transparent',
                color: viewMode === 'cards' ? tabCfg.color : '#6b7280',
              }}>
              <LayoutGridIcon className="w-3.5 h-3.5" /> Cards
            </button>
            <button onClick={() => setViewMode('timeline')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: viewMode === 'timeline' ? tabCfg.bg : 'transparent',
                color: viewMode === 'timeline' ? tabCfg.color : '#6b7280',
              }}>
              <AlignLeftIcon className="w-3.5 h-3.5" /> Timeline
            </button>
          </div>
        </motion.div>

        {/* ── Active tab label ── */}
        <motion.div className="flex items-center gap-3 mb-6"
          key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="w-1 h-6 rounded-full" style={{ background: tabCfg.color }} />
          <h3 className="text-white font-semibold">{tabCfg.label}</h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{ color: tabCfg.color, borderColor: tabCfg.border, background: tabCfg.bg }}>
            {items.length} {items.length === 1 ? 'entry' : 'entries'}
          </span>
        </motion.div>

        {/* ── Content ── */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">

            {/* Cards view */}
            {viewMode === 'cards' && (
              <motion.div key={`cards-${activeTab}`}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                initial="hidden" animate="visible" exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((item, i) => (
                  <ResumeCard key={i} item={item}
                    color={tabCfg.color} border={tabCfg.border} bg={tabCfg.bg} />
                ))}
              </motion.div>
            )}

            {/* Timeline view */}
            {viewMode === 'timeline' && (
              <motion.div key={`timeline-${activeTab}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Desktop alternating */}
                <div className="relative hidden md:block">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, transparent)' }} />
                  {[...items].reverse().map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} isLeft={i % 2 === 0}
                      color={tabCfg.color} border={tabCfg.border} bg={tabCfg.bg} />
                  ))}
                </div>

                {/* Mobile stacked */}
                <div className="block md:hidden">
                  {[...items].reverse().map((item, i) => (
                    <MobileTimelineItem key={i} item={item} index={i}
                      color={tabCfg.color} border={tabCfg.border} bg={tabCfg.bg} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Download CV ── */}
        <motion.div className="text-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <a href="/portfolio/Vihanga_Rathnayake_CV.pdf" download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/25"
            style={{ background: 'linear-gradient(135deg, #4da6ff, #c8a03c)' }}>
            <CalendarIcon className="w-4 h-4" />
            Download Full CV
          </a>
        </motion.div>

      </div>
    </section>
  );
}