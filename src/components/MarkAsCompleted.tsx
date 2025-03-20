'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useQuizProgress } from '@/components/quiz/QuizProvider';
import { usePathname } from 'next/navigation';

export function MarkAsCompleted() {
  const pathname = usePathname();
  const { sectionProgress, markSectionCompleted } = useQuizProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Format the section ID to match the format used in Sidebar
  // Expected format: courseSlug/topicSlug or courseSlug/topicSlug/subtopicSlug
  const sectionId = pathname?.startsWith('/')
    ? pathname.substring(1) // Remove leading slash
    : pathname || '';

  // Check if the current section is already marked as completed
  useEffect(() => {
    if (sectionId) {
      // Make sure we're using the correct format that matches with Sidebar.tsx
      const formattedSectionId = sectionId.startsWith('courses/')
        ? sectionId.substring(8) // Remove 'courses/' prefix if present
        : sectionId;

      setIsCompleted(!!sectionProgress[formattedSectionId]);
      console.log('Current sectionId:', formattedSectionId);
      console.log('Is completed?', !!sectionProgress[formattedSectionId]);
      console.log('Current sectionProgress:', sectionProgress);
    }
  }, [sectionId, sectionProgress]);

  const handleMarkCompleted = () => {
    // Format the sectionId the same way as in the useEffect
    const formattedSectionId = sectionId.startsWith('courses/')
      ? sectionId.substring(8)
      : sectionId;

    console.log('Marking as completed:', formattedSectionId);
    markSectionCompleted(formattedSectionId);
    // Note: No need to set isCompleted here as the useEffect will update
    // when sectionProgress changes
  };

  return (
    <div className="my-8 flex justify-end">
      {isCompleted ? (
        <div className="flex items-center rounded-md border border-green-200 bg-green-50 px-4 py-2 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
          <Check className="mr-2 h-5 w-5" />
          <span>Section Completed</span>
        </div>
      ) : (
        <Button
          onClick={handleMarkCompleted}
          className="flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          Mark as Completed
        </Button>
      )}
    </div>
  );
}
