import { Button } from "@/components/ui/button";
import { Column, Id } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { Ellipsis } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}
export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn } = props;

  const [editMode, setEditMode] = useState(false);

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
      type: "column",
      column,
      /* id: column.id,
          title: column.title,
          tasks: [],
          status: column.title, */
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
        className=" opacity-60 border-2 border-rose-500 border-secondary w-[350px] h-[500px] max-h-[500px] rounded-2xl flex flex-col "></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-secondary border w-[350px] h-[500px] max-h-[500px] rounded-2xl flex flex-col ">
      {/* Column Task Tittle */}
      <div
        {...attributes}
        {...listeners}
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
      <div className="w-full h-full flex flex-grow"></div>
      {/* Column Task Footer */}
      <div>Footer</div>
    </div>
  );
};
