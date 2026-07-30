import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  BlocksIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  FileCheck2Icon,
  GitPullRequestIcon,
  MessagesSquareIcon,
  PanelsTopLeftIcon,
  PresentationIcon,
  WorkflowIcon,
} from 'lucide-react';

const tools = [
  { name: 'Bizagi & BPMN', icon: WorkflowIcon, level: 'Advanced', width: '90%', tone: 'blue' },
  { name: 'Odoo ERP', icon: BlocksIcon, level: 'Working', width: '72%', tone: 'amber' },
  { name: 'Figma', icon: PanelsTopLeftIcon, level: 'Working', width: '82%', tone: 'blue' },
  { name: 'Power BI', icon: BarChart3Icon, level: 'Working', width: '75%', tone: 'amber' },
  { name: 'Jira & Agile', icon: MessagesSquareIcon, level: 'Working', width: '78%', tone: 'blue' },
  { name: 'SQL & PostgreSQL', icon: DatabaseIcon, level: 'Working', width: '76%', tone: 'amber' },
  { name: 'UML & draw.io', icon: WorkflowIcon, level: 'Advanced', width: '85%', tone: 'blue' },
  { name: 'Postman & REST', icon: GitPullRequestIcon, level: 'Working', width: '74%', tone: 'amber' },
  { name: 'Git & GitHub', icon: CodeIcon, level: 'Advanced', width: '86%', tone: 'blue' },
  { name: 'Microsoft 365', icon: PresentationIcon, level: 'Advanced', width: '90%', tone: 'amber' },
  { name: 'React & TypeScript', icon: FileCheck2Icon, level: 'Working', width: '80%', tone: 'blue' },
  { name: 'Cloud Fundamentals', icon: CloudIcon, level: 'Familiar', width: '65%', tone: 'amber' },
];

export function ToolsTechnologiesSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-24 relative overflow-hidden"
      aria-labelledby="tools-heading"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_45%,rgba(30,107,196,0.08),transparent_28%),radial-gradient(circle_at_90%_55%,rgba(200,160,60,0.07),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            Practical toolkit
          </p>
          <h2
            id="tools-heading"
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-4"
          >
            Tools &amp; <span className="text-blue-500">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            The modelling, analysis, collaboration and technical tools I use to move from
            discovery through requirements, validation and delivery.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isAmber = tool.tone === 'amber';

            return (
              <motion.article
                key={tool.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-white/15 bg-[#101a2b]/85 p-5 min-h-[14rem] flex flex-col hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#132036] transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${
                    isAmber
                      ? 'bg-amber-400/[0.08] border-amber-400/10 text-amber-400'
                      : 'bg-blue-400/[0.08] border-blue-400/10 text-blue-400'
                  }`}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.8} />
                </div>

                <h3 className="text-white text-lg font-bold leading-snug min-h-12">
                  {tool.name}
                </h3>

                <div className="mt-auto pt-5">
                  <div className="flex justify-between items-center gap-2 text-[11px] mb-2">
                    <span className="text-gray-500">Proficiency</span>
                    <span className={isAmber ? 'text-amber-300' : 'text-blue-300'}>
                      {tool.level}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isAmber ? 'bg-amber-400' : 'bg-blue-400'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: tool.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + index * 0.03 }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
