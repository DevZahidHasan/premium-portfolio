export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  services: string;
  role?: string;
  description?: string;
  about: string;
  thumbnail: string; // Path to local asset
  images: string[];
  approach: string;
  technologies: string[];
  liveLink?: string;
  github?: string;
  image?: string; // Path to local asset
  year: string;
}

export const projects: Project[] = [
  {
    id: "bog-pro",
    title: "BOG PRO",
    category: "ENTERPRISE SOLUTION",
    client: "Holcim Limited",
    year: "2025",
    services: "Full Stack Development, ERP",
    about:
      "BOG PRO is a comprehensive enterprise resource planning solution developed for Holcim Limited. It streamlines large-scale industrial operations by providing robust modules for material control, comprehensive material inventory management, interactive maps, and operational guidance. The platform offers end-to-end assessment tracking and advanced administrative capabilities.",
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
    about:
      "The Core Banking Software (CBS) is a comprehensive, enterprise-grade financial management platform custom-built for CCULB (Co-operative Credit Union League of Bangladesh). It centralizes core banking operations, automating critical workflows such as ledger management, loan processing, and member administration. Designed to handle high-volume transactions with absolute precision, the system eliminates manual bottlenecks and provides real-time financial reporting to ensure institutional transparency and operational efficiency.",
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
    about:
      "An open-source educational management system designed to track student progress and manage institutional resources.",
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
  email: "contact@zahidhasan.com", // TODO: Update with real email
  socials: [
    { name: "GitHub", url: "https://github.com/zahid" }, // TODO: Update real URL
    { name: "LinkedIn", url: "https://linkedin.com/in/zahid" }, // TODO: Update real URL
  ],
};