'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ✏️ EDIT THESE LOVE ITEMS
const loveItems = [
  { text: 'Your smile', emoji: '😊' },
  { text: 'Your kindness', emoji: '💛' },
  { text: 'The way you care', emoji: '🤍' },
  { text: 'Your laugh', emoji: '😄' },
  { text: 'Your presence', emoji: '✨' },
  { text: 'The little things you do', emoji: '🌸' },
  { text: 'Your strength', emoji: '💪' },
  { text: 'Your heart', emoji: '❤️' },
  { text: 'How you make me feel', emoji: '🌟' },
  { text: 'Everything about you', emoji: '🌹' },
];

export default function LoveList() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="love-list" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-sans text-xs uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--gold)', opacity: 0.7 }}>
            — little reasons
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
          >
            Little Things{' '}
            <em style={{ color: 'var(--gold)' }}>I Love About You</em>
          </h2>
          <div className="divider-gold mt-6" />
        </motion.div>

        {/* Items */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {loveItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group cursor-default"
            >
              <div
                className="flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(214,181,106,0.12)',
                  boxShadow: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(214,181,106,0.35)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(214,181,106,0.08)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(214,181,106,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(214,181,106,0.12)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <span className="text-base">{item.emoji}</span>
                <span
                  className="font-sans text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-xl italic mt-16"
          style={{ color: 'var(--text-muted)' }}
        >
          &ldquo;...and so much more that words could never hold.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
