'use client';

import { useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CinematicIntro from '@/components/cinematic-intro';
import BirthdayExperience from '@/components/birthday/BirthdayExperience';

type Stage = 'intro' | 'main';

const emptySubscribe = () => () => {};

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro');
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const transitioning = useRef(false);

  const handleSurpriseClick = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    setStage('main');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      transitioning.current = false;
    }, 500);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <CinematicIntro onReveal={handleSurpriseClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'main' && <BirthdayExperience startMusic />}
    </>
  );
}
