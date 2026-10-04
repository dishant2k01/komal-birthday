'use client';

import { useLayoutEffect, useRef } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap, fadeUp, sectionTrigger } from '@/lib/gsap-utils';
import { FilledHeart } from '@/components/cinematic-intro/Decorations';

export default function WishSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const anim = fadeUp('[data-wish]', { paused: true, stagger: 0.12 });
      sectionTrigger(rootRef.current!, anim);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="wish"
      className="relative overflow-hidden section-padding"
      style={{
        background:
          'radial-gradient(circle at 80% 50%, rgba(75,27,39,0.35), transparent 50%), #100709',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none select-none font-serif"
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(180px, 40vw, 420px)',
          color: 'rgba(216,180,119,0.035)',
          lineHeight: 1,
        }}
      >
        08
      </div>

      <div className="page-shell relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p
            data-wish
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(216,180,119,0.55)' }}
          >
            {birthdayData.wish.chapter} — Wish
          </p>
          <h2
            data-wish
            className="font-serif leading-[0.95] mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              color: '#FFF6E9',
              fontWeight: 400,
            }}
          >
            {birthdayData.wish.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p
            data-wish
            className="font-sans whitespace-pre-line"
            style={{
              color: 'rgba(255,246,233,0.6)',
              lineHeight: 1.8,
              fontSize: '1.05rem',
            }}
          >
            {birthdayData.wish.lead}
          </p>
        </div>

        <div data-wish className="relative">
          <blockquote
            className="font-serif italic"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.35rem)',
              color: '#EBCF98',
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            “{birthdayData.wish.quote}”
          </blockquote>

          <div className="mt-8 flex flex-col items-end gap-4">
            <FilledHeart size={14} />

            <div
              className="relative w-fit px-5 py-6"
              style={{
                background: 'rgba(255,246,233,0.04)',
                border: '1px solid rgba(216,180,119,0.18)',
                transform: 'rotate(1.5deg)',
              }}
            >
              <div
                className="absolute -right-3 -top-3 w-8 h-10"
                style={{
                  background: 'linear-gradient(180deg, #8B5E34, #4A2C18)',
                  borderRadius: '2px 2px 6px 6px',
                  transform: 'rotate(18deg)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
                }}
                aria-hidden="true"
              />
              <svg width="48" height="40" viewBox="0 0 48 40" aria-hidden="true">
                <path
                  d="M24 34S6 22 6 12a9 9 0 0 1 18-4 9 9 0 0 1 18 4c0 10-18 22-18 22Z"
                  fill="none"
                  stroke="rgba(216,180,119,0.7)"
                  strokeWidth="1.4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
