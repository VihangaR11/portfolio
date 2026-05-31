import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranchIcon, StarIcon, GitForkIcon, CalendarIcon } from 'lucide-react';
import { RippleButton } from './RippleButton';

// ─── Inline SVG for GitHub brand icon (removed from lucide-react v1) ───
const GithubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────
interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  latestCommit: string;
  languages: { name: string; percentage: number; color: string }[];
}

// ─── Language colour map ──────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#1e6bc4',
  JavaScript:  '#f7df1e',
  Python:      '#3776ab',
  CSS:         '#563d7c',
  HTML:        '#e34c26',
  Java:        '#b07219',
  'C++':       '#f34b7d',
  'C#':        '#178600',
  Go:          '#00add8',
  Rust:        '#dea584',
  default:     '#8b8b8b',
};

const getLangColor = (name: string) => LANG_COLORS[name] ?? LANG_COLORS.default;

// ─── Component ────────────────────────────────────────────────────────────
export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    latestCommit: 'N/A',
    languages: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const githubUsername = 'VihangaR11';

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const headers: HeadersInit = {};
        // Add token if available (set VITE_GITHUB_TOKEN in .env to avoid rate limits)
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
          { headers }
        );

        // Handle rate limiting gracefully
        if (response.status === 403 || response.status === 429) {
          throw new Error('GitHub API rate limit reached. Try again later.');
        }
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: any[] = await response.json();

        if (!Array.isArray(repos)) {
          throw new Error('Unexpected response from GitHub API');
        }

        if (cancelled) return;

        // Aggregate stats
        let stars = 0;
        let forks = 0;
        let latestDate: Date | null = null;
        const langSize: Record<string, number> = {};

        for (const repo of repos) {
          stars += repo.stargazers_count ?? 0;
          forks += repo.forks_count ?? 0;
          if (repo.pushed_at) {
            const d = new Date(repo.pushed_at);
            if (!latestDate || d > latestDate) latestDate = d;
          }
          if (repo.language && repo.size) {
            langSize[repo.language] = (langSize[repo.language] ?? 0) + repo.size;
          }
        }

        // Build language breakdown
        const totalSize = Object.values(langSize).reduce((s, v) => s + v, 0);
        const languages = Object.entries(langSize)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, size]) => ({
            name,
            percentage: totalSize > 0 ? Math.round((size / totalSize) * 100) : 0,
            color: getLangColor(name),
          }));

        setStats({
          totalRepos: repos.length,
          totalStars: stars,
          totalForks: forks,
          latestCommit: latestDate
            ? latestDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            : 'N/A',
          languages,
        });
      } catch (err) {
        if (!cancelled) {
          if (import.meta.env.DEV) console.error('GitHub fetch error:', err);
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  // ── Stat card data ────────────────────────────────────────────────────
  const statCards = [
    {
      icon: <GithubSVG className="w-8 h-8" />,
      value: isLoading ? '—' : stats.totalRepos.toString(),
      label: 'Repositories',
      accent: 'bg-blue-500/10 text-blue-400',
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      value: isLoading ? '—' : stats.totalStars.toString(),
      label: 'Stars Earned',
      accent: 'bg-amber-500/10 text-amber-400',
    },
    {
      icon: <GitForkIcon className="w-8 h-8" />,
      value: isLoading ? '—' : stats.totalForks.toString(),
      label: 'Forks',
      accent: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: <CalendarIcon className="w-8 h-8" />,
      value: isLoading ? '—' : stats.latestCommit,
      label: 'Last Active',
      accent: 'bg-amber-500/10 text-amber-400',
      small: true,
    },
  ];

  return (
    <section
      id="github"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="github-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="github-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            GitHub{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              Activity
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Live coding activity and contributions
          </p>
        </motion.div>

        {/* Error banner */}
        {hasError && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm text-center">
            Could not load GitHub stats — API rate limit may have been reached. Stats will show when available.
          </div>
        )}

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${card.accent}`}>
                  {card.icon}
                </div>
                <div>
                  <div className={`font-bold text-white ${card.small ? 'text-sm' : 'text-3xl'}`}>
                    {card.value}
                  </div>
                  <div className="text-gray-400 text-sm">{card.label}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Languages chart */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GithubSVG className="w-6 h-6 text-blue-400" />
            Most Used Languages
          </h3>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-white/10 rounded w-24" />
                    <div className="h-4 bg-white/10 rounded w-8" />
                  </div>
                  <div className="h-3 bg-white/5 rounded-full" />
                </div>
              ))}
            </div>
          ) : stats.languages.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No language data available.</p>
          ) : (
            <div className="space-y-4">
              {stats.languages.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{lang.name}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * index, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <RippleButton
              onClick={() => window.open(`https://github.com/${githubUsername}`, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <GithubSVG className="w-5 h-5" />
              View Full GitHub Profile
            </RippleButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}