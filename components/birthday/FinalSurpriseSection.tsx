'use client';

import { useCallback, useLayoutEffect, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap, fadeUp, sectionTrigger } from '@/lib/gsap-utils';
import AmbientPetals from './AmbientPetals';
import GiftDecorations from './GiftDecorations';

const emptySubscribe = () => () => {};

export default function FinalSurpriseSection() {
  const rootRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
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

  const closeSurprise = useCallback(() => {
    if (!revealRef.current) {
      setOpened(false);
      opening.current = false;
      return;
    }
    gsap.to(revealRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setOpened(false);
        opening.current = false;
      },
    });
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
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
      tl.fromTo(
        '[data-reveal-glow]',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.1
      );
      tl.fromTo(
        '[data-reveal-photo]',
        { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
        },
        0.2
      );
      tl.fromTo(
        '[data-reveal-note]',
        { opacity: 0, x: -25, rotate: -14 },
        { opacity: 1, x: 0, rotate: -7, duration: 0.9, ease: 'power3.out' },
        0.35
      );
      tl.fromTo(
        '[data-reveal-item]',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
        },
        0.45
      );
    });
  }, [opened]);

  // Lock scroll and handle Escape key
  useEffect(() => {
    if (!opened) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSurprise();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, closeSurprise]);

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

      {/* Fullscreen surprise reveal modal rendered in portal directly on document.body */}
      {opened &&
        mounted &&
        createPortal(
          <div
            ref={revealRef}
            role="dialog"
            aria-modal="true"
            aria-label="Final Surprise"
            className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center w-screen h-screen min-h-[100svh]"
            style={{ backgroundColor: '#130408', opacity: 0 }}
          >
            {/* Background image layer covering viewport */}
            <div
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: "url('/images/surprise-bg.png')",
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Subtle center vignette to ensure crisp text legibility */}
            <div
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(20,5,10,0.52) 0%, rgba(15,4,8,0.25) 50%, rgba(10,2,5,0.7) 100%)',
              }}
            />

            {/* Top-Right Circular Close Button */}
            <button
              type="button"
              onClick={closeSurprise}
              aria-label="Close surprise"
              className="fixed top-5 right-5 sm:top-6 sm:right-7 md:top-8 md:right-8 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/35 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-black/55 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="2" y1="2" x2="12" y2="12" />
                <line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>

            {/* Desktop Left Tilted Vintage Parchment Card (positioned over left gift box on desktop) */}
            <div
              data-reveal-note
              className="hidden 2xl:block fixed left-[4%] bottom-[16%] z-20 pointer-events-none select-none"
              style={{
                transform: 'rotate(-7deg)',
                filter:
                  'drop-shadow(0 20px 30px rgba(0,0,0,0.75)) drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
              }}
            >
              <div
                className="relative p-6 sm:p-7 w-56 sm:w-60 rounded-sm text-center"
                style={{
                  background:
                    'linear-gradient(145deg, #F3E7D5 0%, #E3D1B8 45%, #D5BE9E 100%)',
                  border: '1px solid rgba(139, 90, 60, 0.28)',
                  boxShadow: 'inset 0 0 25px rgba(160, 120, 80, 0.22)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none rounded-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                <p
                  className="relative z-10 font-script text-[#381F13] leading-[1.25]"
                  style={{ fontSize: '1.45rem' }}
                >
                  You make
                </p>
                <p
                  className="relative z-10 font-script text-[#381F13] leading-[1.25]"
                  style={{ fontSize: '1.45rem' }}
                >
                  ordinary moments
                </p>
                <p
                  className="relative z-10 font-script text-[#381F13] leading-[1.25]"
                  style={{ fontSize: '1.45rem' }}
                >
                  feel so special...
                </p>
                <div className="relative z-10 flex justify-center mt-3">
                  <svg width="20" height="19" viewBox="0 0 16 15" fill="none">
                    <path
                      d="M8 13.5S1.5 9 1.5 4.8A3.8 3.8 0 0 1 8 2a3.8 3.8 0 0 1 6.5 2.8C14.5 9 8 13.5 8 13.5Z"
                      stroke="#4A2A1A"
                      strokeWidth="1.3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center Main Stage — Guaranteed True Viewport Center */}
            <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
              {/* Couple Circular Photo with Warm Halo & Floating Hearts */}
              <div
                data-reveal-photo
                className="relative mb-5 sm:mb-6 flex items-center justify-center"
              >
                {/* Radiant Amber Glow Halo */}
                <div
                  data-reveal-glow
                  className="absolute -inset-5 sm:-inset-7 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255, 125, 80, 0.48) 0%, rgba(225, 70, 70, 0.25) 45%, transparent 70%)',
                    filter: 'blur(22px)',
                  }}
                />

                {/* Gold/Rose Ring Container */}
                <div
                  className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-[3px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255, 210, 165, 0.95) 0%, rgba(235, 140, 110, 0.8) 50%, rgba(210, 70, 70, 0.9) 100%)',
                    boxShadow:
                      '0 0 25px rgba(255, 130, 90, 0.55), 0 0 50px rgba(210, 60, 60, 0.35)',
                  }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={birthdayData.finalImage}
                      alt="Dishant and Komal"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Drawn Outline Hearts at 2 o'clock */}
                <div
                  className="absolute -right-3 top-3 sm:-right-5 sm:top-5 md:-right-7 md:top-7 pointer-events-none select-none flex flex-col items-start gap-1"
                  style={{ transform: 'rotate(12deg)' }}
                >
                  {/* Upper heart */}
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 32 30"
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(235,160,150,0.6)]"
                    style={{ transform: 'rotate(10deg)' }}
                  >
                    <path
                      d="M16 27S3.5 18.5 3.5 9.8A7.2 7.2 0 0 1 16 5.2a7.2 7.2 0 0 1 12.5 4.6C28.5 18.5 16 27 16 27Z"
                      stroke="#F4B0A4"
                      strokeWidth="1.6"
                    />
                  </svg>
                  {/* Lower heart */}
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 32 30"
                    fill="none"
                    className="ml-3 drop-shadow-[0_0_6px_rgba(235,160,150,0.5)]"
                    style={{ transform: 'rotate(-15deg)' }}
                  >
                    <path
                      d="M16 27S3.5 18.5 3.5 9.8A7.2 7.2 0 0 1 16 5.2a7.2 7.2 0 0 1 12.5 4.6C28.5 18.5 16 27 16 27Z"
                      stroke="#F4B0A4"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
              </div>

              {/* Happy Birthday, */}
              <h2
                data-reveal-item
                className="font-serif font-normal text-[#FFF6E9] leading-[1.05] tracking-[0.015em]"
                style={{ fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)' }}
              >
                Happy Birthday,
              </h2>

              {/* Komal ♡ */}
              <div
                data-reveal-item
                className="flex items-center justify-center gap-2 mt-1 mb-5 sm:mb-6"
              >
                <span
                  className="font-script leading-none"
                  style={{
                    fontSize: 'clamp(2.8rem, 7vw, 4.4rem)',
                    color: '#F3C3B0',
                    textShadow: '0 0 25px rgba(243,195,176,0.3)',
                  }}
                >
                  Komal
                </span>
                <svg
                  width="28"
                  height="26"
                  viewBox="0 0 32 30"
                  fill="none"
                  className="inline-block relative -top-1"
                  style={{ transform: 'rotate(8deg)' }}
                >
                  <path
                    d="M16 27S3.5 18.5 3.5 9.8A7.2 7.2 0 0 1 16 5.2a7.2 7.2 0 0 1 12.5 4.6C28.5 18.5 16 27 16 27Z"
                    stroke="#F3C3B0"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>

              {/* Stanza 1 */}
              <div data-reveal-item className="space-y-1 max-w-lg mx-auto">
                <p
                  className="font-serif text-[#FFF6E9]/90 font-normal"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
                    lineHeight: 1.6,
                  }}
                >
                  Whatever life brings us,
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/90 font-normal"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
                    lineHeight: 1.6,
                  }}
                >
                  I hope we always keep collecting
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/90 font-normal"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
                    lineHeight: 1.6,
                  }}
                >
                  moments worth remembering.
                </p>
              </div>

              {/* Tiny Heart Separator */}
              <div
                data-reveal-item
                className="my-5 sm:my-6 flex justify-center text-[#E8A29A]"
              >
                <svg width="10" height="9" viewBox="0 0 16 15" fill="none">
                  <path
                    d="M8 13.5S1.5 9 1.5 4.8A3.8 3.8 0 0 1 8 2a3.8 3.8 0 0 1 6.5 2.8C14.5 9 8 13.5 8 13.5Z"
                    fill="#E8A29A"
                  />
                </svg>
              </div>

              {/* Stanza 2 */}
              <div data-reveal-item className="space-y-1 max-w-lg mx-auto">
                <p
                  className="font-serif text-[#FFF6E9]/85 font-normal"
                  style={{
                    fontSize: 'clamp(1.02rem, 2.2vw, 1.18rem)',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you for being you.
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/85 font-normal"
                  style={{
                    fontSize: 'clamp(1.02rem, 2.2vw, 1.18rem)',
                    lineHeight: 1.6,
                  }}
                >
                  Here&apos;s to you.
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/85 font-normal"
                  style={{
                    fontSize: 'clamp(1.02rem, 2.2vw, 1.18rem)',
                    lineHeight: 1.6,
                  }}
                >
                  Here&apos;s to us.
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/85 font-normal"
                  style={{
                    fontSize: 'clamp(1.02rem, 2.2vw, 1.18rem)',
                    lineHeight: 1.6,
                  }}
                >
                  And all the beautiful memories
                </p>
                <p
                  className="font-serif text-[#FFF6E9]/85 font-normal"
                  style={{
                    fontSize: 'clamp(1.02rem, 2.2vw, 1.18rem)',
                    lineHeight: 1.6,
                  }}
                >
                  still waiting to be made.
                </p>
              </div>

              {/* Bottom Flourish: —— ♡ love you —— */}
              <div
                data-reveal-item
                className="mt-7 sm:mt-8 flex items-center justify-center gap-3 text-[#D88A80]"
              >
                <div
                  className="h-px w-10 sm:w-16"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #D88A80)',
                  }}
                />
                <svg width="14" height="13" viewBox="0 0 16 15" fill="none">
                  <path
                    d="M8 13.5S1.5 9 1.5 4.8A3.8 3.8 0 0 1 8 2a3.8 3.8 0 0 1 6.5 2.8C14.5 9 8 13.5 8 13.5Z"
                    stroke="#D88A80"
                    strokeWidth="1.2"
                  />
                </svg>
                <span
                  className="font-script text-[#E8A29A] text-xl sm:text-2xl tracking-wide select-none"
                  style={{ marginTop: '-2px' }}
                >
                  love you
                </span>
                <div
                  className="h-px w-10 sm:w-16"
                  style={{
                    background: 'linear-gradient(90deg, #D88A80, transparent)',
                  }}
                />
              </div>

              {/* Inline Parchment Card (visible below 2xl so it never collides with center text) */}
              <div
                data-reveal-item
                className="block 2xl:hidden mt-10 w-full max-w-xs mx-auto text-center"
                style={{
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
                }}
              >
                <div
                  className="p-5 rounded-sm"
                  style={{
                    background:
                      'linear-gradient(145deg, #F3E7D5 0%, #E3D1B8 45%, #D5BE9E 100%)',
                    border: '1px solid rgba(139, 90, 60, 0.28)',
                    boxShadow: 'inset 0 0 20px rgba(160, 120, 80, 0.2)',
                  }}
                >
                  <p className="font-script text-[#381F13] text-xl leading-tight">
                    You make
                  </p>
                  <p className="font-script text-[#381F13] text-xl leading-tight">
                    ordinary moments
                  </p>
                  <p className="font-script text-[#381F13] text-xl leading-tight">
                    feel so special...
                  </p>
                  <div className="flex justify-center mt-2">
                    <svg width="18" height="17" viewBox="0 0 16 15" fill="none">
                      <path
                        d="M8 13.5S1.5 9 1.5 4.8A3.8 3.8 0 0 1 8 2a3.8 3.8 0 0 1 6.5 2.8C14.5 9 8 13.5 8 13.5Z"
                        stroke="#4A2A1A"
                        strokeWidth="1.3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
