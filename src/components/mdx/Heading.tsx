import React, { useState } from 'react';
import { Share2Icon, LinkIcon, CheckIcon } from 'lucide-react';
import ShareDropdown from './ShareDropdown';
import { HeadingProps } from '@/types';

export default function Heading({ children, id, level }: HeadingProps) {
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const headingId =
    id ||
    (typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-')
      : '');
  const title = typeof children === 'string' ? children : 'this section';
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#${headingId}`
      : '';

  // Determine icon sizes based on heading level
  const iconSize = level === 1 ? 20 : level === 2 ? 16 : 14;

  // Use React.createElement instead of the dynamic tag syntax
  const renderHeading = () => {
    return React.createElement(
      `h${level}`,
      { id: headingId, className: 'scroll-mt-20' },
      children,
    );
  };

  // Function to copy the URL to clipboard
  const copyShareLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // You could add a toast notification here
    setShowShareDropdown(false);
  };

  return (
    <div className="group flex items-center">
      {renderHeading()}

      <button
        onClick={copyShareLink}
        className="ml-2 cursor-pointer opacity-50 transition-opacity group-hover:opacity-100"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <LinkIcon
            size={iconSize}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          />
        )}
      </button>
      <div className="relative top-1">
        <button
          onClick={() => setShowShareDropdown(!showShareDropdown)}
          className="ml-2 opacity-50 transition-opacity group-hover:opacity-100"
          aria-label="Share this section"
        >
          <Share2Icon
            size={16}
            className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          />
        </button>

        <ShareDropdown
          isOpen={showShareDropdown}
          onClose={() => setShowShareDropdown(false)}
          url={url}
          title={title}
        />
      </div>
    </div>
  );
}
