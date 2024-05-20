import { Button } from "@/components/ui/button";
import { Column } from "@/types";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  console.log(columns);

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

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);
  };

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-scroll
        overflow-y-auto
        px-10
    ">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex  gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  key={column.id}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            variant="outline"
            onClick={createNewColumn}
            className="gap-2 ">
            <PlusCircle size={18} />
            Añadir Columna
          </Button>
        </div>
      </DndContext>
    </div>
  );
};
