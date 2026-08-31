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
    period: "2024 — 2024",
    company: "Implevista",
    role: "Software Engineer Intern",
    location: "Dhaka, Bangladesh",
    description:
      "Contributed to the CCULB project by developing a dedicated SMS module for automated workflows. Built an internal data migration tool to reliably extract, transform, and transfer legacy on-premise data into multi-tenant cloud environments.",
    contributions: [
      "<strong>Developed an automated SMS module</strong> for real-time transactional alerts and user notifications.",
      "<strong>Engineered a custom ETL utility</strong> to migrate legacy on-premise records into multi-tenant databases.",
      "<strong>Implemented automated schema validation</strong> to guarantee <strong>100% data integrity</strong> and zero data loss during tenant onboarding."
    ],
    technologies: [
      "Angular",
      "ASP.NET Core",
      "C#",
      "Microsoft SQL Server",
      "RESTful APIs",
      "ETL Data Migration",
    ],
  },
  {
    id: "experience-02",
    period: "2024 — 2026",
    company: "Implevista",
    role: "Jr. Software Engineer",
    location: "Dhaka, Bangladesh",
    description:
      "Contributed to the BagPro system for Holcim, building automated document processing workflows and integrating OCR capabilities for inventory and dispatch tracking.",
    contributions: [
      "<strong>Integrated an automated OCR pipeline</strong> to extract text from physical dispatch slips, significantly <strong>reducing manual entry errors</strong>.",
      "<strong>Engineered secure API endpoints</strong> for image processing and payload validation, ensuring seamless real-time database synchronization.",
      "<strong>Configured cloud environment secrets</strong> and managed secure third-party OCR connectivity across dev/staging environments.",
      "<strong>Optimized OCR recognition accuracy</strong> and throughput by collaborating on code reviews and resolving critical PR feedback."
    ],
    technologies: [
      "OCR Integration",
      "Angular",
      "Capacitor",
      "Ionic",
      "GCP",
      "Node.js",
      "Firestore",
      "RESTful APIs",
    ],
  },
];
