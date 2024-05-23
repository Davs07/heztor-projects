import { KanbanBoard } from "@/sections/KanbanBoard";
import { projects } from "@/api/ProjectsData";
import { useState } from "react";
import { Project as ProjectType } from "@/types";
import { ProjectInfo } from "@/sections/ProjectInfo";
import { Separator } from "@/components/ui/separator";
export const Project = () => {
  const [project, setProject] = useState<ProjectType>(projects[0]);

  return (
    <div className="w-full flex-col flex gap-2 min-h-screen h-screen max-h-screen ">
      <ProjectInfo project={project} />


      <KanbanBoard />
    </div>
  );
};
