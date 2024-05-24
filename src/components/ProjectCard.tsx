import { Project } from "@/utils/types";
import { Card, CardHeader } from "./ui/card";

interface Props {
  project: Project;
  //Project has id: Id;  name: string;   description?: string;   status: boolean;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card className=" px-2 w-[300px] h-[80px] rounded-2xl border-border border">
      <CardHeader>
        <p>{project.name}</p>
      </CardHeader>
    </Card>
  );
};
