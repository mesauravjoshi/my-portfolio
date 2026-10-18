import { Icon } from "@/components/ui/Icon";
import { skillGroups, type Skill } from "@/data/portfolio";

const svgBadges = new Set(["atom", "wind", "hex", "leaf", "git", "github", "vscode", "vercel"]);

function Tile({ skill }: { skill: Skill }) {
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${skill.tile}`}>
      {svgBadges.has(skill.badge) ? <Icon name={skill.badge} className="h-4 w-4" /> : skill.badge}
    </span>
  );
}

export function SkillsApp() {
  return (
    <div className="flex h-full min-h-0 flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold heading">Technologies &amp; Tools</h2>
          <p className="mt-0.5 text-xs muted">Tools I work with to bring ideas to life.</p>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-slate-300 px-3.5 py-1.5 text-xs text-slate-600 dark:border-white/15 dark:text-slate-200 sm:flex">
          Always learning <Icon name="arrow" className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-auto sm:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.name} className="panel p-3.5">
            <h3 className="mb-3 text-sm font-semibold heading">{g.name}</h3>
            <ul className="space-y-2.5">
              {g.skills.map((s) => (
                <li key={s.name} className="flex items-center gap-3 text-[13px] text-slate-700 dark:text-slate-200">
                  <Tile skill={s} />
                  <span className="truncate">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
