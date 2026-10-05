'use client';

import { RosePetal } from '@/components/cinematic-intro/Decorations';

export default function GalleryDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%]"
        style={{
          background:
            'radial-gradient(circle, rgba(185, 90, 100, 0.14) 0%, transparent 65%)',
          filter: 'blur(24px)',
        }}
      />

      <div
        className="absolute left-[-2%] bottom-[6%] w-[180px] h-[180px] opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(120,35,55,0.4) 0%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />


      {[
        { left: '22%', top: '30%', size: 18, rot: -20 },
        { left: '70%', bottom: '18%', size: 20, rot: 15 },
        { left: '12%', bottom: '10%', size: 16, rot: 25 },
        { left: '88%', top: '42%', size: 14, rot: -10 },
      ].map((p, i) => (
        <div
          key={i}
          data-gal-petal
          className={`absolute ${i > 2 ? 'hidden sm:block' : ''}`}
          style={{
            left: p.left,
            top: p.top,
            bottom: p.bottom,
            transform: `rotate(${p.rot}deg)`,
            opacity: 0.7,
          }}
        >
          <RosePetal size={p.size} tone={i % 2 ? '#6B2436' : '#8B3A4A'} />
        </div>
      ))}
    </div>
  );
}
