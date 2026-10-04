'use client';

import { forwardRef, type RefObject } from 'react';
import IntroPhoto from './IntroPhoto';
import IntroCTA from './IntroCTA';
import { FilledHeart, OutlineHeart } from './Decorations';

interface IntroContentProps {
  onOpen: () => void;
  disabled?: boolean;
  onCtaHover?: (active: boolean) => void;
  onPhotoHover?: (active: boolean) => void;
  photoRef: RefObject<HTMLDivElement | null>;
  desktopPhotoRef: RefObject<HTMLDivElement | null>;
}

const IntroContent = forwardRef<HTMLDivElement, IntroContentProps>(
  function IntroContent(
    {
      onOpen,
      disabled = false,
      onCtaHover,
      onPhotoHover,
      photoRef,
      desktopPhotoRef,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className="relative z-10 w-full min-h-[100svh] flex justify-center"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 0px)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
          paddingInline: 'clamp(20px, 5vw, 120px)',
        }}
      >
        <div className="w-full max-w-[1120px] flex flex-col lg:flex-row lg:items-center lg:justify-center gap-0 lg:gap-12 xl:gap-16">
          {/* Text column */}
          <div className="w-full lg:w-auto lg:flex-1 flex justify-center lg:justify-end">
            <div
              className="
                w-full flex flex-col items-center lg:items-start
                text-center lg:text-left
                justify-center
                min-h-[100svh] lg:min-h-0
                py-[max(1.75rem,7svh)] lg:py-6
              "
              style={{ maxWidth: 'min(100%, 520px)' }}
            >

              {/* Heading */}
              <div
                data-intro="heading-wrap"
                className="relative mb-3 sm:mb-4 px-2"
              >
                <h1
                  data-intro="heading"
                  className="font-serif leading-[0.95]"
                  style={{
                    fontSize: 'clamp(3.2rem, 14vw, 5rem)',
                    fontWeight: 400,
                    color: '#FFF7EA',
                    letterSpacing: '-0.025em',
                  }}
                >
                  <span className="lg:hidden">Hey Komal...</span>
                  <span className="hidden lg:block lg:text-[clamp(5rem,7.5vw,8.5rem)] lg:leading-[0.9]">
                    Hey
                    <br />
                    Komal...
                  </span>
                </h1>
                <span
                  data-intro="heart"
                  className="absolute"
                  style={{
                    right: '-0.15em',
                    top: '0.15em',
                    filter: 'drop-shadow(0 0 8px rgba(232,201,154,0.35))',
                  }}
                  aria-hidden="true"
                >
                  <OutlineHeart size={26} className="lg:w-9 lg:h-9" />
                </span>
              </div>

              {/* Subtitle */}
              <p
                data-intro="message"
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
                  fontWeight: 300,
                  color: 'rgba(255,247,234,0.78)',
                  lineHeight: 1.5,
                  marginBottom: 'clamp(1.1rem, 3svh, 1.75rem)',
                }}
              >
                I made something
                <br />
                <em
                  style={{
                    color: '#E8C99A',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  just for you.
                </em>
              </p>

              {/* Mobile photo */}
              <IntroPhoto
                ref={photoRef}
                variant="mobile"
                onHoverChange={onPhotoHover}
                className="lg:hidden w-[min(82vw,320px)] h-[min(36svh,310px)] mb-[clamp(1.15rem,3svh,1.75rem)] shrink-0"
              />

              {/* Promise */}
              <p
                data-intro="prompt"
                className="font-sans"
                style={{
                  fontSize: 'clamp(0.88rem, 3.2vw, 1.02rem)',
                  fontWeight: 300,
                  color: 'rgba(220,200,190,0.68)',
                  lineHeight: 1.65,
                  marginBottom: 'clamp(0.55rem, 1.5svh, 0.9rem)',
                }}
              >
                Before you continue,
                <br />
                I need one little promise...
              </p>

              <p
                data-intro="stay"
                className="font-serif flex items-center justify-center lg:justify-start gap-2"
                style={{
                  fontSize: 'clamp(1.15rem, 4vw, 1.4rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#E8C99A',
                  marginBottom: 'clamp(1.35rem, 3.5svh, 2rem)',
                }}
              >
                Stay till the very end.
                <FilledHeart size={11} />
              </p>

              <div
                data-intro="cta-wrap"
                className="w-full flex justify-center lg:justify-start"
              >
                <IntroCTA
                  onClick={onOpen}
                  disabled={disabled}
                  onHoverChange={onCtaHover}
                />
              </div>
            </div>
          </div>

          {/* Desktop photo */}
          <div className="hidden lg:flex lg:flex-1 items-center justify-start pl-2">
            <IntroPhoto
              ref={desktopPhotoRef}
              variant="desktop"
              onHoverChange={onPhotoHover}
              className="w-[min(38vw,520px)] h-[min(68vh,700px)]"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default IntroContent;
