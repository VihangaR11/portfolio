import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLinkIcon, ShieldCheckIcon, CalendarIcon, AwardIcon } from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════
//  CERTIFICATIONS DATA
//  Add your real certifications here.
//  For `badge`: use a URL to the badge image, or leave as '' to show icon.
//  For `credentialUrl`: link to your Credly, LinkedIn, or course certificate.
//  status: 'active' | 'in-progress' | 'expired'
// ══════════════════════════════════════════════════════════════════════════

type CertStatus = 'active' | 'in-progress' | 'expired';
type CertCategory = 'sap' | 'cloud' | 'ba' | 'it' | 'leadership' | 'academic';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  category: CertCategory;
  status: CertStatus;
  issued: string;
  expires?: string;
  credentialUrl?: string;
  badge?: string;          // URL to badge image
  description: string;
  skills: string[];
  highlight?: boolean;
}

const certifications: Certification[] = [
  // ── SAP / ERP ─────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'SAP Certified Associate — Business Analyst',
    issuer: 'SAP',
    category: 'sap',
    status: 'in-progress',
    issued: '2025',
    badge: '',
    description: 'Foundation in SAP S/4HANA business processes, configuration, and end-user workflows.',
    skills: ['SAP S/4HANA', 'Business Processes', 'ERP Configuration'],
    highlight: true,
    credentialUrl: '',
  },
  // ── Cloud & Technical ─────────────────────────────────────────────────
  {
    id: 2,
    title: 'Diploma in Information Technology',
    issuer: 'ESOFT Metro Campus — Pearson Assured',
    category: 'it',
    status: 'active',
    issued: 'Oct 2022',
    badge: '',
    description: 'Distinction pass. Covered networking, programming, database systems, and IT fundamentals.',
    skills: ['Networking', 'Databases', 'Programming', 'IT Infrastructure'],
    highlight: true,
    credentialUrl: 'https://open.substack.com/pub/vihangarathnayake/p/foundation-in-it-pearson-assured',
  },
  {
    id: 3,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    category: 'cloud',
    status: 'active',
    issued: '2024',
    badge: '',
    description: 'Foundational understanding of AWS cloud concepts, services, security, and pricing.',
    skills: ['AWS', 'Cloud Computing', 'EC2', 'S3', 'IAM'],
    credentialUrl: '',
  },
  // ── Business Analysis ─────────────────────────────────────────────────
  {
    id: 4,
    title: 'Business Analysis Fundamentals',
    issuer: 'LinkedIn Learning',
    category: 'ba',
    status: 'active',
    issued: '2024',
    badge: '',
    description: 'Requirements gathering, stakeholder management, process modelling, and use case documentation.',
    skills: ['Requirements Analysis', 'Stakeholder Management', 'BPMN', 'Use Cases'],
    credentialUrl: '',
  },
  {
    id: 5,
    title: 'Project Management Essentials',
    issuer: 'Google / Coursera',
    category: 'ba',
    status: 'active',
    issued: '2024',
    badge: '',
    description: 'Project lifecycle, Agile methodologies, risk management, and stakeholder communication.',
    skills: ['Agile', 'Project Planning', 'Risk Management', 'Scrum'],
    credentialUrl: '',
  },
  // ── Academic ──────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'BComp (Hons) in Information Systems',
    issuer: 'University of Sri Jayewardenepura',
    category: 'academic',
    status: 'in-progress',
    issued: 'Jun 2023',
    badge: '',
    description: 'CGPA 3.28 — Combining technical computing with strategic information systems management.',
    skills: ['Information Systems', 'Database Design', 'Systems Analysis', 'IT Management'],
    highlight: true,
    credentialUrl: 'https://open.substack.com/pub/vihangarathnayake/p/from-first-batch-to-final-year-my',
  },
  {
    id: 7,
    title: 'BSE (Hons) in Software Engineering',
    issuer: 'Open University of Sri Lanka',
    category: 'academic',
    status: 'in-progress',
    issued: 'Mar 2023',
    badge: '',
    description: 'CGPA 3.40 — Software engineering principles, algorithms, system design, and architecture.',
    skills: ['Software Engineering', 'Algorithms', 'System Design', 'Architecture'],
    highlight: true,
    credentialUrl: 'https://open.substack.com/pub/vihangarathnayake/p/my-journey-at-the-open-university',
  },
  // ── Leadership ────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Logistics & Facilitation Excellence Award',
    issuer: 'Flair Club — USJ',
    category: 'leadership',
    status: 'active',
    issued: 'Jun 2025',
    badge: '',
    description: 'Recognised for exceptional performance in event logistics and facilitation at faculty level.',
    skills: ['Event Management', 'Logistics', 'Team Leadership'],
    credentialUrl: '',
  },
  {
    id: 9,
    title: 'Environmental Pioneer Presidential Medal',
    issuer: 'Central Environmental Authority of Sri Lanka',
    category: 'leadership',
    status: 'active',
    issued: 'Nov 2017',
    badge: '',
    description: 'National-level presidential recognition for outstanding environmental leadership initiatives.',
    skills: ['Environmental Leadership', 'Community Impact', 'Sustainability'],
    highlight: true,
    credentialUrl: '',
  },
];

