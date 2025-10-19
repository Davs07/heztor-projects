import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, SquareCheck } from "lucide-react";
import { useProjectsStore, ProjectsState } from "@/store/projectsStore";
import { Project } from "@/utils/types";
export const Navbar = () => {
  const navigate = useNavigate();
  const projects = useProjectsStore((s: ProjectsState) => s.projects);
  const addProject = useProjectsStore((s: ProjectsState) => s.addProject);
  const onCreate = () => {
    const p = addProject({ name: "Nuevo Proyecto" });
    navigate(`/project/${p.id}`);
  };
  return (
    <aside className=" col-span-2 bg-card h-full min-w-[280px] w-[280px] justify-start p-4 ">
      <div className="w-full h-full ">
        <nav>
          <ul className="flex flex-col">
            <Button variant="outline" className="mb-2 " onClick={onCreate}>
              <Plus />
              Crear Proyecto
            </Button>
            <li>
              <Link to="/">
                <Button variant={"ghost"} className="w-full justify-start ">
                  Pendiente
                </Button>
              </Link>
            </li>
            <li>
              <div>
                <Link to="/projects">
                  <Button
                    variant={"ghost"}
                    className="w-full justify-between font-bold ">
                    Proyectos
                    <ChevronDown />
                  </Button>
                </Link>
                <ul className="mt-1 ml-2">
                  {projects.map((p: Project) => (
                    <li key={p.id}>
                      <Button
                        variant={"ghost"}
                        className="w-full justify-start gap-2 font-normal"
                        onClick={() => navigate(`/project/${p.id}`)}>
                        <SquareCheck strokeWidth={1} height={15} />
                        {p.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
