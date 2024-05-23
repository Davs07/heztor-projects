import { Project } from "@/types";
import React from "react";

interface Props {
  project: Project;
}

export const ProjectInfo = ({ project }: Props) => {
  return (
    <div className="w-full grid place-items-center h-64 ">
      <h3 className="text-3xl">{project.name}</h3>
      <div className="w-full grid grid-rows-2 md:grid-cols-2">
        <div>
          <p>{project.description}</p>
        </div>

        <div className="grid">
          <div>
            <span>Tareas Pendientes</span>
            <p></p>
          </div>
          <div>
            <span>Tareas Terminadas</span>
            <p></p>
          </div>
          <div>
            <span>Total de Tareas</span>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
