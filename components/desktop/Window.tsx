"use client";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { appMeta } from "@/data/apps";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ResizeEdge, WindowState } from "@/types";
import { Icon } from "@/components/ui/Icon";

const edges: Record<ResizeEdge, string> = {
  n: "inset-x-3 top-0 h-1.5 cursor-n-resize",
  s: "inset-x-3 bottom-0 h-1.5 cursor-s-resize",
  e: "inset-y-3 right-0 w-1.5 cursor-e-resize",
  w: "inset-y-3 left-0 w-1.5 cursor-w-resize",
  ne: "right-0 top-0 h-3.5 w-3.5 cursor-ne-resize",
  nw: "left-0 top-0 h-3.5 w-3.5 cursor-nw-resize",
  se: "bottom-0 right-0 h-3.5 w-3.5 cursor-se-resize",
  sw: "bottom-0 left-0 h-3.5 w-3.5 cursor-sw-resize",
};

type Props = {
  item: WindowState;
  focused: boolean;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDragStart: (e: ReactPointerEvent) => void;
  onResizeStart: (e: ReactPointerEvent, edge: ResizeEdge) => void;
};

/** Traffic-light button: coloured dot on the left, glyph appears when the group is hovered. */
function Light({ color, hover, label, icon, onClick, focused }: { color: string; hover: string; label: string; icon: string; onClick: () => void; focused: boolean }) {
  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-3 w-3 items-center justify-center rounded-full text-black/60 ring-1 ring-black/15 transition ${
        focused ? color : `bg-slate-500/40 ${hover}`
      }`}
    >
      <Icon name={icon} className="h-2 w-2 opacity-0 group-hover/lights:opacity-100" />
    </button>
  );
}

export function Window({ item, focused, children, onFocus, onClose, onMinimize, onMaximize, onDragStart, onResizeStart }: Props) {
  const meta = appMeta[item.id];
  const mobile = useMediaQuery("(max-width: 640px)");
  const g = mobile ? { left: 0, top: 0, width: 100, height: 91 } : item.geometry;

  return (
    <section
      aria-label={`${meta.title} window`}
      onPointerDown={onFocus}
      style={{ left: `${g.left}%`, top: `${g.top}%`, width: `${g.width}%`, height: `${g.height}%`, zIndex: item.zIndex }}
      className={`glass absolute flex min-h-40 min-w-0 animate-window-in flex-col overflow-hidden rounded-xl sm:min-w-80 ${
        focused ? "" : "brightness-[0.92] saturate-[0.9]"
      }`}
    >
      <header
        onPointerDown={mobile ? undefined : onDragStart}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button")) onMaximize();
        }}
        className="flex h-10 shrink-0 touch-none cursor-grab items-center gap-4 border-b border-slate-200/70 bg-slate-100/60 px-3.5 active:cursor-grabbing dark:border-white/[0.07] dark:bg-white/3"
      >
        {/* macOS traffic lights — left side only */}
        <div className="group/lights flex items-center gap-2" role="group" aria-label="Window controls">
          <Light focused={focused} color="bg-[#ff5f57]" hover="group-hover/lights:bg-[#ff5f57]" label={`Close ${meta.title}`} icon="close" onClick={onClose} />
          <Light focused={focused} color="bg-[#febc2e]" hover="group-hover/lights:bg-[#febc2e]" label={`Minimize ${meta.title}`} icon="minimize" onClick={onMinimize} />
          <Light
            focused={focused}
            color="bg-[#28c840]" hover="group-hover/lights:bg-[#28c840]"
            label={item.maximized ? `Restore ${meta.title}` : `Maximize ${meta.title}`}
            icon={item.maximized ? "shrink" : "expand"}
            onClick={onMaximize}
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
          <Icon name={meta.icon} className="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" />
          {meta.title}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden text-slate-700 dark:text-slate-200">{children}</div>

      {!item.maximized && !mobile && (Object.keys(edges) as ResizeEdge[]).map((edge) => (
        <div key={edge} onPointerDown={(e) => onResizeStart(e, edge)} className={`absolute z-10 ${edges[edge]}`} />
      ))}
    </section>
  );
}
