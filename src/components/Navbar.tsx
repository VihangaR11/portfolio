import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, DownloadIcon } from 'lucide-react';
import { RippleButton } from './RippleButton';
const navLinks = [
{
  label: 'Home',
  href: '#home'
},
{
  label: 'About',
  href: '#about'
},
{
  label: 'Skills',
  href: '#skills'
},
{
  label: 'Resume',
  href: '#resume'
},
{
  label: 'Projects',
  href: '#projects'
},
{
  label: 'Blog',
  href: '#blog'
},
{
  label: 'Contact',
  href: '#contact'
}];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedHigh = localStorage.getItem('highContrast');
    const isHigh = savedHigh === 'true';
    setHighContrast(isHigh);
    document.documentElement.setAttribute('data-theme', isHigh ? 'high-contrast' : '');
  }, []);

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem('highContrast', `${next}`);
      document.documentElement.setAttribute('data-theme', next ? 'high-contrast' : '');
      return next;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem('reduceMotion');
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReduced = saved === 'true' || prefersReduce;
    setReduceMotion(isReduced);
    document.body.classList.toggle('reduce-motion', isReduced);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);
  const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string) =>
  {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/Vihanga_Rathnayake_CV.pdf'; // You'll need to add this file to public folder
    link.download = 'Vihanga_Rathnayake_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleReduceMotion = () => {
    setReduceMotion((prev) => {
      const next = !prev;
      localStorage.setItem('reduceMotion', `${next}`);
      document.body.classList.toggle('reduce-motion', next);
      return next;
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/5 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}
      role="navigation"
      aria-label="Main navigation">

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">

            VR
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">

                {link.label}
              </a>
            )}
            <RippleButton
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25">
              <DownloadIcon className="w-4 h-4" />
              Download CV
            </RippleButton>

            <div className="flex flex-col gap-2">
              <button
                onClick={toggleReduceMotion}
                aria-pressed={reduceMotion}
                className="px-4 py-2 rounded-lg bg-white/10 text-sm text-gray-100 border border-white/20 hover:bg-white/20 transition-all duration-200">
                {reduceMotion ? 'Reduced Motion: On' : 'Reduced Motion: Off'}
              </button>
              <button
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
                className="px-4 py-2 rounded-lg bg-white/10 text-sm text-gray-100 border border-white/20 hover:bg-white/20 transition-all duration-200">
                {highContrast ? 'High Contrast: On' : 'High Contrast: Off'}
              </button>
            </div>

            {/* Live Time */}
            <div className="text-sm text-gray-400 font-medium">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}>

            {isMobileMenuOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen &&
        <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2">

                  {link.label}
                </a>
            )}
              <RippleButton
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:brightness-110 mt-2">
                <DownloadIcon className="w-4 h-4" />
                Download CV
              </RippleButton>
              <button
                onClick={toggleReduceMotion}
                aria-pressed={reduceMotion}
                className="w-full mt-3 px-4 py-2 rounded-lg bg-white/10 text-sm text-gray-100 border border-white/20 hover:bg-white/20 transition-all duration-200">
                {reduceMotion ? 'Reduced Motion: On' : 'Reduced Motion: Off'}
              </button>
            </div>
          </div>
        }
      </div>
    </nav>);

}