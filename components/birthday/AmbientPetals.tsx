import { useMemo } from 'react';
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

function generatePetals(n: number): Petal[] {
  return Array.from({ length: n }, (_, i) => {
    const s1 = ((i * 47 + 13) % 100) / 100;
    const s2 = ((i * 73 + 29) % 100) / 100;
    const s3 = ((i * 31 + 17) % 100) / 100;
    return {
      id: i,
      x: s1 * 100,
      y: s2 * 100,
      size: s3 * 16 + 14,
      op: s1 * 0.28 + 0.22,
      dur: s2 * 12 + 14,
      delay: s3 * -12,
      px: `${(s1 - 0.5) * 28}px`,
      py: `${(s2 - 0.5) * 36}px`,
      rot: s3 * 50 - 25,
      blur: i % 4 === 0 ? 1.2 : 0,
      tone: i % 2 === 0 ? '#8B3A4A' : '#6B2436',
    };
  });
}

export default function AmbientPetals({ count }: { count?: number }) {
  const petals = useMemo(() => generatePetals(count ?? 8), [count]);

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
