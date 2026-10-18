"use client";
import { appMeta, dockApps } from "@/data/apps";
import { AppIcon } from "@/components/ui/AppIcon";
import type { AppId, WindowState } from "@/types";

export function Dock({ windows, onToggle }: { windows: WindowState[]; onToggle: (id: AppId) => void }) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-4 z-1001 flex justify-center px-3">
      <nav
        aria-label="Application dock"
        className="pointer-events-auto flex items-end gap-2 rounded-[22px] border border-white/15 bg-slate-950/55 px-3 py-2.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
      >
        {dockApps.map((id) => {
          const w = windows.find((x) => x.id === id);
                    return (
            <button
              key={id}
              onClick={() => onToggle(id)}
              aria-label={`${w?.minimized ? "Restore" : w ? "Focus" : "Open"} ${appMeta[id].title}`}
              className="group relative flex origin-bottom flex-col items-center transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.22] active:scale-100"
            >
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                {appMeta[id].title}
              </span>
              <AppIcon id={id} size="md" />
              <span className={`absolute -bottom-1.5 h-1 w-1 rounded-full bg-white/90 transition ${w ? (w.minimized ? "opacity-40" : "opacity-100") : "opacity-0"}`} />
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
