import { Column } from "@/types";

interface Props {
  column: Column;
}
export const ColumnContainer = (props: Props) => {
  const { column } = props;
  return (
    <div className="bg-secondary w-[350px] h-[500px] max-h-[500px] rounded-2xl flex flex-col ">
      {/* Column Task Tittle */}
      <div className="bg-card h-[60px] text-lg font-bold cursor-grab rounded-2xl rounded-b-none p-3 border-4 border-secondary">
        {column.title}
      </div>
      {/* Column Task Container */}
      <div className="w-full h-full flex flex-grow"></div>
      {/* Column Task Footer */}
      <div>Footer</div>
    </div>
  );
};
