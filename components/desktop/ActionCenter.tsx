"use client";
import { useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { useIsDark } from "@/components/ui/ThemeToggle";
import { useFullscreen } from "@/hooks/useFullscreen";

function Tile({ active, disabled, onClick, className = "", children }: { active?: boolean; disabled?: boolean; onClick: () => void; className?: string; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-2xl text-left transition active:scale-[0.97] disabled:opacity-50 ${active
          ? "bg-white text-blue-600 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
          : "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/20"
        } ${className}`}
    >
      {children}
    </button>
  );
}

export function ActionCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setTheme } = useTheme();
  const { dark } = useIsDark();
  const fs = useFullscreen();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[1002]" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-label="Quick settings"
        className="fixed right-4 top-24 z-[1003] w-[19rem] animate-window-in overflow-hidden rounded-[28px] border border-white/20 bg-slate-900/35 p-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_30px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur-3xl backdrop-saturate-150"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/15 to-transparent" />

        <div className="relative flex items-center justify-between px-1.5 pb-3 pt-0.5">
          <h2 className="text-sm font-semibold">Quick Settings</h2>
          <button onClick={onClose} aria-label="Close quick settings" className="rounded-full p-1.5 text-white/70 transition hover:bg-white/15 hover:text-white">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="relative space-y-3">
          <Tile onClick={fs.toggle} active={fs.active} disabled={!fs.supported} className="flex w-full items-center gap-3 p-3.5">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${fs.active ? "bg-blue-600 text-white" : "bg-white/15"}`}>
              <Icon name={fs.active ? "shrink" : "expand"} className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-medium">Fullscreen</span>
              <span className={`block text-xs ${fs.active ? "text-blue-600/70" : "text-white/60"}`}>
                {!fs.supported ? "Not supported here" : fs.active ? "On · tap to exit" : "Off"}
              </span>
            </span>
          </Tile>

          <div>
            <p className="px-1.5 pb-2 text-xs font-medium text-white/60">Appearance</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "light", label: "Light", icon: "sun", active: !dark },
                { id: "dark", label: "Dark", icon: "moon", active: dark },
              ].map((t) => (
                <Tile key={t.id} onClick={() => setTheme(t.id)} active={t.active} className="flex h-24 flex-col justify-between p-3.5">
                  <Icon name={t.icon} className="h-6 w-6" />
                  <span className="text-sm font-medium">{t.label}</span>
                </Tile>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
