'use client';

import React, { useMemo, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useTheme } from 'next-themes';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

// Import smaller components
import CodeBlock from './mdx/CodeBlock';
import InlineCode from './mdx/InlineCode';
import Heading from './mdx/Heading';
import { Quiz } from './quiz/Quiz';
import { MarkAsCompleted } from './MarkAsCompleted';

type MDXContentProps = {
  source: MDXRemoteSerializeResult;
};

export default function MDXContent({ source }: MDXContentProps) {
  const { theme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // Apply body styles to prevent scrolling when in fullscreen
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Filter out the Highlights section from the MDX content
  const filteredSource = useMemo(() => {
    const modifiedSource = { ...source };
    if (modifiedSource.compiledSource) {
      // Remove the Highlights section and its bullet points
      modifiedSource.compiledSource = modifiedSource.compiledSource.replace(
        /## Highlights\s+(?:-[^\n]*\n?)+/g,
        '',
      );
    }
    return modifiedSource;
  }, [source]);

  // MDX components configuration
  const components = {
    // Text components
    p: ({ children }: { children: React.ReactNode }) => (
      <ParagraphWrapper>{children}</ParagraphWrapper>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
      <div className="my-8">{children}</div>
    ),

    // Code components
    code: (props: { className?: string; children: React.ReactNode }) => {
      const { className, children } = props;
      const match = /language-(\w+)/.exec(className || '');

      if (match) {
        return (
          <CodeBlock language={match[1]} theme={theme}>
            {children}
          </CodeBlock>
        );
      }
      return <InlineCode>{children}</InlineCode>;
    },

    // Heading components with features
    h1: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={1} {...props} />
    ),
    h2: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={2} {...props} />
    ),
    h3: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={3} {...props} />
    ),
    h4: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={4} {...props} />
    ),
    h5: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={5} {...props} />
    ),
    h6: (props: { children: React.ReactNode; id?: string }) => (
      <Heading level={6} {...props} />
    ),

    // Add Quiz component to be used in MDX
    Quiz: (props: {
      questions: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
        explanation?: string;
      }>;
    }) => {
      return (
        <Quiz
          questions={props.questions}
          onComplete={(score, total) => {
            // You can add course progress tracking here if needed
            console.log(`Quiz completed with score: ${score}/${total}`);
          }}
        />
      );
    },

    // Add the MarkAsCompleted component to the MDX components
    MarkAsCompleted: () => <MarkAsCompleted />,
  };

  return (
    <div className="relative">
      <FullscreenButton
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <div
        className={`prose prose-gray dark:prose-invert prose-headings:mb-6 prose-headings:mt-8 prose-p:my-6 prose-li:my-2 prose-ul:my-6 prose-ol:my-6 max-w-none transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-0 z-40 overflow-y-auto bg-white p-8 dark:bg-gray-900'
            : ''
        }`}
      >
        <MDXRemote {...filteredSource} components={components} />
        <MarkAsCompleted />
      </div>
    </div>
  );
}

// Helper component for paragraph wrapping logic
function ParagraphWrapper({ children }: { children: React.ReactNode }) {
  // Check if children contains a pre element or code block
  const childrenArray = React.Children.toArray(children);

  // If there's only one child and it's a code block, don't wrap in p
  if (childrenArray.length === 1) {
    const child = childrenArray[0];
    if (
      React.isValidElement(child) &&
      (child.type === 'pre' ||
        child.type === 'code' ||
        (typeof child.type === 'function' &&
          child.type.name === 'SyntaxHighlighter'))
    ) {
      return <>{children}</>;
    }
  }

  // Check if any child is a pre element
  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === 'pre') {
      // If we find a pre element, render all children without p wrapper
      return <>{children}</>;
    }
  }

  // Otherwise, render as a normal paragraph
  return <p className="my-1">{children}</p>;
}

// Fullscreen toggle button component
function FullscreenButton({
  isFullscreen,
  toggleFullscreen,
}: {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}) {
  return (
    <button
      onClick={toggleFullscreen}
      className="fixed right-4 bottom-4 z-50 rounded-full bg-gray-200 p-3 shadow-lg transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label={
        isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'
      }
    >
      {isFullscreen ? (
        <Minimize2Icon className="h-5 w-5" />
      ) : (
        <Maximize2Icon className="h-5 w-5" />
      )}
    </button>
  );
}
