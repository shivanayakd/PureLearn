import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from 'lucide-react';
import { InlineCodeProps } from '@/types';

export default function InlineCode({ children }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="group flex w-full flex-col items-end gap-1">
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
      <code className="inline-block max-w-full overflow-x-auto rounded-md border border-gray-200 bg-gray-100 px-2 py-1 font-mono text-sm whitespace-nowrap shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
        {children}
      </code>
    </span>
  );
}
