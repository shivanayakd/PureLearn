'use client';

import React from 'react';
import Image from 'next/image';

type MDXImageProps = {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
};

const MDXImage = ({
  src,
  alt,
  title,
  width = 800,
  height = 500,
}: MDXImageProps) => {
  // Check if the image is a remote URL or a local path
  const isRemoteImage = src.startsWith('http://') || src.startsWith('https://');

  // For local images, prepend with / if they don't already start with /
  const imageSrc = isRemoteImage ? src : src.startsWith('/') ? src : `/${src}`;

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
        />
      </div>
      {title && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXImage;
