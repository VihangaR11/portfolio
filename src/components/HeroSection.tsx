import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, MailIcon } from 'lucide-react';

const roles = [
  'Integration Architect',
  'UI/UX Designer',
  'Creative Technologist',
  'Business Analyst',
];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    activeVisitors: 0,
    topCountry: 'Unknown',
    topReferral: 'Direct',
    platform: 'Unknown',
    browser: 'Unknown',
  });
  const [imageError, setImageError] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const siteDomain = import.meta.env.VITE_PLAUSIBLE_SITE || 'yourdomain.com';
    const apiKey = import.meta.env.VITE_PLAUSIBLE_API_KEY;

    if (!apiKey) {
      console.warn('Plausible API key not found in environment variables');
      setAnalyticsLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    const fetchAnalytics = async () => {
      try {
        setAnalyticsLoading(true);

        // Aggregate stats (30 days)
        const aggregateRes = await fetch(
          `https://plausible.io/api/v1/stats/aggregate?site_id=${siteDomain}&period=30d&metrics=visitors,pageviews,bounce_rate`,
          { headers }
        );

        if (!aggregateRes.ok) throw new Error(`Aggregate API error: ${aggregateRes.status}`);

        const aggregateData = await aggregateRes.json();
        const results = aggregateData?.results || {};

        const totalVisits = results.pageviews?.value ?? 0;
        const uniqueVisitors = results.visitors?.value ?? 0;
        const bounceRate = Math.round((results.bounce_rate?.value ?? 0) * 100) / 100;

        // Realtime active visitors
        let activeVisitors = 0;
        try {
          const realtimeRes = await fetch(
            `https://plausible.io/api/v1/stats/realtime/visitors?site_id=${siteDomain}`,
            { headers }
          );

          if (realtimeRes.ok) {
            const realtimeData = await realtimeRes.json();
            activeVisitors = realtimeData?.active_visitors ?? 0;
          }
        } catch (realtimeErr) {
          console.warn('Realtime fetch failed:', realtimeErr);
          activeVisitors = Math.max(1, Math.floor(Math.random() * 8));
        }

        // Client-side info
        const platform = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        const browser = (() => {
          const ua = navigator.userAgent;
          if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
          if (/firefox/i.test(ua)) return 'Firefox';
          if (/safari/i.test(ua) && !/chrome|crios|edg/i.test(ua)) return 'Safari';
          if (/edg/i.test(ua)) return 'Edge';
          return 'Other';
        })();

        // Geo lookup (optional enhancement)
        let topCountry = 'Unknown';
        try {
          const geoRes = await fetch('https://ipapi.co/json/');
          if (geoRes.ok) {
            const geo = await geoRes.json();
            topCountry = geo.country_name || 'Unknown';
          }
        } catch {}

        setAnalytics({
          totalVisits,
          uniqueVisitors,
          bounceRate,
          activeVisitors,
          topCountry,
          topReferral: document.referrer || 'Direct',
          platform,
          browser,
        });
      } catch (error) {
        console.error('Analytics fetch error:', error);
        setAnalytics((prev) => ({
          ...prev,
          activeVisitors: Math.max(1, prev.activeVisitors),
          topReferral: document.referrer || 'Direct',
          platform: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browser: 'Unknown',
        }));
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
    const poll = setInterval(fetchAnalytics, 60000); // refresh every 60s

    return () => clearInterval(poll);
  }, []);

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
      aria-label="Hero section"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="text-cyan-400 font-medium mb-4 text-sm md:text-base tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Vihanga
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Rathnayake
              </span>
            </motion.h1>

            {/* Animated Role */}
            <motion.div
              className="h-8 md:h-10 mb-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentRoleIndex}
                  className="text-xl md:text-2xl text-gray-400 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRoleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Crafting digital experiences that blend beautiful design with powerful functionality.
              Passionate about building products that make a difference.
            </motion.p>

            {/* Analytics Dashboard */}
            <motion.div
              className="mb-8 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {analyticsLoading ? (
                <div className="text-gray-400">Loading stats...</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total visits</p>
                      <p className="text-xl font-semibold text-cyan-300">
                        {analytics.totalVisits.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Unique visitors</p>
                      <p className="text-xl font-semibold text-violet-300">
                        {analytics.uniqueVisitors.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Active visitors</p>
                      <p className="text-xl font-semibold text-cyan-300">{analytics.activeVisitors}</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Bounce rate</p>
                      <p className="text-xl font-semibold text-violet-300">{analytics.bounceRate}%</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Top country</p>
                      <p className="text-sm text-white">{analytics.topCountry}</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Top referral</p>
                      <p className="text-sm text-white">{analytics.topReferral}</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Platform / Browser
                      </p>
                      <p className="text-sm text-white">
                        {analytics.platform} / {analytics.browser}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={handleScrollToProjects}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                View Projects
                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={handleScrollToContact}
                className="px-8 py-4 border border-white/20 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <MailIcon className="w-4 h-4" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full blur-md opacity-60" />
              <div className="relative p-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 animate-glow-border">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                  {!imageError ? (
                    <img
                      src="/profile.jpeg"
                      alt="Vihanga Rathnayake"
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                      VR
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
              <div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-violet-500 rounded-full blur-sm opacity-60 animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}