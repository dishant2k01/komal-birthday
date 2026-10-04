'use client';

interface GalleryNoteProps {
  text: string;
  className?: string;
}

export default function GalleryNote({ text, className = '' }: GalleryNoteProps) {
  return (
    <div
      data-gal-note
      className={`relative pointer-events-none ${className}`}
      style={{
        width: 138,
        padding: '16px 14px 18px',
        background: 'linear-gradient(155deg, #EFE2C4, #DDC89A)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
        transform: 'rotate(-8deg)',
        borderRadius: 1,
      }}
    >
      <p
        className="font-script whitespace-pre-line text-center leading-[1.2]"
        style={{ fontSize: '1.2rem', color: '#3A2018' }}
      >
        {text}
      </p>
    </div>
  );
}
