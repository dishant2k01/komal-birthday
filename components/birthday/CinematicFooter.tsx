'use client';

import { birthdayData } from '@/lib/birthday-data';
import { FilledHeart } from '@/components/cinematic-intro/Decorations';

export default function CinematicFooter() {
  return (
    <footer
      className="relative overflow-hidden py-24 px-6 text-center"
      style={{
        background:
          'linear-gradient(180deg, #1E0B12 0%, #100709 50%, #050305 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none select-none font-serif italic flex items-center justify-center"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(160px, 35vw, 360px)',
          color: 'rgba(216,180,119,0.03)',
          lineHeight: 1,
        }}
      >
        KOMAL
      </div>

      <div className="relative z-10">
        <p
          className="font-serif italic mb-4"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: '#EBCF98',
          }}
        >
          {birthdayData.footer.line}
        </p>
        <div
          className="mx-auto mb-5 h-px w-16"
          style={{
            background:
              'linear-gradient(90deg, transparent, #D8B477, transparent)',
          }}
        />
        <p
          className="font-sans text-xs tracking-[0.35em] mb-6"
          style={{ color: 'rgba(185,170,162,0.45)' }}
        >
          {birthdayData.footer.date}
        </p>
        <FilledHeart size={12} />
      </div>
    </footer>
  );
}
