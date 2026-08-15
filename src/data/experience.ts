export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  location?: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

export const experienceData: Experience[] = [
  {
    id: "experience-01",
    period: "[2023 — PRESENT]", // REPLACE THIS
    company: "[CURRENT COMPANY NAME]", // REPLACE THIS
    role: "[CURRENT JOB TITLE]", // REPLACE THIS
    location: "[LOCATION / REMOTE]", // REPLACE THIS
    description: "[SHORT DESCRIPTION OF YOUR OVERALL RESPONSIBILITY AT THIS COMPANY.]", // REPLACE THIS
    contributions: [
      "[KEY CONTRIBUTION OR METRIC 1]", // REPLACE THIS
      "[KEY CONTRIBUTION OR METRIC 2]", // REPLACE THIS
      "[KEY CONTRIBUTION OR METRIC 3]"  // REPLACE THIS
    ],
    technologies: [
      "[REACT]", // REPLACE THIS
      "[TYPESCRIPT]", // REPLACE THIS
      "[NEXT.JS]" // REPLACE THIS
    ]
  },
  {
    id: "experience-02",
    period: "[2021 — 2023]", // REPLACE THIS
    company: "[PREVIOUS COMPANY NAME]", // REPLACE THIS
    role: "[PREVIOUS JOB TITLE]", // REPLACE THIS
    location: "[LOCATION / REMOTE]", // REPLACE THIS
    description: "[SHORT DESCRIPTION OF YOUR OVERALL RESPONSIBILITY AT THIS COMPANY.]", // REPLACE THIS
    contributions: [
      "[KEY CONTRIBUTION OR METRIC 1]", // REPLACE THIS
      "[KEY CONTRIBUTION OR METRIC 2]"  // REPLACE THIS
    ],
    technologies: [
      "[JAVASCRIPT]", // REPLACE THIS
      "[VUE.JS]", // REPLACE THIS
      "[TAILWIND]" // REPLACE THIS
    ]
  }
];
