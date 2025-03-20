'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Course } from '@/types';

interface HomePageSidebarProps {
  courses: Course[] | undefined;
}

const HomePageSidebar = ({ courses }: HomePageSidebarProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li
              key={course.slug}
              className="border-b border-gray-100 dark:border-gray-800"
            >
              <Link
                href={`/courses/${course.slug}`}
                className="flex items-center justify-between px-4 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  <div className="ml-3">
                    <h3 className="my-0 text-sm font-bold text-gray-800 dark:text-gray-200">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {course.topics?.length || 0} topics
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No courses available yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePageSidebar;
