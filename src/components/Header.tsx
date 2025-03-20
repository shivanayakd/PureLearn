'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { HeaderProps } from '@/types';
import { useMenu } from '@/hooks/MenuProvider';

const Header = ({ children }: HeaderProps) => {
  const { toggleMenu } = useMenu();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle mobile menu"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            <Home className="h-5 w-5" />
          </Link>
        </div>
        {children}
      </div>
    </header>
  );
};

export default Header;
