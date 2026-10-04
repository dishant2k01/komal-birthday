'use client';

import { forwardRef, useEffect, useState } from 'react';
import { RosePetal } from './Decorations';

type Bokeh = {
  id: number;
  x: number;
  y: number;
  size: number;
  op: number;
  dur: number;
  color: string;
};

type Petal = {
  id: number;
  x: number;
  y: number;
  size: number;
  rot: number;
  op: number;
  dur: number;
  delay: number;
  px: string;
  py: string;
  blur: number;
  tone: string;
};

const IntroBackground = forwardRef<HTMLDivElement>(function IntroBackground(
  _props,
  glowRef
) {
  const [bokeh, setBokeh] = useState<Bokeh[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    setBokeh(
      Array.from({ length: isMobile ? 5 : 8 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 12 + Math.random() * 70,
        size: Math.random() * 70 + 40,
        op: Math.random() * 0.12 + 0.06,
        dur: Math.random() * 8 + 10,
        color:
          i % 2 === 0
            ? 'rgba(232,170,120,0.35)'
            : 'rgba(181,90,100,0.28)',
      }))
    );

    const petalCount = isMobile ? 4 : 8;
    setPetals(
      Array.from({ length: petalCount }, (_, i) => ({
        id: i,
        x: Math.random() * 92,
        y: 15 + Math.random() * 75,
        size: Math.random() * 18 + 16,
        rot: Math.random() * 60 - 30,
        op: Math.random() * 0.35 + 0.3,
        dur: Math.random() * 10 + 14,
        delay: Math.random() * -10,
        px: `${(Math.random() - 0.5) * 24}px`,
        py: `${(Math.random() - 0.5) * 30}px`,
        blur: i % 3 === 0 ? 1.5 : 0,
        tone: i % 2 === 0 ? '#8B3A4A' : '#6B2436',
      }))
    );
  }, []);

  return (
    <>
      {/* Warm center glow — breathes via GSAP */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        data-intro="glow"
        style={{
          width: 'min(95vw, 640px)',
          height: 'min(95vw, 640px)',
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse at center, rgba(140,45,70,0.32) 0%, rgba(200,110,70,0.1) 42%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          willChange: 'transform, opacity',
          zIndex: 1,
        }}
      />

      {/* Soft light leak — top right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '-8%',
          right: '-5%',
          width: '45vw',
          height: '40vh',
          background:
            'radial-gradient(ellipse, rgba(210,120,70,0.14) 0%, transparent 65%)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />

      {/* Warm bokeh orbs */}
      {bokeh.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          data-intro="bokeh"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            ['--b-op' as string]: b.op,
            opacity: b.op,
            animation: `bokeh-pulse ${b.dur}s ease-in-out infinite`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Floating rose petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          data-intro="petal"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            ['--petal-op' as string]: p.op,
            ['--px' as string]: p.px,
            ['--py' as string]: p.py,
            opacity: p.op,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animation: `petal-drift ${p.dur}s ${p.delay}s ease-in-out infinite`,
            transform: `rotate(${p.rot}deg)`,
            zIndex: p.blur ? 12 : 3,
          }}
        >
          <RosePetal size={p.size} tone={p.tone} />
        </div>
      ))}

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          zIndex: 4,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 115% 105% at 50% 42%, transparent 28%, rgba(6,3,4,0.82) 100%)',
          zIndex: 5,
        }}
      />

      {/* Giant background type */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        data-intro="bg-type"
        aria-hidden="true"
        style={{
          right: '-2vw',
          top: '8%',
          fontSize: 'clamp(180px, 28vw, 340px)',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 600,
          fontStyle: 'italic',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          color: 'rgba(232,201,154,0.03)',
          filter: 'blur(1.5px)',
          zIndex: 5,
        }}
      >
        K
      </div>
      <div
        className="absolute pointer-events-none select-none"
        data-intro="bg-type-name"
        aria-hidden="true"
        style={{
          left: '50%',
          bottom: '-1vh',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(90px, 28vw, 200px)',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 600,
          fontStyle: 'italic',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'rgba(232,201,154,0.028)',
          filter: 'blur(2px)',
          zIndex: 5,
          whiteSpace: 'nowrap',
        }}
      >
        KOMAL
      </div>
    </>
  );
});

export default IntroBackground;
