// src/hooks/useTopicNavigation.ts (client-side file)
'use client';

import { useMemo } from 'react';
import { getTopicNavigation } from '@/hooks/topicNavigationServer';
import { Topic, NavigationLink } from '@/types';

export function useTopicNavigation(
  courseSlug: string,
  topics: Topic[],
  currentTopicSlug: string,
  currentSubtopicSlug: string,
): { prevLink: NavigationLink; nextLink: NavigationLink } {
  return useMemo(() => {
    return getTopicNavigation(
      courseSlug,
      topics,
      currentTopicSlug,
      currentSubtopicSlug,
    );
  }, [courseSlug, topics, currentTopicSlug, currentSubtopicSlug]);
}
