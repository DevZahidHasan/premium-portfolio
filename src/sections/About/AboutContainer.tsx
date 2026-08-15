import React from 'react';
import { AboutIntro } from './AboutIntro';
import { AboutIdentity } from './AboutIdentity';
import { AboutExperience } from './AboutExperience';
import { AboutSkills } from './AboutSkills';
import { AboutEducation } from './AboutEducation';
import { AboutPhilosophy } from './AboutPhilosophy';

export const AboutContainer: React.FC = () => {
  return (
    <div className="flex flex-col w-full relative bg-background z-20">
      {/* 
        No hard horizontal borders. 
        Instead we rely on generous spatial padding (py-32 or py-48)
        inside each component to create continuous flow.
      */}
      <AboutIntro />
      <AboutIdentity />
      <AboutExperience />
      <AboutSkills />
      <AboutEducation />
      <AboutPhilosophy />
    </div>
  );
};
