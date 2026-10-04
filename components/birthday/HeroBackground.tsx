'use client';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base cinematic burgundy */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 65% 35%, rgba(120, 25, 50, 0.32), transparent 42%),
            radial-gradient(circle at 25% 70%, rgba(100, 30, 45, 0.20), transparent 38%),
            radial-gradient(circle at 80% 75%, rgba(180, 90, 65, 0.10), transparent 40%),
            linear-gradient(120deg, #12070A 0%, #1D080F 50%, #0D0508 100%)
          `,
        }}
      />

      {/* Warm light leak — right */}
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '8%',
          width: '42vw',
          height: '48vh',
          background:
            'radial-gradient(ellipse, rgba(215,160,90,0.18) 0%, rgba(140,40,60,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Soft bokeh orbs */}
      {[
        { x: '18%', y: '22%', s: 90, o: 0.1 },
        { x: '72%', y: '18%', s: 120, o: 0.12 },
        { x: '55%', y: '70%', s: 80, o: 0.08 },
        { x: '30%', y: '80%', s: 70, o: 0.09 },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            background: `radial-gradient(circle, rgba(216,180,119,${b.o}) 0%, transparent 70%)`,
            filter: 'blur(18px)',
          }}
        />
      ))}

      {/* Giant KOMAL type — partially occluded by photo */}
      <div
        data-hero="bg-komal"
        className="absolute select-none font-serif pointer-events-none"
        style={{
          top: '10%',
          left: '38%',
          fontSize: 'clamp(10rem, 20vw, 22rem)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          color: 'rgba(180, 70, 90, 0.07)',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        KOMAL
      </div>

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 90% at 50% 45%, transparent 35%, rgba(8,3,5,0.72) 100%)',
          zIndex: 2,
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          mixBlendMode: 'overlay',
          zIndex: 3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
