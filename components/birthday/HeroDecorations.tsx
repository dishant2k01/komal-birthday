'use client';

import { RosePetal } from '@/components/cinematic-intro/Decorations';

export default function HeroDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Left film strip */}
      <div
        className="hidden lg:flex absolute flex-col items-center justify-evenly"
        style={{
          left: 10,
          top: '18%',
          bottom: '22%',
          width: 16,
          borderRadius: 3,
          background:
            'linear-gradient(180deg, rgba(40,22,28,0.85), rgba(24,12,16,0.9))',
          boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.12)',
          opacity: 0.45,
          zIndex: 2,
          padding: '6px 0',
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 6,
              borderRadius: 1,
              background: 'rgba(12,6,8,0.85)',
              boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.08)',
            }}
          />
        ))}
      </div>

      {/* Left floral blur cluster — photographic soft roses */}
      <div
        data-hero="flora-left"
        className="absolute"
        style={{
          left: '-6%',
          bottom: '2%',
          width: 'min(42vw, 360px)',
          height: 'min(48vh, 420px)',
          background: `
            radial-gradient(ellipse 55% 50% at 35% 55%, rgba(130,35,55,0.55) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 55% 35%, rgba(100,25,45,0.4) 0%, transparent 65%),
            radial-gradient(ellipse 35% 35% at 25% 70%, rgba(80,20,35,0.35) 0%, transparent 60%)
          `,
          filter: 'blur(16px)',
          zIndex: 2,
        }}
      />
      {[
        { l: '0%', b: '18%', s: 120, blur: 14, o: 0.65 },
        { l: '6%', b: '8%', s: 85, blur: 10, o: 0.55 },
        { l: '-2%', b: '28%', s: 70, blur: 12, o: 0.45 },
      ].map((r, i) => (
        <div
          key={`lr-${i}`}
          className="absolute rounded-full"
          style={{
            left: r.l,
            bottom: r.b,
            width: r.s,
            height: r.s,
            background:
              'radial-gradient(circle at 38% 32%, rgba(170,55,75,0.7), rgba(70,18,30,0.15) 62%, transparent 75%)',
            filter: `blur(${r.blur}px)`,
            zIndex: 2,
            opacity: r.o,
          }}
        />
      ))}
      <div
        className="absolute hidden lg:block rounded-full"
        style={{
          right: '8%',
          top: '22%',
          width: 110,
          height: 110,
          background:
            'radial-gradient(circle at 45% 40%, rgba(140,45,65,0.4), transparent 70%)',
          filter: 'blur(14px)',
          zIndex: 2,
        }}
      />

      {/* Bottom petals */}
      {[
        { left: '42%', bottom: '8%', size: 26, rot: -20, blur: 0 },
        { left: '52%', bottom: '5%', size: 22, rot: 15, blur: 0.5 },
        { left: '68%', bottom: '12%', size: 30, rot: -8, blur: 0 },
        { left: '78%', bottom: '7%', size: 20, rot: 28, blur: 1 },
        { left: '22%', bottom: '4%', size: 24, rot: 10, blur: 0.8 },
        { left: '88%', bottom: '22%', size: 18, rot: -30, blur: 0 },
        { left: '60%', bottom: '3%', size: 16, rot: 40, blur: 1.2 },
      ].map((p, i) => (
        <div
          key={i}
          data-hero="petal"
          className="absolute"
          style={{
            left: p.left,
            bottom: p.bottom,
            transform: `rotate(${p.rot}deg)`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            zIndex: 4,
            opacity: 0.75,
          }}
        >
          <RosePetal size={p.size} tone={i % 2 ? '#6B2436' : '#8B3A4A'} />
        </div>
      ))}
    </div>
  );
}
