import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PendingProjects } from "./pages/PendingProjects";
import { Project } from "./pages/Project";
import { Projects } from "./pages/Projects";
import { Navbar } from "./sections/Navbar";

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-row   bg-background ">
      <Navbar />
      <div className="w-full flex-1 flex justify-center overflow-y-auto max-w-screen overflow-x-hidden ">
        <Routes>
          <Route path="/" element={<PendingProjects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
