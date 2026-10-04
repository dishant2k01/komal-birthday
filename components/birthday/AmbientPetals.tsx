'use client';

import { useEffect, useState } from 'react';
import { RosePetal } from '@/components/cinematic-intro/Decorations';

type Petal = {
  id: number;
  x: number;
  y: number;
  size: number;
  op: number;
  dur: number;
  delay: number;
  px: string;
  py: string;
  rot: number;
  blur: number;
  tone: string;
};

export default function AmbientPetals({ count }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const n = count ?? (isMobile ? 4 : 10);
    setPetals(
      Array.from({ length: n }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 14,
        op: Math.random() * 0.3 + 0.22,
        dur: Math.random() * 12 + 14,
        delay: Math.random() * -12,
        px: `${(Math.random() - 0.5) * 28}px`,
        py: `${(Math.random() - 0.5) * 36}px`,
        rot: Math.random() * 50 - 25,
        blur: i % 4 === 0 ? 1.2 : 0,
        tone: i % 2 === 0 ? '#8B3A4A' : '#6B2436',
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.op,
            ['--petal-op' as string]: p.op,
            ['--px' as string]: p.px,
            ['--py' as string]: p.py,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animation: `petal-drift ${p.dur}s ${p.delay}s ease-in-out infinite`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <RosePetal size={p.size} tone={p.tone} />
        </div>
      ))}
    </div>
  );
}
