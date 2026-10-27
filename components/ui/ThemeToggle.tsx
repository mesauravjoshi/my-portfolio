"use client";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";

export function useIsDark() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = resolvedTheme !== undefined;
  const dark = resolvedTheme === undefined || resolvedTheme === "dark";
  return { dark, mounted, toggle: () => setTheme(dark ? "light" : "dark") };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dark, toggle } = useIsDark();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      className={`rounded-lg p-2 text-indigo-200 transition hover:bg-white/10 hover:text-white ${className}`}
    >
      <Icon name={dark ? "moon" : "sun"} className="h-5 w-5" />
    </button>
  );
}

/** Sidebar switch used in the About window. */
export function ThemeSwitch() {
  const { dark, toggle } = useIsDark();
  return (
    <button onClick={toggle} role="switch" aria-checked={dark} className="flex w-full flex-col items-center gap-2 text-[11px] muted">
      <span className="flex items-center gap-2">
        <Icon name="sun" className="h-3.5 w-3.5" />
        <span className={`relative h-5 w-9 rounded-full transition ${dark ? "bg-blue-600" : "bg-slate-300"}`}>
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${dark ? "left-[18px]" : "left-0.5"}`} />
        </span>
      </span>
      Dark Mode
    </button>
  );
}
