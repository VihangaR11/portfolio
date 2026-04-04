import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Linkedin 
} from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1600));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Have a project in mind? Want to collaborate? Or just say hello? 
            I'm always excited to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Column - Info + Map */}
          <motion.div 
            className="lg:col-span-5 space-y-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-400 text-[17px] leading-relaxed">
                Whether you're looking for a developer, want to discuss opportunities, 
                or just want to chat about technology — I'm all ears.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:vihangasan221@gmail.com" className="text-white hover:text-cyan-400 transition-colors text-lg block">
                    vihangasan221@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Based in</p>
                  <p className="text-white text-lg">Buttala, Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.5!2d81.25!3d6.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDUnMDAuMCJOIDgxwrAxNScwMC4wIkU!5e0!3m2!1sen!2slk!4v1700000000000"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map - Buttala, Sri Lanka"
              />
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-5">Connect with me</p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/VihangaR11/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all"
                >
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/vihanga-rathnayake-a6a652321/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all"
                >
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none resize-y transition-all"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl font-semibold text-lg text-white flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.985] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : submitStatus === 'success' ? (
                    "Message Sent Successfully ✓"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-center text-emerald-400 text-sm font-medium">
                    Thank you! I'll get back to you as soon as possible.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-24 pt-10 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © 2026 Vihanga Rathnayake. Built with passion and clean code.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}