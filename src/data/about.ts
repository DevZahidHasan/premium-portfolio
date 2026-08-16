export interface AboutData {
  eyebrow: string;
  headline: string[];
  bio: string;
  secondaryBio?: string;
  location: string;
  availability: string;
  disciplines: {
    title: string;
    description: string;
    focus: string[];
  }[];
}

export const aboutData: AboutData = {
  eyebrow: "01 / ABOUT",
  headline: ["I TURN COMPLEX", "IDEAS INTO DIGITAL", "EXPERIENCES."],
  bio: "I am a results-oriented Software Engineer with a strong background in full-stack development, specializing in building scalable enterprise-grade solutions. I have experience architecting complex systems, including comprehensive banking and educational ERPs, and inventory management platforms utilizing modern frameworks like Angular, React, Node.js, and TypeScript.",
  secondaryBio:
    "Focused on building high-performance web applications, thoughtful interfaces, and scalable frontend systems with React, TypeScript, and modern web technologies.",
  location: "Dhaka, Bangladesh",
  availability: "OPEN TO NEW OPPORTUNITIES",
  disciplines: [
    {
      title: "ARCHITECTURE",
      description:
        "Designing robust systems and clean code foundations that scale seamlessly for enterprise-grade applications and complex data flows.",
      focus: ["SYSTEM DESIGN", "DATA MODELING", "SCALABILITY"],
    },
    {
      title: "ENGINEERING",
      description:
        "Developing sophisticated logic and optimizing heavy operations, transforming intricate business requirements into high-performance software.",
      focus: ["PERFORMANCE", "OPTIMIZATION", "SECURITY"],
    },
    {
      title: "EXPERIENCES",
      description:
        "Crafting precise, cinematic digital interfaces where motion, usability, and aesthetics converge into an unforgettable product.",
      focus: ["INTERACTION", "MOTION", "ACCESSIBILITY"],
    },
  ],
};
