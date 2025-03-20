'use client';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ClientContent from '@/components/ClientContent';
import SubtopicReferences from '@/components/SubTopicReferences';
import { Topic, Subtopic } from '@/types';
import Header from '@/components/Header';
import { useMenu } from '@/hooks/MenuProvider';
import Overlay from './overlay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TopicPageClientProps {
  courseSlug: string;
  course: {
    topics: Topic[];
  };
  topicSlug: string;
  subtopicSlug: string;
  currentTopic: Topic;
  currentSubtopic: Subtopic;
  topicContent: {
    source: MDXRemoteSerializeResult;
    frontMatter: {
      title?: string;
      description?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
    content: string;
    highlights: string;
  };
  prevLink: { href: string; title: string } | null;
  nextLink: { href: string; title: string } | null;
}

export default function TopicPageClient({
  courseSlug,
  course,
  topicSlug,
  subtopicSlug,
  currentSubtopic,
  topicContent,
  prevLink,
  nextLink,
}: TopicPageClientProps) {
  const { isMenuOpen, closeMenu } = useMenu();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <aside
          className={`h-full shrink-0 overflow-y-auto border-r transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'w-[20%] min-w-64 opacity-100'
              : 'w-0 min-w-0 opacity-0'
          }`}
        >
          <Sidebar
            courseSlug={courseSlug}
            topics={course.topics}
            currentTopic={topicSlug}
            currentSubtopic={subtopicSlug}
          />
        </aside>

        <div className="relative flex-1 overflow-y-auto">
          <Header />
          <main className="flex-1 overflow-y-auto bg-white p-6 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-between">
                {!prevLink ? (
                  <Link
                    href={`/courses/${courseSlug}`}
                    className="flex items-center gap-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-blue-900 transition-colors hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-900/30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                    <span className="hidden md:inline">to Course Outline</span>
                  </Link>
                ) : (
                  <Link
                    href={prevLink.href}
                    className="flex items-center gap-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-blue-900 transition-colors hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-900/30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                    <span className="hidden md:inline">: {prevLink.title}</span>
                  </Link>
                )}
                {nextLink && (
                  <Link
                    href={nextLink.href}
                    className="flex items-center gap-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-blue-900 transition-colors hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-900/30"
                  >
                    Next
                    <span className="hidden md:inline">: {nextLink.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {currentSubtopic.title}
              </h3>

              <ClientContent
                source={topicContent.source}
                highlights={topicContent.highlights}
              />

              {currentSubtopic.references &&
                currentSubtopic.references.length > 0 && (
                  <SubtopicReferences references={currentSubtopic.references} />
                )}
            </div>
          </main>

          {/* Add overlay for mobile when menu is open */}
          {isMenuOpen && <Overlay closeMenu={closeMenu} />}
        </div>
      </div>
    </div>
  );
}
