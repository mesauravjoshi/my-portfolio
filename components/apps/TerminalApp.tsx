"use client";
import { useTheme } from "next-themes";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { commandNames, runCommand, welcome, type Line, type Tone } from "@/lib/terminal";
import type { AppActions } from "@/types";

const tones: Record<Tone, string> = {
  default: "text-slate-200",
  accent: "text-sky-300",
  muted: "text-slate-500",
  error: "text-rose-400",
  success: "text-emerald-400",
};

export function TerminalApp({ actions }: { actions: AppActions }) {
  const { theme, setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>(welcome);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    setInput("");
    setCursor(null);
    if (!cmd) return;

    const nextHistory = [...history, cmd];
    setHistory(nextHistory);
    const result = runCommand(cmd, {
      ...actions,
      theme,
      history: nextHistory,
      setTheme: (t) => setTheme(t),
      openUrl: (url) => (url.startsWith("mailto:") ? (window.location.href = url) : window.open(url, "_blank", "noopener,noreferrer")),
    });
    setLines((prev) => (result.clear ? [] : [...prev, { text: cmd, prompt: true }, ...(result.lines ?? [])]));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && cursor !== null) {
      e.preventDefault();
      const i = cursor + 1;
      if (i >= history.length) { setCursor(null); setInput(""); } else { setCursor(i); setInput(history[i]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = commandNames.filter((c) => c.startsWith(input.toLowerCase()));
      if (input && match.length === 1) setInput(match[0] + " ");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div onClick={() => inputRef.current?.focus()} className="h-full cursor-text overflow-auto bg-slate-950/90 p-4 font-mono text-xs leading-relaxed">
      {lines.map((l, i) => (
        <p key={i} className={`whitespace-pre-wrap wrap-break-word ${l.prompt ? "text-slate-100" : tones[l.tone ?? "default"]}`}>
          {l.prompt && <span className="mr-2 text-emerald-400">saurav@portfolio:~$</span>}
          {l.text}
        </p>
      ))}
      <form onSubmit={submit} className="mt-1 flex gap-2">
        <label htmlFor="terminal-input" className="shrink-0 text-emerald-400">saurav@portfolio:~$</label>
        <input
          ref={inputRef}
          id="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-white outline-none"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
