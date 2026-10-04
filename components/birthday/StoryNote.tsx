'use client';

import { RosePetal } from '@/components/cinematic-intro/Decorations';

interface StoryNoteProps {
  text: string;
}

export default function StoryNote({ text }: StoryNoteProps) {
  return (
    <div data-story-note className="relative inline-block pointer-events-none">
      <div
        className="relative"
        style={{
          padding: '16px 18px 18px',
          background:
            'linear-gradient(155deg, #E8D4B0 0%, #D9C089 45%, #C9A86E 100%)',
          boxShadow: '0 14px 32px rgba(0,0,0,0.4)',
          transform: 'rotate(-8deg)',
          borderRadius: 2,
          maxWidth: 170,
        }}
      >
        {/* Torn edge hint */}
        <div
          className="absolute -top-1 left-3 right-6 h-2"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, transparent 40%, #E8D4B0 41%), radial-gradient(ellipse at 60% 50%, transparent 40%, #E8D4B0 41%)',
            opacity: 0.9,
          }}
        />
        <p
          className="font-script whitespace-pre-line leading-[1.15]"
          style={{
            fontSize: 'clamp(1.15rem, 2.4vw, 1.4rem)',
            color: '#3E2218',
          }}
        >
          {text}
        </p>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.06,
            mixBlendMode: 'multiply',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
        className="absolute -right-3 -top-2"
        style={{ transform: 'rotate(25deg)', filter: 'blur(0.4px)' }}
      >
        <RosePetal size={22} tone="#8B3A4A" />
      </div>
      <div
        className="absolute -left-4 bottom-1"
        style={{ transform: 'rotate(-30deg)', opacity: 0.85 }}
      >
        <RosePetal size={18} tone="#6B2436" />
      </div>
    </div>
  );
}
