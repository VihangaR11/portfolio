import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  FileSearchIcon,
  GraduationCapIcon,
  NetworkIcon,
  UsersRoundIcon,
} from 'lucide-react';

const workingStyle = [
  {
    icon: FileSearchIcon,
    title: 'Discover the real problem',
    text: 'Study policies, SOPs and existing operations; interview stakeholders; separate facts, assumptions and constraints.',
  },
  {
    icon: NetworkIcon,
    title: 'Model a better process',
    text: 'Translate As-Is findings into pain points, gaps, To-Be BPMN flows, business rules and clear decision paths.',
  },
  {
    icon: CheckCircle2Icon,
    title: 'Define testable requirements',
    text: 'Create functional and non-functional requirements, use cases, acceptance criteria, traceability and UAT evidence.',
  },
  {
    icon: UsersRoundIcon,
    title: 'Bridge business and technology',
    text: 'Explain organizational needs to developers and technical constraints to managers, users and project stakeholders.',
  },
];

const roleFit = [
  'Associate Business Analyst',
  'Business Systems Analyst',
  'Digital Transformation Analyst',
  'Associate Functional / ERP Consultant',
  'Implementation or Solutions Analyst',
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 relative" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16"
        >
          <div>
            <p className="text-blue-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
              Professional profile
            </p>
            <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              A management-oriented technology professional with systems depth.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              I am pursuing honours degrees in Information Systems at the University of
              Sri Jayewardenepura and Software Engineering at the Open University of Sri
              Lanka. That combination gives me both the business perspective to question
              how work should flow and the technical literacy to judge how a solution can
              be designed and delivered.
            </p>
            <p className="text-gray-400 leading-relaxed mb-7">
              My direction is enterprise software, government digitalization, business
              process improvement and ERP consulting—not coding-only roles. I use
              prototyping and development skills to validate ideas and communicate
              requirements, not as a substitute for analysis.
            </p>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCapIcon className="w-5 h-5 text-amber-300" />
                <h3 className="text-white font-semibold">Roles I am targeting</h3>
              </div>
              <ul className="space-y-2">
                {roleFit.map((role) => (
                  <li key={role} className="flex items-center gap-2 text-sm text-gray-300">
                    <ArrowRightIcon className="w-3.5 h-3.5 text-amber-300" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {workingStyle.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 hover:border-blue-400/25 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/12 border border-blue-400/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
