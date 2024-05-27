import { projects } from "@/api/ProjectsData";
import { useState } from "react";
import { Project as ProjectType } from "@/utils/types";
import { KanbanBoard } from "@/sections/KanbanBoard";
import { ProjectInfo } from "@/sections/ProjectInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Project = () => {
  const [project] = useState<ProjectType>(projects[0]);

  return (
    <div className="w-full  flex flex-col h-screen overflow-x-auto">
      <div className="place-content-center min-h-24 h-24 text-center">
        <h2>{project.name}</h2>
      </div>

      <Tabs defaultValue="tasks" className="h-full  flex flex-col ">
        <TabsList className="w-max mx-2 ">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="h-full ">
          <ProjectInfo project={project} />
        </TabsContent>
        <TabsContent value="tasks" className="h-full ">
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
