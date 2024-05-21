import { Task } from "@/types";
import { Card } from "./ui/card";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  return (
    <Card key={task.id} className="cursor-grab h-24 rounded-2xl">
      <h4 className="text-lg">{task.name}</h4>
    </Card>
  );
}

export default TaskCard;
