export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  services: string;
  about: string;
  technologies: string[];
  thumbnail: string;
  liveLink?: string;
  github?: string;
  category?: string;
  projectType?: string;
  overview?: string;
  goal?: string;
  screens?: string[];
  approach?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: "bog-pro",
    title: "BOG PRO",
    category: "ENTERPRISE SOLUTION",
    client: "Holcim Limited",
    year: "2025",
    services: "Full Stack Development, ERP",
    about: "Boots on Ground (BOG) PRO is a massive enterprise web application currently actively used by Holcim Limited to manage country-wide assessment metrics.",
    projectType: 'enterprise',
    overview: "Boots on Ground (BOG) PRO was designed to replace legacy spreadsheet-based country-wide assessment tracking for Holcim. It introduces a fully digital, robust workflow for managing safety metrics, inventory, and assessment data across diverse field locations.",
    goal: "The primary goal was to create a highly scalable enterprise architecture capable of supporting concurrent users nationwide, implementing pessimistic locking for data integrity, and providing real-time data visibility.",
    screens: [
      "/holcim/main (1).png",
      "/holcim/main (2).png",
      "/holcim/main (3).png",
      "/holcim/main (4).png",
      "/holcim/screencapture-prodev-bootsonground-admin-add-mm-control-inventory-2026-06-24-02_18_31.png",
      "/holcim/screencapture-prodev-bootsonground-assessment-material-assessment-ASSESS00169-mm-finding-assessment-ASSET00415-2026-06-24-02_26_00.png"
    ],
    approach:
      "My work focused on engineering and optimizing robust architectural features to ensure high performance and reliability for enterprise inventory operations. A major highlight was designing and implementing a custom 'Pessimistic Locking System' featuring a heartbeat mechanism to safely manage concurrent data editing across distributed Firebase environments. Additionally, I replaced legacy suppression logic with active mitigation functionality and integrated complex data fields—such as 'Combustibility'—into the duplicate verification logic for highly accurate data processing. Utilizing Angular and Node.js, I delivered scalable data pipelines and intuitive interfaces.",
    technologies: [
      "Angular",
      "Ionic",
      "Node.js",
      "TypeScript",
      "Firebase Firestore",
      "Document AI",
      "Google Cloud Secret Manager",
    ],
    thumbnail: "/holcim/main (1).png",
    images: [
      "/holcim/main (1).png",
      "/holcim/main (2).png",
      "/holcim/main (3).png",
      "/holcim/main (4).png",
      "/holcim/screencapture-prodev-bootsonground-admin-add-mm-control-inventory-2026-06-24-02_18_31.png",
      "/holcim/screencapture-prodev-bootsonground-assessment-material-assessment-ASSESS00169-mm-finding-assessment-ASSET00415-2026-06-24-02_26_00.png",
    ],
  },
  {
    id: "banking-erp",
    title: "CCULB Core Banking Software (CBS)",
    category: "FINTECH PLATFORM",
    client: "CCULB",
    year: "2024",
    services: "Software Engineering",
    about: "An enterprise-grade core banking software solution managing extensive customer data, multiple financial accounts, and high-frequency transactions.",
    projectType: 'enterprise',
    overview: "CCULB Core Banking Software is a financial platform designed to handle high-frequency transactions and extensive customer account management. The system guarantees robust data integrity and privacy, serving as the core infrastructure for daily operations.",
    goal: "The goal was to engineer a highly secure, performant fintech platform that could process large volumes of transactions with sub-second response times while migrating legacy banking data into a modernized cloud architecture.",
    screens: [
      "/cculb/main.png",
      "/cculb/Screenshot 2026-06-24 131653.png",
      "/cculb/Screenshot 2026-06-24 131708.png",
      "/cculb/Screenshot 2026-06-24 131727.png",
      "/cculb/Screenshot 2026-06-24 131750.png",
      "/cculb/Screenshot 2026-06-24 131810.png"
    ],
    approach:
      "My contributions to this enterprise platform were multifaceted. I built core financial functionalities and engineered a real-time SMS notification system to keep users instantly updated on critical transactions. A major technical achievement was the development of a custom .NET migration tool that allowed standalone client banks to seamlessly migrate their operations and historical records into the centralized CCULB SaaS database without data loss. Furthermore, I focused on ensuring strict data privacy through a secure role-based backend, achieving sub-second response times during peak loads via optimized database indexing.",
    technologies: [".NET", "ASP.NET Core", "MSSQL", "C#", "REST APIs"],
    thumbnail: "/cculb/main.png",
    images: [
      "/cculb/main.png",
      "/cculb/Screenshot 2026-06-24 131653.png",
      "/cculb/Screenshot 2026-06-24 131708.png",
      "/cculb/Screenshot 2026-06-24 131727.png",
      "/cculb/Screenshot 2026-06-24 131750.png",
      "/cculb/Screenshot 2026-06-24 131810.png",
    ],
  },
  {
    id: "launchflow",
    title: "LaunchFlow SAAS Platform",
    category: "SAAS WORKSPACE",
    client: "Personal",
    year: "2026",
    services: "Full Stack Development, DevOps",
    liveLink: "https://launchflow-saas.vercel.app/",
    about:
      "LaunchFlow is a commercial-grade, multi-tenant project and client management SaaS platform designed for freelancers, agencies, and small teams. It centralizes client relationships, team workflows, AI-powered generation pipelines, and financial billing records in a unified workspace.",
    projectType: 'saas',
    overview: "LaunchFlow provides a centralized workspace for project and client management, featuring integrated AI tools for drafting proposals and managing tasks.",
    goal: "To provide a seamless, multi-tenant workspace that automates administrative tasks for freelancers and agencies.",
    screens: [
      "/launchflow/dashboard.png",
      "/launchflow/register.png",
      "/launchflow/tasks.png",
      "/launchflow/ai.png",
      "/launchflow/ai2.png",
    ],
    approach:
      "I architected the application on Next.js and Supabase, implementing secure database isolation through strict Row-Level Security (RLS) policies and Role-Based Access Control (RBAC) middleware to protect sensitive financial logs and billing telemetry. I engineered a fully reactive overview dashboard syncing workspace metrics in real time. Additionally, I integrated a Groq-powered AI workstation (Llama 3.3) for automated Kanban task breakdowns, Scope of Work proposals, and client email drafts. The user experience was polished with slow, hardware-accelerated animations (0.85s bezier deceleration) and a dynamic theme engine defaulting to light mode.",
    technologies: [
      "Next.js",
      "React",
      "Supabase (PostgreSQL)",
      "TypeScript",
      "Groq API",
      "TailwindCSS",
      "React Hook Form",
      "ESLint",
    ],
    thumbnail: "/launchflow/main.png",
    images: [
      "/launchflow/dashboard.png",
      "/launchflow/register.png",
      "/launchflow/tasks.png",
      "/launchflow/ai.png",
      "/launchflow/ai2.png",
    ],
  },
  {
    id: "flow-os",
    title: "FlowOS Business Operating System",
    category: "ENTERPRISE SAAS PLATFORM",
    client: "Personal",
    year: "2026",
    services: "Full Stack Development, DevOps, Mobile Engineering",
    liveLink: "https://flow-os-eosin.vercel.app/",
    about:
      "FlowOS is a multi-tenant, modular SaaS Business Operations Operating System. It integrates core operational tools—such as CRM, appointment booking, virtual walk-in queue management, task management, invoicing, expenses tracking, and platform administration—into a single unified workspace.",
    projectType: 'saas',
    overview: "FlowOS is a comprehensive business operating system that unifies operational tools, CRM, and task management into a single, modular multi-tenant platform.",
    goal: "To create a highly modular business OS that scales with the user's needs, providing a unified workspace for managing operations, finances, and customer relationships.",
    screens: [
      "/flowos/main.png",
      "/flowos/dashboard.png",
      "/flowos/settings.png",
      "/flowos/auth.png",
      "/flowos/ai.png",
      "/flowos/ai2.png",
    ],
    approach:
      "I architected the platform using Next.js App Router and Supabase, implementing secure multi-tenant isolation via strict Row-Level Security (RLS) policies and Role-Based Access Control (RBAC). I built a real-time finance dashboard featuring SVG trend charts and automated staff commission logging. To optimize productivity, I integrated a Groq Llama-3.3 AI engine for automated care plans, service catalog recommendations, and action-item notes extraction. Additionally, I configured Capacitor to package the web app as a fully responsive Android APK targeting the live production deployment, and polished the interfaces to support dynamic, high-contrast light and dark themes.",
    technologies: [
      "Next.js",
      "React",
      "Supabase (PostgreSQL)",
      "TypeScript",
      "Capacitor (Android/APK)",
      "TailwindCSS",
      "Groq API",
      "Lucide Icons",
    ],
    thumbnail: "/flowos/main.png",
    images: [
      "/flowos/main.png",
      "/flowos/dashboard.png",
      "/flowos/settings.png",
      "/flowos/auth.png",
      "/flowos/ai.png",
      "/flowos/ai2.png",
    ],
  },
  {
    id: "edutracker",
    title: "eduTracker ERP",
    category: "MANAGEMENT SYSTEM",
    client: "Open Source",
    year: "2023",
    services: "Full Stack Development",
    about: "An open-source educational management system designed to track student progress, manage attendance, and facilitate communication between teachers and parents.",
    projectType: 'personal',
    overview: "EduTracker is an open-source educational platform built to modernize school administration. It replaces disjointed, paper-based systems with a unified digital dashboard for attendance, HR, and finance management.",
    goal: "The goal was to design an accessible, fast, and secure platform that administrators could adopt with minimal training, leveraging modern React and Next.js capabilities.",
    screens: [
      "/edutracker/main.png",
      "/edutracker/screencapture-localhost-3000-attendance-2026-06-24-02_43_16.png",
      "/edutracker/screencapture-localhost-3000-finance-2026-06-24-02_42_18.png",
      "/edutracker/screencapture-localhost-3000-finance-2026-06-24-02_42_30.png",
      "/edutracker/screencapture-localhost-3000-hr-2026-06-24-02_42_51.png",
      "/edutracker/screencapture-localhost-3000-id-cards-2026-06-24-02_42_10.png"
    ],
    approach:
      "Built with React and Node.js to provide a responsive and accessible platform for educators.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redux Toolkit",
      "Playwright",
      "Jest",
    ],
    thumbnail: "/edutracker/main.png",
    images: [
      "/edutracker/main.png",
      "/edutracker/screencapture-localhost-3000-attendance-2026-06-24-02_43_16.png",
      "/edutracker/screencapture-localhost-3000-finance-2026-06-24-02_42_18.png",
      "/edutracker/screencapture-localhost-3000-finance-2026-06-24-02_42_30.png",
      "/edutracker/screencapture-localhost-3000-hr-2026-06-24-02_42_51.png",
      "/edutracker/screencapture-localhost-3000-id-cards-2026-06-24-02_42_10.png",
    ],
  },
];

export const personalInfo = {
  name: "Zahid Hasan",
  title: "Software Engineer",
  email: "zahidhasan19932023@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/DevZahidHasan" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/zahid-hasan-2434a0279/" },
  ],
};