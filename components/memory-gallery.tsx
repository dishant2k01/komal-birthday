'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ✏️ EDIT CAPTIONS AND IMAGE PATHS HERE
const photos = [
  { src: '/images/memory-1.jpg', caption: 'A beautiful day together 🌿' },
  { src: '/images/memory-2.jpg', caption: 'Our favorite moment ❤️' },
  { src: '/images/memory-3.jpg', caption: 'Always smiling with you ✨' },
  { src: '/images/memory-4.jpg', caption: 'One of those perfect days 🌸' },
  { src: '/images/memory-5.jpg', caption: 'Little moments, big memories 💫' },
  { src: '/images/memory-6.jpg', caption: 'You make everything beautiful 🌹' },
];

export default function MemoryGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, []);

  const next = useCallback(() => {
    setLightbox(i => (i !== null ? (i + 1) % photos.length : null));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeLightbox, prev, next]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-mid)' }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--gold)', opacity: 0.7 }}>
            — captured moments
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}
          >
            Memory <em style={{ color: 'var(--gold)' }}>Gallery</em>
          </h2>
          <div className="divider-gold mt-6" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className="relative cursor-pointer overflow-hidden rounded-xl group"
              style={{
                aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3',
                border: '1px solid rgba(214,181,106,0.08)',
              }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(8,10,9,0.85) 0%, transparent 60%)' }}
              >
                <p className="font-sans text-sm" style={{ color: 'var(--gold-light)' }}>
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={photos[lightbox].src}
                  alt={photos[lightbox].caption}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Caption */}
              <p
                className="text-center mt-4 font-serif text-lg italic"
                style={{ color: 'var(--gold-light)' }}
              >
                {photos[lightbox].caption}
              </p>

              {/* Controls */}
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute -top-12 right-0 p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>

              <button
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 rounded-full transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--gold)', background: 'rgba(8,10,9,0.8)' }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={next}
                aria-label="Next photo"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 rounded-full transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--gold)', background: 'rgba(8,10,9,0.8)' }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Counter */}
              <p className="text-center mt-3 font-sans text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
                {lightbox + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
