import { useState } from "react";
import { initialTasks } from "@/api/TasksData";
import { projects as initialProjects } from "@/api/ProjectsData";
import { initialColumns } from "@/api/ColumnData";

import { Card, CardHeader } from "@/components/ui/card";

export const PendingProjects = () => {
  const [tasks] = useState(initialTasks);
  const [columns] = useState(initialColumns);

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-2 px-4 gap-6">
      <div className="flex flex-row w-full gap-4 flex-wrap">
        {tasks
          .filter((task) => task.status === false)
          .map((task) => (
            <Card>
              <CardHeader>
                <div>{task.name}</div>
                <p className="text-xs">Column Id: {task.columnId}</p>
                <p className="text-xs">
                  Project Id:
                  {columns.map(
                    (column) =>
                      column.id === task.columnId && <>{column.projectId}</>
                  )}
                </p>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
};
