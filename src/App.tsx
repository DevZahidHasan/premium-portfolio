import React from 'react';
import { LenisProvider } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import './motion/gsap'; // Global GSAP setup

import { Layout } from './components/Layout';
import { PreloaderProvider } from './hooks/usePreloader';
import { Hero } from './sections/Hero';
import { AboutContainer } from './sections/About/AboutContainer';

const App: React.FC = () => {
  return (
    <PreloaderProvider>
      <LenisProvider>
        <CustomCursor />
        <Layout>
          <Hero />
          <AboutContainer />
        </Layout>
      </LenisProvider>
    </PreloaderProvider>
  );
};

export default App;
