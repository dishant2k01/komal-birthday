'use client';

import { useEffect, useState } from 'react';
import { birthdayData } from '@/lib/birthday-data';

export default function ChapterIndicator() {
  const [chapter, setChapter] = useState('01');
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      let currentChapter: string = birthdayData.nav[0].chapter;
      for (const item of birthdayData.nav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4) currentChapter = item.chapter;
      }
      setChapter(currentChapter);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile top progress */}
      <div
        className="fixed top-0 left-0 right-0 z-[55] h-[2px] lg:hidden"
        style={{ background: 'rgba(216,180,119,0.12)' }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #D8B477)',
          }}
        />
      </div>

      {/* Top bar */}
      {/* <header className="fixed top-0 inset-x-0 z-[56] pointer-events-none">
        <div className="page-shell flex items-center justify-between py-4 lg:py-5">
          <button
            type="button"
            onClick={() => go('hero')}
            className="pointer-events-auto font-serif text-2xl"
            style={{ color: 'rgba(216,180,119,0.75)' }}
            aria-label="Home"
          >
            K
          </button>

          <nav className="hidden lg:flex pointer-events-auto items-center gap-6">
            {birthdayData.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="font-sans text-[11px] uppercase tracking-[0.22em] transition-colors"
                style={{ color: 'rgba(255,246,233,0.45)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#EBCF98';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    'rgba(255,246,233,0.45)';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <p
              className="hidden sm:block font-sans text-[10px] tracking-[0.28em]"
              style={{ color: 'rgba(216,180,119,0.55)' }}
            >
              ♡  {birthdayData.date}
            </p>
            <button
              type="button"
              className="lg:hidden font-sans text-[11px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(235,207,152,0.7)' }}
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header> */}

      {/* Desktop chapter rail */}
      <aside
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-serif text-lg"
          style={{ color: 'rgba(216,180,119,0.7)' }}
        >
          {chapter}
        </span>
        <div
          className="w-px h-28 relative overflow-hidden"
          style={{ background: 'rgba(216,180,119,0.15)' }}
        >
          <div
            className="absolute left-0 top-0 w-full origin-top"
            style={{
              height: `${progress * 100}%`,
              background: '#D8B477',
            }}
          />
        </div>
        <span
          className="font-sans text-[9px] tracking-[0.2em]"
          style={{ color: 'rgba(185,170,162,0.45)' }}
        >
          07
        </span>
      </aside>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center lg:hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(75,27,39,0.55), #100709 70%)',
          }}
        >
          <button
            type="button"
            className="absolute top-5 right-5 font-sans text-xs tracking-[0.25em] uppercase"
            style={{ color: '#EBCF98' }}
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          <div className="flex flex-col items-center gap-6">
            {birthdayData.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="font-serif text-3xl"
                style={{ color: '#FFF6E9' }}
              >
                <span
                  className="font-sans text-xs tracking-[0.25em] mr-3"
                  style={{ color: 'rgba(216,180,119,0.55)' }}
                >
                  {item.chapter}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
