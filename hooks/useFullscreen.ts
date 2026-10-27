"use client";
import { useCallback, useSyncExternalStore } from "react";

const subscribeToFullscreen = (onChange: () => void) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};
const subscribeToFullscreenSupport = () => () => {};
const getFullscreenSnapshot = () => !!document.fullscreenElement;
const getFullscreenSupportSnapshot = () => !!document.fullscreenEnabled;
const getFullscreenServerSnapshot = () => false;

export function useFullscreen() {
  const active = useSyncExternalStore(
    subscribeToFullscreen,
    getFullscreenSnapshot,
    getFullscreenServerSnapshot,
  );
  const supported = useSyncExternalStore(
    subscribeToFullscreenSupport,
    getFullscreenSupportSnapshot,
    getFullscreenServerSnapshot,
  );

  const toggle = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      /* browser refused (e.g. not triggered by a user gesture) */
    }
  }, []);

  return { active, supported, toggle };
}
