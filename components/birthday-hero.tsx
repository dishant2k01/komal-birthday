'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface BirthdayHeroProps {
  /** When true, the heading + text animate in as a reveal (birthday reveal stage).
   *  When the user scrolls down, it blends into the rest of the experience. */
  asReveal?: boolean;
}

export default function BirthdayHero({ asReveal = false }: BirthdayHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #080A09 0%, #0E1410 50%, #151A17 100%)',
      }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '80vw',
          height: '40vh',
          maxWidth: 800,
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(214,181,106,0.07) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-6 pt-16 pb-32"
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: asReveal ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imgY }}
          className="mb-10 md:mb-12"
        >
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              width: 'clamp(180px, 42vw, 260px)',
              height: 'clamp(180px, 42vw, 260px)',
              borderRadius: '50%',
              border: '1px solid rgba(214,181,106,0.25)',
              boxShadow:
                '0 0 0 6px rgba(214,181,106,0.04), 0 0 60px rgba(214,181,106,0.1), 0 0 120px rgba(214,181,106,0.04)',
            }}
          >
            {/* Fallback bg shown behind the image */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #151A17, #1a2218)' }}
            >
              <span style={{ fontSize: '3rem' }}>🌹</span>
            </div>
            <Image
              src="/images/komal-hero.jpg"
              alt="Komal"
              fill
              className="object-cover object-top relative"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div style={{ y: contentY }}>
          {/* Birthday Reveal label — only shown in reveal mode */}
          {asReveal && (
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-xs uppercase tracking-[0.35em] mb-6"
              style={{ color: 'rgba(214,181,106,0.65)' }}
            >
              08 · October · 2001
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.1,
              delay: asReveal ? 0.5 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-serif text-gold-gradient leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 5.5rem)', fontWeight: 500 }}
          >
            Happy Birthday,
            <br />
            <em>Komal</em> ❤️
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: asReveal ? 0.9 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="divider-gold mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: asReveal ? 1.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans leading-relaxed max-w-md mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'rgba(168,170,164,0.85)' }}
          >
            Today is your day...
            <br />
            but I wanted to make it a little more special.
          </motion.p>

          {/* Scroll nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: asReveal ? 2.2 : 1.2 }}
            className="mt-14 flex flex-col items-center gap-2"
          >
            <motion.p
              className="font-sans text-xs tracking-[0.2em]"
              style={{ color: 'rgba(168,170,164,0.5)' }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              There&apos;s more waiting for you
            </motion.p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(214,181,106,0.5)', fontSize: '1.1rem', lineHeight: 1 }}
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
