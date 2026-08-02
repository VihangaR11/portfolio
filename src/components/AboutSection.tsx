import { motion } from 'framer-motion';
import {
  BriefcaseBusinessIcon,
  CheckCircle2Icon,
  CodeIcon,
  DownloadIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  UsersRoundIcon,
} from 'lucide-react';

const profileDetails = [
  {
    icon: GraduationCapIcon,
    value: 'USJ + OUSL',
    label: 'Dual honours degrees',
    tone: 'amber',
  },
  {
    icon: BriefcaseBusinessIcon,
    value: 'Open to work',
    label: 'Associate-level roles',
    tone: 'emerald',
  },
  {
    icon: MapPinIcon,
    value: 'Sri Lanka',
    label: 'Location',
    tone: 'blue',
  },
  {
    icon: BriefcaseBusinessIcon,
    value: 'GovTech Internship',
    label: 'Current experience',
    tone: 'amber',
  },
];

const targetRoles = [
  'Associate Business Analyst',
  'Business Systems Analyst',
  'Digital Transformation Analyst',
  'Associate Functional / ERP Consultant',
  'Implementation or Solutions Analyst',
];

const toneStyles = {
  amber: 'border-amber-400/20 bg-amber-400/[0.08] text-amber-300',
  emerald: 'border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300',
  blue: 'border-blue-400/20 bg-blue-400/[0.08] text-blue-300',
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-24 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_45%,rgba(30,107,196,0.09),transparent_30%),radial-gradient(circle_at_95%_5%,rgba(200,160,60,0.08),transparent_28%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.35em] uppercase mb-4">
            — Who I am
          </p>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-white tracking-tight"
          >
            About <span className="text-blue-500">Me</span>
          </h2>
          <span className="block w-28 h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 mx-auto mt-5" />
        </motion.header>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 xl:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-400 text-sm font-medium mb-7">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to work — available for the right opportunity
            </div>

            <h3 className="text-2xl sm:text-[1.75rem] font-bold text-white leading-snug mb-6">
              I&apos;m <span className="text-blue-400">Vihanga Rathnayake</span> — a business
              systems analyst who turns operational needs into workable digital solutions.
            </h3>

            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                I&apos;m pursuing dual honours degrees in Information Systems at the University
                of Sri Jayewardenepura and Software Engineering at the Open University of Sri
                Lanka. This combination helps me understand both how organisations operate and
                how technology solutions are designed and delivered.
              </p>
              <p>
                My focus is business analysis, digital transformation, process improvement and
                enterprise systems. I analyse As-Is workflows, facilitate stakeholder discovery,
                model To-Be processes, define testable requirements and support UAT—bridging the
                gap between decision-makers, users and technical teams.
              </p>
              <p>
                Beyond analysis, I bring leadership experience from student and international
                organisations, plus national recognition through the Environmental Pioneer
                Presidential Medal. I value clear communication, practical outcomes and work
                that creates measurable public or business value.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="mailto:vihangasan221@gmail.com"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-gray-300 text-sm hover:border-blue-400/30 hover:text-white transition-colors"
              >
                <MailIcon className="w-4 h-4" />
                vihangasan221@gmail.com
              </a>
              <a
                href="https://github.com/VihangaR11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-gray-300 text-sm hover:border-blue-400/30 hover:text-white transition-colors"
              >
                <CodeIcon className="w-4 h-4" />
                GitHub
                <ExternalLinkIcon className="w-3 h-3 text-gray-500" />
              </a>
              <a
                href="https://linkedin.com/in/vihanga-rathnayake-a6a652321"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-gray-300 text-sm hover:border-blue-400/30 hover:text-white transition-colors"
              >
                <UsersRoundIcon className="w-4 h-4" />
                LinkedIn
                <ExternalLinkIcon className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-7">
              {profileDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.article
                    key={detail.value}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.07 }}
                    className="rounded-2xl border border-white/15 bg-white/[0.035] px-5 py-4 flex items-center gap-4 min-h-[5.5rem] hover:border-blue-400/30 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                        toneStyles[detail.tone as keyof typeof toneStyles]
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{detail.value}</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{detail.label}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="rounded-2xl border border-blue-400/15 bg-[#0b1526]/90 p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseBusinessIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold text-lg">What I&apos;m looking for</h3>
              </div>

              <ul className="space-y-3.5 mb-7">
                {targetRoles.map((role) => (
                  <li key={role} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2Icon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/portfolio/portfolio/Vihanga%20Rathnayake_CV.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-amber-400 text-[#06101f] font-bold hover:brightness-110 transition-all"
              >
                <DownloadIcon className="w-5 h-5" />
                Download My CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
