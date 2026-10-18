// Single source of truth for all portfolio content. Edit here, UI updates everywhere.

export const profile = {
  name: "Saurav Joshi",
  role: "MERN Stack Developer",
  title: "Full Stack Developer (JavaScript, React.js, Node.js)",
  bio: "I build modern web applications with a focus on clean code, great user experiences and scalable solutions. I love turning ideas into real products and constantly learning new technologies.",
  shortBio:
    "I build modern web applications with a focus on clean code, great user experiences and scalable solutions.",
  email: "sauravjoshi.work1@gmail.com",
  phone: "+91 8837594781",
  location: "Mohali, India",
  github: "https://github.com/sauravjoshi", // ← replace with your real GitHub URL
  linkedin: "https://linkedin.com/in/saurav-joshi-dev",
  cv: "/Saurav_Joshi_CV.pdf", // lives in /public
  avatar: "/avatar.jpg", // lives in /public
} as const;

export const display = {
  github: profile.github.replace("https://", ""),
  linkedin: profile.linkedin.replace("https://", ""),
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  preview: "habits" | "recipes" | "currency" | "api";
  metric?: string;
  repo: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "HabitQuest",
    description: "Habit tracking app with streaks, XP, badges and more.",
    tags: ["React", "Context API"],
    preview: "habits",
    metric: "50+ active users",
    repo: `${profile.github}/habitquest`,
  },
  {
    name: "RecipeShare",
    description: "Social recipe app with posting, search, filtering and user interactions.",
    tags: ["React", "Node.js", "JWT"],
    preview: "recipes",
    repo: `${profile.github}/recipeshare`,
  },
  {
    name: "Currency Converter",
    description: "Real-time currency conversion with live exchange rates.",
    tags: ["React", "API"],
    preview: "currency",
    repo: `${profile.github}/currency-converter`,
  },
  {
    name: "AutoAPI",
    description: "API testing platform with workspaces, collections and request history.",
    tags: ["React", "Node.js", "MongoDB"],
    preview: "api",
    metric: "70+ API requests tracked",
    repo: `${profile.github}/autoapi`,
  },
];

export type Skill = { name: string; badge: string; tile: string };

export const skillGroups: { name: string; skills: Skill[] }[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", badge: "atom", tile: "bg-cyan-400/15 text-cyan-400" },
      { name: "Next.js", badge: "N", tile: "bg-slate-900 text-white ring-1 ring-white/30 dark:bg-black" },
      { name: "JavaScript", badge: "JS", tile: "bg-amber-400 text-slate-900" },
      { name: "TypeScript", badge: "TS", tile: "bg-blue-500 text-white" },
      { name: "Tailwind CSS", badge: "wind", tile: "bg-sky-400/15 text-sky-400" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", badge: "hex", tile: "bg-emerald-500/15 text-emerald-500" },
      { name: "Express.js", badge: "EX", tile: "bg-slate-500/20 text-slate-600 dark:text-slate-200" },
      { name: "MongoDB", badge: "leaf", tile: "bg-green-500/15 text-green-500" },
      { name: "Mongoose", badge: "M", tile: "bg-sky-600/20 text-sky-500" },
      { name: "JWT", badge: "JWT", tile: "bg-rose-500 text-white" },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", badge: "git", tile: "bg-red-500/15 text-red-500" },
      { name: "GitHub", badge: "github", tile: "bg-transparent text-slate-800 dark:text-white" },
      { name: "Postman", badge: "PM", tile: "bg-orange-500 text-white" },
      { name: "VS Code", badge: "vscode", tile: "bg-transparent text-sky-500" },
      { name: "Vercel", badge: "vercel", tile: "bg-transparent text-slate-800 dark:text-white" },
    ],
  },
];

export const experience = {
  role: "Full Stack Developer",
  company: "Inimist Technologies",
  location: "Mohali",
  period: "Mar 2025 – Present",
  stats: [
    { value: "10+", label: "Reusable React components" },
    { value: "15+", label: "APIs & services integrated" },
    { value: "~25%", label: "Faster average page load" },
    { value: "20–30%", label: "Better performance & maintainability" },
  ],
  bullets: [
    "Engineered and maintained full-stack web apps with Next.js and React.js, covering server-side rendering logic and responsive UI components.",
    "Built and optimized 10+ reusable React components inside a Next.js architecture, cutting average page load time by ~25%.",
    "Integrated 15+ backend APIs and third-party services, reducing integration-related bugs across 5+ modules.",
    "Refactored components and state management (React Hooks, Context API) to improve performance and maintainability by 20–30%.",
  ],
};

export const education = {
  school: "GGDSD College, Sec-32 Chandigarh · Panjab University",
  degree: "Bachelor of Computer Application",
  period: "2021 – 2024",
  score: "73%",
};
