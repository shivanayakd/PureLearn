'use client';

import React from 'react';

type MDXVideoProps = {
  src: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  caption?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
};

const MDXVideo = ({
  src,
  title = 'Video content',
  width = '100%',
  height = 'auto',
  caption,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  poster,
}: MDXVideoProps) => {
  // Check if the source is a remote URL or a local path
  const isRemoteUrl = src.startsWith('http://') || src.startsWith('https://');

  // For local videos, prepend with / if they don't already start with /
  const videoSrc = isRemoteUrl ? src : src.startsWith('/') ? src : `/${src}`;

  // Check if it's a YouTube or Vimeo URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');

  // Get embed URL for YouTube/Vimeo
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  // Prepare poster path for local videos
  const posterPath =
    poster && !poster.startsWith('http')
      ? poster.startsWith('/')
        ? poster
        : `/${poster}`
      : poster;

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        {isYouTube || isVimeo ? (
          <iframe
            src={getEmbedUrl(src)}
            title={title}
            width={width}
            height={height || 415}
            allowFullScreen
            className="aspect-video w-full border-0"
          />
        ) : (
          <video
            src={videoSrc}
            width={width}
            height={height}
            controls={controls}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            poster={posterPath}
            className="w-full rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXVideo;
