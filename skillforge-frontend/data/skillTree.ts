export type SkillNode = {
  unlocked: boolean;
  children: string[];
  requiredXP?: number;
  category?: string;
  icon?: string;
};

export const skillTree: Record<string, SkillNode> = {
  "Python Basics": {
    unlocked: true,
    children: ["Python Loops"],
    category: "Python",
    icon: "🐍",
  },
  "Python Loops": {
    unlocked: false,
    children: ["Recursion"],
    requiredXP: 50,
    category: "Python",
    icon: "🔁",
  },
  "Recursion": {
    unlocked: false,
    children: [],
    requiredXP: 100,
    category: "Algorithms",
    icon: "🧠",
  },
};
