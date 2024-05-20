import { Link, Route, Routes } from "react-router-dom";

import { ChevronDown, Plus, SquareCheck } from "lucide-react";
import { Button } from "./components/ui/button";
import { PendingProjects } from "./pages/PendingProjects";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-row text-primary   bg-background dark">
      <aside className=" col-span-2 bg-card h-full w-[280px] justify-start p-4">
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
      <div className="w-full flex-1 flex justify-center overflow-y-auto ">
        <Routes>
          <Route path="/" element={<PendingProjects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
