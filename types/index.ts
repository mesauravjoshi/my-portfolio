export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "terminal"
  | "trash";

export type Geometry = { left: number; top: number; width: number; height: number };

export type WindowState = {
  id: AppId;
  geometry: Geometry;
  restoreGeometry: Geometry;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
};

export type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export type AppActions = {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
};
