import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, GitBranchIcon, StarIcon, GitCommitIcon } from 'lucide-react';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalCommits: number;
  languages: { name: string; percentage: number; color: string }[];
}

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 42,
    totalStars: 156,
    totalCommits: 1243,
    languages: [
      { name: 'TypeScript', percentage: 35, color: '#3178c6' },
      { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
      { name: 'Python', percentage: 20, color: '#3776ab' },
      { name: 'CSS', percentage: 12, color: '#563d7c' },
      { name: 'Other', percentage: 5, color: '#8b8b8b' }
    ]
  });

  // TODO: Replace with your GitHub username
  const githubUsername = 'https://github.com/VihangaR11/';

  // You can fetch real data from GitHub API
  // useEffect(() => {
  //   fetch(`https://api.github.com/users/${githubUsername}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       // Update stats with real data
  //     });
  // }, []);

  return (
    <section
      id="github"
      className="py-24 md:py-32 relative"
      aria-labelledby="github-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="github-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
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
                <div className="text-3xl font-bold text-white">{stats.totalRepos}</div>
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
                <div className="text-3xl font-bold text-white">{stats.totalStars}</div>
                <div className="text-gray-400 text-sm">Stars Earned</div>
              </div>
            </div>
          </div>

          {/* Total Commits */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <GitCommitIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.totalCommits}</div>
                <div className="text-gray-400 text-sm">Commits</div>
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
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <GithubIcon className="w-5 h-5" />
              View Full GitHub Profile
            </a>
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
