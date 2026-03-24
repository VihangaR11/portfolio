import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
}

const articles: Article[] = [
  {
    title: 'Building Scalable Microservices with Docker and Kubernetes',
    excerpt: 'Learn how to design and deploy microservices architecture using containerization and orchestration tools.',
    date: 'Feb 28, 2026',
    readTime: '8 min read',
    category: 'DevOps',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    title: 'Modern React Patterns: Hooks, Context, and Performance',
    excerpt: 'Deep dive into advanced React patterns and best practices for building performant applications.',
    date: 'Feb 15, 2026',
    readTime: '12 min read',
    category: 'React',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    title: 'AWS Infrastructure as Code with Terraform',
    excerpt: 'A comprehensive guide to managing cloud infrastructure using Terraform and AWS best practices.',
    date: 'Feb 1, 2026',
    readTime: '10 min read',
    category: 'AWS',
    gradient: 'from-cyan-400 to-violet-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export function BlogSection() {
  return (
    <section
      id="blog"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="blog-heading"
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
            id="blog-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Latest{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and technology
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {articles.map((article) => (
            <motion.article
              key={article.title}
              variants={itemVariants}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-white/20"
            >
              {/* Article Header with Gradient */}
              <div className={`h-40 bg-gradient-to-br ${article.gradient} opacity-80 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <button className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="px-8 py-4 border border-white/20 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/5 inline-flex items-center gap-2">
            View All Articles
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
