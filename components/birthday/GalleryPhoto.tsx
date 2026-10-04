'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';

export type GalleryPhotoItem = {
  src: string;
  alt: string;
  caption: string;
  rotation: number;
  role: 'main' | 'top' | 'bottom' | 'sideTop' | 'sideBottom' | 'extra';
};

interface GalleryPhotoProps {
  photo: GalleryPhotoItem;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  style?: CSSProperties;
  showTape?: boolean;
}

export default function GalleryPhoto({
  photo,
  index,
  onOpen,
  className = '',
  style,
  showTape = false,
}: GalleryPhotoProps) {
  const rotation = photo.rotation;

  return (
    <button
      type="button"
      data-gal-photo
      data-gal-role={photo.role}
      onClick={() => onOpen(index)}
      className={`group relative block text-left ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.5s ease, filter 0.5s ease, box-shadow 0.5s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth < 1024) return;
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)';
        e.currentTarget.style.filter = 'brightness(1.04)';
        e.currentTarget.style.zIndex = '20';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
        e.currentTarget.style.filter = 'brightness(1)';
        e.currentTarget.style.zIndex = '';
      }}
      aria-label={`Open ${photo.alt}`}
    >
      {showTape && (
        <span
          className="absolute left-1/2 z-10 pointer-events-none"
          style={{
            top: -8,
            width: 48,
            height: 18,
            marginLeft: -24,
            background: 'rgba(232, 140, 160, 0.45)',
            borderRadius: 1,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            transform: 'rotate(-2deg)',
          }}
          aria-hidden="true"
        />
      )}

      <span
        className="relative block w-full h-full overflow-hidden"
        style={{
          borderRadius: 2,
          background: '#F2E6D2',
          padding: photo.caption ? '6px 6px 22px' : 5,
          boxShadow: '0 16px 40px rgba(0,0,0,0.42)',
          border: '1px solid rgba(232,201,154,0.3)',
        }}
      >
        <span className="relative block w-full h-full overflow-hidden bg-[#1A080D]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 85vw, 280px"
          />
        </span>

        {photo.caption ? (
          <span
            className="absolute bottom-1 left-0 right-0 text-center font-script pointer-events-none"
            style={{ fontSize: '1.05rem', color: '#6B3A2A' }}
          >
            {photo.caption}
          </span>
        ) : null}
      </span>
    </button>
  );
}
