"use client";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { AppContent } from "@/components/apps";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { AppActions } from "@/types";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { StatusClock } from "./StatusClock";
import { Window } from "./Window";

export default function Desktop() {
  const {
    windows,
    topZ,
    setWorkspace,
    open,
    close,
    focus,
    minimize,
    toggleMaximize,
    toggleFromDock,
    begin,
  } = useWindowManager();

  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  const actions: AppActions = useMemo(
    () => ({ openApp: open, closeApp: close }),
    [open, close]
  );

  return (
    <main className="wallpaper relative h-dvh w-screen overflow-hidden text-slate-800">
      <div className={`absolute inset-0 transition-colors duration-500 ${dark ? "bg-slate-950/10" : "bg-white/25"}`} />

      <DesktopIcons onOpen={open} />
      <StatusClock />

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

      <Dock windows={windows} onToggle={toggleFromDock} />
    </main>
  );
}