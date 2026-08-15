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
    period: "[2018 — 2022]", // REPLACE THIS
    institution: "[UNIVERSITY NAME]", // REPLACE THIS
    degree: "[B.S. COMPUTER SCIENCE]", // REPLACE THIS
    field: "[SOFTWARE ENGINEERING]", // REPLACE THIS
    description: "[OPTIONAL DESCRIPTION OF THESIS, HONORS, OR RELEVANT COURSEWORK.]" // REPLACE THIS
  }
];
