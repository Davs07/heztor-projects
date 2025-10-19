import { useNavigate } from "react-router-dom";
import { Project } from "@/utils/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectsState, useProjectsStore } from "@/store/projectsStore";

export const Projects = () => {
  const projects = useProjectsStore((s: ProjectsState) => s.projects);
  const addProject = useProjectsStore((s: ProjectsState) => s.addProject);
  const updateProject = useProjectsStore((s: ProjectsState) => s.updateProject);
  const navigate = useNavigate();

  const onCreateProject = () => {
    const p = addProject({ name: "Nuevo Proyecto" });
    navigate(`/project/${p.id}`);
  };

  const onUpdateName = (id: Project["id"], name: Project["name"]) => {
    updateProject(id, { name });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-8 px-4 gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-background dark:to-card">
      <h2 className="text-4xl font-bold mb-2 text-primary">Mis Proyectos</h2>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {projects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
              <span className="text-2xl mb-2">No tienes proyectos aún</span>
              <Button
                className="flex items-center gap-2 w-[250px] h-[80px] px-2 bg-primary/90 shadow-lg rounded-2xl hover:bg-primary text-white text-lg font-semibold"
                onClick={onCreateProject}
              >
                <Plus />
                <span>Crear tu primer proyecto</span>
              </Button>
            </div>
          )}
          {projects.map((project: Project) => (
            <div
              key={project.id}
              onDoubleClick={() => navigate(`/project/${project.id}`)}
              className="transition-all duration-150 hover:scale-[1.03] hover:shadow-xl"
            >
              <ProjectCard
                project={project}
                onUpdateName={onUpdateName}
              />
            </div>
          ))}
          {projects.length > 0 && (
            <Button
              className="flex items-center gap-2 w-[250px] h-[80px] px-2 bg-primary/10 shadow-none rounded-2xl hover:bg-primary/20 text-primary hover:text-primary font-semibold"
              onClick={onCreateProject}
            >
              <Plus />
              <span>Añadir nuevo proyecto</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
