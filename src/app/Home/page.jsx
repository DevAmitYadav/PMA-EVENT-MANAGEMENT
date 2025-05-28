'use client';

import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

function EventHeroSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  useEffect(() => {
    // Any additional setup can go here if needed after the component mounts
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/frontend/images/home.jpg"
          alt="Event Background"
          fill
          quality={75} // Adjust quality to balance between size and quality
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ✅ Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 md:px-12 text-white">
        <div className="text-center max-w-5xl mx-auto space-y-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-5 py-2 text-xs font-semibold tracking-wide uppercase bg-white/10 rounded-full text-white shadow-md">
              Revolutionize Your Events
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl text-white drop-shadow-xl"
          >
            Flawless Events,
            <br />
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
              Unforgettable Memories
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg text-gray-200 md:text-xl"
          >
            From corporate functions to luxurious weddings, our expert team curates unforgettable experiences tailored to perfection.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 pt-4"
          >
            <Link
              href="#services"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95 overflow-hidden flex-shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Calendar className="w-5 h-5" />
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-semibold text-white border-2 border-purple-400/50 rounded-2xl backdrop-blur-sm bg-white/5 transition-all duration-300 hover:scale-105 hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-xl active:scale-95 flex-shrink-0"
            >
              <Sparkles className="w-5 h-5" />
              Plan Your Event
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(EventHeroSection);