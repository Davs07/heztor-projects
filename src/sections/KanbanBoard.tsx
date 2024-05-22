import { Button } from "@/components/ui/button";
import { Column, Task } from "@/types";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //300px
      },
    })
  );

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Column["id"]) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const updateColumn = (id: Column["id"], title: Column["title"]) => {
    const updatedColumns = columns.map((col) => {
      if (col.id === id) {
        return { ...col, title };
      }
      return col;
    });
    setColumns(updatedColumns);
  };

  const createTask = (id: Column["id"]) => {
    const newTask: Task = {
      id: generateId(),
      name: `Task ${tasks.length}`,
      columnId: id,
      status: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Task["id"]) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks([...updatedTasks]);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);

    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <div
      className="
        mx-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-scroll
        overflow-y-auto
        px-10
    ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}>
        <div className="m-auto flex  gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  key={column.id}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            variant="outline"
            onClick={createNewColumn}
            className="gap-2 w-[350px]">
            <PlusCircle size={18} />
            Añadir Columna
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
