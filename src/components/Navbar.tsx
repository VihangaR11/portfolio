import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, DownloadIcon } from 'lucide-react';
import { RippleButton } from './RippleButton';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Timeline', href: '#timeline' },
  
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // ✅ Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }, 100);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Vihanga_Rathnayake_CV.pdf';
    link.download = 'Vihanga_Rathnayake_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleReduceMotion = () => setReduceMotion((prev) => !prev);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent flex-shrink-0"
            >
              VR
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-xs lg:text-sm font-medium whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <RippleButton
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white text-xs lg:text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <DownloadIcon className="w-3 lg:w-4 h-3 lg:h-4" />
                Download CV
              </RippleButton>
              <div className="text-xs lg:text-sm text-gray-400 font-medium hidden xl:block">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            {/* ✅ Mobile Menu Button - high z-index so it's always clickable */}
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors relative z-[60]"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-white" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Fullscreen overlay menu — outside nav so nothing clips it */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-gray-900 flex flex-col pt-20 px-6 overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-xl font-medium py-4 px-4 rounded-lg hover:bg-white/5 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}

            {/* Download CV — plain button on mobile (no RippleButton) */}
            <button
              onClick={() => { handleDownloadCV(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 px-5 py-3 mt-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white text-sm hover:brightness-110 transition-all duration-300"
            >
              <DownloadIcon className="w-4 h-4" />
              Download CV
            </button>

            <button
              onClick={toggleReduceMotion}
              aria-pressed={reduceMotion}
              className="w-full mt-3 px-4 py-3 rounded-lg bg-white/10 text-sm text-gray-100 border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              {reduceMotion ? 'Reduced Motion: On' : 'Reduced Motion: Off'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}