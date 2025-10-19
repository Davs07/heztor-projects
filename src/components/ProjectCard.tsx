import { Id, Project } from "@/utils/types";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Ellipsis } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  onUpdateName: (id: Id, name: string) => void;
}

export const ProjectCard = ({ project, onUpdateName }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

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
      className=" px-2 w-[250px] min-h-[80px] h-max max-h-max rounded-2xl border-border border group"
      onDoubleClick={() => navigate(`/project/${project.id}`)}
    >
      <CardHeader className="flex flex-row w-full h-max justify-between items-center gap-3 ">
        <div className="w-full">
          {editMode ? (
            <Textarea
              ref={textareaRef}
              className="text-md min-h-4 w-full  px-1 py-0 h-auto resize-none overflow-hidden"
              defaultValue={project.name}
              onChange={(e) => {
                onUpdateName(project.id, e.target.value);
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
            <h4
              className="text-md w-full max-w-full"
              onClick={editMode ? undefined : toggleEditMode}>
              {project.name}
            </h4>
          )}
        </div>

        <Button
          variant={"none2"}
          size={"icon2"}
          className="rounded-lg opacity-0 group-hover:opacity-100 "
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Ellipsis />
        </Button>
      </CardHeader>
    </Card>
  );
};
