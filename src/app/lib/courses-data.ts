
export type SkillStatus = "locked" | "available" | "completed";
export type SkillType = "core" | "checkpoint" | "bonus";

export interface Skill {
  id: string;
  title: string;
  status: SkillStatus;
  type: SkillType;
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const COURSES: Course[] = [
  {
    id: "js-path",
    title: "JavaScript Mastery",
    icon: "Javascript",
    color: "yellow",
    skills: [
      { id: "js-basics", title: "Variables", status: "completed", type: "core" },
      { id: "loops", title: "Loops", status: "completed", type: "core" },
      { id: "functions", title: "Functions", status: "available", type: "core" },
      { id: "objects", title: "Objects", status: "locked", type: "core" },
      { id: "async", title: "Async/Await", status: "locked", type: "checkpoint" },
    ]
  },
  {
    id: "python-path",
    title: "Python Pro",
    icon: "Python",
    color: "blue",
    skills: [
      { id: "py-intro", title: "Indentation", status: "available", type: "core" },
      { id: "lists", title: "Lists", status: "locked", type: "core" },
      { id: "dictionaries", title: "Dicts", status: "locked", type: "core" },
      { id: "flask", title: "Web with Flask", status: "locked", type: "checkpoint" },
    ]
  },
  {
    id: "cyber-path",
    title: "Cybersecurity",
    icon: "Shield",
    color: "red",
    skills: [
      { id: "networking", title: "TCP/IP Basics", status: "available", type: "core" },
      { id: "encryption", title: "AES/RSA", status: "locked", type: "core" },
      { id: "phishing", title: "Social Eng.", status: "locked", type: "bonus" },
      { id: "pen-test", title: "Penetration", status: "locked", type: "checkpoint" },
    ]
  },
  {
    id: "web-path",
    title: "Web Frontend",
    icon: "Layout",
    color: "cyan",
    skills: [
      { id: "html", title: "Semantic HTML", status: "completed", type: "core" },
      { id: "css-flex", title: "Flexbox", status: "available", type: "core" },
      { id: "tailwind", title: "Tailwind UI", status: "locked", type: "core" },
      { id: "react", title: "React Hooks", status: "locked", type: "checkpoint" },
    ]
  }
];
