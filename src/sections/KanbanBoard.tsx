import { Button } from "@/components/ui/button";
import { Column, Task } from "@/types";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "@/components/TaskCard";

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
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

    const newTasks = tasks.filter((task) => task.columnId !== id);

    setTasks(newTasks);
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

  const updateTask = (id: Task["id"], name: Task["name"]) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, name };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) {
      return;
    }
    // I'm dropping a Task over another task

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        // if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        // }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // I'm dropping a Task over a column

    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        // if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = overId;
        // }

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
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
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}>
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
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
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
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
