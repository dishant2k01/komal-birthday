'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { ensureGsap } from '@/lib/gsap-utils';

interface PhotoLightboxProps {
  photos: ReadonlyArray<{ src: string; alt: string }>;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PhotoLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
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
    gsap.fromTo(
      rootRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
    gsap.fromTo(
      '[data-lb-img]',
      { opacity: 0, scale: 1.06, filter: 'blur(8px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }
    );
  }, [index]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 50% 45%, rgba(75,27,39,0.45), #100709 70%)',
      }}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 font-sans text-xs tracking-[0.25em] uppercase"
        style={{ color: '#EBCF98' }}
      >
        Close
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
        className="relative w-[min(88vw,720px)] h-[min(70svh,780px)] photo-frame"
        style={{ borderRadius: 16 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="90vw"
          priority
        />
      </div>

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
        style={{ color: 'rgba(216,180,119,0.6)' }}
      >
        {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  );
}
