'use client';

import type { CSSProperties } from 'react';

/** Delicate line-art heart */
export function OutlineHeart({
  className = '',
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 30"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 27S3.5 18.5 3.5 9.8A7.2 7.2 0 0 1 16 5.2a7.2 7.2 0 0 1 12.5 4.6C28.5 18.5 16 27 16 27Z"
        stroke="rgba(232,201,154,0.75)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

export function FilledHeart({
  size = 10,
  color = 'rgba(232,201,154,0.9)',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 16 15" fill="none" aria-hidden="true">
      <path
        d="M8 13.5S1.5 9 1.5 4.8A3.8 3.8 0 0 1 8 2a3.8 3.8 0 0 1 6.5 2.8C14.5 9 8 13.5 8 13.5Z"
        fill={color}
      />
    </svg>
  );
}

/** Soft rose petal SVG */
export function RosePetal({
  className = '',
  style,
  size = 28,
  tone = '#8B3A4A',
}: {
  className?: string;
  style?: CSSProperties;
  size?: number;
  tone?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 40 46"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`rp-${tone.replace('#', '')}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#C46B72" stopOpacity="0.95" />
          <stop offset="55%" stopColor={tone} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4A1824" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <path
        d="M20 2C28 10 38 18 36 30C34 40 26 45 20 44C14 45 6 40 4 30C2 18 12 10 20 2Z"
        fill={`url(#rp-${tone.replace('#', '')})`}
        opacity="0.88"
      />
      <path
        d="M20 8C24 14 30 20 29 28"
        stroke="rgba(255,220,200,0.22)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/** Dried baby's-breath style sprig */
export type BirthdayDecorVariant = 'cake' | 'gift' | 'heart' | 'cluster' | 'auto';

/**
 * BirthdayDecor: removed cakes & gift boxes as requested.
 */
export function BirthdayDecor(): null {
  return null;
}

/** Backward-compatible alias */
export const DriedSprig = BirthdayDecor;

/** Wax seal for desktop photo corner */
export function WaxSeal({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#C4A06A" />
          <stop offset="50%" stopColor="#8B5E34" />
          <stop offset="100%" stopColor="#4A2C18" />
        </radialGradient>
      </defs>
      <circle cx="27" cy="27" r="24" fill="url(#wax)" />
      <circle
        cx="27"
        cy="27"
        r="18"
        fill="none"
        stroke="rgba(232,201,154,0.35)"
        strokeWidth="1.2"
      />
      <path
        d="M27 16c3 4 8 7 8 12a8 8 0 1 1-16 0c0-5 5-8 8-12z"
        fill="rgba(232,201,154,0.35)"
      />
    </svg>
  );
}

/** Film-strip edge behind photo */
export function FilmStripEdge({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-10px',
        top: '6%',
        bottom: '6%',
        width: 18,
        borderRadius: 3,
        background:
          'linear-gradient(180deg, rgba(40,22,28,0.85), rgba(24,12,16,0.9))',
        boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '6px 0',
        zIndex: 0,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 7,
            borderRadius: 1,
            background: 'rgba(12,6,8,0.85)',
            boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.08)',
          }}
        />
      ))}
    </div>
  );
}
