import { useParams } from "react-router-dom";
import { Column, Project as ProjectType, Task } from "@/utils/types";
import { KanbanBoard } from "@/sections/KanbanBoard";
import { ProjectInfo } from "@/sections/ProjectInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectsStore, ProjectsState } from "@/store/projectsStore";
import { useMemo } from "react";

export const Project = () => {
  const { id } = useParams();
  const project = useProjectsStore((s: ProjectsState) => s.projects.find((p) => String(p.id) === String(id))) as ProjectType | undefined;
  const columns = useProjectsStore((s: ProjectsState) => s.columns.filter((c) => String(c.projectId) === String(id)));
  const tasks = useProjectsStore((s: ProjectsState) => s.tasks);
  const updateProject = useProjectsStore((s: ProjectsState) => s.updateProject);

  const projectColumnsIds = useMemo(() => columns.map((c: Column) => c.id), [columns]);

  return (
    <div className="w-full  flex flex-col h-screen overflow-x-auto">
      <div className="place-content-center min-h-24 h-24 text-center">
        <h2>{project?.name ?? "Proyecto no encontrado"}</h2>
      </div>

      <Tabs defaultValue="tasks" className="h-full  flex flex-col ">
        <TabsList className="w-max mx-2 ">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="h-full ">
          {project && (
            <ProjectInfo
              project={project}
              onChange={(data) => updateProject(project.id, data)}
              tasksCounters={{
                total: tasks.filter((t: Task) => projectColumnsIds.includes(t.columnId)).length,
                done: tasks.filter((t: Task) => projectColumnsIds.includes(t.columnId) && t.status).length,
              }}
            />
          )}
        </TabsContent>
        <TabsContent value="tasks" className="h-full ">
          {project && <KanbanBoard projectId={project.id} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};
