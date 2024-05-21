import { Button } from "@/components/ui/button";
import { Column, Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { Ellipsis, PlusCircle } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (id: Id) => void;
  tasks: Task[];
}
export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn, createTask, tasks } = props;

  const [editMode, setEditMode] = useState(false);

  const [hover, setHover] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isSorting,
    isOver,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
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
        className=" opacity-60 border-2  border-secondary w-[350px] h-[700px] max-h-[700px] rounded-2xl flex flex-col "></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "  border border-transparent w-[350px] h-[700px] max-h-[700px] rounded-2xl flex flex-col ",
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
        className=" h-[60px] text-lg font-bold cursor-grab rounded-2xl rounded-b-none p-3 ">
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
      <div className="w-full h-full flex flex-col flex-grow gap-4 overflow-x-hidden overflow-y-auto px-2">
        {tasks.map((task) => (
          <Card key={task.id} className="cursor-grab min-h-24 h-24 rounded-2xl">
            <h4 className="text-lg">{task.name}</h4>
          </Card>
        ))}
      </div>
      {/* Column Task Footer */}
      <Button
        className="gap-2 mt-4"
        variant={"none"}
        onClick={() => createTask(column.id)}>
        <PlusCircle />
        Añadir tarea
      </Button>
    </div>
  );
};
