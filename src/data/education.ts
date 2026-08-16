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
    degree: "B.Sc. in Computer Science and Engineering",
    field: "Software Engineering",
    description:
      "Completed intensive coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Software Architecture with an active focus on competitive problem solving.",
  },
];
