'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { birthdayData } from '@/lib/birthday-data';
import {
  DriedSprig,
  FilmStripEdge,
  FilledHeart,
  RosePetal,
  WaxSeal,
} from './Decorations';

interface IntroPhotoProps {
  className?: string;
  variant?: 'mobile' | 'desktop';
  onHoverChange?: (active: boolean) => void;
}

const IntroPhoto = forwardRef<HTMLDivElement, IntroPhotoProps>(
  function IntroPhoto(
    { className = '', variant = 'mobile', onHoverChange },
    ref
  ) {
    const isDesktop = variant === 'desktop';

    return (
      <div
        ref={ref}
        data-intro="photo"
        className={`relative ${className}`}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        style={{ willChange: 'transform, opacity, filter, clip-path' }}
      >
        {/* Warm glow under photo */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          data-intro="photo-glow"
          style={{
            inset: '-20% -24%',
            background:
              'radial-gradient(ellipse at center, rgba(160,55,75,0.28) 0%, rgba(210,130,70,0.1) 45%, transparent 70%)',
            filter: 'blur(26px)',
            zIndex: 0,
          }}
        />

        {/* Offset champagne frame behind */}
        <div
          aria-hidden="true"
          data-intro="photo-frame"
          style={{
            position: 'absolute',
            inset: isDesktop ? '10px -12px -12px 14px' : '8px -10px -10px 10px',
            borderRadius: 'clamp(18px, 3.5vw, 24px)',
            border: '1px solid rgba(232,201,154,0.28)',
            background: 'rgba(40,18,24,0.35)',
            transform: 'rotate(2.5deg)',
            zIndex: 0,
          }}
        />

        {/* Film strip (stronger on desktop) */}
        <div
          className={isDesktop ? 'block' : 'hidden sm:block'}
          data-intro="film-strip"
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <FilmStripEdge />
        </div>

        {/* Dried sprigs */}
        <div
          data-intro="sprig"
          className="absolute pointer-events-none"
          style={{
            top: isDesktop ? '-8%' : '-6%',
            right: isDesktop ? '-14%' : '-10%',
            zIndex: 3,
            opacity: isDesktop ? 0.85 : 0.7,
          }}
        >
          <DriedSprig style={{ width: isDesktop ? 110 : 72, height: 'auto' }} />
        </div>
        {isDesktop && (
          <div
            data-intro="sprig-2"
            className="absolute pointer-events-none"
            style={{ bottom: '-4%', left: '-12%', zIndex: 3, opacity: 0.75 }}
          >
            <DriedSprig flip style={{ width: 100, height: 'auto' }} />
          </div>
        )}

        {/* Petals near photo edges */}
        <div
          data-intro="photo-petal"
          className="absolute pointer-events-none"
          style={{ bottom: '-2%', left: '-4%', zIndex: 4, transform: 'rotate(-25deg)' }}
        >
          <RosePetal size={isDesktop ? 34 : 24} tone="#8B3A4A" />
        </div>
        <div
          data-intro="photo-petal-2"
          className="absolute pointer-events-none"
          style={{
            top: isDesktop ? '18%' : '12%',
            left: isDesktop ? '-8%' : '-6%',
            zIndex: 4,
            transform: 'rotate(40deg)',
            opacity: 0.75,
          }}
        >
          <RosePetal size={isDesktop ? 26 : 18} tone="#6B2436" />
        </div>

        {/* Main photograph */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: 'clamp(18px, 3.5vw, 24px)',
            transform: isDesktop ? 'rotate(1deg)' : 'rotate(-1deg)',
            boxShadow: `
              0 30px 70px rgba(8,4,6,0.6),
              0 0 50px rgba(140,50,70,0.14),
              0 0 0 1px rgba(232,201,154,0.35)
            `,
            zIndex: 2,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, #2A1520 0%, #1A0D12 45%, #100A0C 100%)',
            }}
          />

          <Image
            src={birthdayData.introImage}
            alt={birthdayData.name}
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1023px) 84vw, 40vw"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(16,10,12,0.16) 0%,
                  transparent 30%,
                  transparent 58%,
                  rgba(16,10,12,0.48) 100%
                ),
                radial-gradient(
                  ellipse at 78% 10%,
                  rgba(232,180,120,0.16) 0%,
                  transparent 50%
                )
              `,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(232,201,154,0.32)',
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* Wax seal — desktop */}
        {isDesktop && (
          <div
            data-intro="wax-seal"
            className="absolute pointer-events-none"
            style={{
              top: '-2%',
              right: '-2%',
              zIndex: 5,
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
            }}
          >
            <WaxSeal />
          </div>
        )}

        {/* Handwritten caption scrap */}
        <div
          data-intro="caption"
          className="absolute pointer-events-none"
          style={{
            right: isDesktop ? '-6%' : '-2%',
            bottom: isDesktop ? '6%' : '4%',
            zIndex: 6,
            transform: 'rotate(-6deg)',
            padding: isDesktop ? '10px 16px 12px' : '8px 12px 10px',
            background:
              'linear-gradient(145deg, rgba(255,244,220,0.14), rgba(40,22,28,0.55))',
            border: '1px solid rgba(232,201,154,0.28)',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
          }}
        >
        </div>
      </div>
    );
  }
);

export default IntroPhoto;
