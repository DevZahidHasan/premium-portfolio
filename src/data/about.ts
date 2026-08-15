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
  bio: "I am a results-oriented Software Engineer with a strong background in full-stack development, specializing in building scalable enterprise-grade solutions. I have experience architecting complex systems, including comprehensive banking and educational ERPs, and inventory management platforms utilizing modern frameworks like Angular, React, Node.js, and TypeScript.", // REPLACE THIS
  secondaryBio:
    "Focused on building high-performance web applications, thoughtful interfaces, and scalable frontend systems with React, TypeScript, and modern web technologies.", // REPLACE THIS
  location: "Dhaka, Bangladesh", // REPLACE THIS
  availability: "OPEN TO NEW OPPORTUNITIES", // REPLACE THIS
 disciplines: [
  {
    title: "FRONTEND",
    description:
      "Building responsive, high-performance interfaces with a strong focus on usability, visual precision, accessibility, and maintainable frontend architecture.",
    focus: ["REACT","Angular", "TYPESCRIPT", "NEXT.JS"],
  },
 {
    title: "BACKEND",
    description:
      "Designing reliable backend systems and APIs with a focus on scalability, clean architecture, data modeling, and production-ready cloud infrastructure.",
    focus: [".NET", "NODE.JS", "GCP", "FIRESTORE"],
  },
  {
    title: "INTERFACES",
    description:
      "Creating refined digital experiences where interaction, motion, typography, and engineering come together to make complex products feel simple.",
    focus: ["UI/UX", "GSAP", "WEBGL"],
  },
],
};
