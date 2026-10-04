'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { OutlineHeart } from '@/components/cinematic-intro/Decorations';
import { birthdayData } from '@/lib/birthday-data';
import { ensureGsap } from '@/lib/gsap-utils';
import GalleryDecorations from './GalleryDecorations';
import GalleryLightbox from './GalleryLightbox';
import GalleryNote from './GalleryNote';
import GalleryPhoto from './GalleryPhoto';
import type { GalleryPhotoItem } from './GalleryPhoto';

export default function MemoryGallerySection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const photos = birthdayData.gallery.photos as unknown as GalleryPhotoItem[];

  /** Main collage uses 5 photos; lightbox keeps all */
  const collageRoles = ['main', 'top', 'bottom', 'sideTop', 'sideBottom'] as const;
  const collage = collageRoles
    .map((role) => {
      const index = photos.findIndex((p) => p.role === role);
      return index >= 0 ? { photo: photos[index], index } : null;
    })
    .filter(Boolean) as { photo: GalleryPhotoItem; index: number }[];

  const byRole = (role: GalleryPhotoItem['role']) =>
    collage.find((c) => c.photo.role === role) ??
    (() => {
      const index = photos.findIndex((p) => p.role === role);
      return index >= 0 ? { photo: photos[index], index } : undefined;
    })();

  const onPrev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const onNext = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = rootRef.current;
    const q = (sel: string) => root.querySelector(sel);
    const qa = (sel: string) => Array.from(root.querySelectorAll(sel));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root, start: 'top 72%', once: true },
      });

      const chapter = q('[data-gal-chapter]');
      const label = q('[data-gal-label]');
      const title = q('[data-gal-title]');
      const intro = q('[data-gal-intro]');
      const viewAll = q('[data-gal-viewall]');
      const main = q('[data-gal-role="main"]');
      const smaller = qa(
        '[data-gal-role="top"], [data-gal-role="bottom"], [data-gal-role="sideTop"], [data-gal-role="sideBottom"]'
      );
      const note = q('[data-gal-note]');

      if (chapter) tl.from(chapter, { opacity: 0, y: 10, duration: 0.5 }, 0);
      if (label) tl.from(label, { opacity: 0, duration: 0.4 }, 0.15);
      if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.7 }, 0.25);
      if (intro) tl.from(intro, { opacity: 0, y: 14, duration: 0.55 }, 0.45);
      if (viewAll) tl.from(viewAll, { opacity: 0, duration: 0.4 }, 0.4);

      if (main) {
        tl.fromTo(
          main,
          { opacity: 0, scale: 1.06, filter: 'blur(6px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9 },
          0.55
        );
      }

      smaller.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, scale: 1.05, filter: 'blur(5px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7 },
          0.75 + i * 0.12
        );
      });

      if (note) {
        tl.from(note, { opacity: 0, y: 14, rotate: -18, duration: 0.55 }, 1.2);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const main = byRole('main');
  const top = byRole('top');
  const bottom = byRole('bottom');
  const sideTop = byRole('sideTop');
  const sideBottom = byRole('sideBottom');

  return (
    <section
      ref={rootRef}
      id="gallery"
      className="relative overflow-x-clip overflow-y-visible"
      style={{ minHeight: '80svh' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 58% 48%, rgba(120, 35, 55, 0.22), transparent 52%),
              linear-gradient(155deg, #12070A 0%, #1A080D 45%, #250B13 75%, #0D0508 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 50% 45%, transparent 42%, rgba(8,3,5,0.7) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <GalleryDecorations />

      <div className="relative z-10 page-shell pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-16">
        {/* Top row: spacer + View All */}
        <div className="flex justify-end mb-4 lg:mb-2">
          <button
            type="button"
            data-gal-viewall
            onClick={() => setActive(0)}
            className="hidden sm:inline-flex items-center gap-1.5 font-sans group"
            style={{
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: 'rgba(255,246,233,0.7)',
            }}
          >
            {birthdayData.gallery.viewAll}
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: '#D8B477' }}
            >
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.35fr] gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* LEFT — typography */}
          <div className="max-w-[380px] text-left">
            <div className="flex items-center justify-start gap-3 mb-5">
              <div
                data-gal-chapter
                className="inline-flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  border: '1px solid rgba(216,180,119,0.5)',
                }}
              >
                <span
                  className="font-serif"
                  style={{ fontSize: '0.8rem', color: 'rgba(255,246,233,0.85)' }}
                >
                  {birthdayData.gallery.chapter}
                </span>
              </div>
              <span
                className="h-px w-10"
                style={{ background: 'rgba(216,180,119,0.45)' }}
                aria-hidden="true"
              />
            </div>

            <p
              data-gal-label
              className="font-sans uppercase mb-4"
              style={{
                fontSize: '11px',
                letterSpacing: '0.28em',
                color: 'rgba(216,180,119,0.55)',
              }}
            >
              {birthdayData.gallery.label}
            </p>

            <h2
              data-gal-title
              className="mb-5"
              style={{ lineHeight: 0.95, fontWeight: 400 }}
            >
              <span
                className="font-serif block"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.6rem)',
                  color: '#FFF6E9',
                }}
              >
                Memory
              </span>
              <span className="inline-flex items-center gap-2 mt-1">
                <span
                  className="font-script"
                  style={{
                    fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                    color: '#D8B477',
                  }}
                >
                  Gallery
                </span>
                <OutlineHeart size={22} className="opacity-80" />
              </span>
            </h2>

            <div
              className="mb-5 origin-left"
              style={{
                width: 48,
                height: 1,
                background: 'rgba(216,180,119,0.45)',
              }}
            />

            <p
              data-gal-intro
              className="font-sans whitespace-pre-line"
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                color: 'rgba(255,246,233,0.6)',
                lineHeight: 1.7,
                maxWidth: 300,
              }}
            >
              {birthdayData.gallery.subtitle}
            </p>
          </div>

          {/* RIGHT — scrapbook collage + note below */}
          <div className="hidden lg:flex flex-col items-center gap-8 w-full max-w-[680px] xl:max-w-[740px] mx-auto">
            <div
              className="relative w-full aspect-[5/4] min-h-[520px] xl:min-h-[580px]"
              style={{ overflow: 'visible' }}
            >
              {/* Top / couple — fully visible, behind main with light overlap only */}
              {top && (
                <div className="absolute left-[2%] top-[6%] w-[34%] h-[40%] z-[2]">
                  <GalleryPhoto
                    photo={top.photo}
                    index={top.index}
                    onOpen={setActive}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Main portrait — center, slightly over top photo */}
              {main && (
                <div className="absolute left-[28%] top-[14%] w-[38%] h-[66%] z-[4]">
                  <GalleryPhoto
                    photo={main.photo}
                    index={main.index}
                    onOpen={setActive}
                    showTape
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Detail — bottom left, clear of main */}
              {bottom && (
                <div className="absolute left-[6%] bottom-[4%] w-[32%] h-[36%] z-[3]">
                  <GalleryPhoto
                    photo={bottom.photo}
                    index={bottom.index}
                    onOpen={setActive}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Right top — mirrors left top */}
              {sideTop && (
                <div className="absolute right-[2%] top-[6%] w-[32%] h-[40%] z-[2]">
                  <GalleryPhoto
                    photo={sideTop.photo}
                    index={sideTop.index}
                    onOpen={setActive}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Right bottom — mirrors left bottom */}
              {sideBottom && (
                <div className="absolute right-[4%] bottom-[4%] w-[30%] h-[36%] z-[3]">
                  <GalleryPhoto
                    photo={sideBottom.photo}
                    index={sideBottom.index}
                    onOpen={setActive}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile — dedicated flow */}
          <div className="lg:hidden flex flex-col items-center gap-6 w-full">
            {main && (
              <div className="relative w-[82vw] max-w-[330px] aspect-[3/4]">
                <GalleryPhoto
                  photo={main.photo}
                  index={main.index}
                  onOpen={setActive}
                  showTape
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 w-full px-1">
              {top && (
                <div className="relative w-[42vw] max-w-[170px] aspect-[4/3]">
                  <GalleryPhoto
                    photo={top.photo}
                    index={top.index}
                    onOpen={setActive}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
              {sideTop && (
                <div className="relative w-[36vw] max-w-[150px] aspect-[3/4]">
                  <GalleryPhoto
                    photo={sideTop.photo}
                    index={sideTop.index}
                    onOpen={setActive}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
              {bottom && (
                <div className="relative w-[42vw] max-w-[170px] aspect-[4/3]">
                  <GalleryPhoto
                    photo={bottom.photo}
                    index={bottom.index}
                    onOpen={setActive}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
              {sideBottom && (
                <div className="relative w-[36vw] max-w-[150px] aspect-[3/4]">
                  <GalleryPhoto
                    photo={sideBottom.photo}
                    index={sideBottom.index}
                    onOpen={setActive}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
            </div>

            <div className="py-6">
              <GalleryNote text={birthdayData.gallery.note} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(16,7,9,0.85))',
        }}
        aria-hidden="true"
      />

      {active !== null && (
        <GalleryLightbox
          photos={photos}
          index={active}
          onClose={() => setActive(null)}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </section>
  );
}
