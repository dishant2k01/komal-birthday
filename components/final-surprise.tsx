'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const finalMessage = `Whatever life brings us, I hope we always keep collecting moments worth remembering.

Thank you for being you.

Happy Birthday, Komal.

Here's to you.
Here's to us.
And here's to all the beautiful memories still waiting to be made. ❤️`;

export default function FinalSurprise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="final-surprise"
      className="relative section-padding overflow-hidden"
      style={{ background: 'var(--bg-mid)' }}
    >
      {/* Ambient */}
      <div
        className="ambient-glow"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(214,181,106,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs uppercase tracking-[0.35em] mb-6"
          style={{ color: 'var(--gold)', opacity: 0.7 }}
        >
          — one more thing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif mb-12"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
        >
          And There&apos;s One{' '}
          <em style={{ color: 'var(--gold)' }}>More Thing...</em>
        </motion.h2>

        <div className="divider-gold mb-12" />

        {/* Reveal button */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => setRevealed(true)}
                className="btn-surprise font-sans"
                id="final-surprise-btn"
              >
                Open Your Final Surprise ✨
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Final photo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-64 h-72 md:w-80 md:h-96 mx-auto mb-12 rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(214,181,106,0.2)', boxShadow: '0 0 60px rgba(214,181,106,0.1)' }}
              >
                <Image
                  src="/images/final.jpg"
                  alt="Final memory"
                  fill
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,10,9,0.4) 0%, transparent 60%)' }}
                />
              </motion.div>

              {/* Final message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="final-message-card text-left mx-auto max-w-2xl"
              >
                <div
                  className="absolute top-4 left-6 font-serif text-7xl leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(214,181,106,0.06)', fontWeight: 600 }}
                >
                  &ldquo;
                </div>

                <div className="space-y-4 relative z-10">
                  {finalMessage.split('\n').map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 + i * 0.1 }}
                      className={`font-serif leading-relaxed ${
                        line.includes('❤️')
                          ? 'text-xl md:text-2xl italic'
                          : line === ''
                            ? 'h-2'
                            : 'text-base md:text-lg'
                      }`}
                      style={{
                        color: line.includes('❤️') ? 'var(--gold-light)' : 'var(--text-primary)',
                        fontWeight: line.includes('❤️') ? 500 : 300,
                      }}
                    >
                      {line || '\u00A0'}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
