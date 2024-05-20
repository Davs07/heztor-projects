import { Button } from "@/components/ui/button";
import { Column } from "@/types";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { ColumnContainer } from "./ColumnContainer";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  console.log(columns);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
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
      <div className="m-auto flex  gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer column={column} key={column.id} />
          ))}
        </div>
        <Button variant="outline" onClick={createNewColumn}>
          <PlusCircle />
          Añadir Columna
        </Button>
      </div>
    </div>
  );
};
