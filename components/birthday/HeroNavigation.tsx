'use client';

import { useState } from 'react';
import { birthdayData } from '@/lib/birthday-data';
import { FilledHeart } from '@/components/cinematic-intro/Decorations';

const HERO_NAV = birthdayData.nav.filter((item) => item.id !== 'letter');

export default function HeroNavigation() {
  const [active, setActive] = useState('hero');

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-hero="nav"
      className="relative z-30 w-full shrink-0 hidden lg:block"
      style={{
        paddingTop: 'max(1.1rem, env(safe-area-inset-top))',
        paddingBottom: '0.75rem',
      }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 xl:gap-8">
        <button
          type="button"
          onClick={() => go('hero')}
          className="font-serif italic leading-none"
          style={{ fontSize: '1.85rem', color: '#EBCF98' }}
          aria-label="Home"
        >
          K
        </button>

        <nav className="flex items-center justify-center gap-5 xl:gap-7">
          {HERO_NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="font-sans"
                style={{
                  fontSize: '12.5px',
                  letterSpacing: '0.08em',
                  color: isActive ? '#D8B477' : 'rgba(255, 246, 233, 0.70)',
                  transition: 'color 0.25s ease',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <FilledHeart size={11} color="#C45A5A" />
          <span
            className="font-sans"
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'rgba(255,246,233,0.72)',
            }}
          >
            {birthdayData.date}
          </span>
        </div>
      </div>
    </header>
  );
}
