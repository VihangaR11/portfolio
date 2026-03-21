import React from 'react';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { SkillsSection } from './components/SkillsSection';
import { SkillsRadarSection } from './components/SkillsRadarSection';
import { GitHubSection } from './components/GitHubSection';
import { ResumeSection } from './components/ResumeSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectCaseStudiesSection } from './components/ProjectCaseStudiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeToggle } from './components/ThemeToggle';
export function App() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] overflow-x-hidden">
      {/* Background animated orbs */}
      <BackgroundOrbs />

      {/* Navigation */}
      <Navbar />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <SkillsRadarSection />
        <GitHubSection />
        <ResumeSection />
        <ProjectsSection />
        <ProjectCaseStudiesSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>);

}