import { appMeta } from "@/data/apps";
import type { AppId } from "@/types";
import { Icon } from "./Icon";

const sizes = { sm: "h-7 w-7 rounded-lg", md: "h-11 w-11 rounded-xl", lg: "h-12 w-12 rounded-[14px]" };

/** Glossy gradient tile used by dock + desktop shortcuts. */
export function AppIcon({ id, size = "md" }: { id: AppId; size?: keyof typeof sizes }) {
  const meta = appMeta[id];
  return (
    <span
      className={`relative flex items-center justify-center bg-linear-to-b ${meta.tile} text-white shadow-lg shadow-black/40 ring-1 ring-white/25 ${sizes[size]}`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-linear-to-b from-white/35 to-transparent" />
      <Icon name={meta.icon} className={size === "sm" ? "relative h-4 w-4" : "relative h-6 w-6"} />
    </span>
  );
}
