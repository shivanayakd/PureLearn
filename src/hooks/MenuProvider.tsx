'use client';

import { MenuContextValue } from '@/types';
import { usePathname } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Check screen size on mount and when window is resized
  useEffect(() => {
    // Set initial menu state based on screen size
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768; // Typical mobile breakpoint
      setIsMenuOpen(!isSmallScreen);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on path change for mobile screens
  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) {
      setIsMenuOpen(false);
    }
  }, [pathname]); // This effect runs whenever the pathname changes

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Create the context value object
  const contextValue: MenuContextValue = {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
