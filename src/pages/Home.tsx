import React from 'react';
import { Hero } from '../sections/Hero';
import { AboutContainer } from '../sections/About/AboutContainer';
import { WorkContainer } from '../sections/Work/WorkContainer';
import { ContactContainer } from '../sections/Contact/ContactContainer';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutContainer />
      <WorkContainer />
      <ContactContainer />
    </>
  );
};
