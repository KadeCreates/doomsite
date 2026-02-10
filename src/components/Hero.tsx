'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Floating orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl"
      >
        {/* Top accent line */}
        <motion.div
          variants={lineVariants}
          className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-12 origin-center"
        />

        {/* Small label */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase">
            Portfolio
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-light text-white mb-6"
        >
          <span className="block text-7xl md:text-9xl tracking-tight">
            DOOM
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-display text-2xl md:text-3xl text-white/60 mb-8 tracking-wide"
        >
          Creative Developer & Designer
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-sm md:text-base text-white/40 max-w-2xl mx-auto leading-relaxed"
        >
          Roblox developer powered through innovation and reason. 
               Notably recognized for the development of the 
          only reliable external Blade Ball autoparry, during the executor ban wave.
        </motion.p>

        {/* Bottom accent line */}
        <motion.div
          variants={lineVariants}
          className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-12 origin-center"
        />

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mt-16"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white/20 rounded-full font-mono text-sm text-white/80 hover:text-white transition-colors backdrop-blur-sm bg-white/5"
          >
            Word From Me
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-mono text-sm text-black bg-white hover:bg-white/90 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1,
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-white/30 tracking-widest">SCROLL</span>
            <svg
              className="w-4 h-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
