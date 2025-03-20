import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Subtopic = {
  title: string;
  slug: string;
  references?: Reference[];
};

export type Reference = {
  title: string;
  url: string;
  description?: string;
};

export type Quiz = {
  questions: Question[];
};

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type Topic = {
  slug: string;
  title: string;
  subtopics: Subtopic[];
};

export type NavigationLink = {
  href: string;
  title: string;
} | null;

// Add section completion tracking
export type SectionProgress = {
  [sectionId: string]: boolean;
};

/* eslint-disable no-unused-vars */
export type QuizContextValue = {
  quizProgress: QuizProgress;
  sectionProgress: SectionProgress;
  updateQuizProgress: (topicId: string, score: number, total: number) => void;
  markSectionCompleted: (sectionId: string) => void;
  resetQuizProgress: (topicId: string) => void;
  resetAllQuizProgress: () => void;
  resetSectionProgress: (sectionId: string) => void;
  checkTopicCompletion: (
    courseSlug: string,
    topicSlug: string,
    subtopicSlugs: string[],
  ) => boolean;
};
/* eslint-enable no-unused-vars */

export type QuizProgress = {
  [topicId: string]: {
    completed: boolean;
    score: number;
    total: number;
  };
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export type QuizProps = {
  questions: QuizQuestion[];
  // eslint-disable-next-line no-unused-vars
  onComplete?: (score: number, total: number) => void;
};

export type ShareDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
};

export type InlineCodeProps = {
  children: React.ReactNode;
};

export type HeadingProps = {
  children: React.ReactNode;
  id?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  topics: Topic[];
  currentTopic?: string;
  currentSubtopic?: string;
};

export type CodeBlockProps = {
  children: React.ReactNode;
  language: string;
  theme?: string;
};

export type SubtopicReferencesProps = {
  references?: Reference[];
};

export type SubtopicType = {
  title: string;
  slug: string;
};

export type TopicType = {
  title: string;
  slug: string;
  subtopics: SubtopicType[];
};

export type SidebarProps = {
  courseSlug: string;
  topics: TopicType[];
  currentTopic?: string;
  currentSubtopic?: string;
};

export type MobileSidebarWrapperProps = {
  courseSlug?: string;
  topics?: Topic[];
  currentTopic?: string;
  currentSubtopic?: string;
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
};

export type HomePageClientProps = {
  courses: Course[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  topics?: Topic[];
  updatedAt?: string;
  authorCount?: number;
  estimatedTime?: string;
};

export type HomeMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
};

export type HighlightsProps = {
  content: string;
};

export type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export type CoursePageClientProps = {
  course: Course;
  courseSlug: string;
  currentTopic?: string;
  currentSubtopic?: string;
};

export type ClientContentProps = {
  source: MDXRemoteSerializeResult;
  highlights: string | null;
};

export type MenuContextValue = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};
