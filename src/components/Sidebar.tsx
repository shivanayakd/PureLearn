'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuizProgress } from './quiz/QuizProvider';
import {
  Check,
  Heart,
  RotateCcw,
  ChevronDown,
  FileText,
  Circle,
  MenuSquare,
} from 'lucide-react';
import { Button } from './ui/button';
import { SidebarProps } from '@/types';
import HomePageSidebar from './HomePageSidebar';

export default function Sidebar({
  courseSlug,
  topics,
  currentTopic,
  currentSubtopic,
  courses,
}: SidebarProps) {
  // Determine if we're showing course list or course content
  const showCourseList = !topics || topics.length === 0;
  const {
    sectionProgress,
    quizProgress,
    checkTopicCompletion,
    resetSectionProgress,
  } = useQuizProgress();

  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    topics.reduce(
      (acc, topic) => {
        acc[topic.slug] = currentTopic === topic.slug;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  // Helper function to determine if a topic/subtopic is completed
  const isCompleted = (topicSlug: string, subtopicSlug?: string) => {
    // If it's a subtopic, check directly in sectionProgress
    if (subtopicSlug) {
      const sectionId = `${courseSlug}/${topicSlug}/${subtopicSlug}`;

      // Check if section is marked as completed
      if (sectionProgress[sectionId]) {
        return true;
      }

      // For subtopics with quizzes, check if quiz is completed
      if (quizProgress[sectionId]?.completed) {
        return true;
      }

      return false;
    }
    // If it's a topic (no subtopicSlug)
    else {
      const sectionId = `${courseSlug}/${topicSlug}`;

      // Direct check: if the topic is explicitly marked as completed
      if (sectionProgress[sectionId]) {
        return true;
      }

      // If the topic has a quiz that's completed
      if (quizProgress[sectionId]?.completed) {
        return true;
      }

      // Check if all subtopics are completed
      const topic = topics.find((t) => t.slug === topicSlug);
      if (topic && topic.subtopics.length > 0) {
        const subtopicSlugs = topic.subtopics.map((st) => st.slug);
        return checkTopicCompletion(courseSlug, topicSlug, subtopicSlugs);
      }

      return false;
    }
  };

  const toggleTopic = (topicSlug: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicSlug]: !prev[topicSlug],
    }));
  };

  const isActive = (topicSlug: string, subtopicSlug?: string) => {
    if (subtopicSlug) {
      return currentTopic === topicSlug && currentSubtopic === subtopicSlug;
    }
    return currentTopic === topicSlug;
  };

  const hasQuiz = (topicSlug: string, subtopicSlug: string) => {
    const sectionId = `${courseSlug}/${topicSlug}/${subtopicSlug}`;
    return quizProgress[sectionId] !== undefined;
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Course Outline Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center">
          {showCourseList ? (
            <div className="py-3 text-sm font-bold tracking-wide text-gray-600 uppercase dark:text-gray-300">
              Pure Learn
            </div>
          ) : (
            <>
              <MenuSquare className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Link
                href={`/courses/${courseSlug}`}
                className="text-sm font-medium tracking-wide text-gray-600 uppercase hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Course Outline
              </Link>
            </>
          )}
        </div>

        {/* Only show reset button in course content view */}
        {!showCourseList && (
          <Button
            onClick={() => resetSectionProgress(courseSlug)}
            variant="ghost"
            size="icon"
            aria-label="Reset Progress"
            title="Reset Progress"
            className="h-7 w-7 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Content area - conditionally show course list or topic navigation */}
      {showCourseList ? (
        <HomePageSidebar courses={courses} />
      ) : (
        <nav className="mt-1">
          <ul className="space-y-px">
            {topics.map((topic) => {
              const isTopicCompleted = isCompleted(topic.slug);

              return (
                <li key={topic.slug} className="mb-1">
                  <div
                    className={`flex cursor-pointer items-center justify-between px-4 py-3 ${
                      isActive(topic.slug) && !expandedTopics[topic.slug]
                        ? 'bg-gray-200 text-gray-900'
                        : expandedTopics[topic.slug]
                          ? 'bg-gray-200 text-black'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => toggleTopic(topic.slug)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={expandedTopics[topic.slug]}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && toggleTopic(topic.slug)
                    }
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {isTopicCompleted ? (
                        <Circle
                          className="h-4 w-4 text-gray-500"
                          fill="currentColor"
                        />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                      <span>{topic.title}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedTopics[topic.slug] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedTopics[topic.slug] && (
                    <ul className="dark:bg-gray-850 bg-gray-50 py-1 dark:border-gray-800">
                      {topic.subtopics.map((subtopic) => {
                        const subtopicCompleted = isCompleted(
                          topic.slug,
                          subtopic.slug,
                        );
                        const hasQuizSection = hasQuiz(
                          topic.slug,
                          subtopic.slug,
                        );
                        const isActiveSubtopic = isActive(
                          topic.slug,
                          subtopic.slug,
                        );

                        return (
                          <li key={subtopic.slug}>
                            <Link
                              href={`/courses/${courseSlug}/${topic.slug}/${subtopic.slug}`}
                              className={`flex items-center px-6 py-3 transition-colors ${
                                isActiveSubtopic
                                  ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                              }`}
                              tabIndex={0}
                            >
                              <span className="mr-2">
                                {subtopicCompleted ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                                )}
                              </span>
                              <span className="flex-1">{subtopic.title}</span>
                              {hasQuizSection && (
                                <FileText className="ml-2 h-3.5 w-3.5 text-gray-400" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 px-4 py-3 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <div className="flex items-center justify-center gap-1">
          <span>Built with</span>
          <Link
            href="https://github.com/shivanayakd/purelearn"
            className="font-medium text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
          >
            PureLearn
          </Link>
          <span>Theme</span>
          <Heart className="h-3 w-3 text-red-600" fill="currentColor" />
        </div>
      </footer>
    </div>
  );
}
