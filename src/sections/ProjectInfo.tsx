import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/utils/types";
import { Input } from "@/components/ui/input";

interface Props {
  project: Project;
  onChange: (data: Partial<Project>) => void;
  tasksCounters?: { total: number; done: number };
}

export const ProjectInfo = ({ project, onChange, tasksCounters }: Props) => {
  return (
    <div className="w-full grid place-items-center h-64 min-h-64 ">
      <div className="w-full h-full flex flex-col gap-2 px-2">
        <div className="w-full flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Nombre:</span>
          <Input
            className="rounded-2xl"
            value={project.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div className="w-full flex-grow">
          <Textarea
            className="w-full resize-none rounded-2xl bg-card h-full"
            placeholder="Añade una descripción"
            defaultValue={project.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>

        <div className="w-full flex-grow">
          {tasksCounters && (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-card rounded-2xl p-3">
                <span className="block text-xs text-muted-foreground">Pendientes</span>
                <p className="text-lg font-semibold">{tasksCounters.total - tasksCounters.done}</p>
              </div>
              <div className="bg-card rounded-2xl p-3">
                <span className="block text-xs text-muted-foreground">Terminadas</span>
                <p className="text-lg font-semibold">{tasksCounters.done}</p>
              </div>
              <div className="bg-card rounded-2xl p-3">
                <span className="block text-xs text-muted-foreground">Total</span>
                <p className="text-lg font-semibold">{tasksCounters.total}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator className="" />
    </div>
  );
};
