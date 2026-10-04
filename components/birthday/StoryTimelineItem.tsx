'use client';

import { useState } from 'react';
import { FilledHeart } from '@/components/cinematic-intro/Decorations';
import StoryPhoto from './StoryPhoto';

export type StoryEvent = {
  year: string;
  title: string;
  description: string;
  image: string;
  rotate: number;
  size: 'sm' | 'md' | 'lg';
  photoSide: 'left' | 'right';
};

interface StoryTimelineItemProps {
  event: StoryEvent;
  index: number;
}

function StoryCopy({
  event,
  align,
}: {
  event: StoryEvent;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`max-w-[280px] ${align === 'right' ? 'text-right ml-auto' : 'text-left mr-auto'}`}
    >
      <p
        data-story-year
        className="font-sans mb-2"
        style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          color: 'rgba(216,180,119,0.75)',
        }}
      >
        {event.year}
      </p>
      <h3
        data-story-title
        className="font-serif mb-2"
        style={{
          fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
          color: '#F5E9D9',
          fontWeight: 400,
          lineHeight: 1.15,
        }}
      >
        {event.title}
      </h3>
      <p
        data-story-desc
        className="font-sans whitespace-pre-line"
        style={{
          fontSize: '0.92rem',
          color: 'rgba(255,246,233,0.55)',
          lineHeight: 1.65,
        }}
      >
        {event.description}
      </p>
    </div>
  );
}

function HeartNode({
  index,
  glow,
  setGlow,
}: {
  index: number;
  glow: boolean;
  setGlow: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      data-story-node
      className="relative z-10 flex items-center justify-center"
      style={{
        width: 24,
        height: 24,
        transform: glow ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.25s ease',
        filter: glow
          ? 'drop-shadow(0 0 10px rgba(196,90,90,0.75))'
          : 'drop-shadow(0 0 5px rgba(216,180,119,0.4))',
      }}
      onMouseEnter={() => setGlow(true)}
      onMouseLeave={() => setGlow(false)}
      onClick={() => setGlow(!glow)}
      aria-label={`Memory ${index + 1}`}
    >
      <FilledHeart size={11} color={glow ? '#C45A5A' : '#D8B477'} />
    </button>
  );
}

export default function StoryTimelineItem({ event, index }: StoryTimelineItemProps) {
  const [glow, setGlow] = useState(false);
  const photoLeft = event.photoSide === 'left';

  return (
    <div data-story-item className="relative py-8 sm:py-10 lg:py-12 xl:py-14 first:lg:pt-4">
      {/* Mobile */}
      <div className="lg:hidden flex gap-4">
        <div className="flex flex-col items-center w-8 shrink-0 pt-1">
          <HeartNode index={index} glow={glow} setGlow={setGlow} />
        </div>

        <div className="flex-1 flex flex-col items-start gap-3 min-w-0">
          <p
            data-story-year
            className="font-sans"
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'rgba(216,180,119,0.75)',
            }}
          >
            {event.year}
          </p>

          <StoryPhoto
            src={event.image}
            alt={event.title}
            rotate={event.rotate}
            size={event.size}
          />

          <h3
            data-story-title
            className="font-serif"
            style={{
              fontSize: 'clamp(1.35rem, 5vw, 1.7rem)',
              color: '#F5E9D9',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {event.title}
          </h3>
          <p
            data-story-desc
            className="font-sans whitespace-pre-line"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,246,233,0.58)',
              lineHeight: 1.65,
              maxWidth: 320,
            }}
          >
            {event.description}
          </p>
        </div>
      </div>

      {/* Desktop editorial split */}
      <div className="hidden lg:grid grid-cols-[1fr_40px_1fr] gap-8 xl:gap-10 items-center">
        <div className={`flex ${photoLeft ? 'justify-end' : 'justify-start'}`}>
          {photoLeft ? (
            <StoryPhoto
              src={event.image}
              alt={event.title}
              rotate={event.rotate}
              size={event.size}
            />
          ) : (
            <StoryCopy event={event} align="right" />
          )}
        </div>

        <div className="flex justify-center">
          <HeartNode index={index} glow={glow} setGlow={setGlow} />
        </div>

        <div className={`flex ${photoLeft ? 'justify-start' : 'justify-end'}`}>
          {photoLeft ? (
            <StoryCopy event={event} align="left" />
          ) : (
            <StoryPhoto
              src={event.image}
              alt={event.title}
              rotate={event.rotate}
              size={event.size}
            />
          )}
        </div>
      </div>
    </div>
  );
}