// ── Category config ───────────────────────────────────────────────────────
const catConfig: Record<CertCategory, { label: string; color: string; bg: string; border: string; icon: string }> = {
  sap:        { label: 'SAP / ERP',    color: '#4da6ff', bg: 'rgba(30,107,196,0.12)',  border: 'rgba(30,107,196,0.3)',  icon: '🏢' },
  cloud:      { label: 'Cloud',        color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)',  icon: '☁️' },
  ba:         { label: 'Business Analysis', color: '#c8a03c', bg: 'rgba(200,160,60,0.12)', border: 'rgba(200,160,60,0.3)', icon: '📊' },
  it:         { label: 'IT & Tech',    color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)',  icon: '💻' },
  leadership: { label: 'Awards',       color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  icon: '🏆' },
  academic:   { label: 'Academic',     color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', icon: '🎓' },
};

const statusConfig: Record<CertStatus, { label: string; color: string; dot: string }> = {
  'active':      { label: 'Verified',     color: '#10b981', dot: '#10b981' },
  'in-progress': { label: 'In Progress',  color: '#f59e0b', dot: '#f59e0b' },
  'expired':     { label: 'Expired',      color: '#6b7280', dot: '#6b7280' },
};

type FilterType = 'all' | CertCategory;

// ── Cert card ─────────────────────────────────────────────────────────────
function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const cat = catConfig[cert.category];
  const status = statusConfig[cert.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: cert.highlight
          ? `linear-gradient(135deg, ${cat.bg}, rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.03)',
        borderColor: cert.highlight ? cat.border : 'rgba(255,255,255,0.08)',
        boxShadow: cert.highlight ? `0 6px 24px ${cat.bg}` : 'none',
      }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Badge / Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {cert.badge
            ? <img src={cert.badge} alt={cert.title} className="w-8 h-8 object-contain" />
            : cat.icon
          }
        </div>

        {/* Title + issuer */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug mb-0.5 line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-xs font-medium truncate" style={{ color: cat.color }}>
            {cert.issuer}
          </p>
        </div>

        {/* External link */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1.5 rounded-lg transition-all hover:bg-white/10"
            style={{ color: cat.color }}
            aria-label="View credential"
          >
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs leading-relaxed mb-3 flex-1">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {cert.skills.map(s => (
          <span
            key={s}
            className="text-[10px] px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${cat.color}25`, background: `${cat.color}08`, color: cat.color }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <CalendarIcon className="w-3 h-3" />
          {cert.issued}{cert.expires ? ` — ${cert.expires}` : ''}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: status.dot }}
          />
          <span className="text-[10px] font-medium" style={{ color: status.color }}>
            {status.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export function CertificationsSection() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all'
    ? certifications
    : certifications.filter(c => c.category === filter);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'SAP / ERP', value: 'sap' },
    { label: 'Business Analysis', value: 'ba' },
    { label: 'Cloud & IT', value: 'it' },
    { label: 'Academic', value: 'academic' },
    { label: 'Awards', value: 'leadership' },
  ];

  // Stats
  const active = certifications.filter(c => c.status === 'active').length;
  const inProgress = certifications.filter(c => c.status === 'in-progress').length;
  const categories = new Set(certifications.map(c => c.category)).size;

  return (
    <section
      id="certifications"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="cert-heading"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            — Credentials & recognition
          </p>
          <h2
            id="cert-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Certifications &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Badges
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-amber-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-5 text-sm max-w-xl mx-auto">
            Verified credentials, academic qualifications, and professional recognitions
            across SAP, business analysis, cloud, and leadership.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: 'Verified',    value: active,      color: '#10b981', icon: <ShieldCheckIcon className="w-4 h-4" /> },
            { label: 'In progress', value: inProgress,  color: '#f59e0b', icon: <AwardIcon className="w-4 h-4" /> },
            { label: 'Categories',  value: categories,  color: '#4da6ff', icon: <AwardIcon className="w-4 h-4" /> },
          ].map(s => (
            <div
              key={s.label}
              className="text-center rounded-xl border border-white/8 bg-white/3 py-4 px-2"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color: s.color }}>
                {s.icon}
                <span className="text-2xl font-bold font-mono">{s.value}</span>
              </div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filters.map(f => {
            const cat = f.value !== 'all' ? catConfig[f.value as CertCategory] : null;
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
                style={{
                  background: isActive ? (cat?.bg ?? 'rgba(30,107,196,0.12)') : 'rgba(255,255,255,0.03)',
                  borderColor: isActive ? (cat?.border ?? 'rgba(30,107,196,0.3)') : 'rgba(255,255,255,0.1)',
                  color: isActive ? (cat?.color ?? '#4da6ff') : '#6b7280',
                  boxShadow: isActive ? `0 0 16px ${cat?.bg ?? 'rgba(30,107,196,0.12)'}` : 'none',
                }}
              >
                {cat && <span>{cat.icon}</span>}
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Cert grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.linkedin.com/in/vihanga-rathnayake-a6a652321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors"
          >
            <ShieldCheckIcon className="w-4 h-4" />
            View all verified credentials on LinkedIn
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
