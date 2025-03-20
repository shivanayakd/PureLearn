'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { HomePageClientProps } from '@/types';
import Sidebar from './Sidebar';
import { useMenu } from '@/hooks/MenuProvider';

export default function HomePageClient({ courses }: HomePageClientProps) {
  const { isMenuOpen } = useMenu();
  console.log('🚀 ~ isMenuOpen:', isMenuOpen);
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <aside
          className={`${isMenuOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'} h-full shrink-0 overflow-y-auto border-r transition-all duration-300 ease-in-out`}
        >
          <Sidebar
            courseSlug={'PureLearn'}
            topics={[]}
            currentTopic={''}
            currentSubtopic={''}
          />
        </aside>

        <div className="flex-1 overflow-y-auto">
          <Header title={'PureLearn'} />
          <main className="flex-1 overflow-y-auto bg-white p-6 dark:bg-gray-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
              Available Courses
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.topics?.length || 0} topics
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      Start Learning
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No courses available yet.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
