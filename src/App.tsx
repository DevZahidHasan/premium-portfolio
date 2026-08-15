import React from 'react';
import { LenisProvider } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { FoundationPlayground } from './sections/FoundationPlayground';
import './motion/gsap'; // Global GSAP setup

import { Layout } from './components/Layout';
import { PreloaderProvider } from './hooks/usePreloader';

const App: React.FC = () => {
  return (
    <PreloaderProvider>
      <LenisProvider>
        <CustomCursor />
        <Layout>
          <FoundationPlayground />
        </Layout>
      </LenisProvider>
    </PreloaderProvider>
  );
};

export default App;
