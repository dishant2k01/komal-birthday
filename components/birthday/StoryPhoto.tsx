'use client';

import Image from 'next/image';

const SIZE_MAP = {
  sm: 'lg:w-[230px] lg:h-[172px]',
  md: 'lg:w-[255px] lg:h-[185px]',
  lg: 'lg:w-[275px] lg:h-[198px] xl:w-[295px] xl:h-[210px]',
} as const;

interface StoryPhotoProps {
  src: string;
  alt: string;
  rotate?: number;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export default function StoryPhoto({
  src,
  alt,
  rotate = -2,
  size = 'md',
  className = '',
}: StoryPhotoProps) {
  return (
    <div
      data-story-photo
      className={`
        relative group cursor-default
        w-[72vw] max-w-[300px] aspect-[4/3]
        lg:aspect-auto lg:max-w-none
        ${SIZE_MAP[size]}
        ${className}
      `}
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 0.5s ease, filter 0.5s ease',
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth < 1024) return;
        e.currentTarget.style.transform = 'rotate(0deg)';
        e.currentTarget.style.filter = 'brightness(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotate}deg)`;
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 3,
          background: 'rgba(40,16,22,0.85)',
          transform: 'rotate(1.5deg) translate(6px, 7px)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
        }}
      />

      <div
        className="relative w-full h-[250px] overflow-hidden"
        style={{
          borderRadius: 3,
          padding: '8px 8px 22px',
          background:
            'linear-gradient(160deg, #F4E8D0 0%, #E8D4B0 55%, #DCC49A 100%)',
          boxShadow:
            '0 18px 40px rgba(0,0,0,0.42), 0 2px 0 rgba(255,246,233,0.15) inset',
          border: '1px solid rgba(232,201,154,0.35)',
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            border: '1px solid rgba(40,16,22,0.35)',
            background: '#1A080D',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 72vw, 280px"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,7,10,0.06) 0%, transparent 40%, rgba(18,7,10,0.18) 100%)',
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            mixBlendMode: 'multiply',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}
