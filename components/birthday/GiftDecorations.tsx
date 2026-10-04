'use client';

import { FilledHeart } from '@/components/cinematic-intro/Decorations';

function MiniGift({ size = 40, lid = '#C45A6A', box = '#7A2438' }: { size?: number; lid?: string; box?: string }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 48 56" fill="none" aria-hidden="true">
      <rect x="8" y="22" width="32" height="28" rx="2" fill={box} />
      <rect x="6" y="14" width="36" height="10" rx="2" fill={lid} />
      <rect x="21" y="14" width="6" height="36" fill="#EBCF98" opacity="0.85" />
      <rect x="6" y="20" width="36" height="5" fill="#EBCF98" opacity="0.75" />
      <path
        d="M24 14 C20 6 14 4 12 8 C11 11 16 13 24 14 C32 13 37 11 36 8 C34 4 28 6 24 14Z"
        fill="#EBCF98"
        opacity="0.9"
      />
    </svg>
  );
}

function RibbonCurl({ size = 56, tone = '#C45A6A' }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" fill="none" aria-hidden="true">
      <path
        d="M8 28 C18 8 28 8 40 28 C52 48 62 48 72 28"
        stroke={tone}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M12 32 C22 14 30 14 40 32 C50 50 58 50 68 32"
        stroke="#EBCF98"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

function GiftTag({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 72 52" fill="none" aria-hidden="true">
      <path
        d="M8 10 H48 L64 26 L48 42 H8 C5 42 3 40 3 37 V15 C3 12 5 10 8 10Z"
        fill="#F5E6C8"
        stroke="rgba(216,180,119,0.55)"
        strokeWidth="1"
      />
      <circle cx="14" cy="26" r="3.5" fill="#6B2436" />
      <path d="M14 26 C22 18 30 20 38 26" stroke="#8B3A4A" strokeWidth="1.2" fill="none" opacity="0.5" />
      <text
        x="28"
        y="30"
        fill="#6B2436"
        fontSize="9"
        fontFamily="Georgia, serif"
        opacity="0.75"
      >
        for you
      </text>
    </svg>
  );
}

function Sparkle({ size = 18, tone = '#EBCF98' }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={tone}
        opacity="0.9"
      />
    </svg>
  );
}

function HeartBalloon({ size = 48, color = '#8B2E42' }: { size?: number; color?: string }) {
  const gid = `hb-${color.replace('#', '')}`;
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 48 68" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#D47886" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#3A1018" />
        </radialGradient>
      </defs>
      <path
        d="M24 40 C24 40 6 28 6 16 A10 10 0 0 1 24 12 A10 10 0 0 1 42 16 C42 28 24 40 24 40Z"
        fill={`url(#${gid})`}
      />
      <ellipse cx="16" cy="16" rx="4" ry="5" fill="rgba(255,246,233,0.25)" transform="rotate(-20 16 16)" />
      <path d="M24 40 C22 48 26 54 23 62" stroke="rgba(232,201,154,0.5)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Confetti({ w = 8, h = 14, color = '#EBCF98' }: { w?: number; h?: number; color?: string }) {
  return (
    <span
      style={{
        display: 'block',
        width: w,
        height: h,
        borderRadius: 2,
        background: color,
        boxShadow: `0 0 8px ${color}55`,
      }}
    />
  );
}

const FLOATERS = [
  { el: 'mini', left: '-8%', top: '8%', rot: -14, delay: '0s', dur: '5.4s', scale: 1 },
  { el: 'mini', left: '86%', top: '62%', rot: 18, delay: '0.8s', dur: '4.8s', scale: 0.85 },
  { el: 'heartBal', left: '78%', top: '-6%', rot: 12, delay: '0.3s', dur: '5.1s', scale: 1 },
  { el: 'heartBal', left: '-10%', top: '42%', rot: -16, delay: '1s', dur: '5.6s', scale: 0.9 },
  { el: 'ribbon', left: '82%', top: '18%', rot: 28, delay: '0.5s', dur: '6s', scale: 1 },
  { el: 'ribbon', left: '-6%', top: '68%', rot: -32, delay: '1.2s', dur: '5.5s', scale: 0.9 },
  { el: 'tag', left: '70%', top: '78%', rot: -8, delay: '0.4s', dur: '5.8s', scale: 1 },
] as const;

