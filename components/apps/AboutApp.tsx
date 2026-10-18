"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ThemeSwitch } from "@/components/ui/ThemeToggle";
import { display, profile } from "@/data/portfolio";
import type { AppActions, AppId } from "@/types";

const nav: { label: string; icon: string; app: AppId }[] = [
  { label: "Home", icon: "home", app: "about" },
  { label: "Projects", icon: "folder", app: "projects" },
  { label: "Skills", icon: "code", app: "skills" },
  { label: "Contact", icon: "mail", app: "contact" },
];

function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="shrink-0 rounded-full bg-linear-to-br from-sky-400 via-blue-500 to-violet-500 p-0.75 shadow-[0_0_40px_-4px_rgba(99,102,241,0.65)]">
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white dark:border-slate-950 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-3xl font-semibold text-white">SJ</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)} className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}

export function AboutApp({ actions }: { actions: AppActions }) {
  return (
    <div className="flex h-full min-h-0">
      <nav className="hidden w-40 shrink-0 flex-col border-r border-slate-200/70 bg-slate-100/50 p-3 dark:border-white/[0.07] dark:bg-white/2 sm:flex">
        <div className="space-y-1">
          {nav.map((n) => (
            <button
              key={n.label}
              onClick={() => actions.openApp(n.app)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                n.app === "about"
                  ? "bg-blue-600/90 text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.9)] dark:bg-blue-600/80"
                  : "text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-white/6"
              }`}
            >
              <Icon name={n.icon} className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </div>
        <div className="mt-auto pb-1"><ThemeSwitch /></div>
      </nav>

      <div className="min-w-0 flex-1 overflow-auto p-5 sm:p-8">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] muted">Hello, I&apos;m</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight heading sm:text-4xl">
              {profile.name}
              <span title="Available for work" className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]" />
            </h1>
            <p className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-100">{profile.role}</p>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed muted">{profile.bio}</p>
          </div>
          <Avatar />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => actions.openApp("projects")} className="btn-primary">
            View Projects <Icon name="arrow" className="h-4 w-4" />
          </button>
          <a href={profile.cv} download="Saurav_Joshi_CV.pdf" className="btn-ghost">
            <Icon name="download" className="h-4 w-4" /> Download CV
          </a>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs muted">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition hover:text-blue-500">
            <Icon name="mail" className="h-4 w-4 text-blue-500" />{profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-blue-500">
            <Icon name="github" className="h-4 w-4" />{display.github}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-blue-500">
            <Icon name="linkedin" className="h-4 w-4 text-blue-500" />{display.linkedin}
          </a>
        </div>
      </div>
    </div>
  );
}
