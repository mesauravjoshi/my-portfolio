"use client";
import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { appMeta, initialOpen } from "@/data/apps";
import type { AppId, Geometry, ResizeEdge, WindowState } from "@/types";

const MAXIMIZED: Geometry = { left: 0, top: 0, width: 100, height: 91 };
const MIN_W = 24;
const MIN_H = 20;

type Interaction = {
  id: AppId;
  kind: "drag" | "resize";
  edge?: ResizeEdge;
  startX: number;
  startY: number;
  geometry: Geometry;
};

export function useWindowManager() {
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const setWorkspace = useCallback((el: HTMLDivElement | null) => {
    workspaceRef.current = el;
  }, []);

  const interaction = useRef<Interaction | null>(null);

  const create = useCallback((id: AppId, zIndex: number): WindowState => {
    const geometry = appMeta[id].geometry;
    return { id, geometry, restoreGeometry: geometry, zIndex, minimized: false, maximized: false };
  }, []);

  const [windows, setWindows] = useState<WindowState[]>(() => initialOpen.map((id, index) => create(id, 11 + index)));

  const topZ = (list: WindowState[]) => Math.max(0, ...list.filter((w) => !w.minimized).map((w) => w.zIndex));
  const nextZ = (list: WindowState[]) => Math.max(10, ...list.map((w) => w.zIndex)) + 1;

  const focus = useCallback((id: AppId) => {
    setWindows((list) => {
      const target = list.find((w) => w.id === id);
      if (target && !target.minimized && target.zIndex === topZ(list)) return list;
      const zIndex = nextZ(list);
      return list.map((w) => (w.id === id ? { ...w, minimized: false, zIndex } : w));
    });
  }, []);

  /** Open (or bring to front). Never minimizes. */
  const open = useCallback(
    (id: AppId) => {
      setWindows((list) =>
        list.some((w) => w.id === id)
          ? list.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ(list) } : w))
          : [...list, create(id, nextZ(list))],
      );
    },
    [create],
  );

  /** Dock behaviour: open → focus → minimize if already on top. */
  const toggleFromDock = useCallback(
    (id: AppId) => {
      setWindows((list) => {
        const w = list.find((x) => x.id === id);
        if (!w) return [...list, create(id, nextZ(list))];
        if (!w.minimized && w.zIndex === topZ(list)) return list.map((x) => (x.id === id ? { ...x, minimized: true } : x));
        const zIndex = nextZ(list);
        return list.map((x) => (x.id === id ? { ...x, minimized: false, zIndex } : x));
      });
    },
    [create],
  );

  const close = useCallback((id: AppId) => setWindows((l) => l.filter((w) => w.id !== id)), []);
  const minimize = useCallback((id: AppId) => setWindows((l) => l.map((w) => (w.id === id ? { ...w, minimized: true } : w))), []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((l) =>
      l.map((w) => {
        if (w.id !== id) return w;
        const next = !w.maximized;
        return {
          ...w,
          zIndex: nextZ(l),
          maximized: next,
          restoreGeometry: next ? w.geometry : w.restoreGeometry,
          geometry: next ? MAXIMIZED : w.restoreGeometry,
        };
      }),
    );
  }, []);

  const begin = useCallback(
    (id: AppId, kind: "drag" | "resize", event: ReactPointerEvent, edge?: ResizeEdge) => {
      const w = windows.find((x) => x.id === id);
      if (!w || (kind === "drag" && w.maximized)) return;
      event.preventDefault();
      interaction.current = { id, kind, edge, startX: event.clientX, startY: event.clientY, geometry: w.geometry };
      document.body.style.userSelect = "none";
    },
    [windows],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const it = interaction.current;
      const bounds = workspaceRef.current?.getBoundingClientRect();
      if (!it || !bounds) return;
      const dx = ((e.clientX - it.startX) / bounds.width) * 100;
      const dy = ((e.clientY - it.startY) / bounds.height) * 100;
      const s = it.geometry;

      setWindows((list) =>
        list.map((w) => {
          if (w.id !== it.id) return w;
          if (it.kind === "drag") {
            return {
              ...w,
              geometry: {
                ...s,
                left: Math.max(0, Math.min(100 - s.width, s.left + dx)),
                top: Math.max(0, Math.min(92, s.top + dy)),
              },
            };
          }
          let { left, top, width, height } = s;
          const edge = it.edge ?? "se";
          if (edge.includes("e")) width = Math.min(100 - left, Math.max(MIN_W, s.width + dx));
          if (edge.includes("s")) height = Math.min(100 - top, Math.max(MIN_H, s.height + dy));
          if (edge.includes("w")) {
            width = Math.max(MIN_W, Math.min(s.width - dx, s.left + s.width));
            left = Math.max(0, s.left + s.width - width);
          }
          if (edge.includes("n")) {
            height = Math.max(MIN_H, Math.min(s.height - dy, s.top + s.height));
            top = Math.max(0, s.top + s.height - height);
          }
          return { ...w, geometry: { left, top, width, height } };
        }),
      );
    };
    const stop = () => {
      interaction.current = null;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  return { windows, setWorkspace, open, close, minimize, focus, toggleMaximize, toggleFromDock, begin, topZ: topZ(windows) };
}
