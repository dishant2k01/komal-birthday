'use client';

import { useLayoutEffect, useRef } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap } from '@/lib/gsap-utils';
import { FilledHeart, OutlineHeart } from '@/components/cinematic-intro/Decorations';
import HeroBackground from './HeroBackground';
import HeroDecorations from './HeroDecorations';
import HeroNavigation from './HeroNavigation';
import HeroPhoto from './HeroPhoto';

export default function BirthdayHero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = rootRef.current;
    const q = (sel: string) => root.querySelector(sel);
    const qa = (sel: string) => Array.from(root.querySelectorAll(sel));

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const nav = q('[data-hero="nav"]');
      const label = q('[data-hero="label"]');
      const labelHeart = q('[data-hero="label-heart"]');
      const title = q('[data-hero="title"]');
      const copyLines = qa('[data-hero-line]');
      const rule = q('[data-hero="rule"]');
      const photo = q('[data-hero="photo"]');
      const frameBack = q('[data-hero="photo-frame-back"]');
      const glow = q('[data-hero="photo-glow"]');
      const note = q('[data-hero="note"]');
      const flora = qa(
        '[data-hero="photo-flora"], [data-hero="flora-left"], [data-hero="flora-right"], [data-hero="petal"], [data-hero="photo-petal"]'
      );
      const bgKomal = q('[data-hero="bg-komal"]');
      const dim = q('[data-hero="scroll-dim"]');

      if (bgKomal) heroTimeline.from(bgKomal, { opacity: 0, duration: 1.2 }, 0);
      if (nav) heroTimeline.from(nav, { opacity: 0, y: -12, duration: 0.7 }, 0.3);
      if (label) heroTimeline.from(label, { opacity: 0, y: 16, duration: 0.6 }, 0.5);
      if (labelHeart) {
        heroTimeline.from(labelHeart, { opacity: 0, scale: 0.7, duration: 0.45 }, 0.8);
      }
      if (title) heroTimeline.from(title, { opacity: 0, y: 28, duration: 0.9 }, 1.0);
      if (copyLines.length) {
        heroTimeline.from(
          copyLines,
          { opacity: 0, y: 14, duration: 0.55, stagger: 0.1 },
          1.3
        );
      }
      if (rule) heroTimeline.from(rule, { scaleX: 0, duration: 0.5 }, 1.55);
      if (frameBack) {
        heroTimeline.from(frameBack, { opacity: 0, y: 20, duration: 0.7 }, 1.6);
      }
      if (glow) heroTimeline.from(glow, { opacity: 0, duration: 0.8 }, 1.65);
      if (photo) {
        heroTimeline.from(
          photo,
          { opacity: 0, scale: 1.08, filter: 'blur(8px)', duration: 1.15 },
          1.9
        );
      }
      if (flora.length) {
        heroTimeline.from(
          flora,
          { opacity: 0, y: 12, duration: 0.7, stagger: 0.04 },
          2.1
        );
      }
      if (note) {
        heroTimeline.from(
          note,
          { opacity: 0, y: 18, rotate: -12, duration: 0.7 },
          2.4
        );
      }

      const textCol = q('[data-hero="text"]');
      const photoRoot = q('[data-hero="photo-root"]');

      if (photoRoot) {
        gsap.to(photoRoot, {
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (textCol) {
        gsap.to(textCol, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (dim) {
        gsap.to(dim, {
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative overflow-hidden lg:min-h-[100svh]"
    >
      <HeroBackground />
      <HeroDecorations />

      <div
        data-hero="scroll-dim"
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ background: '#0A0406', opacity: 0 }}
        aria-hidden="true"
      />

      {/* Fixed container — mobile first */}
      <div className="relative z-10 page-shell flex flex-col lg:min-h-[100svh]">
        <HeroNavigation />

        <div
          className="
            flex-1 min-h-0
            grid
            grid-cols-1
            justify-items-center
            content-start
            gap-8
            pt-[max(4rem,calc(env(safe-area-inset-top)+2.5rem))] pb-8
            px-1
            sm:gap-9 sm:pt-12 sm:pb-10
            md:gap-10
            lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)]
            lg:items-center
            lg:content-center
            lg:justify-items-stretch
            lg:gap-x-10 xl:gap-x-14
            lg:gap-y-0
            lg:pt-2 lg:pb-5 lg:px-0
          "
        >
          {/* Text */}
          <div
            data-hero="text"
            className="
              w-full max-w-[min(100%,420px)]
              sm:max-w-[440px]
              flex flex-col items-center text-center
              lg:max-w-[460px] lg:justify-self-start
              lg:items-start lg:text-left
            "
          >
            <div
              data-hero="label"
              className="inline-flex flex-col items-center mb-5 sm:mb-4 self-center lg:self-start lg:mb-3"
            >
              <span data-hero="label-heart" className="mb-2.5" aria-hidden="true">
                <FilledHeart size={10} color="rgba(216,180,119,0.85)" />
              </span>
              <p
                className="font-sans uppercase"
                style={{
                  fontSize: 'clamp(11px, 2.8vw, 13px)',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,246,233,0.78)',
                }}
              >
                {birthdayData.hero.label}
              </p>
            </div>

            <h1
              data-hero="title"
              className="font-serif flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-5"
              style={{
                fontSize: 'clamp(3.75rem, 12vw, 8.5rem)',
                fontWeight: 400,
                color: '#F5E9D9',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
              }}
            >
              {birthdayData.hero.title}
              <OutlineHeart
                size={32}
                className="mt-1 sm:mt-2 opacity-80 shrink-0"
              />
            </h1>

            <div
              className="font-sans mb-7 sm:mb-6 w-full space-y-1.5"
              style={{
                fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)',
                color: 'rgba(255,246,233,0.68)',
                lineHeight: 1.75,
                maxWidth: 420,
              }}
            >
              {birthdayData.hero.lines.map((line) => (
                <p key={line} data-hero-line>
                  {line}
                </p>
              ))}
            </div>

            <div
              data-hero="rule"
              className="origin-center lg:origin-left mx-auto lg:mx-0 mb-2 lg:mb-0"
              style={{
                width: 56,
                height: 1,
                background: 'rgba(216,180,119,0.7)',
              }}
            />
          </div>

          {/* Photo */}
          <div className="w-full flex justify-center lg:justify-end lg:justify-self-end mt-2 lg:mt-0 px-3 sm:px-4 lg:px-0">
            <HeroPhoto />
          </div>
        </div>
      </div>
    </section>
  );
}
