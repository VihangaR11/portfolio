import { BrowserRouter, Routes, Route } from 'react-router-dom';
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



// ── Main portfolio layout ─────────────────────────────────────────────────
function MainLayout() {
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
    </div>
  );
}
{/* Floating business card button */}

 <a href="https://vihangaR11.github.io/portfolio/card"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all hover:brightness-110"
  style={{
    background: 'linear-gradient(135deg, #1e6bc4, #1557a0)',
    borderColor: 'rgba(77,166,255,0.3)',
    color: '#fff',
    boxShadow: '0 8px 24px rgba(30,107,196,0.4)',
    backdropFilter: 'blur(12px)',
  }}
  aria-label="View digital business card"
>
  🪪 My Card
</a>

// ── App with routing ──────────────────────────────────────────────────────
export function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/"     element={<MainLayout />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
