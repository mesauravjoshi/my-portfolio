"use client";
import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(!!document.fullscreenEnabled);
    const sync = () => setActive(!!document.fullscreenElement);
    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

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
