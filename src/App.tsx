import React from 'react';
import { LenisProvider } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import './motion/gsap'; // Global GSAP setup

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PreloaderProvider } from './hooks/usePreloader';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { ContactContainer } from './sections/Contact/ContactContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PreloaderProvider>
        <LenisProvider>
          <CustomCursor />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<ContactContainer />} />
            </Routes>
          </Layout>
        </LenisProvider>
      </PreloaderProvider>
    </BrowserRouter>
  );
};

export default App;
