import { Icon } from "@/components/ui/Icon";
import { profile, projects, type Project } from "@/data/portfolio";

function Preview({ kind }: { kind: Project["preview"] }) {
  const base = "relative h-24 w-full overflow-hidden";
  if (kind === "recipes")
    return (
      <div className={`${base} grid grid-cols-3 gap-1 bg-amber-50 p-1.5 dark:bg-[#1b1510]`}>
        {["🍲", "🥗", "🥘"].map((f, i) => (
          <div key={f} className={`flex items-center justify-center rounded-md text-3xl ${i === 1 ? "bg-orange-200/80 dark:bg-orange-300/20" : "bg-amber-200/70 dark:bg-amber-200/10"}`}>{f}</div>
        ))}
      </div>
    );
  if (kind === "currency")
    return (
      <div className={`${base} flex items-end gap-1 bg-slate-900 p-3`}>
        <div className="mr-2 h-9 w-1/3 rounded bg-slate-700/80" />
        {[20, 34, 27, 50, 44, 65, 58, 82, 72, 92].map((h, i) => (
          <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-linear-to-t from-sky-600/40 to-sky-400" />
        ))}
      </div>
    );
  if (kind === "api")
    return (
      <div className={`${base} grid grid-cols-[1fr_2fr] gap-1.5 bg-slate-900 p-2`}>
        <div className="space-y-1 rounded bg-slate-800 p-1.5">{[0, 1, 2].map((i) => <div key={i} className="h-1.5 rounded bg-slate-600" />)}</div>
        <div className="space-y-1.5 rounded bg-slate-800 p-1.5">
          <div className="flex gap-1"><span className="rounded bg-emerald-500/80 px-1 text-[7px] font-bold text-white">GET</span><div className="h-3 flex-1 rounded bg-slate-700" /></div>
          <div className="h-1.5 w-3/4 rounded bg-slate-600" /><div className="h-1.5 w-1/2 rounded bg-slate-700" />
        </div>
      </div>
    );
  return (
    <div className={`${base} flex gap-1.5 bg-slate-900 p-2`}>
      <div className="flex w-1/3 flex-col gap-1 rounded bg-slate-800 p-1.5">
        <div className="h-1.5 w-2/3 rounded bg-slate-600" /><div className="h-4 rounded bg-indigo-500/80" /><div className="h-4 rounded bg-slate-700" />
      </div>
      <div className="flex-1 space-y-1.5 rounded bg-slate-800 p-2">
        <div className="h-1.5 w-1/2 rounded bg-slate-500" />
        <div className="grid grid-cols-7 gap-1">{Array.from({ length: 21 }, (_, i) => <span key={i} className={`h-2 rounded-sm ${[2, 5, 6, 9, 10, 11, 14, 15, 17, 18].includes(i) ? "bg-emerald-400/80" : "bg-slate-700"}`} />)}</div>
      </div>
    </div>
  );
}

export function ProjectsApp() {
  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="mb-3 flex justify-end">
        <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs muted transition hover:text-blue-500">
          View All <Icon name="arrow" className="h-3 w-3" />
        </a>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="panel group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[0_12px_30px_-12px_rgba(59,130,246,0.5)]"
          >
            <div className="relative">
              <Preview kind={p.preview} />
              {p.metric && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur">{p.metric}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-sm font-semibold heading">{p.name}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-white/[0.07] dark:text-slate-300">{t}</span>
                ))}
              </div>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-[11px] leading-snug muted">{p.description}</p>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white dark:border-white/20 dark:text-slate-200">
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
