import { Button } from "@/components/ui/button";
import { Column, Id, Task } from "@/utils/types";
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
import { ProjectsState, useProjectsStore } from "@/store/projectsStore";

export const KanbanBoard = ({ projectId }: { projectId: Id }) => {
  const columnsAll = useProjectsStore((s: ProjectsState) => s.columns);
  const tasksAll = useProjectsStore((s: ProjectsState) => s.tasks);
  const addColumn = useProjectsStore((s: ProjectsState) => s.addColumn);
  const deleteColumnStore = useProjectsStore((s: ProjectsState) => s.deleteColumn);
  const updateColumnStore = useProjectsStore((s: ProjectsState) => s.updateColumn);
  const addTask = useProjectsStore((s: ProjectsState) => s.addTask);
  const deleteTaskStore = useProjectsStore((s: ProjectsState) => s.deleteTask);
  const updateTaskStore = useProjectsStore((s: ProjectsState) => s.updateTask);
  const moveTaskStore = useProjectsStore((s: ProjectsState) => s.moveTask);

  const columns = useMemo(
    () => columnsAll.filter((c: Column) => String(c.projectId) === String(projectId)),
    [columnsAll, projectId]
  );
  const tasks = useMemo(
    () => tasksAll.filter((t: Task) => columns.some((c: Column) => c.id === t.columnId)),
    [tasksAll, columns]
  );
  const columnsId = useMemo(() => columns.map((c: Column) => c.id), [columns]);

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
    addColumn(projectId, `Columna ${columns.length + 1}`);
  };

  const deleteColumn = (id: Column["id"]) => {
    deleteColumnStore(id);
  };

  const updateColumn = (id: Column["id"], title: Column["title"]) => {
    updateColumnStore(id, { title });
  };

  const createTask = (id: Column["id"]) => {
    addTask(id, { name: `Tarea ${tasks.length}` });
  };

  const deleteTask = (id: Task["id"]) => {
    deleteTaskStore(id);
  };

  const updateTask = (id: Task["id"], name: Task["name"]) => {
    updateTaskStore(id, { name });
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

    // Column reordering is global; keep simple KISS by not persisting order for now
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
  const activeIndex = tasks.findIndex((task: Task) => task.id === activeId);
  const overIndex = tasks.findIndex((task: Task) => task.id === overId);
      if (activeIndex === -1 || overIndex === -1) return;
      const toColumnId = tasks[overIndex].columnId;
      moveTaskStore(activeId, toColumnId, overIndex);
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // I'm dropping a Task over a column

    if (isActiveTask && isOverAColumn) {
      moveTaskStore(activeId, overId);
    }
  };

  return (
    <div
      className="
        flex
        flex-grow
        flex-col
        min-h-[400px]
        h-full
        max-h-full
        w-full
        min-w-full
        items-start
        justify-start
        overflow-x-scroll
        overflow-y-hidden
        
    ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}>
        <div className=" flex flex-grow  gap-4 mx-4  ">
          <div className="flex gap-4 ">
            <SortableContext items={columnsId}>
              {columns.map((column: Column) => (
                <ColumnContainer
                  column={column}
                  key={column.id}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task: Task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            variant="outline"
            onClick={createNewColumn}
            className="gap-2 w-[350px] bg-transparent">
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
                tasks={tasks.filter((task: Task) => task.columnId === activeColumn.id)}
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
