export interface SkillCategory {
  id: string;
  label: string;
  description?: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "skills-01",
    label: "[FRONTEND]", // REPLACE THIS
    description: "[UI Engineering & Client-side architecture]", // REPLACE THIS
    skills: [
      "[REACT]", // REPLACE THIS
      "[NEXT.JS]",
      "[Angular]", // REPLACE THIS
      "[TYPESCRIPT]", // REPLACE THIS
      "[PostCSS]", // REPLACE THIS
      "[TAILWIND CSS]", // REPLACE THIS
      "[GSAP]" // REPLACE THIS
    ]
  },
  {
    id: "skills-02",
    label: "[BACKEND & APIS]", // REPLACE THIS
    description: "[Server-side logic & Data fetching]", // REPLACE THIS
    skills: [
      "[NODE.JS]",
      "[.NET CORE]", // REPLACE THIS
      "[EXPRESS]", // REPLACE THIS
      "[GRAPHQL]", // REPLACE THIS
      "[REST APIS]",
      "[Sql]",
      "[NoSQL]"
    ]
  },
  {
    id: "skills-03",
    label: "[TOOLS & DEVOPS]", // REPLACE THIS
    description: "[Deployment, CI/CD & Version Control]", // REPLACE THIS
    skills: [
      "[GCP]", // REPLACE THIS
      "[FIRESTORE]",
      "[GIT]", // REPLACE THIS
      "[GITHUB ACTIONS]", // REPLACE THIS
      "[VERCEL]", // REPLACE THIS
      "[DOCKER]" // REPLACE THIS
    ]
  }
];
