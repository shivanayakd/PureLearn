import { NavigationLink, Topic } from '@/types';

export function getTopicNavigation(
  courseSlug: string,
  topics: Topic[],
  currentTopicSlug: string,
  currentSubtopicSlug: string,
): { prevLink: NavigationLink; nextLink: NavigationLink } {
  const getCurrentTopicIndex = () => {
    return topics.findIndex((topic) => topic.slug === currentTopicSlug);
  };

  const getCurrentSubtopicIndex = () => {
    const topicIndex = getCurrentTopicIndex();
    if (topicIndex === -1) return -1;

    const topic = topics[topicIndex];
    return topic.subtopics.findIndex(
      (subtopic) => subtopic.slug === currentSubtopicSlug,
    );
  };

  const topicIndex = getCurrentTopicIndex();
  const subtopicIndex = getCurrentSubtopicIndex();

  if (topicIndex === -1 || subtopicIndex === -1) {
    return { prevLink: null, nextLink: null };
  }

  const currentTopic = topics[topicIndex];
  let prevLink: NavigationLink = null;
  let nextLink: NavigationLink = null;

  // Previous link logic
  if (subtopicIndex > 0) {
    // Previous subtopic in same topic
    prevLink = {
      href: `/courses/${courseSlug}/${currentTopicSlug}/${
        currentTopic.subtopics[subtopicIndex - 1].slug
      }`,
      title: currentTopic.subtopics[subtopicIndex - 1].title,
    };
  } else if (topicIndex > 0) {
    // Last subtopic of previous topic
    const prevTopic = topics[topicIndex - 1];
    const lastSubtopic = prevTopic.subtopics[prevTopic.subtopics.length - 1];
    prevLink = {
      href: `/courses/${courseSlug}/${prevTopic.slug}/${lastSubtopic.slug}`,
      title: lastSubtopic.title,
    };
  }

  // Next link logic
  if (subtopicIndex < currentTopic.subtopics.length - 1) {
    // Next subtopic in same topic
    nextLink = {
      href: `/courses/${courseSlug}/${currentTopicSlug}/${
        currentTopic.subtopics[subtopicIndex + 1].slug
      }`,
      title: currentTopic.subtopics[subtopicIndex + 1].title,
    };
  } else if (topicIndex < topics.length - 1) {
    // First subtopic of next topic
    const nextTopic = topics[topicIndex + 1];
    const firstSubtopic = nextTopic.subtopics[0];
    nextLink = {
      href: `/courses/${courseSlug}/${nextTopic.slug}/${firstSubtopic.slug}`,
      title: firstSubtopic.title,
    };
  }

  return { prevLink, nextLink };
}
