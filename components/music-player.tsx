'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoStart?: boolean;
}

export default function MusicPlayer({ autoStart = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio('/audio/birthday.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener('error', () => setAvailable(false));
    audioRef.current = audio;

    if (autoStart) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [autoStart]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-5 left-5 z-[58] flex items-center justify-center w-11 h-11 rounded-full"
      style={{
        background: 'rgba(30,11,18,0.72)',
        border: '1px solid rgba(216,180,119,0.28)',
        color: '#EBCF98',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      {playing ? <Pause size={16} /> : <Music size={16} />}
    </button>
  );
}
