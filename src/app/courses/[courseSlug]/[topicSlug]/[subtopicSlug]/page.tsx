import { notFound } from 'next/navigation';
import { getCourseBySlug, getTopicContent } from '@/lib/mdx';
import { getTopicNavigation } from '@/hooks/topicNavigationServer';
import { Topic, Subtopic } from '@/types';
import TopicPageClient from '@/components/TopicPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    courseSlug: string;
    topicSlug: string;
    subtopicSlug: string;
  }>;
}) {
  const { courseSlug, topicSlug, subtopicSlug } = await params;

  const topicContent = await getTopicContent(
    courseSlug,
    topicSlug,
    subtopicSlug,
  );

  if (!topicContent) {
    return {
      title: 'Topic Not Found',
    };
  }

  return {
    title: topicContent.frontMatter.title,
    description: topicContent.frontMatter.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    courseSlug: string;
    topicSlug: string;
    subtopicSlug: string;
  }>;
}) {
  const { courseSlug, topicSlug, subtopicSlug } = await params;

  const course = await getCourseBySlug(courseSlug);
  const topicContent = await getTopicContent(
    courseSlug,
    topicSlug,
    subtopicSlug,
  );

  if (!course || !topicContent) {
    notFound();
  }

  // Use the server-compatible function instead of the hook
  const { prevLink, nextLink } = getTopicNavigation(
    courseSlug,
    course.topics,
    topicSlug,
    subtopicSlug,
  );

  // Find current topic and subtopic with proper typings
  const currentTopic = course.topics.find(
    (topic: Topic) => topic.slug === topicSlug,
  );
  const currentSubtopic = currentTopic?.subtopics.find(
    (subtopic: Subtopic) => subtopic.slug === subtopicSlug,
  );

  if (!currentTopic || !currentSubtopic) {
    notFound();
  }

  return (
    <TopicPageClient
      courseSlug={courseSlug}
      course={course}
      topicSlug={topicSlug}
      subtopicSlug={subtopicSlug}
      currentTopic={currentTopic}
      currentSubtopic={currentSubtopic}
      topicContent={topicContent}
      prevLink={prevLink}
      nextLink={nextLink}
    />
  );
}
