import { Id, Task } from "@/utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { Circle, Ellipsis } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, name: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);
  const disableEditMode = () => setEditMode(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      disableEditMode();
    }
  };

  const handleBlur = () => {
    if (editMode) {
      disableEditMode();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "28px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editMode]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={task.id}
      className={`cursor-grab h-max max-h-max min-h-16 rounded-2xl group ${
        isDragging ? "" : "hover:shadow-md"
      }`}
      onClick={editMode ? undefined : toggleEditMode}>
      <CardHeader className="flex flex-row justify-between items-start gap-2 h-max">
        <Button variant={"none3"} size={"icon3"} className="group">
          <Circle />
        </Button>

        <div className="w-full flex-grow h-max">
          {editMode ? (
            <Textarea
              ref={textareaRef}
              className="text-md min-h-4 px-1 py-0 h-auto resize-none overflow-hidden"
              defaultValue={task.name}
              onChange={(e) => {
                updateTask(task.id, e.target.value);
                if (textareaRef.current) {
                  textareaRef.current.style.height = "28px";
                  textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                }
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
              placeholder="Agrega una tarea"
            />
          ) : (
            <h6 className="text-md">{task.name}</h6>
          )}
        </div>

        <Button
          variant={"none2"}
          size={"icon2"}
          className="rounded-lg opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}>
          <Ellipsis />
        </Button>
      </CardHeader>
    </Card>
  );
}

export default TaskCard;
