'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FloatingParticles from './floating-particles';

export default function BirthdayWish() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="wish"
      className="relative section-padding overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Ambient glows */}
      <div
        className="ambient-glow"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(156,74,90,0.07) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(214,181,106,0.05) 0%, transparent 70%)',
          top: '20%',
          right: '10%',
          pointerEvents: 'none',
        }}
      />

      <FloatingParticles count={20} intensity="low" color="#9C4A5A" />

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs uppercase tracking-[0.35em] mb-6"
          style={{ color: 'var(--gold)', opacity: 0.7 }}
        >
          — one wish
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="font-serif mb-12"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
        >
          One <em style={{ color: 'var(--gold)' }}>Wish</em> For You
        </motion.h2>

        <div className="divider-gold mb-12" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-xl md:text-2xl leading-relaxed italic mb-16"
          style={{ color: 'var(--text-muted)', fontWeight: 300 }}
        >
          &ldquo;My only wish is that this new year of your life gives you countless reasons to smile, dream bigger, and feel loved every single day.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h3
            animate={{ textShadow: ['0 0 20px rgba(214,181,106,0)', '0 0 40px rgba(214,181,106,0.3)', '0 0 20px rgba(214,181,106,0)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="font-serif text-gold-gradient"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 500 }}
          >
            Happy Birthday,<br />
            <em>Komal</em> ❤️
          </motion.h3>
        </motion.div>
      </div>
    </section>
  );
}
