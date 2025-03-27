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
import MDXImage from './mdx/MDXImage';
import MDXVideo from './mdx/MDXVideo';
import Alert from './mdx/Alert';

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

    // Add Image component with caption support - render directly, not as a child of p
    img: (props: { src: string; alt: string; title?: string }) => {
      // This ensures the image is not wrapped in a paragraph
      return (
        <React.Fragment>
          <MDXImage {...props} />
        </React.Fragment>
      );
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

    a: (props: { children: React.ReactNode; href: string }) => (
      <a
        {...props}
        className="text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-2 hover:text-blue-600 hover:decoration-blue-600"
      >
        {props.children}
      </a>
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

    // Add Video/iframe component
    Video: (props: {
      src: string;
      title?: string;
      width?: string | number;
      height?: string | number;
      caption?: string;
    }) => <MDXVideo {...props} />,

    // Add Alert component for warnings
    Alert: (props: {
      type?: 'warning' | 'info' | 'success' | 'error';
      title?: string;
      children: React.ReactNode;
    }) => <Alert {...props} />,

    // Add list components with proper styling
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="my-1">{children}</li>
    ),
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
  // Don't wrap any React elements in p tags (only wrap plain text)
  // This is a more conservative approach that prevents invalid nesting

  // Convert children to array for inspection
  const childrenArray = React.Children.toArray(children);

  // If there are no children, or only text/string children, use p tag
  const hasOnlyTextChildren = childrenArray.every(
    (child) => typeof child === 'string' || typeof child === 'number',
  );

  // Check if array includes img or MDXImage components
  const hasImageChild = childrenArray.some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === 'img' ||
        (typeof child.type === 'function' && child.type.name === 'MDXImage')),
  );

  // If we only have text children and no images, render as p
  if (hasOnlyTextChildren && !hasImageChild) {
    return <p className="my-1">{children}</p>;
  }

  // Otherwise, render without p wrapper
  return <>{children}</>;
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
