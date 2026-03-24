import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, GitBranchIcon, StarIcon, GitCommitIcon, LinkedinIcon, AwardIcon, ShieldCheckIcon } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  latestCommit: string;
  languages: { name: string; percentage: number; color: string }[];
}

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
    latestCommit: 'N/A',
    languages: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const githubUsername = 'VihangaR11';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        const repos = await response.json();

        if (!Array.isArray(repos)) {
          throw new Error('Unexpected response format from GitHub API');
        }

        const totals = repos.reduce(
          (acc: { stars: number; forks: number; size: number; commitApprox: number; latest: string | null; languageSize: Record<string, number> }, repo: any) => {
            acc.stars += repo.stargazers_count || 0;
            acc.forks += repo.forks_count || 0;
            acc.size += repo.size || 0;
            acc.commitApprox += repo.forks_count || 0;
            if (repo.pushed_at) {
              acc.latest = !acc.latest || new Date(repo.pushed_at) > new Date(acc.latest) ? repo.pushed_at : acc.latest;
            }
            if (repo.language) {
              acc.languageSize[repo.language] = (acc.languageSize[repo.language] || 0) + (repo.size || 0);
            }
            return acc;
          },
          { stars: 0, forks: 0, size: 0, commitApprox: 0, latest: null, languageSize: {} }
        );

        const languageEntries = Object.entries(totals.languageSize);
        const totalSize = languageEntries.reduce((sum, [, size]) => sum + (size as number), 0);
        const languages = languageEntries
          .sort((a, b) => (b[1] as number) - (a[1] as number))
          .slice(0, 5)
          .map(([name, size]) => ({
            name,
            percentage: totalSize > 0 ? Math.round(((size as number) / totalSize) * 100) : 0,
            color: name === 'TypeScript' ? '#3178c6' : name === 'JavaScript' ? '#f7df1e' : name === 'Python' ? '#3776ab' : name === 'CSS' ? '#563d7c' : '#8b8b8b'
          }));

        setStats({
          totalRepos: repos.length,
          totalStars: totals.stars,
          totalForks: totals.forks,
          totalCommits: totals.commitApprox,
          latestCommit: totals.latest ? new Date(totals.latest).toLocaleDateString() : 'N/A',
          languages
        });
      } catch (error) {
        console.error('GitHub fetch failed', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [githubUsername]);

  return (
    <section
      id="github"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="github-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Activity
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Live coding activity and contributions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Total Repos */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <GitBranchIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{isLoading ? '...' : stats.totalRepos}</div>
                <div className="text-gray-400 text-sm">Repositories</div>
              </div>
            </div>
          </div>

          {/* Total Stars */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-500/10 rounded-xl">
                <StarIcon className="w-8 h-8 text-violet-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{isLoading ? '...' : stats.totalStars}</div>
                <div className="text-gray-400 text-sm">Stars Earned</div>
              </div>
            </div>
          </div>

          {/* Total Forks */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <GitBranchIcon className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{isLoading ? '...' : stats.totalForks}</div>
                <div className="text-gray-400 text-sm">Forks</div>
              </div>
            </div>
          </div>

          {/* Latest Commit */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <ShieldCheckIcon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{isLoading ? 'Loading...' : stats.latestCommit}</div>
                <div className="text-gray-400 text-sm">Last Commit</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Languages Chart */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GithubIcon className="w-6 h-6 text-cyan-400" />
            Most Used Languages
          </h3>

          {/* Language Bars */}
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
                    transition={{ duration: 1, delay: 0.1 * index }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Profile Link */}
          <div className="mt-8 text-center">
            <RippleButton
              onClick={() => window.open(`https://github.com/${githubUsername}`, '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <GithubIcon className="w-5 h-5" />
              View Full GitHub Profile
            </RippleButton>
          </div>
        </motion.div>

        {/* Trust & Verification Badges */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-3">
            <LinkedinIcon className="w-6 h-6 text-cyan-400" />
            <div className="text-gray-200 text-sm">
              LinkedIn Verified
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-3">
            <GithubIcon className="w-6 h-6 text-white" />
            <div className="text-gray-200 text-sm">
              GitHub Sponsor
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-3">
            <AwardIcon className="w-6 h-6 text-yellow-300" />
            <div className="text-gray-200 text-sm">
              Certifications (AWS, GCP, PMP)
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-gray-300 text-sm">
            Total estimated commits taken from activity signals (via public GitHub data, may count forks as commits for visibility). Deep commits can be surfaced with GitHub GraphQL if authenticated.
          </div>
        </motion.div>

        {/* Contribution Graph Placeholder */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Contribution Activity</h3>
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">
              To show your real GitHub contribution graph, you can:
            </p>
            <ol className="text-gray-400 text-sm space-y-2 text-left max-w-2xl mx-auto">
              <li>1. Use GitHub's embed: <code className="bg-white/10 px-2 py-1 rounded">github-readme-stats</code></li>
              <li>2. Fetch from GitHub API and create custom visualization</li>
              <li>3. Embed GitHub profile README</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
