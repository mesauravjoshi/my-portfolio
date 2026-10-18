import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  folder: <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4m-3-11-2 14" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  trash: <path d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  moon: <path d="M20.8 14.1A8.5 8.5 0 0 1 9.9 3.2 8.5 8.5 0 1 0 20.8 14.1Z" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M5 19h14" />,
  send: <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />,
  external: <path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  minimize: <path d="M5 12h14" />,
  expand: <path d="M9 4H4v5M15 20h5v-5M4 4l6 6M20 20l-6-6" />,
  shrink: <path d="M10 4v6H4M14 20v-6h6M10 10 4 4M14 14l6 6" />,
  atom: <><circle cx="12" cy="12" r="1.5" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></>,
  wind: <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M2 12h16a2.5 2.5 0 1 1-2.5 2.5M5 16h8a2.5 2.5 0 1 1-2.5 2.5" />,
  hex: <path d="m12 2 8.5 5v10L12 22l-8.5-5V7z" />,
  leaf: <path d="M12 2c4 4 6 7 6 11a6 6 0 0 1-12 0c0-4 2-7 6-11Zm0 8v12" />,
  git: <><path d="m12 2 10 10-10 10L2 12z" /><circle cx="10" cy="9" r="1" /><circle cx="14" cy="14" r="1" /><path d="M10 10v3a2 2 0 0 0 2 2h1" /></>,
  vscode: <path d="m16 3 5 2v14l-5 2-9-7-3 2-2-2 4-3-4-3 2-2 3 2zM7 9l9-6v18l-9-7" />,
};

const filled: Record<string, ReactNode> = {
  github: <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.8-.7 2.1-1.1.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.1 1.1a10.7 10.7 0 0 1 5.7 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />,
  linkedin: <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8 19H5V9.6h3zM6.5 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.9 13 12.9 14.3V19h-3V9.6h2.8v1.3a3.1 3.1 0 0 1 2.8-1.5c3 0 3.5 2 3.5 4.5z" />,
  vercel: <path d="m12 3 10 18H2z" />,
};

export function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const isFilled = name in filled;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {filled[name] ?? paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
