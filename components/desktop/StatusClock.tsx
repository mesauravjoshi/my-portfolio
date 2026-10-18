"use client";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function StatusClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(t);
  }, []);

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
      <ThemeToggle className="-mt-0.5" />
    </div>
  );
}
