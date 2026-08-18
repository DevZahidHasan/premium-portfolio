import React from 'react';
import { personalInfo } from '../../data/projects';
import { aboutData } from '../../data/about';
import { skillsData } from '../../data/skills';
import { educationData } from '../../data/education';
import { experienceData } from '../../data/experience';


export const ResumeContainer: React.FC = () => {
  const githubLink = personalInfo.socials.find(s => s.name.toLowerCase() === 'github')?.url || '#';
  const githubHandle = githubLink.split('/').pop() || 'github';

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-black pt-48 pb-32 px-page-gutter relative">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-32">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-4">{personalInfo.name}</h1>
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noreferrer" 
            className="text-xl sm:text-2xl md:text-3xl font-medium text-black/90 hover:text-black/50 transition-colors break-words"
            data-cursor-interact="true"
          >
            github.com/{githubHandle}
          </a>
          <p className="mt-12 text-base md:text-lg text-black/80 max-w-5xl leading-relaxed">
            {aboutData.bio}
          </p>
        </div>

        {/* SKILLS */}
        <div className="border-t border-black/10 py-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-black/50 mb-16">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {skillsData.map((category) => (
              <div key={category.id} className="flex flex-col">
                <h3 className="font-bold text-sm md:text-base mb-8 uppercase">{category.label.replace(/\[|\]/g, '')}</h3>
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill, index) => (
                    <span key={index} className="text-sm md:text-base text-black/80">
                      {skill.replace(/\[|\]/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="border-t border-black/10 py-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-black/50 mb-16">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {educationData.map(edu => (
              <React.Fragment key={edu.id}>
                {/* Column 1: Degree & Uni */}
                <div className="col-span-1">
                  <h3 className="font-bold text-xl md:text-2xl">{edu.institution}</h3>
                  <p className="font-medium mt-2 md:text-lg">{edu.degree}</p>
                  <p className="text-xs font-mono text-black/60 mt-4 tracking-widest">{edu.period}</p>
                </div>
                {/* Column 2: Courses/Description */}
                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-bold text-sm md:text-base mb-4 md:mb-6">Relevant Coursework & Focus</h4>
                  <p className="text-sm md:text-base text-black/80 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* WORK */}
        <div className="border-t border-black/10 py-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-black/50 mb-16">Work</h2>
          <div className="flex flex-col gap-24">
            {experienceData.map(exp => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16" key={exp.id}>
                <div className="col-span-1">
                  <h3 className="font-bold text-xl md:text-2xl">{exp.company}</h3>
                  <p className="text-xs font-mono text-black/60 mt-3 uppercase tracking-widest">{exp.period}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-bold text-lg md:text-xl mb-6">{exp.role}</h4>
                  <p className="text-base text-black/80 leading-relaxed mb-8">
                    {exp.description}
                  </p>
                  <ul className="list-disc pl-5 text-base text-black/80 space-y-4 marker:text-black/30">
                    {exp.contributions.map((contribution, index) => (
                      <li key={index} className="pl-2">{contribution}</li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-3">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="px-4 py-2 bg-black/5 rounded-full text-xs font-mono text-black/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="mt-40 flex justify-between items-center text-xs md:text-sm font-mono text-black/40">
          <div className="flex gap-6 md:gap-8">
            {personalInfo.socials.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="hover:text-black transition-colors" data-cursor-interact="true">
                {social.name}
              </a>
            ))}
          </div>
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
        </div>

      </div>

      {/* FIXED DOWNLOAD BUTTON */}
      <a 
        href="/Zahid_Hasan_Resume.pdf"
        download="Zahid_Hasan_Resume.pdf"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 flex items-center justify-center gap-3 bg-black text-white px-6 py-4 md:px-8 md:py-5 rounded-full shadow-2xl hover:bg-black/80 transition-colors group whitespace-nowrap"
      >
        <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase">Download PDF</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
      
    </div>
  );
};
