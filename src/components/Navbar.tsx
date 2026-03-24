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
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reduceMotion, setReduceMotion] = useState(false); // ✅ FIXED: added missing state

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
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Vihanga_Rathnayake_CV.pdf';
    link.download = 'Vihanga_Rathnayake_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleReduceMotion = () => { // ✅ FIXED: added missing function
    setReduceMotion((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/5 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
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

            {/* Live Time */}
            <div className="text-xs lg:text-sm text-gray-400 font-medium hidden xl:block">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-5 sm:w-6 h-5 sm:h-6" />
            ) : (
              <MenuIcon className="w-5 sm:w-6 h-5 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-white/10 max-h-[calc(100vh-70px)] overflow-y-auto">
            <div className="flex flex-col gap-2 sm:gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2 px-2 rounded hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <RippleButton
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:brightness-110 mt-2"
              >
                <DownloadIcon className="w-4 h-4" />
                Resume
              </RippleButton>
              <button
                onClick={toggleReduceMotion}
                aria-pressed={reduceMotion}
                className="w-full mt-3 px-4 py-2 rounded-lg bg-white/10 text-sm text-gray-100 border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                {reduceMotion ? 'Reduced Motion: On' : 'Reduced Motion: Off'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}