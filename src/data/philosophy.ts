export interface PhilosophyItem {
  id: string;
  word: string;
  statement?: string;
}

export const philosophyData: PhilosophyItem[] = [
  {
    id: "phil-01",
    word: "SCALABILITY",
    statement: "Engineering enterprise systems that handle complexity without compromising reliability."
  },
  {
    id: "phil-02",
    word: "PRECISION",
    statement: "Executing every line of code, database index, and user interaction with exact intent."
  },
  {
    id: "phil-03",
    word: "PERFORMANCE",
    statement: "Optimizing architecture for sub-second response times and flawless user experiences."
  },
  {
    id: "phil-04",
    word: "CRAFT",
    statement: "Bridging the gap between robust backend architecture and cinematic frontend design."
  }
];
