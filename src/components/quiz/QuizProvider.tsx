'use client';

import { QuizContextValue, SectionProgress, QuizProgress } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const [sectionProgress, setSectionProgress] = useState<SectionProgress>({});

  // Load quiz progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('courseQuizProgress');
    const savedSectionProgress = localStorage.getItem('courseSectionProgress');

    if (savedProgress) {
      try {
        setQuizProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to parse quiz progress from localStorage', error);
      }
    }

    if (savedSectionProgress) {
      try {
        setSectionProgress(JSON.parse(savedSectionProgress));
      } catch (error) {
        console.error(
          'Failed to parse section progress from localStorage',
          error,
        );
      }
    }
  }, []);

  // Save quiz progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courseQuizProgress', JSON.stringify(quizProgress));
  }, [quizProgress]);

  // Save section progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'courseSectionProgress',
      JSON.stringify(sectionProgress),
    );
  }, [sectionProgress]);

  const updateQuizProgress = (
    topicId: string,
    score: number,
    total: number,
  ) => {
    setQuizProgress((prev) => ({
      ...prev,
      [topicId]: {
        completed: true,
        score,
        total,
      },
    }));
  };

  const resetQuizProgress = (topicId: string) => {
    setQuizProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[topicId];
      return newProgress;
    });
  };

  const resetAllQuizProgress = () => {
    setQuizProgress({});
  };

  // New function to check if all subtopics in a topic are completed
  const checkTopicCompletion = (
    courseSlug: string,
    topicSlug: string,
    subtopicSlugs: string[],
  ) => {
    // If there are no subtopics, return false
    if (!subtopicSlugs || subtopicSlugs.length === 0) return false;

    // Check if all subtopics are completed
    return subtopicSlugs.every((subtopicSlug) => {
      const subtopicId = `${courseSlug}/${topicSlug}/${subtopicSlug}`;
      return !!sectionProgress[subtopicId];
    });
  };

  const markSectionCompleted = (sectionId: string) => {
    console.log(`Marking section completed: ${sectionId}`);
    setSectionProgress((prev) => {
      const newProgress = {
        ...prev,
        [sectionId]: true,
      };
      // Debug log to verify the updated state
      console.log('Updated section progress:', newProgress);
      return newProgress;
    });
  };

  const resetSectionProgress = () => {
    setSectionProgress({});
  };

  return (
    <QuizContext.Provider
      value={{
        quizProgress,
        sectionProgress,
        markSectionCompleted,
        checkTopicCompletion,
        resetSectionProgress,
        updateQuizProgress,
        resetQuizProgress,
        resetAllQuizProgress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizProgress() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizProgress must be used within a QuizProvider');
  }
  return context;
}
