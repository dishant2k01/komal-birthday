'use client';

import type { Variants } from 'framer-motion';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const message = [
  "Komal,",
  "",
  "Today is your day, but somehow I feel like I&apos;m the one who received the greatest gift — having you in my life.",
  "",
  "You bring a kind of happiness that words can never completely explain.",
  "",
  "Through ordinary days, crazy moments, laughter, little arguments, and countless memories, you&apos;ve become someone incredibly special to me.",
  "",
  "I hope this year brings you everything your heart wishes for.",
  "",
  "Keep smiling.",
  "Keep shining.",
  "And always remember how deeply loved you are.",
  "",
  "Happy Birthday, my love. ❤️",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.0, 0.0, 0.2, 1] },
  }),
};

export default function MessageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="message" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.35em] mb-4"
            style={{ color: 'var(--gold)', opacity: 0.7 }}
          >
            — a little something
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
          >
            A Little Something{' '}
            <em style={{ color: 'var(--gold)' }}>For You</em>
          </h2>
          <div className="divider-gold mt-6" />
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass-card p-8 md:p-14 relative overflow-hidden"
        >
          {/* Decorative quote mark */}
          <div
            className="absolute top-6 left-8 font-serif text-8xl leading-none select-none pointer-events-none"
            style={{ color: 'rgba(214,181,106,0.07)', fontWeight: 600 }}
          >
            &ldquo;
          </div>

          <div className="relative z-10 space-y-4">
            {message.map((line, i) => {
              if (line === "") return <div key={i} className="h-2" />;

              const isFirst = line === "Komal,";
              const isLast = line.includes("Happy Birthday");

              return (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={`font-serif leading-relaxed ${
                    isFirst
                      ? 'text-2xl md:text-3xl font-medium'
                      : isLast
                        ? 'text-xl md:text-2xl font-medium mt-6'
                        : 'text-base md:text-lg font-light'
                  }`}
                  style={{
                    color: isFirst || isLast ? 'var(--gold-light)' : 'var(--text-primary)',
                    fontStyle: isLast ? 'italic' : 'normal',
                  }}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              );
            })}
          </div>

          {/* Bottom ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(214,181,106,0.08) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
