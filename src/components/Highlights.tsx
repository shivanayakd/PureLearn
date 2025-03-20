'use client';

import { HighlightsProps } from '@/types';
import { useState, useEffect } from 'react';

export default function Highlights({ content }: HighlightsProps) {
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    // Directly extract bullet points from the content
    const bulletPoints = content
      .split('\n')
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => line.trim().substring(2));

    setHighlights(bulletPoints);
  }, [content]);

  if (highlights.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-200/75 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mt-1 mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        Key Points
      </h3>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs font-medium text-white">
              {index + 1}
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
