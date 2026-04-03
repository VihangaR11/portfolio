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
import { WhatICanBuildSection } from './components/WhatICanBuildSection';
import LeftSidebar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
// AchievementsTimeline removed — merged into ResumeSection

export function App() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] overflow-x-hidden">
      <a href="#main-content" className="skip-nav absolute top-0 left-0 m-4 p-2 rounded bg-cyan-500 text-black font-semibold z-50 focus-visible:opacity-100 opacity-0 transition-opacity duration-300">
        Skip to content
      </a>
      <BackgroundOrbs />
      <Navbar />
      <ThemeToggle />

      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <WhatICanBuildSection />
        <GitHubSection />
        <ResumeSection />        {/* ← Experience + Education + Volunteering + Awards + Certs + Timeline all here */}
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