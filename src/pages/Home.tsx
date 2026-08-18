import React from 'react';
import { Hero } from '../sections/Hero';
import { AboutContainer } from '../sections/About/AboutContainer';
import { WorkContainer } from '../sections/Work/WorkContainer';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutContainer />
      <WorkContainer />
    </>
  );
};
