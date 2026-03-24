import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SendIcon,
  MailIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
  TwitterIcon } from
'lucide-react';
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'>(
    'idle');
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-24 lg:py-32 relative"
      aria-labelledby="contact-heading">

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 0.6
          }}>

          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4">

            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
            transition={{
              duration: 0.6
            }}
            className="space-y-8">

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out
                through the form or connect with me on social media.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <MailIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <span>vihangasan221@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <MapPinIcon className="w-5 h-5 text-violet-400" />
                </div>
                <span>Buttala, Sri Lanka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/vihanga-rathnayake-a6a652321/"
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
                aria-label="LinkedIn profile">

                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/VihangaR11/"
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                aria-label="GitHub profile">

                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="#https://www.facebook.com/sandeepa.rathnayaka.142"
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-violet-400 hover:bg-white/10 hover:border-violet-400/30 transition-all duration-300"
                aria-label="Facebook profile">

                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/94713537688"
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-violet-400 hover:bg-white/10 hover:border-violet-400/30 transition-all duration-300"
                aria-label="WhatsApp profile">

                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/vix.hr11"
                className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-violet-400 hover:bg-white/10 hover:border-violet-400/30 transition-all duration-300"
                aria-label="Instagram profile">

                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
            transition={{
              duration: 0.6
            }}>

            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2">

                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none"
                    placeholder="Your name" />

                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2">

                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none"
                    placeholder="your@email.com" />

                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2">

                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none resize-none"
                    placeholder="Tell me about your project..." />

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                  {isSubmitting ?
                  <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </> :
                  submitStatus === 'success' ?
                  <>Message Sent!</> :

                  <>
                      Send Message
                      <SendIcon className="w-4 h-4" />
                    </>
                  }
                </button>

                {submitStatus === 'success' &&
                <p className="text-center text-cyan-400 text-sm">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                }
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-white/10 text-center"
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}>

          <p className="text-gray-500 text-sm">
            © 2026 Vihanga Rathnayake. Crafted with passion and code.
          </p>
        </motion.footer>
      </div>
    </section>);

}