import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, SquareCheck } from "lucide-react";
export const Navbar = () => {
  return (
    <aside className=" col-span-2 bg-card h-full w-[280px] justify-start p-4 ">
      <div className="w-full h-full ">
        <nav>
          <ul className="flex flex-col">
            <Button variant="outline" className="mb-2 ">
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
              <Link to="/projects">
                <Button
                  variant={"ghost"}
                  className="w-full justify-between font-bold ">
                  Proyectos
                  <ChevronDown />
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/project">
                <Button
                  variant={"ghost"}
                  className="w-full justify-start gap-2 font-normal">
                  <SquareCheck strokeWidth={1} height={15} />
                  Proyecto
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
