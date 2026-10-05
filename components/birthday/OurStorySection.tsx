'use client';

import { useLayoutEffect, useRef } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap } from '@/lib/gsap-utils';
import { FilledHeart, RosePetal } from '@/components/cinematic-intro/Decorations';
import StoryNote from './StoryNote';
import StoryTimeline from './StoryTimeline';

export default function OurStorySection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = rootRef.current;
    const q = (sel: string) => root.querySelector(sel);
    const qa = (sel: string) => Array.from(root.querySelectorAll(sel));

    const ctx = gsap.context(() => {
      const header = q('[data-story-header]');
      const intros = qa('[data-story-intro]');
      const rule = q('[data-story-rule]');
      const note = q('[data-story-note]');
      const bgType = q('[data-story-bg-type]');
      const line = q('[data-story-line]');
      const lineMobile = q('[data-story-line-mobile]');

      if (bgType) {
        gsap.from(bgType, {
          opacity: 0,
          duration: 1.2,
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        });
      }

      if (header) {
        gsap.from(header, {
          opacity: 0,
          y: 24,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 72%', once: true },
        });
      }

      if (intros.length) {
        gsap.from(intros, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 68%', once: true },
        });
      }

      if (rule) {
        gsap.from(rule, {
          scaleX: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 65%', once: true },
        });
      }

      const drawLine = (el: Element | null) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: q('[data-story-timeline]') || root,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      };
      drawLine(line);
      drawLine(lineMobile);

      qa('[data-story-item]').forEach((item) => {
        const photo = item.querySelector('[data-story-photo]');
        const year = item.querySelector('[data-story-year]');
        const title = item.querySelector('[data-story-title]');
        const desc = item.querySelector('[data-story-desc]');
        const node = item.querySelector('[data-story-node]');

        if (node) {
          gsap.from(node, {
            opacity: 0,
            scale: 0.4,
            duration: 0.45,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true },
          });
        }

        if (photo) {
          const currentRotate =
            getComputedStyle(photo as HTMLElement).transform === 'none'
              ? 0
              : undefined;
          gsap.fromTo(
            photo,
            {
              opacity: 0,
              scale: 1.08,
              filter: 'blur(8px)',
              clipPath: 'inset(12% 8% 12% 8%)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.15,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 78%', once: true },
            }
          );

          gsap.to(photo, {
            y: indexParity(item) ? -28 : 28,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          void currentRotate;
        }

        if (year) {
          gsap.from(year, {
            opacity: 0,
            y: 12,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 78%', once: true },
          });
        }
        if (title) {
          gsap.from(title, {
            opacity: 0,
            y: 18,
            duration: 0.7,
            delay: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 78%', once: true },
          });
        }
        if (desc) {
          gsap.from(desc, {
            opacity: 0,
            y: 14,
            duration: 0.65,
            delay: 0.16,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 78%', once: true },
          });
        }

        // Text moves opposite to photo
        const copyBits = [year, title, desc].filter(Boolean);
        if (copyBits.length) {
          gsap.to(copyBits, {
            y: indexParity(item) ? 20 : -20,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      if (note) {
        gsap.from(note, {
          opacity: 0,
          y: 24,
          rotate: -14,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: note, start: 'top 90%', once: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const { story } = birthdayData;

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative overflow-hidden"
      style={{ minHeight: '85svh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 62% 40%, rgba(120, 25, 50, 0.28), transparent 42%),
              radial-gradient(circle at 20% 70%, rgba(100, 30, 45, 0.18), transparent 38%),
              radial-gradient(circle at 80% 80%, rgba(180, 90, 65, 0.08), transparent 40%),
              linear-gradient(160deg, #12070A 0%, #1A080D 45%, #0D0508 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 50% 45%, transparent 40%, rgba(8,3,5,0.7) 100%)',
          }}
        />
        <div
          data-story-bg-type
          className="absolute select-none font-serif pointer-events-none"
          style={{
            top: '18%',
            right: '4%',
            fontSize: 'clamp(7rem, 16vw, 16rem)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: 'rgba(180, 70, 90, 0.035)',
            whiteSpace: 'nowrap',
          }}
        >
          STORY
        </div>
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.045,
            mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floral decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Left film strip */}
        <div
          className="hidden lg:flex absolute flex-col items-center justify-evenly"
          style={{
            left: 8,
            top: '20%',
            bottom: '24%',
            width: 14,
            borderRadius: 3,
            background:
              'linear-gradient(180deg, rgba(40,22,28,0.8), rgba(24,12,16,0.85))',
            boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.1)',
            opacity: 0.4,
            padding: '6px 0',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 5,
                borderRadius: 1,
                background: 'rgba(12,6,8,0.85)',
              }}
            />
          ))}
        </div>

        <div
          className="absolute"
          style={{
            left: '-3%',
            top: '12%',
            width: 160,
            height: 160,
            background:
              'radial-gradient(circle, rgba(120,35,55,0.4) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            right: '-2%',
            top: '30%',
            width: 220,
            height: 280,
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(130,40,60,0.45) 0%, transparent 70%)',
            filter: 'blur(18px)',
          }}
        />

        {[
          { left: '12%', bottom: '6%', size: 22, rot: -15 },
          { left: '22%', bottom: '3%', size: 18, rot: 20 },
          { left: '70%', bottom: '5%', size: 24, rot: -8 },
          { left: '82%', bottom: '10%', size: 16, rot: 30 },
          { left: '48%', bottom: '2%', size: 14, rot: 10, blur: 1 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: p.left,
              bottom: p.bottom,
              transform: `rotate(${p.rot}deg)`,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              opacity: 0.7,
            }}
          >
            <RosePetal size={p.size} tone={i % 2 ? '#6B2436' : '#8B3A4A'} />
          </div>
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 page-shell pt-16 pb-28 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-28">
        <div
          className="
            grid grid-cols-1
            gap-12
            lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]
            lg:gap-14 xl:gap-20
            lg:items-start
          "
        >
          {/* LEFT — header + intro + note */}
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <div data-story-header className="mb-6 sm:mb-7">
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: 'rgba(216,180,119,0.55)' }}
              >
                {story.chapter} — Our Story
              </p>

              <h2
                className="font-serif flex flex-wrap items-center gap-2"
                style={{
                  fontSize: 'clamp(2.8rem, 7vw, 4.6rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                <span style={{ color: '#FFF6E9' }}>Our</span>
                <span className="italic" style={{ color: '#D8B477' }}>
                  Story
                </span>
                <FilledHeart size={14} color="#C45A5A" />
              </h2>
            </div>

            <div className="max-w-[400px] space-y-5 mb-6">
              {story.intro.map((block, i) => (
                <p
                  key={i}
                  data-story-intro
                  className="font-sans whitespace-pre-line"
                  style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                    color: 'rgba(255,246,233,0.62)',
                    lineHeight: 1.75,
                  }}
                >
                  {block}
                </p>
              ))}
            </div>

            <div
              data-story-rule
              className="origin-left mb-10 lg:mb-16"
              style={{
                width: 52,
                height: 1,
                background: 'rgba(216,180,119,0.7)',
              }}
            />

            <div className="hidden lg:block mt-8">
              <StoryNote text={story.note} />
            </div>
          </div>

          {/* RIGHT — timeline */}
          <div className="w-full min-w-0 lg:pt-16 xl:pt-20">
            <StoryTimeline events={story.events} />
          </div>
        </div>

        {/* Mobile note */}
        <div className="lg:hidden flex justify-center mt-16 mb-10 py-6">
          <StoryNote text={story.note} />
        </div>
      </div>

      {/* Soft fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(16,7,9,0.85) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}

function indexParity(item: Element) {
  const siblings = item.parentElement
    ? Array.from(item.parentElement.children)
    : [];
  return siblings.indexOf(item) % 2 === 0;
}
