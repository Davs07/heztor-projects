import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Column, Id, Task } from "@/utils/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ellipsis, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (id: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
  updateTask: (id: Id, name: string) => void;
}
export const ColumnContainer = (props: Props) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const [hover, setHover] = useState(false);

  const tasksIds = useMemo(() => {
    return (
      tasks
        // .filter((task) => task.columnId === column.id)
        .map((task) => task.id)
    );
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-60 border-2  border-secondary w-[350px] h-max bg-blue-500 rounded-2xl flex flex-col overflow-y-auto "></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border border-transparent w-[350px] h-max max-h-full  rounded-2xl flex flex-col  overflow-y-auto",
        hover && "border-gray-300 dark:border-secondary duration-1000"
      )}>
      {/* Column Task Tittle */}
      <div
        {...attributes}
        {...listeners}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => setHover(false)}
        onClick={() => setEditMode(true)}
        className=" h-[60px] flex flex-col justify-center text-lg font-bold cursor-grab rounded-2xl rounded-b-none p-3 ">
        <div className="flex justify-between items-center gap-3 max-h-10">
          {editMode ? (
            <Input
              type="text"
              className="w-full text-md focus-visible:ring-1 px-0 text-ellipsis "
              autoFocus
              value={column.title}
              onBlur={() => setEditMode(false)}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            <span className="ml-[1px]  truncate">{column.title}</span>
          )}
          <Button
            variant={"none"}
            size={"icon"}
            className="min-w-10"
            onClick={() => deleteColumn(column.id)}>
            <Ellipsis />
          </Button>
        </div>
      </div>
      {/* Column Task Container */}
      <div className="w-full h-full flex flex-col  flex-grow gap-2 overflow-x-hidden overflow-y-auto px-2 pb-2 ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column Task Footer */}

      <Button
        className="gap-2 justify-start my-2 mx-2"
        variant={"none"}
        onClick={() => createTask(column.id)}>
        <PlusCircle />
        Añadir tarea
      </Button>
    </div>
  );
};
