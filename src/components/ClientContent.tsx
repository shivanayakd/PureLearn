'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ClientContentProps } from '@/types';

// Use dynamic imports to ensure proper client-side loading
const MDXContent = dynamic(() => import('@/components/MDXContent'), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
  ),
});

const Highlights = dynamic(() => import('@/components/Highlights'), {
  ssr: false,
  loading: () => (
    <div className="h-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
  ),
});

export default function ClientContent({
  source,
  highlights,
}: ClientContentProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <div className="mb-8">
          <Suspense
            fallback={
              <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            }
          >
            {highlights && <Highlights content={highlights} />}
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          }
        >
          <MDXContent source={source} />
        </Suspense>
      </div>
    </div>
  );
}
