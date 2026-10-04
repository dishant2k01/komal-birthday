'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FilledHeart } from './Decorations';

interface IntroCTAProps {
  onClick: () => void;
  disabled?: boolean;
  onHoverChange?: (active: boolean) => void;
}

export default function IntroCTA({
  onClick,
  disabled = false,
  onHoverChange,
}: IntroCTAProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const activate = () => {
    if (disabled) return;
    setActive(true);
    onHoverChange?.(true);
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power3.out',
      transformOrigin: 'center center',
    });
    gsap.to(arrowRef.current, { x: 7, duration: 0.35, ease: 'power2.out' });
    gsap.to(glowRef.current, { opacity: 1, duration: 0.4 });
    gsap.to(tipRef.current, { opacity: 1, scale: 1.2, duration: 0.35 });
  };

  const deactivate = () => {
    if (disabled) return;
    setActive(false);
    onHoverChange?.(false);
    gsap.to(lineRef.current, {
      scaleX: 0.5,
      duration: 0.35,
      ease: 'power3.in',
      transformOrigin: 'center center',
    });
    gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
    gsap.to(tipRef.current, { opacity: 0.7, scale: 1, duration: 0.3 });
  };

  return (
    <button
      id="cta-open"
      type="button"
      data-intro="cta"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onTouchEnd={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      aria-label="Open your surprise"
      className="relative flex flex-col items-center lg:items-start bg-transparent border-none p-0 cursor-pointer"
      style={{ outline: 'none', touchAction: 'manipulation', minHeight: 52 }}
    >
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          inset: '-28px -40px',
          background:
            'radial-gradient(ellipse, rgba(232,201,154,0.16) 0%, transparent 70%)',
          opacity: 0,
          borderRadius: '50%',
        }}
      />

      <span className="mb-2 opacity-80" aria-hidden="true">
        <FilledHeart size={11} color="rgba(232,201,154,0.85)" />
      </span>

      <div className="flex items-center gap-3 relative">
        <span
          className="font-sans font-medium uppercase"
          style={{
            fontSize: 'clamp(0.78rem, 3.2vw, 0.88rem)',
            letterSpacing: '0.24em',
            color: active ? '#E8C99A' : '#FFF7EA',
            transition: 'color 0.25s ease',
          }}
        >
          Open Your Surprise
        </span>
        <span
          ref={arrowRef}
          className="font-sans"
          style={{
            fontSize: '1.1rem',
            color: '#E8C99A',
            display: 'inline-block',
            lineHeight: 1,
          }}
        >
          →
        </span>
      </div>

      <div
        className="relative mt-2.5 overflow-visible"
        style={{ width: 'min(100%, 270px)', height: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(232,201,154,0.2)' }}
        />
        <div
          ref={lineRef}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(232,201,154,0.95), rgba(255,220,160,0.9))',
            transformOrigin: 'center center',
            transform: 'scaleX(0.5)',
          }}
        />
        {/* Glowing tip on the right */}
        <div
          ref={tipRef}
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: '50%',
            width: 18,
            height: 18,
            transform: 'translate(30%, -50%)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,220,160,0.9) 0%, transparent 70%)',
            filter: 'blur(3px)',
            opacity: 0.7,
          }}
        />
      </div>

      <p
        className="font-sans mt-3"
        style={{
          fontSize: 'clamp(0.6rem, 2.5vw, 0.68rem)',
          letterSpacing: '0.12em',
          color: 'rgba(185,170,165,0.45)',
        }}
      >
        a little something made with love
      </p>
    </button>
  );
}
