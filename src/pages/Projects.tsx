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
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-2 px-4 gap-6">
      <h2 className="text-4xl">Mis Proyectos</h2>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4  ">
          {projects.map((project: Project) => (
            <div key={project.id} onDoubleClick={() => navigate(`/project/${project.id}`)}>
              <ProjectCard
                project={project}
                onUpdateName={onUpdateName}
              />
            </div>
          ))}
          <Button
            className="flex items-center gap-2 w-[250px] h-[80px] px-2 bg-transparent shadow-none rounded-2xl hover:bg-gray-100 text-gray-400 hover:text-primary"
            onClick={onCreateProject}>
            <Plus />
            <p>Añade un nuevo proyecto</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
