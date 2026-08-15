import React from 'react';
import { Navigation } from './Navigation';
import { Preloader } from './Preloader';
import { usePreloader } from '../hooks/usePreloader';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { setPreloaderComplete } = usePreloader();

  return (
    <>
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <Navigation />
      <main className="w-full min-h-screen">
        {children}
      </main>
      {/* Footer will be injected here in Phase 8 */}
    </>
  );
};
