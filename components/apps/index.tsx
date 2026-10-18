import type { AppActions, AppId } from "@/types";
import { AboutApp } from "./AboutApp";
import { ContactApp } from "./ContactApp";
import { ExperienceApp } from "./ExperienceApp";
import { ProjectsApp } from "./ProjectsApp";
import { SkillsApp } from "./SkillsApp";
import { TerminalApp } from "./TerminalApp";
import { TrashApp } from "./TrashApp";

export function AppContent({ id, actions }: { id: AppId; actions: AppActions }) {
  // console.log(actions);
  
  switch (id) {
    case "about": return <AboutApp actions={actions} />;
    case "projects": return <ProjectsApp />;
    case "experience": return <ExperienceApp />;
    case "skills": return <SkillsApp />;
    case "contact": return <ContactApp />;
    case "terminal": return <TerminalApp actions={actions} />;
    case "trash": return <TrashApp />;
  }
}
