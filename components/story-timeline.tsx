'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ✏️ EDIT YOUR STORY MILESTONES HERE
const milestones = [
  {
    year: '2024',
    title: 'Where It All Started',
    description:
      'Every great story has a beginning. This is where ours started — a moment I will never forget.',
  },
  {
    year: '2024',
    title: 'The First Memory',
    description:
      'The first time I realized you were someone truly special. A memory I carry with me every day.',
  },
  {
    year: '2025',
    title: 'All The Little Moments',
    description:
      'The late-night conversations, the shared laughter, the small things that quietly became the biggest parts of my day.',
  },
  {
    year: '2026',
    title: 'Growing Together',
    description:
      'Through every season, every change, every challenge — growing alongside you has been the most beautiful thing.',
  },
  {
    year: '2026',
    title: 'Today',
    description:
      'Today, on your birthday, I realize how grateful I am for every single moment that brought us here.',
  },
];

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <section id="story" className="section-padding" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.35em] mb-4"
            style={{ color: 'var(--gold)', opacity: 0.7 }}
          >
            — memories we made
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
          >
            Our <em style={{ color: 'var(--gold)' }}>Story</em>
          </h2>
          <div className="divider-gold mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(214,181,106,0.3) 10%, rgba(214,181,106,0.3) 90%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-16">
            {milestones.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10"
                    style={{ transform: 'translate(-50%, 0)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.4, type: 'spring' }}
                      className="timeline-dot"
                    />
                  </div>

                  {/* Content - mobile: always right of line. Desktop: alternating */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isRight ? 'md:pr-16' : 'md:pl-16'
                    }`}
                  >
                    <div className="glass-card p-6 md:p-8">
                      <p
                        className="font-sans text-xs tracking-[0.2em] mb-2"
                        style={{ color: 'var(--gold)', opacity: 0.8 }}
                      >
                        {item.year}
                      </p>
                      <h3
                        className="font-serif text-xl md:text-2xl mb-3"
                        style={{ color: 'var(--text-primary)', fontWeight: 500 }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
