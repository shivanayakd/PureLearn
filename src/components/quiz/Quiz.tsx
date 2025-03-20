import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizProps } from '@/types';

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
      onComplete?.(
        score +
          (selectedOption === questions[currentQuestion].correctAnswer ? 1 : 0),
        questions.length,
      );
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const finalScore =
      score +
      (selectedOption === questions[currentQuestion].correctAnswer ? 1 : 0);
    return (
      <div className="rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold">Quiz Completed!</h3>
        <div className="mb-4">
          <p className="text-lg">
            Your score: <span className="font-bold">{finalScore}</span> out of{' '}
            {questions.length}
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            {finalScore === questions.length
              ? 'Perfect score! Excellent work!'
              : finalScore >= questions.length * 0.7
                ? "Great job! You've got a good understanding of the topic."
                : 'Keep learning! Review the material and try again.'}
          </p>
        </div>
        <Button onClick={handleRestart}>Restart Quiz</Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Quiz</h3>
        <span className="text-muted-foreground text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-lg">{currentQ.question}</p>

        <div className="space-y-2">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={cn(
                'w-full rounded-md border p-3 text-left transition-colors',
                'hover:bg-muted/50 focus:ring-primary/50 focus:ring-2 focus:outline-none',
                selectedOption === index &&
                  index === currentQ.correctAnswer &&
                  'border-green-500 bg-green-100',
                selectedOption === index &&
                  index !== currentQ.correctAnswer &&
                  'border-red-500 bg-red-100',
                selectedOption !== null &&
                  index === currentQ.correctAnswer &&
                  'border-green-500 bg-green-100',
              )}
              disabled={selectedOption !== null}
              aria-disabled={selectedOption !== null}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption !== null &&
                  (index === currentQ.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : selectedOption === index ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : null)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && currentQ.explanation && (
        <div
          className={cn(
            'mb-4 rounded-md p-3',
            selectedOption === currentQ.correctAnswer
              ? 'bg-green-50 text-green-800'
              : 'bg-amber-50 text-amber-800',
          )}
        >
          <p className="mb-1 font-medium">
            {selectedOption === currentQ.correctAnswer
              ? 'Correct!'
              : 'Incorrect!'}
          </p>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          Score: {score}
          {selectedOption === currentQ.correctAnswer ? ' + 1' : ''} /{' '}
          {questions.length}
        </div>
        <Button onClick={handleNextQuestion} disabled={selectedOption === null}>
          {currentQuestion < questions.length - 1
            ? 'Next Question'
            : 'Finish Quiz'}
        </Button>
      </div>
    </div>
  );
}
