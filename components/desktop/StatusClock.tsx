"use client";
import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const subscribeToClock = (onTick: () => void) => {
  const interval = window.setInterval(onTick, 15_000);
  return () => window.clearInterval(interval);
};
const getClockSnapshot = () => Math.floor(Date.now() / 15_000);
const getClockServerSnapshot = () => null;

export function StatusClock({ onToggleControls, controlsOpen }: { onToggleControls: () => void; controlsOpen: boolean }) {
  const clockTick = useSyncExternalStore(subscribeToClock, getClockSnapshot, getClockServerSnapshot);
  const now = clockTick === null ? null : new Date(clockTick * 15_000);

  const time = now?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) ?? "";
  const [clock, meridiem] = time.split(/\s+/);
  const date = now?.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" }) ?? "";

  return (
    <div className="absolute right-5 top-4 z-20 flex items-start gap-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
      <div className="text-right" aria-live="off">
        <p className="min-h-9 text-3xl font-light leading-none tracking-wide tabular-nums">
          {clock}
          <span className="ml-1 text-sm">{meridiem}</span>
        </p>
        <p className="mt-1.5 min-h-4 text-xs text-white/85">{date}</p>
      </div>
      <span className="mt-0.5 h-9 w-px bg-white/25" />
      <div className="-mt-0.5 flex items-center">
        <ThemeToggle />
        <button
          onClick={onToggleControls}
          aria-label="Quick settings"
          aria-expanded={controlsOpen}
          className={`rounded-lg p-2 transition hover:bg-white/10 ${controlsOpen ? "bg-white/15 text-white" : "text-indigo-200 hover:text-white"}`}
        >
          <Icon name="controls" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
