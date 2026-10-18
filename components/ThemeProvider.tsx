"use client";
import { ThemeProvider as NextThemes } from "next-themes";
import type { ComponentProps } from "react";

/** Persists theme in localStorage ("theme") and toggles the `dark` class on <html>. */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemes>) {
  return (
    <NextThemes attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme" disableTransitionOnChange {...props}>
      {children}
    </NextThemes>
  );
}
