'use client';

import { useLayoutEffect, useRef } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap } from '@/lib/gsap-utils';
import AmbientPetals from './AmbientPetals';

export default function LittleThingsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    if (!rootRef.current || !pinRef.current || !phraseRef.current) return;

    const phrases = [...birthdayData.loveThings.pinned];
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (!prefersReduced && window.innerWidth >= 768) {
        const st = ScrollTrigger.create({
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${phrases.length * 70}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              phrases.length - 1,
              Math.floor(self.progress * phrases.length)
            );
            if (phraseRef.current) {
              phraseRef.current.textContent = phrases[idx];
            }
          },
        });

        gsap.fromTo(
          pinRef.current,
          { backgroundColor: '#16090D' },
          {
            backgroundColor: '#1E0B12',
            ease: 'none',
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top top',
              end: st.end,
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        '[data-love-item]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="love"
      className="relative overflow-hidden"
      style={{ background: '#16090D' }}
    >
      {/* Pinned phrase experience */}
      <div
        ref={pinRef}
        className="relative min-h-[100svh] flex items-center justify-center"
      >
        <AmbientPetals count={5} />
        <div className="page-shell relative z-10 text-center px-6">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: 'rgba(216,180,119,0.5)' }}
          >
            {birthdayData.loveThings.chapter} — Little Things
          </p>
          <p
            ref={phraseRef}
            className="font-serif"
            style={{
              fontSize: 'clamp(2.4rem, 8vw, 5.5rem)',
              color: '#EBCF98',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            {birthdayData.loveThings.pinned[0]}
          </p>
        </div>
      </div>

      {/* Editorial list */}
      <div className="section-padding relative">
        <div className="page-shell grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
          <div>
            <h2
              className="font-serif leading-[0.98] mb-5"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                color: '#FFF6E9',
                fontWeight: 400,
              }}
            >
              {birthdayData.loveThings.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p
              className="font-sans max-w-sm whitespace-pre-line"
              style={{ color: 'rgba(185,170,162,0.75)', lineHeight: 1.8 }}
            >
              {birthdayData.loveThings.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {birthdayData.loveThings.items.map((item) => (
              <div
                key={item.label}
                data-love-item
                className="transition-colors duration-300"
                style={{
                  border: '1px solid rgba(216,180,119,0.2)',
                  background: 'rgba(255,246,233,0.02)',
                  padding: '10px 12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(216,180,119,0.45)';
                  e.currentTarget.style.background = 'rgba(216,180,119,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(216,180,119,0.2)';
                  e.currentTarget.style.background = 'rgba(255,246,233,0.02)';
                }}
              >
                <p
                  className="font-serif flex items-center justify-between gap-4"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                    color: '#FFF6E9',
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    className="shrink-0"
                    aria-hidden="true"
                    style={{ fontSize: '1.15rem', lineHeight: 1 }}
                  >
                    {item.mark}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
