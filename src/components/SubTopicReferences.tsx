'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SubtopicReferencesProps } from '@/types';

const SubtopicReferences = ({ references }: SubtopicReferencesProps) => {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t-2 border-gray-200 pt-4 dark:border-gray-700">
      <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        External References
      </h4>
      <ul className="space-y-2">
        {references.map((reference, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline hover:text-blue-600 dark:hover:text-blue-400"
              tabIndex={0}
              title={reference.description || ''}
              aria-label={`External reference: ${reference.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.open(reference.url, '_blank');
                }
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>{reference.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubtopicReferences;
