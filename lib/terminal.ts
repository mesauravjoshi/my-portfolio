import { appMeta } from "@/data/apps";
import { display, education, experience, profile, projects, skillGroups } from "@/data/portfolio";
import type { AppId } from "@/types";

export type Tone = "default" | "accent" | "muted" | "error" | "success";
export type Line = { text: string; tone?: Tone; prompt?: boolean };

export type TerminalContext = {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  openUrl: (url: string) => void;
  setTheme: (theme: "dark" | "light") => void;
  theme: string | undefined;
  history: string[];
};

type Result = { lines?: Line[]; clear?: boolean };
const out = (...text: string[]): Line[] => text.map((t) => ({ text: t }));
const accent = (text: string): Line => ({ text, tone: "accent" });
const muted = (text: string): Line => ({ text, tone: "muted" });

const apps = Object.keys(appMeta) as AppId[];
const aliases: Record<string, AppId> = { home: "about", profile: "about", exp: "experience", work: "experience", mail: "contact" };

const helpRows: [string, string][] = [
  ["help", "Show this list"],
  ["about", "Who I am"],
  ["skills", "Tech stack"],
  ["projects", "What I've built"],
  ["experience", "Work history"],
  ["education", "Degree & college"],
  ["contact", "Ways to reach me"],
  ["cv | resume", "Open my CV (PDF) in a new tab"],
  ["github", "Open GitHub in a new tab"],
  ["linkedin", "Open LinkedIn in a new tab"],
  ["email", "Write me an email"],
  ["open <app>", `Open a window: ${apps.join(", ")}`],
  ["close <app>", "Close a window"],
  ["theme [dark|light]", "Switch or toggle theme"],
  ["neofetch", "System info, sauravOS style"],
  ["ls · pwd · date · echo · history", "The usual suspects"],
  ["clear · exit", "Clear screen / close terminal"],
];

export const commandNames = [
  "help", "about", "whoami", "skills", "projects", "experience", "education", "contact", "cv", "resume",
  "github", "linkedin", "email", "open", "close", "theme", "neofetch", "ls", "pwd", "date", "echo",
  "history", "clear", "exit", "sudo", "hire",
];

export const welcome: Line[] = [
  accent("sauravOS 1.0 — portfolio shell"),
  muted("Type `help` to see what I can do. Try `cv`, `github` or `hire`."),
];

export function runCommand(raw: string, ctx: TerminalContext): Result {
  const [cmdRaw, ...args] = raw.trim().split(/\s+/);
  const cmd = cmdRaw.toLowerCase();
  const arg = args.join(" ");

  switch (cmd) {
    case "help":
      return { lines: [accent("Available commands"), ...helpRows.map(([c, d]) => ({ text: `  ${c.padEnd(32)}${d}` }))] };
    case "about":
    case "whoami":
      return { lines: [accent(`${profile.name} — ${profile.role}`), ...out(profile.bio), muted(`📍 ${profile.location}`)] };
    case "skills":
      return { lines: skillGroups.flatMap((g) => out(`${g.name.padEnd(15)}${g.skills.map((s) => s.name).join(", ")}`)) };
    case "projects":
      return {
        lines: [
          ...projects.flatMap((p) => out(`• ${p.name} — ${p.description}`, `  ${p.tags.join(" · ")}  →  ${p.repo}`)),
          muted("Tip: `open projects` shows them in a window."),
        ],
      };
    case "experience":
    case "exp":
      return {
        lines: [
          accent(`${experience.role} @ ${experience.company}, ${experience.location}  (${experience.period})`),
          ...experience.bullets.map((b) => ({ text: `  - ${b}` })),
        ],
      };
    case "education":
      return { lines: [accent(education.degree), ...out(`${education.school}`, `${education.period} · ${education.score}`)] };
    case "contact":
      return { lines: out(`email     ${profile.email}`, `phone     ${profile.phone}`, `github    ${display.github}`, `linkedin  ${display.linkedin}`) };
    case "cv":
    case "resume":
      ctx.openUrl(profile.cv);
      return { lines: [{ text: "Opening CV in a new tab…", tone: "success" }] };
    case "github":
      ctx.openUrl(profile.github);
      return { lines: [{ text: `Opening ${display.github}…`, tone: "success" }] };
    case "linkedin":
      ctx.openUrl(profile.linkedin);
      return { lines: [{ text: `Opening ${display.linkedin}…`, tone: "success" }] };
    case "email":
    case "hire":
      ctx.openUrl(`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`);
      return { lines: [{ text: cmd === "hire" ? "Great choice. Drafting an email to Saurav…" : `Opening mail to ${profile.email}…`, tone: "success" }] };
    case "open":
    case "close": {
      const id = (aliases[arg.toLowerCase()] ?? arg.toLowerCase()) as AppId;
      if (!apps.includes(id)) return { lines: [{ text: `Usage: ${cmd} <${apps.join("|")}>`, tone: "error" }] };
      (cmd === "open" ? ctx.openApp : ctx.closeApp)(id);
      return { lines: [{ text: `${cmd === "open" ? "Opened" : "Closed"} ${appMeta[id].title}`, tone: "success" }] };
    }
    case "theme": {
      const next = arg === "dark" || arg === "light" ? arg : ctx.theme === "dark" ? "light" : "dark";
      ctx.setTheme(next);
      return { lines: [{ text: `Theme set to ${next}`, tone: "success" }] };
    }
    case "neofetch":
      return {
        lines: [
          accent("   ╭────────╮   saurav@portfolio"),
          accent("   │  S  J  │   ──────────────────"),
          accent("   ╰────────╯   OS:     sauravOS (Next.js)"),
          ...out(
            "                Role:   " + profile.role,
            "                Stack:  React · Next.js · Node · MongoDB",
            "                Shell:  portfolio-sh",
            `                Theme:  ${ctx.theme ?? "dark"}`,
          ),
        ],
      };
    case "ls":
      return { lines: out(apps.map((a) => `${a}/`).join("  ") + "  cv.pdf") };
    case "pwd":
      return { lines: out("/home/saurav/portfolio") };
    case "date":
      return { lines: out(new Date().toString()) };
    case "echo":
      return { lines: out(arg) };
    case "history":
      return { lines: ctx.history.map((h, i) => ({ text: `${String(i + 1).padStart(3)}  ${h}` })) };
    case "clear":
      return { clear: true };
    case "exit":
      ctx.closeApp("terminal");
      return {};
    case "sudo":
      return { lines: [{ text: "saurav is not in the sudoers file. This incident will be reported. 😉", tone: "error" }] };
    default:
      return { lines: [{ text: `command not found: ${cmd}. Type \`help\` for a list.`, tone: "error" }] };
  }
}
