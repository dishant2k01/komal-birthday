'use client';

import { useLayoutEffect, useRef } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap, fadeUp, sectionTrigger } from '@/lib/gsap-utils';
import AmbientPetals from './AmbientPetals';

export default function LetterSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const anim = fadeUp('[data-letter]', { paused: true, stagger: 0.1 });
      sectionTrigger(rootRef.current!, anim);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="letter"
      className="relative overflow-hidden section-padding"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, rgba(75,27,39,0.35), transparent 50%), #16090D',
      }}
    >
      <AmbientPetals count={4} />
      <div className="page-shell relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
        <div data-letter>
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(216,180,119,0.55)' }}
          >
            {birthdayData.letter.chapter}
          </p>
          <h2
            className="font-serif leading-[0.95]"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              color: '#FFF6E9',
              fontWeight: 400,
            }}
          >
            {birthdayData.letter.title.map((line) => (
              <span key={line} className="block">
                {line === 'FOR YOU' ? (
                  <em style={{ color: '#D8B477' }}>{line}</em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <div
            data-letter
            className="mt-10 inline-block px-5 py-4"
            style={{
              background: 'rgba(255,246,233,0.04)',
              border: '1px solid rgba(216,180,119,0.18)',
              transform: 'rotate(-2deg)',
            }}
          >
            <p className="font-script" style={{ fontSize: '1.5rem', color: '#EBCF98' }}>
              {birthdayData.letter.note}
            </p>
          </div>
        </div>

        <div data-letter className="relative">
          <div
            className="absolute -inset-4 pointer-events-none hidden md:block"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,246,233,0.03), transparent 60%)',
              border: '1px solid rgba(216,180,119,0.08)',
            }}
          />
          <div className="relative space-y-5 md:space-y-6 py-2">
            {birthdayData.letter.paragraphs.map((p, i) => (
              <p
                key={i}
                data-letter
                className={`whitespace-pre-line ${i === 0 ? 'font-serif text-2xl' : 'font-sans'}`}
                style={{
                  color:
                    i === birthdayData.letter.paragraphs.length - 1
                      ? '#EBCF98'
                      : 'rgba(255,246,233,0.72)',
                  fontSize:
                    i === 0
                      ? undefined
                      : 'clamp(0.98rem, 1.8vw, 1.08rem)',
                  lineHeight: 1.85,
                  fontWeight: i === 0 ? 400 : 300,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
