'use client';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ClientContent from '@/components/ClientContent';
import SubtopicReferences from '@/components/SubTopicReferences';
import { Topic, Subtopic } from '@/types';
import Header from '@/components/Header';
import { useMenu } from '@/hooks/MenuProvider';

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
  const { isMenuOpen } = useMenu();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <aside
          className={`${isMenuOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'} h-full shrink-0 overflow-y-auto border-r transition-all duration-300 ease-in-out`}
        >
          <Sidebar
            courseSlug={courseSlug}
            topics={course.topics}
            currentTopic={topicSlug}
            currentSubtopic={subtopicSlug}
          />
        </aside>

        <div className="flex-1 overflow-y-auto">
          <Header title={topicContent.frontMatter.title} />
          <main className="flex-1 overflow-y-auto bg-white p-6 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-between">
                {!prevLink ? (
                  <Link
                    href={`/courses/${courseSlug}`}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    ← Back to Course Outline
                  </Link>
                ) : (
                  <Link
                    href={prevLink.href}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    ← Previous: {prevLink.title}
                  </Link>
                )}
                {nextLink && (
                  <Link
                    href={nextLink.href}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Next: {nextLink.title} →
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
        </div>
      </div>
    </div>
  );
}
