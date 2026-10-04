'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import IntroBackground from './IntroBackground';
import IntroContent from './IntroContent';

interface CinematicIntroProps {
  onReveal: () => void;
  disabled?: boolean;
}

export default function CinematicIntro({
  onReveal,
  disabled = false,
}: CinematicIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const desktopPhotoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorLblRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);
  const transitioning = useRef(false);
  const floatTweens = useRef<gsap.core.Tween[]>([]);

  const setCursorLabel = useCallback((txt: string) => {
    if (cursorLblRef.current) cursorLblRef.current.textContent = txt;
    if (cursorDotRef.current) {
      const on = Boolean(txt);
      cursorDotRef.current.style.width = on ? '46px' : '10px';
      cursorDotRef.current.style.height = on ? '46px' : '10px';
    }
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    const q = (sel: string) => rootRef.current!.querySelector(sel);
    const qa = (sel: string) =>
      Array.from(rootRef.current!.querySelectorAll(sel));
    const alive = (...els: Array<Element | null | undefined>) =>
      els.filter(Boolean) as Element[];

    const ctx = gsap.context(() => {
      const label = q('[data-intro="label"]');
      const heading = q('[data-intro="heading"]');
      const heart = q('[data-intro="heart"]');
      const message = q('[data-intro="message"]');
      const prompt = q('[data-intro="prompt"]');
      const stay = q('[data-intro="stay"]');
      const ctaWrap = q('[data-intro="cta-wrap"]');
      const bgType = q('[data-intro="bg-type"]');
      const bgTypeName = q('[data-intro="bg-type-name"]');
      const photos = alive(photoRef.current, desktopPhotoRef.current);
      const photoDecor = qa(
        '[data-intro="caption"], [data-intro="sprig"], [data-intro="sprig-2"], [data-intro="photo-petal"], [data-intro="photo-petal-2"], [data-intro="wax-seal"], [data-intro="film-strip"], [data-intro="photo-frame"]'
      );
      const textEls = alive(
        label,
        heading,
        heart,
        message,
        prompt,
        stay,
        ctaWrap,
        dateRef.current
      );
      const bgEls = alive(bgType, bgTypeName);

      if (!prefersReduced) {
        if (textEls.length) gsap.set(textEls, { opacity: 0 });
        if (heading) gsap.set(heading, { y: 34, clipPath: 'inset(0 0 100% 0)' });
        const yEls = alive(message, prompt, stay);
        if (yEls.length) gsap.set(yEls, { y: 16 });
        if (ctaWrap) gsap.set(ctaWrap, { y: 12 });
        if (photos.length) {
          gsap.set(photos, {
            opacity: 0,
            scale: 1.1,
            rotation: -4,
            filter: 'blur(12px)',
            clipPath: 'inset(10%)',
          });
        }
        if (photoDecor.length) gsap.set(photoDecor, { opacity: 0, y: 10 });
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.9 });
        if (bgEls.length) gsap.set(bgEls, { opacity: 0 });

        const introTimeline = gsap.timeline();

        if (glowRef.current) {
          introTimeline.to(
            glowRef.current,
            { opacity: 0.2, scale: 1, duration: 1.7, ease: 'power2.out' },
            0
          );
        }
        if (bgEls.length) {
          introTimeline.to(
            bgEls,
            { opacity: 1, duration: 1.5, ease: 'power2.out' },
            0.1
          );
        }
        if (label) {
          introTimeline.to(
            label,
            { opacity: 1, duration: 0.6, ease: 'power2.out' },
            0.45
          );
        }
        if (heading) {
          introTimeline.to(
            heading,
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.95,
              ease: 'power3.out',
            },
            0.85
          );
        }
        if (heart) {
          introTimeline.to(
            heart,
            { opacity: 1, duration: 0.45, ease: 'power2.out' },
            1.2
          );
        }
        if (message) {
          introTimeline.to(
            message,
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
            1.3
          );
        }
        if (photos.length) {
          introTimeline.to(
            photos,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              filter: 'blur(0px)',
              clipPath: 'inset(0%)',
              duration: 1.4,
              ease: 'power3.out',
            },
            1.75
          );
        }
        if (photoDecor.length) {
          introTimeline.to(
            photoDecor,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.05,
            },
            2.35
          );
        }
        if (prompt) {
          introTimeline.to(
            prompt,
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            2.7
          );
        }
        if (stay) {
          introTimeline.to(
            stay,
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            2.95
          );
        }
        if (ctaWrap) {
          introTimeline.to(
            ctaWrap,
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            3.15
          );
        }
        if (dateRef.current) {
          introTimeline.to(
            dateRef.current,
            { opacity: 1, duration: 0.75, ease: 'power2.out' },
            3.45
          );
        }

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 0.28,
            scale: 1.06,
            duration: 9,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
            delay: 2.2,
          });
        }

        photos.forEach((el) => {
          floatTweens.current.push(
            gsap.to(el, {
              y: -7,
              duration: 4.2,
              yoyo: true,
              repeat: -1,
              ease: 'power1.inOut',
              delay: 3.6,
            })
          );
        });
      } else {
        const all = alive(
          label,
          heading,
          heart,
          message,
          prompt,
          stay,
          ctaWrap,
          dateRef.current,
          bgType,
          bgTypeName,
          glowRef.current,
          ...photos,
          ...photoDecor
        );
        if (all.length) {
          gsap.set(all, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            filter: 'none',
            clipPath: 'none',
          });
        }
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0.2 });
      }
    }, rootRef);

    let onMove: ((e: MouseEvent) => void) | null = null;
    if (isDesktop && cursorDotRef.current) {
      document.body.style.cursor = 'none';
      const loop = () => {
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate(${mousePos.current.x - 5}px, ${mousePos.current.y - 5}px)`;
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      onMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener('mousemove', onMove);
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      ctx.revert();
      floatTweens.current = [];
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = '';
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (disabled || transitioning.current) return;
    transitioning.current = true;
    floatTweens.current.forEach((t) => t.kill());
    setCursorLabel('');
    document.body.style.cursor = '';

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const activePhoto = isDesktop
      ? desktopPhotoRef.current
      : photoRef.current;
    const inactivePhoto = isDesktop
      ? photoRef.current
      : desktopPhotoRef.current;

    const q = (sel: string) => rootRef.current?.querySelector(sel) ?? null;
    const qa = (sel: string) =>
      Array.from(rootRef.current?.querySelectorAll(sel) ?? []);
    const alive = (...els: Array<Element | null | undefined>) =>
      els.filter(Boolean) as Element[];

    const tl = gsap.timeline({ onComplete: onReveal });
    const cta = q('[data-intro="cta-wrap"]');
    if (cta) {
      tl.to(cta, {
        opacity: 0,
        y: -12,
        duration: 0.28,
        ease: 'power2.in',
      });
    }

    const fadeGroup = alive(
      q('[data-intro="label"]'),
      q('[data-intro="heading-wrap"]'),
      q('[data-intro="message"]'),
      q('[data-intro="prompt"]'),
      q('[data-intro="stay"]'),
      q('[data-intro="bg-type"]'),
      q('[data-intro="bg-type-name"]'),
      dateRef.current,
      ...qa('[data-intro="petal"]'),
      ...qa('[data-intro="caption"]'),
      ...qa('[data-intro="sprig"]'),
      ...qa('[data-intro="wax-seal"]')
    );
    if (fadeGroup.length) {
      tl.to(
        fadeGroup,
        { opacity: 0, duration: 0.4, ease: 'power2.inOut' },
        0.05
      );
    }

    if (inactivePhoto) {
      tl.to(inactivePhoto, { opacity: 0, duration: 0.25 }, 0.05);
    }

    if (activePhoto) {
      tl.to(
        activePhoto,
        { scale: 1.2, duration: 0.65, ease: 'power2.out' },
        0.12
      );
      tl.to(
        activePhoto,
        {
          scale: 1.7,
          opacity: 0.35,
          filter: 'blur(6px)',
          duration: 0.9,
          ease: 'power2.in',
        },
        0.7
      );
    }

    if (bloomRef.current) {
      tl.to(
        bloomRef.current,
        { opacity: 1, scale: 1, duration: 1.05, ease: 'power3.out' },
        0.28
      );
    }
    if (glowRef.current) {
      tl.to(
        glowRef.current,
        { scale: 11, opacity: 0.45, duration: 1.25, ease: 'power3.in' },
        0.2
      );
    }
    if (maskRef.current) {
      tl.to(
        maskRef.current,
        {
          opacity: 1,
          clipPath: 'circle(150% at 50% 45%)',
          duration: 1.1,
          ease: 'power3.inOut',
        },
        0.65
      );
    }
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.65, ease: 'power2.inOut' },
        1.1
      );
    }
    if (sceneRef.current) {
      tl.to(
        sceneRef.current,
        { opacity: 0, duration: 0.3, ease: 'power2.in' },
        1.35
      );
    }
  }, [disabled, onReveal, setCursorLabel]);

  return (
    <div
      ref={rootRef}
      className="relative w-full min-h-[100svh] overflow-x-hidden overflow-y-auto select-none"
      style={{
        background: `
          radial-gradient(circle at 50% 35%, rgba(105, 35, 55, 0.35), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(180, 90, 65, 0.12), transparent 40%),
          linear-gradient(135deg, #12080C 0%, #1C0B12 45%, #0D0709 100%)
        `,
      }}
    >
      <div ref={sceneRef} className="relative min-h-[100svh]">
        <IntroBackground ref={glowRef} />

        <IntroContent
          ref={contentRef}
          photoRef={photoRef}
          desktopPhotoRef={desktopPhotoRef}
          onOpen={handleOpen}
          disabled={disabled}
          onCtaHover={(on) => setCursorLabel(on ? 'OPEN' : '')}
          onPhotoHover={(on) => setCursorLabel(on ? 'VIEW' : '')}
        />
      </div>

      <div
        ref={bloomRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: 0,
          zIndex: 80,
          background:
            'radial-gradient(circle at 50% 45%, rgba(232,201,154,0.36) 0%, rgba(160,55,75,0.22) 32%, transparent 70%)',
          transform: 'scale(0.4)',
        }}
        aria-hidden="true"
      />

      <div
        ref={maskRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: 0,
          zIndex: 85,
          background:
            'radial-gradient(circle, rgba(28,11,18,0.3) 0%, #12080C 55%, #0D0709 100%)',
          clipPath: 'circle(0% at 50% 45%)',
        }}
        aria-hidden="true"
      />

      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ background: '#12080C', opacity: 0, zIndex: 90 }}
        aria-hidden="true"
      />

      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 hidden lg:flex items-center justify-center rounded-full pointer-events-none"
        style={{
          width: 10,
          height: 10,
          background: 'rgba(232,201,154,0.9)',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease',
          transform: 'translate(-200px, -200px)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      >
        <span
          ref={cursorLblRef}
          className="font-sans"
          style={{
            color: '#12080C',
            fontWeight: 700,
            fontSize: 8,
            letterSpacing: '0.14em',
          }}
        />
      </div>
    </div>
  );
}
