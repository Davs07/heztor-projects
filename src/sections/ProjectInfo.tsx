import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/utils/types";

interface Props {
  project: Project;
}

export const ProjectInfo = ({ project }: Props) => {
  return (
    <div className="w-full grid place-items-center h-64 min-h-64 ">
      <div className="w-full h-full flex flex-col gap-2 px-2">
        <div className="w-full flex-grow">
          <Textarea
            className="w-full resize-none rounded-2xl bg-card h-full"
            placeholder="Añade una descripción"
            defaultValue={project.description}
            onChange={(e) => {
              project.description = e.target.value;
            }}
          />
        </div>

        <div className="w-full flex-grow">
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
      <Separator className="" />
    </div>
  );
};
