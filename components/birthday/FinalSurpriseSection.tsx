'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap, fadeUp, sectionTrigger } from '@/lib/gsap-utils';
import AmbientPetals from './AmbientPetals';
import GiftDecorations from './GiftDecorations';

export default function FinalSurpriseSection() {
  const rootRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const opening = useRef(false);

  useLayoutEffect(() => {
    ensureGsap();
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const anim = fadeUp('[data-final]', { paused: true, stagger: 0.1 });
      sectionTrigger(rootRef.current!, anim);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const openSurprise = useCallback(() => {
    if (opening.current || opened) return;
    opening.current = true;
    setOpened(true);

    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        revealRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      tl.fromTo(
        '[data-reveal-glow]',
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.15
      );
      tl.fromTo(
        '[data-reveal-photo]',
        { opacity: 0, scale: 1.12, filter: 'blur(12px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power3.out',
        },
        0.45
      );
      tl.fromTo(
        '[data-reveal-line]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.9
      );
    });
  }, [opened]);

  return (
    <>
      <section
        ref={rootRef}
        id="surprise"
        className="relative overflow-hidden section-padding"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(53,19,29,0.7), #0A0507 70%)',
        }}
      >
        <AmbientPetals count={8} />
        <div className="page-shell relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p
              data-final
              className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(216,180,119,0.55)' }}
            >
              {birthdayData.finale.chapter}
            </p>
            <h2
              data-final
              className="font-serif leading-[0.95] mb-5"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                color: '#FFF6E9',
                fontWeight: 400,
              }}
            >
              {birthdayData.finale.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p
              data-final
              className="font-sans whitespace-pre-line mb-10"
              style={{ color: 'rgba(255,246,233,0.55)', lineHeight: 1.8 }}
            >
              {birthdayData.finale.subtitle}
            </p>

            <button
              data-final
              type="button"
              onClick={openSurprise}
              className="group relative inline-flex flex-col items-start bg-transparent border-none p-0 cursor-pointer"
              style={{ outline: 'none' }}
            >
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: '0.88rem',
                  letterSpacing: '0.22em',
                  color: '#FFF6E9',
                }}
              >
                {birthdayData.finale.cta} →
              </span>
              <span
                className="mt-2 h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-110"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #D8B477, #EBCF98)',
                  boxShadow: '0 0 12px rgba(216,180,119,0.45)',
                }}
              />
            </button>
          </div>

          {/* Gift box image */}
          <div
            data-final
            className="relative flex justify-center lg:justify-end"
            style={{ padding: '40px 48px' }}
          >
            <div
              className="relative"
              style={{
                width: 'min(88vw, 480px)',
                aspectRatio: '4 / 3',
              }}
            >
              <GiftDecorations />
              <button
                type="button"
                onClick={openSurprise}
                className="relative group cursor-pointer bg-transparent border-none p-0 w-full h-full"
                aria-label={birthdayData.finale.cta}
                style={{
                  zIndex: 2,
                  transition: 'transform 0.45s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Image
                  src={birthdayData.giftImage}
                  alt="Gift box — open your final surprise"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 88vw, 480px"
                  priority
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen reveal */}
      {opened && (
        <div
          ref={revealRef}
          className="fixed inset-0 z-[85] overflow-y-auto"
          style={{ background: '#050305', opacity: 0 }}
        >
          <div
            data-reveal-glow
            className="pointer-events-none absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[560px] max-h-[560px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(216,180,119,0.22) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          <div className="relative min-h-[100svh] flex flex-col items-center justify-center page-shell py-20 text-center">
            <div
              data-reveal-photo
              className="relative w-[min(70vw,280px)] h-[min(70vw,280px)] mb-10 photo-frame"
              style={{ borderRadius: '50%', borderWidth: 1 }}
            >
              <Image
                src={birthdayData.finalImage}
                alt={birthdayData.name}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>

            <h2
              data-reveal-line
              className="font-serif whitespace-pre-line mb-8"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 4.8rem)',
                color: '#FFF6E9',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {birthdayData.finale.revealTitle}
            </h2>

            <div className="max-w-xl space-y-2">
              {birthdayData.finale.revealBody.map((line, i) =>
                line === '' ? (
                  <div key={`sp-${i}`} data-reveal-line className="h-3" />
                ) : (
                  <p
                    key={`${line}-${i}`}
                    data-reveal-line
                    className="font-sans"
                    style={{
                      color: 'rgba(255,246,233,0.7)',
                      fontSize: 'clamp(1rem, 2.4vw, 1.15rem)',
                      lineHeight: 1.7,
                    }}
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setOpened(false);
                opening.current = false;
              }}
              className="mt-12 font-sans text-xs tracking-[0.25em] uppercase"
              style={{ color: 'rgba(216,180,119,0.65)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
