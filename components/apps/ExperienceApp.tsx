import { education, experience } from "@/data/portfolio";

export function ExperienceApp() {
  return (
    <div className="h-full overflow-auto p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold heading">{experience.role}</h2>
          <p className="text-sm text-blue-500">{experience.company} <span className="muted">· {experience.location}</span></p>
        </div>
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-300">{experience.period}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {experience.stats.map((s) => (
          <div key={s.label} className="panel p-3">
            <p className="bg-linear-to-r from-sky-400 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">{s.value}</p>
            <p className="mt-1 text-[11px] leading-snug muted">{s.label}</p>
          </div>
        ))}
      </div>

      <ol className="mt-5 space-y-3 border-l border-slate-300 pl-5 dark:border-white/15">
        {experience.bullets.map((b) => (
          <li key={b} className="relative text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
            <span className="absolute -left-6.25 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
            {b}
          </li>
        ))}
      </ol>

      <div className="panel mt-6 flex flex-wrap items-center justify-between gap-2 p-4">
        <div>
          <p className="text-sm font-semibold heading">{education.degree}</p>
          <p className="text-xs muted">{education.school}</p>
        </div>
        <p className="text-xs muted">{education.period} · {education.score}</p>
      </div>
    </div>
  );
}
