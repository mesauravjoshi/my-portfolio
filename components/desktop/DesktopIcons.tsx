"use client";
import { appMeta, desktopApps } from "@/data/apps";
import { AppIcon } from "@/components/ui/AppIcon";
import type { AppId } from "@/types";

export function DesktopIcons({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <nav aria-label="Desktop shortcuts" className="absolute left-4 top-6 z-0 flex flex-col gap-4 sm:left-6">
      {desktopApps.map((id) => (
        <button
          key={id}
          onDoubleClick={() => onOpen(id)}
          onClick={(e) => {
            // single tap opens on touch devices; double-click on desktop
            if (e.detail === 1 && window.matchMedia("(pointer: coarse)").matches) onOpen(id);
          }}
          onKeyDown={(e) => e.key === "Enter" && onOpen(id)}
          aria-label={`Open ${appMeta[id].label}`}
          className="group flex w-18 flex-col items-center gap-1.5 rounded-xl p-1.5 text-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition hover:bg-white/10"
        >
          <AppIcon id={id} size="lg" />
          {appMeta[id].label}
        </button>
      ))}
    </nav>
  );
}
