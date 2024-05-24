import { useState } from "react";
import { projects as initialProjects } from "@/api/ProjectsData";
import { Project } from "@/utils/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const onCreateProject = () => {

  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-2 px-4 gap-6">
      <h2 className="text-4xl">Mis Proyectos</h2>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4  ">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <Button className="flex items-center gap-2 w-[300px] h-[80px] px-2 bg-transparent shadow-none rounded-2xl hover:bg-gray-100 text-gray-400 hover:text-primary">
            <Plus />
            <p>Añade un nuevo proyecto</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
