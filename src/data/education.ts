export interface Education {
  id: string;
  period: string;
  institution: string;
  degree: string;
  field?: string;
  description?: string;
}

export const educationData: Education[] = [
  {
    id: "education-01",
    period: "2016 — 2020",
    institution: "University of Asia Pacific",
    degree: "B.Sc. in Computer Science & Engineering",
    field: "Software Engineering",
    description:
      "Completed intensive coursework in <strong>Data Structures & Algorithms</strong>, <strong>Object-Oriented Programming</strong>, <strong>Database Management Systems</strong>, and <strong>Software Architecture</strong> with an active focus on competitive problem solving.",
  },
];