const SPARKLES = [
  { left: '10%', top: '18%', s: 16, d: '0s' },
  { left: '88%', top: '12%', s: 22, d: '0.4s' },
  { left: '4%', top: '55%', s: 14, d: '0.9s' },
  { left: '92%', top: '48%', s: 18, d: '1.3s' },
  { left: '18%', top: '84%', s: 12, d: '0.6s' },
  { left: '62%', top: '4%', s: 20, d: '1.1s' },
  { left: '48%', top: '88%', s: 15, d: '0.2s' },
  { left: '74%', top: '36%', s: 11, d: '1.5s' },
] as const;

const CONFETTI = [
  { left: '6%', top: '28%', rot: 25, c: '#EBCF98', w: 7, h: 12 },
  { left: '90%', top: '32%', rot: -40, c: '#C45A6A', w: 6, h: 14 },
  { left: '14%', top: '72%', rot: 55, c: '#D8B477', w: 5, h: 11 },
  { left: '84%', top: '70%', rot: -20, c: '#8B3A4A', w: 8, h: 10 },
  { left: '42%', top: '6%', rot: 12, c: '#EBCF98', w: 6, h: 9 },
  { left: '56%', top: '92%', rot: -60, c: '#C45A6A', w: 7, h: 13 },
  { left: '2%', top: '12%', rot: 35, c: '#F5E6C8', w: 5, h: 10 },
  { left: '96%', top: '58%', rot: -15, c: '#D8B477', w: 6, h: 12 },
] as const;

export default function GiftDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-visible"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Warm celebratory glow */}
      <div
        className="absolute inset-[-8%]"
        style={{
          background: `
            radial-gradient(ellipse 45% 40% at 50% 45%, rgba(216,180,119,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 35% 35% at 20% 70%, rgba(140,45,65,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 30% 30% at 85% 25%, rgba(140,45,65,0.22) 0%, transparent 65%)
          `,
        }}
      />

      {/* Gift-themed floaters */}
      {FLOATERS.map((f, i) => (
        <div
          key={`fl-${i}`}
          className="absolute"
          style={{
            left: f.left,
            top: f.top,
            ['--gf-rot' as string]: `${f.rot}deg`,
            animation: `gift-float ${f.dur} ${f.delay} ease-in-out infinite`,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
          }}
        >
          <div style={{ transform: `scale(${f.scale})` }}>
            {f.el === 'mini' && <MiniGift size={i === 0 ? 52 : 40} />}
            {f.el === 'heartBal' && (
              <HeartBalloon size={i === 2 ? 56 : 46} color={i === 3 ? '#9A6B3A' : '#8B2E42'} />
            )}
            {f.el === 'ribbon' && (
              <RibbonCurl size={i === 4 ? 72 : 58} tone={i === 5 ? '#9A6B3A' : '#C45A6A'} />
            )}
            {f.el === 'tag' && <GiftTag size={64} />}
          </div>
        </div>
      ))}

      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <div
          key={`sp-${i}`}
          className="absolute"
          style={{
            left: s.left,
            top: s.top,
            animation: `gift-twinkle 2.4s ${s.d} ease-in-out infinite`,
          }}
        >
          <Sparkle size={s.s} tone={i % 3 === 0 ? '#FFF6E9' : '#EBCF98'} />
        </div>
      ))}

      {/* Confetti bits */}
      {CONFETTI.map((c, i) => (
        <div
          key={`cf-${i}`}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            ['--gf-rot' as string]: `${c.rot}deg`,
            animation: `gift-float ${3.8 + (i % 4) * 0.4}s ${i * 0.15}s ease-in-out infinite`,
            opacity: 0.85,
          }}
        >
          <Confetti w={c.w} h={c.h} color={c.c} />
        </div>
      ))}

      {/* Floating hearts */}
      {[
        { left: '22%', top: '10%', s: 14, c: 'rgba(216,180,119,0.85)', d: '0.5s' },
        { left: '68%', top: '86%', s: 12, c: 'rgba(196,90,106,0.85)', d: '1s' },
        { left: '94%', top: '22%', s: 11, c: 'rgba(235,207,152,0.8)', d: '0.2s' },
      ].map((h, i) => (
        <div
          key={`ht-${i}`}
          className="absolute"
          style={{
            left: h.left,
            top: h.top,
            animation: `gift-float 4.6s ${h.d} ease-in-out infinite`,
          }}
        >
          <FilledHeart size={h.s} color={h.c} />
        </div>
      ))}
    </div>
  );
}
