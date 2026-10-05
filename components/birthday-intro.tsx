'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './floating-particles';

interface BirthdayIntroProps {
  onReveal: () => void;
  disabled?: boolean;
}

// Sequential lines with their reveal timings (ms delay)
const lines = [
  { text: 'Hey Komal... ❤️', delay: 0.5, type: 'heading' },
  { text: 'I made something for you.', delay: 1.2, type: 'body' },
  { text: 'But before you continue...', delay: 2.2, type: 'body' },
  { text: 'Promise me you\'ll stay till the end.', delay: 3.0, type: 'body-accent' },
];

export default function BirthdayIntro({ onReveal, disabled = false }: BirthdayIntroProps) {
  const [pressing, setPressing] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;
    setPressing(true);
    // Small visual delay before triggering the cinematic transition
    setTimeout(onReveal, 200);
  }, [disabled, onReveal]);

  return (
    <div
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, #101712 0%, #0B100D 50%, #070908 100%)
        `,
      }}
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(4,5,4,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Very subtle center warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: 500,
          maxHeight: 500,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          background: 'radial-gradient(circle, rgba(214,181,106,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />

      {/* Particles — low count for perf */}
      <FloatingParticles count={22} intensity="low" color="#D6B56A" />

      {/* Content */}
      <div
        className="relative flex flex-col items-center text-center px-6 w-full max-w-lg mx-auto"
        style={{ zIndex: 2 }}
      >
        {/* Sequential text lines */}
        <div className="flex flex-col items-center gap-5 md:gap-6 mb-14 md:mb-16">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: line.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                line.type === 'heading'
                  ? 'font-serif'
                  : line.type === 'body-accent'
                    ? 'font-serif italic'
                    : 'font-sans'
              }
              style={{
                fontSize:
                  line.type === 'heading'
                    ? 'clamp(2rem, 7vw, 3.2rem)'
                    : 'clamp(1rem, 3.5vw, 1.25rem)',
                fontWeight: line.type === 'heading' ? 500 : 300,
                color:
                  line.type === 'heading'
                    ? '#F5F1E8'
                    : line.type === 'body-accent'
                      ? 'rgba(214,181,106,0.9)'
                      : 'rgba(245,241,232,0.6)',
                letterSpacing: line.type === 'heading' ? '-0.01em' : '0.01em',
                lineHeight: 1.5,
              }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* CTA Button — appears at 4s */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 4.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            id="surprise-btn"
            aria-label="Check your surprise"
            onClick={handleClick}
            disabled={disabled}
            animate={
              pressing
                ? { scale: 0.94 }
                : { scale: [1, 1.015, 1] }
            }
            transition={
              pressing
                ? { duration: 0.15 }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 5 }
            }
            whileHover={disabled ? {} : { scale: 1.04 }}
            whileTap={disabled ? {} : { scale: 0.96 }}
            className="relative font-sans overflow-hidden"
            style={{
              padding: 'clamp(0.85rem, 2.5vw, 1rem) clamp(2rem, 6vw, 3rem)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#F2D9A6',
              background: 'rgba(214,181,106,0.04)',
              border: '1px solid rgba(214,181,106,0.35)',
              borderRadius: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              minWidth: '220px',
              minHeight: '52px',
              // Animated border glow via box-shadow
              boxShadow: '0 0 0 0 rgba(214,181,106,0), 0 4px 24px rgba(214,181,106,0.06)',
              transition: 'box-shadow 0.4s ease, background 0.3s ease',
            }}
            onMouseEnter={e => {
              if (!disabled) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 0 20px rgba(214,181,106,0.18), 0 0 40px rgba(214,181,106,0.07), 0 4px 24px rgba(214,181,106,0.1)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(214,181,106,0.08)';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 0 0 rgba(214,181,106,0), 0 4px 24px rgba(214,181,106,0.06)';
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(214,181,106,0.04)';
            }}
          >
            {/* Shimmer fill on hover */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(214,181,106,0.06) 50%, transparent 60%)',
                borderRadius: 'inherit',
              }}
            />
            <span className="relative z-10">✨ Check Your Surprise</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
