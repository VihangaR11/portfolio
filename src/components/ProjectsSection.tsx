import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  Building2Icon,
  CheckCircle2Icon,
  FactoryIcon,
  Layers3Icon,
  XIcon,
} from 'lucide-react';

interface CaseStudy {
  title: string;
  eyebrow: string;
  status: string;
  icon: React.ElementType;
  summary: string;
  problem: string;
  role: string;
  approach: string[];
  evidence: string[];
  outcome: string;
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Anonymised Digital Case Management Transformation',
    eyebrow: 'Principal business analysis case study',
    status: 'In progress · Internship-based',
    icon: Building2Icon,
    summary:
      'Analysis and redesign of sensitive, document-heavy government workflows into a centralized digital case-management concept.',
    problem:
      'Manual registers, files, letters and separate divisional processes make case visibility, handovers, traceability and management reporting difficult.',
    role:
      'Business analysis intern contributing to policy and SOP review, stakeholder discovery, As-Is analysis, gap identification, To-Be process design, requirements and prototype thinking.',
    approach: [
      'Study legislation, SOPs, organizational roles and existing workflows',
      'Map As-Is processes and document pain points, controls and handoffs',
      'Design To-Be BPMN flows, system roles and permission boundaries',
      'Translate needs into use cases, functional requirements and acceptance criteria',
      'Support prototype, architecture, roadmap, budget and procurement discussions',
    ],
    evidence: [
      'Anonymised As-Is and To-Be BPMN',
      'Requirements catalogue and traceability matrix',
      'Use cases and role-permission matrix',
      'Prototype and validation scenarios',
      'Implementation roadmap and risk considerations',
    ],
    outcome:
      'The public case study will describe projected benefits only until implementation data is available. Sensitive organizational and case information will remain excluded.',
    tags: ['GovTech', 'BPMN', 'Requirements', 'BPR', 'UAT', 'RBAC'],
  },
  {
    title: 'PiLETesT ERP Implementation Pilot',
    eyebrow: 'Functional consulting case study',
    status: 'Planned · Discovery foundation',
    icon: FactoryIcon,
    summary:
      'A focused Odoo pilot mapping an engineering-testing company’s inquiry-to-invoice workflow to integrated ERP capabilities.',
    problem:
      'Operational information can become fragmented across quotations, projects, equipment, field testing, reports, procurement and invoicing.',
    role:
      'Functional-analysis lead for a small pilot: discover the current process, conduct fit-gap analysis, configure a demonstration and prepare validation and adoption evidence.',
    approach: [
      'Select one end-to-end process rather than attempting a full ERP rollout',
      'Interview management, technical and administrative stakeholders',
      'Map CRM, Sales, Project, Inventory, Purchase and Invoicing needs',
      'Configure roles, workflows and a small anonymised demonstration dataset',
      'Run test scenarios and prepare training and implementation guidance',
    ],
    evidence: [
      'Project charter and stakeholder register',
      'ERP fit-gap matrix',
      'Configured Odoo demonstration',
      'UAT cases and role-permission matrix',
      'Cost-benefit view and phased roadmap',
    ],
    outcome:
      'Success will be measured using agreed baseline indicators such as quotation time, report turnaround, equipment use and duplicate data entry—without claiming unmeasured improvements.',
    tags: ['Odoo', 'ERP', 'Fit-gap', 'Process mapping', 'UAT', 'Training'],
  },
  {
    title: 'Organizational Approval Workflow Automation',
    eyebrow: 'Digital transformation case study',
    status: 'Portfolio build · Proposed',
    icon: Layers3Icon,
    summary:
      'A real-world event proposal and budget approval workflow for a university or community organization.',
    problem:
      'Email, chat and paper-based approvals can create incomplete submissions, unclear ownership, delayed decisions and weak budget visibility.',
    role:
      'Business and solution analyst responsible for discovery, workflow design, business rules, approval controls, prototype validation and management reporting.',
    approach: [
      'Define submitter, secretary, treasurer, approver and management roles',
      'Model normal, rejected, revised and exception paths',
      'Specify approval rules, notifications, audit history and access controls',
      'Build a Power Platform or lightweight web proof of concept',
      'Validate the workflow with representative users and record feedback',
    ],
    evidence: [
      'As-Is and To-Be workflow',
      'Business rules and approval matrix',
      'Working automation prototype',
      'Exception handling and audit trail',
      'Dashboard, test results and user feedback',
    ],
    outcome:
      'The case study will connect workflow decisions to measurable indicators such as approval turnaround, incomplete submissions and budget variance.',
    tags: ['Workflow', 'Power Platform', 'Automation', 'Business rules', 'Dashboard'],
  },
];

export function ProjectsSection() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <section id="projects" className="py-20 md:py-24 relative" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
            Evidence, not decoration
          </p>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-4">
            Business analysis & transformation case studies
          </h2>
          <p className="text-gray-400 leading-relaxed">
            These projects are structured around professional deliverables: business context,
            discovery, process analysis, requirements, solution decisions, validation and
            measurable outcomes. Status labels distinguish completed work from planned evidence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#0a1424]/80 p-6 lg:p-7 flex flex-col h-full min-h-[27rem] hover:border-blue-400/30 hover:bg-[#0c192c] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/12 border border-blue-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-[10px] text-amber-200 border border-amber-400/20 bg-amber-400/[0.06] rounded-full px-2.5 py-1 text-right">
                    {study.status}
                  </span>
                </div>
                <p className="text-blue-300 text-xs uppercase tracking-wider mb-2">{study.eyebrow}</p>
                <h3 className="text-xl text-white font-bold leading-snug mb-4">{study.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{study.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[11px] text-gray-300 bg-white/[0.045] border border-white/10 rounded-lg px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(study)}
                  className="flex items-center justify-between w-full rounded-xl border border-blue-400/20 bg-blue-400/[0.06] px-4 py-3 text-blue-200 text-sm font-semibold hover:bg-blue-400/10 transition-colors"
                >
                  Review approach
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#081426] p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
            >
              <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                  <p className="text-blue-300 text-xs uppercase tracking-wider mb-2">{selected.eyebrow}</p>
                  <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-white">{selected.title}</h2>
                  <p className="text-amber-200 text-xs mt-3">{selected.status}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                  aria-label="Close case study"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Business problem</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selected.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">My role</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selected.role}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Outcome discipline</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selected.outcome}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Approach</h3>
                    <ul className="space-y-2">
                      {selected.approach.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle2Icon className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">Portfolio evidence</h3>
                    <ul className="space-y-2">
                      {selected.evidence.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle2Icon className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
