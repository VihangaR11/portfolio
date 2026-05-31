import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { SkillsSection } from './components/SkillsSection';
import { GitHubSection } from './components/GitHubSection';
import { ResumeSection } from './components/ResumeSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectCaseStudiesSection } from './components/ProjectCaseStudiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FilmstripGallerySection } from './components/FilmstripGallerySection';
import { ContactSection } from './components/ContactSection';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeToggle } from './components/ThemeToggle';
import LeftSidebar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#060d1a] overflow-x-hidden">
      <a
        href="#main-content"
        className="skip-nav absolute top-0 left-0 m-4 p-2 rounded bg-blue-600 text-white font-semibold z-50 focus-visible:opacity-100 opacity-0 transition-opacity duration-300"
      >
        Skip to content
      </a>

      <BackgroundOrbs />
      <Navbar />
      <ThemeToggle />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <GitHubSection />
        <ResumeSection />
        <ProjectsSection />
        <ProjectCaseStudiesSection />
        <TestimonialsSection />
        <BlogSection />
        <FilmstripGallerySection />
        <ContactSection />
      </main>

      <ScrollToTop />
      <LeftSidebar />
      <RightSideBar />

      {/* ── Floating business card button ── */}
      <a
        href="https://vihangaR11.github.io/portfolio/card"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View digital business card"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(77,166,255,0.3)',
          background: 'linear-gradient(135deg, #1e6bc4, #1557a0)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(30,107,196,0.4)',
          backdropFilter: 'blur(12px)',
          transition: 'filter 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.15)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
      >
        🪪 My Card
      </a>
    </div>
  );
}