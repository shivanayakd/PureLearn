'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuizProgress } from './quiz/QuizProvider';
import { Check, Heart, Home, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { SidebarProps } from '@/types';
export default function Sidebar({
  courseSlug,
  topics,
  currentTopic,
  currentSubtopic,
}: SidebarProps) {
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
      if (topic) {
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

  return (
    <div className="h-full w-full overflow-y-auto border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 p-4">
        <Link href="/">
          <Home className="h-6 w-6" />
        </Link>
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          {courseSlug}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <Link
          href={`/courses/${courseSlug}`}
          className="text-lg font-semibold text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
        >
          {/* {topics.length > 0 ? topics[0].title.split(" ")[0] : courseSlug} */}
          Course Outline
        </Link>

        <Button
          onClick={() => resetSectionProgress(courseSlug)}
          variant="outline"
          size="icon"
          aria-label="Reset Progress"
          title="Reset Progress"
          className="h-8 w-8 bg-gray-200 p-0 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
      <nav className="mt-2">
        <ul className="space-y-1">
          {topics.map((topic) => (
            <li key={topic.slug} className="px-2">
              <div
                className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-2 ${
                  isActive(topic.slug)
                    ? 'bg-gray-200 dark:bg-gray-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => toggleTopic(topic.slug)}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {topic.title}
                  {/* Add checkmark for completed topics */}
                  {isCompleted(topic.slug) && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    expandedTopics[topic.slug] ? 'rotate-180 transform' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {expandedTopics[topic.slug] && (
                <ul className="mt-1 ml-4 space-y-1">
                  {topic.subtopics.map((subtopic) => (
                    <li key={subtopic.slug}>
                      <Link
                        href={`/courses/${courseSlug}/${topic.slug}/${subtopic.slug}`}
                        className={`block rounded-md px-2 py-1.5 text-sm ${
                          isActive(topic.slug, subtopic.slug)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {subtopic.title}
                          {/* Add checkmark for completed subtopics */}
                          {isCompleted(topic.slug, subtopic.slug) && (
                            <Check className="h-4 w-4 font-bold text-green-500" />
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <footer className="border-t border-gray-200 p-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        Built with{' '}
        <a
          href="https://github.com/shivanayakd/purelearn"
          className="text-blue-600 hover:underline dark:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          PureLearn
        </a>{' '}
        Theme{' '}
        <Heart
          className="inline-block h-3 w-3 text-red-600"
          fill="currentColor"
        />
      </footer>
    </div>
  );
}
