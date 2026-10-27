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
  const { windows, setWorkspace, open, close, minimize, focus, toggleMaximize, toggleFromDock, begin, topZ } =
    useWindowManager();
  const [controls, setControls] = useState(false);

  const actions: AppActions = useMemo(() => ({ openApp: open, closeApp: close }), [open, close]);

  return (
    <main className="wallpaper relative h-dvh w-screen overflow-hidden text-slate-800">
      {/* tint keeps both themes readable without changing the wallpaper itself */}
      <div className="absolute inset-0 bg-white/25 transition-colors duration-500 dark:bg-slate-950/10" />

      <DesktopIcons onOpen={open} />
      <StatusClock controlsOpen={controls} onToggleControls={() => setControls((v) => !v)} />

      <div ref={setWorkspace} className="absolute inset-0">
        {windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window
              key={w.id}
              item={w}
              focused={w.zIndex === topZ}
              onFocus={() => focus(w.id)}
              onClose={() => close(w.id)}
              onMinimize={() => minimize(w.id)}
              onMaximize={() => toggleMaximize(w.id)}
              onDragStart={(e) => (e.target as HTMLElement).closest("button") || begin(w.id, "drag", e)}
              onResizeStart={(e, edge) => {
                e.stopPropagation();
                begin(w.id, "resize", e, edge);
              }}
            >
              <AppContent id={w.id} actions={actions} />
            </Window>
          ))}
      </div>

      <ActionCenter open={controls} onClose={() => setControls(false)} />
      <Dock windows={windows} onToggle={toggleFromDock} />
    </main>
  );
}
