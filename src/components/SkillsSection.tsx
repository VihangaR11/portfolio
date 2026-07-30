import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  BlocksIcon,
  DatabaseIcon,
  FileCheck2Icon,
  GitPullRequestIcon,
  MessagesSquareIcon,
  PanelsTopLeftIcon,
  PresentationIcon,
  WorkflowIcon,
} from 'lucide-react';

const capabilityGroups = [
  {
    title: 'Business Analysis',
    description: 'From discovery to validated, traceable requirements.',
    icon: FileCheck2Icon,
    items: ['Stakeholder analysis', 'Requirements elicitation', 'BRD / SRS', 'Use cases', 'User stories', 'Acceptance criteria', 'MoSCoW', 'Requirements traceability'],
  },
  {
    title: 'Process & Transformation',
    description: 'Understand operations, remove friction and define a workable future state.',
    icon: WorkflowIcon,
    items: ['As-Is / To-Be analysis', 'BPMN', 'Business process re-engineering', 'Gap analysis', 'Business rules', 'Risk & constraint analysis', 'Implementation roadmaps'],
  },
  {
    title: 'ERP & Functional Consulting',
    description: 'Map operational needs to enterprise-platform capabilities.',
    icon: BlocksIcon,
    items: ['Odoo exposure', 'ERP fit-gap analysis', 'Procure-to-pay', 'Order-to-cash', 'Inventory workflows', 'Role configuration', 'Functional specifications'],
  },
  {
    title: 'Systems Analysis',
    description: 'Translate approved requirements into feasible system behaviour.',
    icon: PanelsTopLeftIcon,
    items: ['UML & use-case models', 'Data modelling', 'REST & JSON', 'Role-based access', 'Audit logging', 'Integration analysis', 'Cloud fundamentals'],
  },
  {
    title: 'Validation & Delivery',
    description: 'Make requirements testable and keep implementation aligned.',
    icon: GitPullRequestIcon,
    items: ['UAT planning', 'Test scenarios', 'Defect tracking', 'Prototype validation', 'Agile backlog support', 'Change control', 'Handover documentation'],
  },
  {
    title: 'Communication & Insight',
    description: 'Turn analysis into decisions stakeholders can act on.',
    icon: PresentationIcon,
    items: ['Workshop facilitation', 'Meeting minutes', 'Executive summaries', 'Solution presentations', 'User training', 'Cross-functional communication'],
  },
];

const tools = [
  { icon: WorkflowIcon, label: 'BPMN / modelling' },
  { icon: BarChart3Icon, label: 'Power BI & analysis' },
  { icon: DatabaseIcon, label: 'SQL & PostgreSQL' },
  { icon: PanelsTopLeftIcon, label: 'Figma prototypes' },
  { icon: MessagesSquareIcon, label: 'Jira / Agile workflows' },
];

export function SkillsSection() {
  return (
    <section id="services" className="py-20 md:py-24 relative" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
            Services &amp; capabilities
          </p>
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-4">
            What I can help deliver
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            My focus is ownership of a defined workstream: discover, document, recommend,
            validate and hand over—not simply attend meetings or produce isolated diagrams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {capabilityGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-white/10 bg-[#0a1424]/80 p-6 lg:p-7 min-h-[15.5rem] hover:border-blue-400/30 hover:bg-[#0c192c] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/12 border border-blue-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-white font-semibold text-xl">{group.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg bg-white/[0.045] border border-white/10 text-xs text-gray-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300 mb-4">Supporting toolset</p>
          <div className="flex flex-wrap gap-3">
            {tools.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/10 border border-white/10 text-sm text-gray-300">
                <Icon className="w-4 h-4 text-amber-300" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
