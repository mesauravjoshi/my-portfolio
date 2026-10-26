"use client";
import { useMemo, useState } from "react";
import { AppContent } from "@/components/apps";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { AppActions } from "@/types";
import { ActionCenter } from "./ActionCenter";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { StatusClock } from "./StatusClock";
import { Window } from "./Window";

export default function Desktop() {
  const wm = useWindowManager();
  const [controls, setControls] = useState(false);

  const actions: AppActions = useMemo(() => ({ openApp: wm.open, closeApp: wm.close }), [wm.open, wm.close]);

  return (
    <main className="wallpaper relative h-dvh w-screen overflow-hidden text-slate-800">
      {/* tint keeps both themes readable without changing the wallpaper itself */}
      <div className="absolute inset-0 bg-white/25 transition-colors duration-500 dark:bg-slate-950/10" />

      <DesktopIcons onOpen={wm.open} />
      <StatusClock controlsOpen={controls} onToggleControls={() => setControls((v) => !v)} />

      <div ref={wm.workspaceRef} className="absolute inset-0">
        {wm.windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window
              key={w.id}
              item={w}
              focused={w.zIndex === wm.topZ}
              onFocus={() => wm.focus(w.id)}
              onClose={() => wm.close(w.id)}
              onMinimize={() => wm.minimize(w.id)}
              onMaximize={() => wm.toggleMaximize(w.id)}
              onDragStart={(e) => (e.target as HTMLElement).closest("button") || wm.begin(w.id, "drag", e)}
              onResizeStart={(e, edge) => {
                e.stopPropagation();
                wm.begin(w.id, "resize", e, edge);
              }}
            >
              <AppContent id={w.id} actions={actions} />
            </Window>
          ))}
      </div>

      <ActionCenter open={controls} onClose={() => setControls(false)} />
      <Dock windows={wm.windows} onToggle={wm.toggleFromDock} />
    </main>
  );
}
