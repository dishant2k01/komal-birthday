'use client';

import { useEffect } from 'react';
import { ensureGsap } from '@/lib/gsap-utils';
import FilmGrain from './FilmGrain';
import ChapterIndicator from './ChapterIndicator';
import BirthdayHero from './BirthdayHero';
import LetterSection from './LetterSection';
import OurStorySection from './OurStorySection';
import MemoryGallerySection from './MemoryGallerySection';
import LittleThingsSection from './LittleThingsSection';
import WishSection from './WishSection';
import FinalSurpriseSection from './FinalSurpriseSection';
import CinematicFooter from './CinematicFooter';
import MusicPlayer from '@/components/music-player';

interface BirthdayExperienceProps {
  startMusic?: boolean;
}

export default function BirthdayExperience({
  startMusic = false,
}: BirthdayExperienceProps) {
  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(t);
      // Only kill triggers created for this experience page
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative birthday-surface text-[var(--ivory)]">
      <FilmGrain />
      <ChapterIndicator />
      <MusicPlayer autoStart={startMusic} />
      <BirthdayHero />
      <LetterSection />
      <OurStorySection />
      <MemoryGallerySection />
      <LittleThingsSection />
      <WishSection />
      <FinalSurpriseSection />
      <CinematicFooter />
    </div>
  );
}
