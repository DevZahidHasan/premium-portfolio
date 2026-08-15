export interface PhilosophyItem {
  id: string;
  word: string;
  statement?: string;
}

export const philosophyData: PhilosophyItem[] = [
  {
    id: "phil-01",
    word: "[CLARITY]", // REPLACE THIS
    statement: "[Clear interfaces and architecture reduce cognitive load.]" // REPLACE THIS
  },
  {
    id: "phil-02",
    word: "[PRECISION]", // REPLACE THIS
    statement: "[Every pixel and interaction is highly intentional.]" // REPLACE THIS
  },
  {
    id: "phil-03",
    word: "[PERFORMANCE]", // REPLACE THIS
    statement: "[Smooth motion and fast load times are non-negotiable.]" // REPLACE THIS
  },
  {
    id: "phil-04",
    word: "[CRAFT]", // REPLACE THIS
    statement: "[Bridging the gap between engineering and design.]" // REPLACE THIS
  }
];
