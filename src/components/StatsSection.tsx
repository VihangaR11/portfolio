import { motion } from 'framer-motion';
import { ClipboardCheckIcon, FileStackIcon, RouteIcon, ShieldCheckIcon } from 'lucide-react';

const evidence = [
  { icon: RouteIcon, value: 'As-Is → To-Be', label: 'Process discovery and redesign' },
  { icon: FileStackIcon, value: 'BRD · SRS · RTM', label: 'Structured requirement documentation' },
  { icon: ClipboardCheckIcon, value: 'UAT-ready', label: 'Acceptance criteria and validation' },
  { icon: ShieldCheckIcon, value: 'RBAC · Audit', label: 'Secure systems thinking' },
];

export function StatsSection() {
  return (
    <section className="py-10 md:py-12 relative" aria-label="Core business analysis evidence">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evidence.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-white/10 bg-[#0a1424]/80 p-5 min-h-24 flex items-start gap-4 hover:border-blue-400/25 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/12 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <div className="text-white font-semibold">{item.value}</div>
                  <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
