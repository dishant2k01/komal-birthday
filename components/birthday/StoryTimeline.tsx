'use client';

import type { StoryEvent } from './StoryTimelineItem';
import StoryTimelineItem from './StoryTimelineItem';

interface StoryTimelineProps {
  events: readonly StoryEvent[];
}

export default function StoryTimeline({ events }: StoryTimelineProps) {
  return (
    <div data-story-timeline className="relative w-full">
      {/* Vertical champagne thread — mobile left rail */}
      <div
        className="absolute left-[15px] top-2 bottom-2 w-px lg:hidden origin-top"
        style={{ background: 'rgba(216,180,119,0.12)' }}
        aria-hidden="true"
      >
        <div
          data-story-line-mobile
          className="absolute inset-x-0 top-0 origin-top"
          style={{
            height: '100%',
            background: 'rgba(216,180,119,0.45)',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      {/* Vertical champagne thread — desktop center */}
      <div
        className="absolute hidden lg:block left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
        style={{ background: 'rgba(216,180,119,0.12)' }}
        aria-hidden="true"
      >
        <div
          data-story-line
          className="absolute inset-x-0 top-0 origin-top"
          style={{
            height: '100%',
            background: 'rgba(216,180,119,0.45)',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      <div
        className="relative z-[1] flex flex-col lg:gap-4 xl:gap-6 min-h-[min(72vh,720px)] lg:min-h-[min(78vh,780px)]"
        style={{ paddingTop: 60 }}
      >
        {events.map((event, i) => (
          <StoryTimelineItem
            key={`${event.year}-${event.title}`}
            event={event}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
