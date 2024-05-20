import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const KanbanBoard = () => {
  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-auto
        px-10
    ">
      <div className="m-auto">
        <Button variant="outline">
          <PlusCircle />
          Añadir Columna
        </Button>
      </div>
    </div>
  );
};
