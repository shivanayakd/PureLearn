import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  prism,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardIcon, CheckIcon } from 'lucide-react';
import { CodeBlockProps } from '@/types';

export default function CodeBlock({
  children,
  language,
  theme,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleCopy}
          className="cursor-pointer rounded-md bg-gray-700/50 p-2 text-gray-200 transition-colors hover:bg-gray-700/80"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : prism}
        className="rounded-lg shadow-md"
        showLineNumbers
        PreTag="div" // Use div instead of pre to avoid nesting issues
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}
