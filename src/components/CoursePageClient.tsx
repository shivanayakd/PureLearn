'use client';

import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { CoursePageClientProps, Subtopic, Topic } from '@/types';
import Header from './Header';
import { useMenu } from '@/hooks/MenuProvider';
import Overlay from './overlay';
export default function CoursePageClient({
  course,
  courseSlug,
  currentTopic,
  currentSubtopic,
}: CoursePageClientProps) {
  const { isMenuOpen, closeMenu } = useMenu();
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <aside
          className={`${isMenuOpen ? 'w-[20%] min-w-64 opacity-100' : 'w-0 opacity-0'} h-full shrink-0 overflow-y-auto border-r transition-all duration-300 ease-in-out`}
        >
          <Sidebar
            courseSlug={courseSlug}
            topics={course.topics || []}
            currentTopic={currentTopic}
            currentSubtopic={currentSubtopic}
          />
        </aside>

        {/* Add overlay for mobile when menu is open */}
        {isMenuOpen && <Overlay closeMenu={closeMenu} />}

        <div className="flex-1 overflow-y-auto">
          <Header />
          <main className="flex-1 overflow-y-auto bg-white p-6 dark:bg-gray-900">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                {course.description}
              </p>

              <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Course Syllabus
              </h2>

              <div className="space-y-6">
                {course.topics?.map((topic: Topic, topicIndex: number) => (
                  <div
                    key={topic.slug}
                    className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                  >
                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      {topicIndex + 1}. {topic.title}
                    </h3>
                    <ul className="ml-6 space-y-2">
                      {topic.subtopics.map(
                        (subtopic: Subtopic, subtopicIndex: number) => (
                          <li
                            key={subtopic.slug}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            <Link
                              href={`/courses/${courseSlug}/${topic.slug}/${subtopic.slug}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {topicIndex + 1}.{subtopicIndex + 1}{' '}
                              {subtopic.title}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
