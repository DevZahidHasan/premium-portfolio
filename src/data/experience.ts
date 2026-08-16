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
    period: "2024 — 2024", // REPLACE THIS
    company: "Implevista", // REPLACE THIS
    role: "Software Engineer Intern", // REPLACE THIS
    location: "Dhaka, Bangladesh", // REPLACE THIS
    description:
      "As a Software Engineering Intern at Implevista, I contributed to the CCULB project by developing a dedicated SMS module to handle automated alerts and communication workflows. Additionally, I built an internal data migration tool to reliably extract, transform, and transfer data from local on-premise databases into multi-tenant database environments, ensuring schema consistency, high data integrity, and seamless tenant onboarding.", // REPLACE THIS
    contributions: [
      "Developed and integrated an automated SMS module for the CCULB project to handle real-time transactional alerts and user notifications.",
      "Engineered a custom data migration utility to reliably transfer and synchronize legacy on-premise database records into multi-tenant environments.",
      "Implemented automated schema validation and error-handling routines, ensuring 100% data integrity and zero data loss during tenant onboarding.",
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
      "Contributed to the BagPro system for Holcim, focusing on building automated document processing workflows, integrating OCR capabilities for inventory and dispatch tracking, and optimizing backend data pipelines.",
    contributions: [
      "Integrated and optimized an automated OCR pipeline to extract text from physical dispatch slips and bag tags, significantly reducing manual data entry errors.",
      "Engineered secure API endpoints to handle image processing and OCR payload validation, ensuring seamless real-time data sync with backend databases.",
      "Configured cloud environment secrets and project IDs across dev/staging environments to ensure secure and seamless third-party OCR service connectivity.",
      "Collaborated on code reviews and resolved critical PR feedback to optimize OCR recognition accuracy, throughput, and error handling for irregular scans.",
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
