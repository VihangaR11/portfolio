import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, MailIcon } from 'lucide-react';
const roles = [
'Integration Architect',
'UI/UX Designer',
'Creative Technologist',
'Business Analyst'];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
      aria-label="Hero section">

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>

            <motion.p
              className="text-cyan-400 font-medium mb-4 text-sm md:text-base tracking-wide"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}>

              Hello, I'm
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.3
              }}>

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
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: 0.6,
                delay: 0.4
              }}>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentRoleIndex}
                  className="text-xl md:text-2xl text-gray-400 font-light"
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -20
                  }}
                  transition={{
                    duration: 0.5
                  }}>

                  {roles[currentRoleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}>

              Crafting digital experiences that blend beautiful design with
              powerful functionality. Passionate about building products that
              make a difference.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}>

              <button
                onClick={handleScrollToProjects}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2">

                View Projects
                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={handleScrollToContact}
                className="px-8 py-4 border border-white/20 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2">

                <MailIcon className="w-4 h-4" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: 'easeOut'
            }}>

            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full blur-md opacity-60" />
              <div className="relative p-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    VR
                  </span>
                </div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
              <div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-violet-500 rounded-full blur-sm opacity-60 animate-pulse"
                style={{
                  animationDelay: '1s'
                }} />

            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}