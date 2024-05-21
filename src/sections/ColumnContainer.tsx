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
}
export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;

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
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          setEditMode(false);

          /*  if (e.key === "Escape") {
            setEditMode(false);
          } */
          //  e.key === "Enter" && setEditMode(true)
        }}
        className=" h-[60px] text-lg font-bold cursor-grab rounded-2xl rounded-b-none p-3 ">
        <div className="flex justify-between items-center">
          {editMode ? (
            <Input
              type="text"
              className="w-full"
              defaultValue={column.title}
              onChange={(e) => (column.title = e.target.value)}
            />
          ) : (
            <span>{column.title}</span>
          )}
          <Button
            variant={"none"}
            size={"icon"}
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
