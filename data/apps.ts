import type { AppId, Geometry } from "@/types";

type AppMeta = {
  title: string;
  label: string; // desktop / dock label
  icon: string;
  tile: string; // gradient classes for icon tiles
  geometry: Geometry; // default window position (% of viewport)
};

export const appMeta: Record<AppId, AppMeta> = {
  about: {
    title: "Portfolio",
    label: "Home",
    icon: "home",
    tile: "from-sky-400 to-blue-600",
    geometry: { left: 9.6, top: 7.6, width: 47, height: 41 },
  },
  projects: {
    title: "My Projects",
    label: "Projects",
    icon: "folder",
    tile: "from-blue-400 to-indigo-600",
    geometry: { left: 58.8, top: 9.7, width: 35.3, height: 45.6 },
  },
  experience: {
    title: "Experience",
    label: "Experience",
    icon: "briefcase",
    tile: "from-amber-400 to-orange-600",
    geometry: { left: 24, top: 14, width: 42, height: 60 },
  },
  skills: {
    title: "Skills",
    label: "Skills",
    icon: "code",
    tile: "from-violet-400 to-indigo-600",
    geometry: { left: 9.1, top: 52.2, width: 39.2, height: 35.4 },
  },
  contact: {
    title: "Get In Touch",
    label: "Contact",
    icon: "mail",
    tile: "from-emerald-400 to-green-600",
    geometry: { left: 54.8, top: 59.1, width: 40, height: 28.1 },
  },
  terminal: {
    title: "Terminal",
    label: "Terminal",
    icon: "terminal",
    tile: "from-slate-600 to-slate-900",
    geometry: { left: 20, top: 20, width: 44, height: 46 },
  },
  trash: {
    title: "Trash",
    label: "Trash",
    icon: "trash",
    tile: "from-slate-400 to-slate-600",
    geometry: { left: 32, top: 26, width: 32, height: 34 },
  },
};

export const initialOpen: AppId[] = ["contact", "skills", "projects", "about"]; // last = on top
export const dockApps: AppId[] = ["about", "projects", "experience", "skills", "contact", "terminal", "trash"];
export const desktopApps: AppId[] = ["about", "projects", "skills", "contact", "trash"];
