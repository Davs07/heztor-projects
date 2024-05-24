import { useState } from "react";
import { projects as initialProjects } from "@/api/ProjectsData";
import { Project } from "@/utils/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateId } from "@/utils/utilsProjects";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const onCreateProject = () => {
    const newProject = {
      id: generateId(),
      name: "New Project",
      status: false,
    };

    setProjects([...projects, newProject]);
  };

  const onUpdateName = (id: Project["id"], name: Project["name"]) => {
    const project = projects.find((project) => project.id === id);

    if (project) {
      const updatedProjects = projects.map((project) => {
        if (project.id === id) {
          return { ...project, name };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-2 px-4 gap-6">
      <h2 className="text-4xl">Mis Proyectos</h2>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4  ">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdateName={onUpdateName}
            />
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
