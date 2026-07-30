import { motion } from 'framer-motion';
import {
  AwardIcon,
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  UsersRoundIcon,
} from 'lucide-react';

const profileStats = [
  { icon: BriefcaseBusinessIcon, value: '3', suffix: '', label: 'Case Studies', color: 'blue' },
  { icon: GraduationCapIcon, value: '2', suffix: '', label: 'Degrees in Progress', color: 'amber' },
  { icon: AwardIcon, value: '3', suffix: '', label: 'Awards', color: 'blue' },
  { icon: UsersRoundIcon, value: '5', suffix: '+', label: 'Leadership Roles', color: 'amber' },
];

export function StatsSection() {
  return (
    <section className="py-12 md:py-16 relative" aria-label="Profile highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {profileStats.map((item, index) => {
            const Icon = item.icon;
            const isAmber = item.color === 'amber';
            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group rounded-2xl border border-white/15 bg-[#101a2b]/85 px-6 py-8 min-h-[16rem] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#132036] transition-all duration-300"
              >
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border ${
                    isAmber
                      ? 'bg-amber-400/[0.07] border-amber-400/10 text-amber-400'
                      : 'bg-blue-400/[0.07] border-blue-400/10 text-blue-400'
                  }`}
                >
                  <Icon className="w-9 h-9" strokeWidth={1.8} />
                </div>

                <div
                  className={`font-extrabold text-5xl leading-none ${
                    isAmber ? 'text-amber-300' : 'text-blue-500'
                  }`}
                >
                  {item.value}
                  {item.suffix && (
                    <span className="block text-3xl leading-none mt-2">{item.suffix}</span>
                  )}
                </div>

                <p className="text-gray-400 text-base sm:text-lg font-medium mt-5">
                  {item.label}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
