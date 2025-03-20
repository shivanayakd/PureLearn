import { Quiz, QuizProps } from '@/components/quiz/Quiz';
import { useQuizProgress } from '@/components/quiz/QuizProvider';
import { useRouter } from 'next/router';

export function MDXQuiz({ questions }: Omit<QuizProps, 'onComplete'>) {
  const router = useRouter();
  const { updateQuizProgress } = useQuizProgress();

  // Extract the course topic ID from the URL path
  const topicId = router.asPath.split('/').pop() || '';

  const handleQuizComplete = (score: number, total: number) => {
    updateQuizProgress(topicId, score, total);
  };

  return <Quiz questions={questions} onComplete={handleQuizComplete} />;
}
