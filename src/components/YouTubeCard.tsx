import { useState, useCallback } from 'react';
import './YouTubeCard.css';

// Ordered fallback chain — stop at first successful load
const THUMB_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'] as const;

interface YouTubeCardProps {
  videoId: string;
  /** Overrides all YouTube thumbnails when provided */
  customPosterUrl?: string;
  title?: string;
}

export default function YouTubeCard({
  videoId,
  customPosterUrl,
  title = 'Watch DeViz',
}: YouTubeCardProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbIdx, setThumbIdx] = useState(0);

  const imgSrc = customPosterUrl
    ? customPosterUrl
    : `https://img.youtube.com/vi/${videoId}/${THUMB_QUALITIES[thumbIdx]}.jpg`;

  const handlePlay = useCallback(() => setPlaying(true), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setPlaying(true);
      }
    },
    []
  );

  // Walk down the quality chain on each 404; stop at the last entry
  const handleImgError = useCallback(() => {
    if (!customPosterUrl && thumbIdx < THUMB_QUALITIES.length - 1) {
      setThumbIdx((i) => i + 1);
    }
  }, [customPosterUrl, thumbIdx]);

  const iframeSrc =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="yt-card">
      {playing ? (
        <iframe
          className="yt-card__iframe"
          src={iframeSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div
          className="yt-card__poster"
          role="button"
          tabIndex={0}
          aria-label={`Play video: ${title}`}
          onClick={handlePlay}
          onKeyDown={handleKeyDown}
        >
          {/* Thumbnail — scale(1.03) hides letterbox bars on sddefault/hqdefault */}
          <img
            className="yt-card__thumb"
            src={imgSrc}
            alt=""
            onError={handleImgError}
            draggable={false}
          />

          {/* Cinematic vignette + bottom gradient for label legibility */}
          <div className="yt-card__vignette" aria-hidden="true" />

          {/* Top-left branded chip */}
          <div className="yt-card__chip" aria-hidden="true">
            <span className="yt-card__chip-dot" />
            DeViz Demo
          </div>

          {/* Centered play button */}
          <div className="yt-card__play-wrap" aria-hidden="true">
            <div className="yt-card__play-btn">
              <svg
                className="yt-card__play-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom-left title label */}
          <div className="yt-card__label" aria-hidden="true">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ flexShrink: 0 }}
              aria-hidden="true"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {title}
          </div>
        </div>
      )}
    </div>
  );
}
