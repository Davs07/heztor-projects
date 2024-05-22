import { Id, Task } from "@/types";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Circle, Ellipsis } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, name: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (editMode) {
    return (
      <Card
        key={task.id}
        className="cursor-grab h-max min-h-16 rounded-2xl group"
        onClick={toggleEditMode}>
        <CardHeader className="flex flex-row justify-between items-start gap-2">
          <Button variant={"none3"} size={"icon3"} className="group">
            <Circle />
          </Button>
          <div className="w-full flex-grow">
            <Textarea
              className="text-lg"
              defaultValue={task.name}
              onChange={(e) => updateTask(task.id, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.shiftKey && toggleEditMode()}
              autoFocus
              onBlur={toggleEditMode}
              placeholder="Agrega una tarea"

            />
          </div>

          <Button
            variant={"none2"}
            size={"icon2"}
            className="rounded-lg opacity-0 group-hover:opacity-100"
            onClick={() => deleteTask(task.id)}>
            <Ellipsis />
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      key={task.id}
      className="cursor-grab h-max min-h-16 rounded-2xl group"
      onClick={toggleEditMode}>
      <CardHeader className="flex flex-row justify-between items-start gap-2">
        <Button variant={"none3"} size={"icon3"} className="group">
          <Circle />
        </Button>
        <div className="w-full flex-grow">
          <h4 className="text-lg">{task.name}</h4>
        </div>

        <Button
          variant={"none2"}
          size={"icon2"}
          className="rounded-lg opacity-0 group-hover:opacity-100"
          onClick={() => deleteTask(task.id)}>
          <Ellipsis />
        </Button>
      </CardHeader>
    </Card>
  );
}

export default TaskCard;
