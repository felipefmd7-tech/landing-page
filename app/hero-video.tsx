'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = false;
    const sync = () => {
      if (
        visible &&
        !document.hidden &&
        !reduced.matches &&
        !connection?.saveData &&
        !pausedByUser.current
      ) {
        if (!video.getAttribute('src'))
          video.src = '/media/fermentacao-loop.mp4';
        void video.play().catch(() => {
          /* Keep the poster and offer manual play. */
        });
      } else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      pausedByUser.current = true;
      video.pause();
    } else {
      pausedByUser.current = false;
      if (!video.getAttribute('src')) video.src = '/media/fermentacao-loop.mp4';
      void video.play().catch(() => {
        /* A blocked attempt leaves the play control available. */
      });
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="hero-film"
        poster="/media/fermentacao-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      <div className="hero-shade" aria-hidden="true" />
      {!failed && (
        <button
          type="button"
          className="film-toggle"
          onClick={toggle}
          aria-label={
            playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'
          }
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
          <span>{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span>
        </button>
      )}
    </>
  );
}
