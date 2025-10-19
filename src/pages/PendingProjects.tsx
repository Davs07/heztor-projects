
import { Card, CardHeader } from "@/components/ui/card";
import { useProjectsStore, ProjectsState } from "@/store/projectsStore";
import { Circle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PendingProjects = () => {
  const tasks = useProjectsStore((s: ProjectsState) => s.tasks);
  const columns = useProjectsStore((s: ProjectsState) => s.columns);
  const projects = useProjectsStore((s: ProjectsState) => s.projects);
  const updateTask = useProjectsStore((s: ProjectsState) => s.updateTask);
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => !task.status);
  const now = new Date();
  const fecha = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const hora = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const clima = "Cajamarca, Peru: ⛅️  +16°C";

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen max-h-screen py-8 px-4 gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-background dark:to-card">
      <header className="w-full flex flex-col items-center gap-2 mb-4">
        <h1 className="text-4xl font-bold text-primary">¡Bienvenido a tu panel de proyectos!</h1>
        <div className="flex flex-row gap-4 items-center text-muted-foreground text-lg">
          <span>{fecha}</span>
          <span className="px-2">|</span>
          <span>{hora}</span>
          <span className="px-2">|</span>
          <span>{clima}</span>
        </div>
      </header>
      <h2 className="text-2xl font-bold mb-2 text-primary">Proyectos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-4">
        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
            <span className="text-2xl mb-2">No tienes proyectos aún</span>
          </div>
        )}
        {projects.map((project) => (
          <Card
            key={project.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{project.name}</span>
              </div>
              <div className="flex flex-row gap-2 text-xs text-muted-foreground">
                <span>ID:</span>
                <span className="font-bold text-primary">{project.id}</span>
              </div>
              <div className="flex flex-row gap-2 text-xs">
                <span>Descripción:</span>
                <span className="font-bold">{project.description ?? "Sin descripción"}</span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-2 text-primary">Tareas Pendientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-4">
        {pendingTasks.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
            <span className="text-2xl mb-2">¡No tienes tareas pendientes!</span>
          </div>
        )}
        {pendingTasks.map((task) => {
          const column = columns.find((col) => col.id === task.columnId);
          const project = projects.find((p) => p.id === column?.projectId);
          return (
            <Card key={task.id} className="rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    className="focus:outline-none"
                    title="Marcar como lista"
                    onClick={() => updateTask(task.id, { status: true })}
                  >
                    <Circle className="text-yellow-400" size={18} />
                  </button>
                  <span className="font-semibold text-lg">{task.name}</span>
                </div>
                <div className="flex flex-row gap-2 text-xs text-muted-foreground">
                  <span>Proyecto:</span>
                  <span className="font-bold text-primary">{project?.name ?? "Sin proyecto"}</span>
                </div>
                <div className="flex flex-row gap-2 text-xs">
                  <span>Columna:</span>
                  <span className="font-bold">{column?.title ?? task.columnId}</span>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
