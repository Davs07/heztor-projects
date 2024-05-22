import { Id, Task } from "@/types";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Circle, Ellipsis } from "lucide-react";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Card
      key={task.id}
      className="cursor-grab h-max min-h-16 rounded-2xl group">
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
