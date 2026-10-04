'use client';

import { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { birthdayData } from '@/lib/birthday-data';
import { DriedSprig, RosePetal } from '@/components/cinematic-intro/Decorations';

const HeroPhoto = forwardRef<HTMLDivElement>(function HeroPhoto(_props, ref) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    const px = Math.max(-8, Math.min(8, x));
    const py = Math.max(-8, Math.min(8, y));
    wrapRef.current.style.transform = `rotate(-1deg) translate(${px}px, ${py}px)`;
    const flora = wrapRef.current.parentElement?.querySelectorAll('[data-photo-flora]');
    flora?.forEach((el, i) => {
      (el as HTMLElement).style.transform = `translate(${px * (0.35 + i * 0.12)}px, ${py * (0.3 + i * 0.1)}px)`;
    });
  };

  const onLeave = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform = 'rotate(-1deg) translate(0, 0)';
    const flora = wrapRef.current.parentElement?.querySelectorAll('[data-photo-flora]');
    flora?.forEach((el) => {
      (el as HTMLElement).style.transform = 'translate(0, 0)';
    });
  };

  return (
    <div
      ref={ref}
      data-hero="photo-root"
      className="
        relative mx-auto lg:mx-0
        w-full max-w-[320px] aspect-[4/5]
        h-auto
        sm:max-w-[380px]
        md:max-w-[420px]
        lg:max-w-[min(100%,560px)] lg:w-[min(100%,560px)]
        lg:h-[min(78vh,720px)] lg:aspect-auto
      "
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Warm glow behind photo */}
      <div
        data-hero="photo-glow"
        className="absolute pointer-events-none"
        style={{
          inset: '-18% -20%',
          background:
            'radial-gradient(circle, rgba(215, 160, 90, 0.22) 0%, rgba(140,40,60,0.1) 45%, transparent 65%)',
          filter: 'blur(28px)',
          zIndex: 0,
        }}
      />

      {/* Sprigs around photo */}
      <div
        data-photo-flora
        data-hero="photo-flora"
        className="absolute pointer-events-none transition-transform duration-300"
        style={{ top: '-8%', right: '-10%', zIndex: 1, opacity: 0.75 }}
      >
        <DriedSprig style={{ width: 96 }} />
      </div>
      <div
        data-photo-flora
        className="absolute pointer-events-none transition-transform duration-300 hidden lg:block"
        style={{ bottom: '2%', left: '-12%', zIndex: 1, opacity: 0.6 }}
      >
        <DriedSprig flip style={{ width: 80 }} />
      </div>

      {/* Aged paper / photo stack behind main print */}
      <div
        data-hero="photo-frame-back"
        className="absolute overflow-hidden"
        style={{
          inset: '18px -18px -20px 18px',
          borderRadius: 10,
          background:
            'linear-gradient(155deg, #E8D4B0 0%, #C9A978 40%, #8B6A45 100%)',
          border: '1px solid rgba(232,201,154,0.35)',
          transform: 'rotate(3deg)',
          zIndex: 1,
          boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
          opacity: 0.55,
        }}
      />
      <div
        className="absolute overflow-hidden"
        style={{
          inset: '10px -12px -12px 10px',
          borderRadius: 10,
          background:
            'linear-gradient(145deg, rgba(245,230,200,0.22), rgba(50,22,30,0.75))',
          border: '1px solid rgba(232,201,154,0.28)',
          transform: 'rotate(1.6deg)',
          zIndex: 2,
          boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
        }}
      />
      <div
        className="absolute"
        style={{
          inset: '4px -6px -6px 6px',
          borderRadius: 10,
          background: 'rgba(28,12,18,0.7)',
          border: '1px solid rgba(232,201,154,0.16)',
          transform: 'rotate(0.5deg)',
          zIndex: 2,
        }}
      />

      {/* Main photograph */}
      <div
        ref={wrapRef}
        data-hero="photo"
        className="relative w-full h-full overflow-hidden transition-transform duration-300 ease-out"
        style={{
          borderRadius: 10,
          border: '1px solid rgba(232, 201, 154, 0.55)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.45)',
          transform: 'rotate(-1deg)',
          zIndex: 3,
        }}
      >
        <Image
          src={birthdayData.heroImage}
          alt={birthdayData.name}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 84vw, 34vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,7,10,0.08) 0%, transparent 35%, rgba(18,7,10,0.28) 100%), radial-gradient(ellipse at 85% 10%, rgba(232,201,154,0.14) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Petals near photo */}
      <div
        data-hero="photo-petal"
        className="absolute pointer-events-none"
        style={{ bottom: '-2%', left: '-6%', zIndex: 5, transform: 'rotate(-25deg)' }}
      >
        <RosePetal size={28} />
      </div>
      <div
        data-hero="photo-petal"
        className="absolute pointer-events-none"
        style={{
          bottom: '8%',
          right: '-5%',
          zIndex: 5,
          transform: 'rotate(20deg)',
          opacity: 0.8,
        }}
      >
        <RosePetal size={20} tone="#6B2436" />
      </div>
      <div
        data-hero="photo-petal"
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: '12%',
          left: '-4%',
          zIndex: 5,
          transform: 'rotate(35deg)',
          filter: 'blur(0.6px)',
          opacity: 0.7,
        }}
      >
        <RosePetal size={16} tone="#7A2E3E" />
      </div>

      {/* Handwritten note */}
      <div
        data-hero="note"
        className="absolute z-[6] pointer-events-none"
        style={{
          right: '-2%',
          bottom: '4%',
          padding: '10px 14px 12px',
          background:
            'linear-gradient(160deg, #F3E6C8 0%, #E8D4A8 55%, #D9C089 100%)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.4)',
          transform: 'rotate(-5deg)',
          borderRadius: 2,
        }}
      >
        <p
          className="font-script whitespace-pre-line leading-[1.05]"
          style={{
            fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
            color: '#4A241C',
          }}
        >
          {birthdayData.hero.note}
        </p>
      </div>
    </div>
  );
});

export default HeroPhoto;
