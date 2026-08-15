export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image: string; // Path to local asset
  year: string;
}

export const projects: Project[] = [
  {
    id: "mindspace",
    title: "MINDSPACE",
    role: "Frontend Engineer",
    description: "A mental wellness platform focused on seamless UX and cinematic design. (TODO: Verify exact details from existing portfolio)",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/assets/placeholder-mindspace.webp",
    year: "2023"
  },
  {
    id: "flowos",
    title: "FLOWOS",
    role: "Software Engineer",
    description: "A web-based operating system interface built with advanced frontend techniques. (TODO: Verify exact details from existing portfolio)",
    technologies: ["Next.js", "Framer Motion", "TypeScript"],
    image: "/assets/placeholder-flowos.webp",
    year: "2024"
  }
];

export const personalInfo = {
  name: "Zahid Hasan",
  title: "Software Engineer",
  email: "contact@zahidhasan.com", // TODO: Update with real email
  socials: [
    { name: "GitHub", url: "https://github.com/zahid" }, // TODO: Update real URL
    { name: "LinkedIn", url: "https://linkedin.com/in/zahid" } // TODO: Update real URL
  ]
};
