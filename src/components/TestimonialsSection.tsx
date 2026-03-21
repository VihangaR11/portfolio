import React from 'react';
import { motion } from 'framer-motion';
import { QuoteIcon, StarIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    image: 'SJ',
    text: 'Working with Vihanga was an absolute pleasure. His technical expertise and attention to detail resulted in a product that exceeded our expectations.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupHub',
    image: 'MC',
    text: 'Exceptional developer with great communication skills. Delivered our project on time and handled complex challenges with ease.',
    rating: 5
  },
  {
    name: 'Emma Williams',
    role: 'Design Lead',
    company: 'Creative Studio',
    image: 'EW',
    text: 'Vihanga brings both technical skill and creative thinking to every project. A true professional who goes above and beyond.',
    rating: 5
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Client{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 hover:border-white/20 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-cyan-400/20">
                <QuoteIcon className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-400 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.image}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
