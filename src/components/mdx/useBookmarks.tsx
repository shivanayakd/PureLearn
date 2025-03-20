import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('mdx-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mdx-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Toggle bookmark for a heading
  const toggleBookmark = (bookmarkKey: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [bookmarkKey]: !prev[bookmarkKey],
    }));
  };

  return { bookmarks, toggleBookmark };
}
