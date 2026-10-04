'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { ensureGsap } from '@/lib/gsap-utils';

interface GalleryLightboxProps {
  photos: ReadonlyArray<{ src: string; alt: string; caption?: string }>;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  useLayoutEffect(() => {
    const { gsap } = ensureGsap();
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        '[data-lb-img]',
        { opacity: 0, scale: 1.12, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 50% 45%, rgba(75,27,39,0.5), #0B0507 70%)',
        paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
      }}
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) {
          if (dx > 0) onPrev();
          else onNext();
        }
        touchX.current = null;
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 font-sans text-xs tracking-[0.25em] uppercase"
        style={{
          color: '#EBCF98',
          top: 'max(1.25rem, env(safe-area-inset-top))',
        }}
        aria-label="Close"
      >
        ×
      </button>

      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 md:left-8 font-serif text-3xl"
        style={{ color: 'rgba(235,207,152,0.7)' }}
        aria-label="Previous"
      >
        ‹
      </button>

      <div
        data-lb-img
        className="relative w-[min(88vw,720px)] h-[min(70svh,780px)]"
        style={{
          borderRadius: 4,
          border: '1px solid rgba(216,180,119,0.35)',
          boxShadow: '0 28px 70px rgba(0,0,0,0.55)',
          background: '#F2E4D2',
          padding: 8,
        }}
      >
        <div className="relative w-full h-full overflow-hidden" style={{ background: '#1A080D' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {photo.caption ? (
        <p
          className="font-script mt-4"
          style={{ fontSize: '1.35rem', color: '#D8B477' }}
        >
          {photo.caption}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 md:right-8 font-serif text-3xl"
        style={{ color: 'rgba(235,207,152,0.7)' }}
        aria-label="Next"
      >
        ›
      </button>

      <p
        className="absolute bottom-6 font-sans text-xs tracking-[0.28em]"
        style={{
          color: 'rgba(216,180,119,0.6)',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        {String(index + 1).padStart(2, '0')} /{' '}
        {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  );
}
