import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Column, Id, Project, Task } from "@/utils/types";
import { projects as seedProjects } from "@/api/ProjectsData";
import { initialColumns as seedColumns } from "@/api/ColumnData";
import { initialTasks as seedTasks } from "@/api/TasksData";
import { generateId } from "@/utils/utilsProjects";

export type ProjectsState = {
  projects: Project[];
  columns: Column[];
  tasks: Task[];
  // actions
  addProject: (data?: Partial<Project>) => Project;
  updateProject: (id: Id, data: Partial<Project>) => void;
  deleteProject: (id: Id) => void;

  addColumn: (projectId: Id, title?: string) => Column;
  updateColumn: (id: Id, data: Partial<Column>) => void;
  deleteColumn: (id: Id) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;

  addTask: (columnId: Id, data?: Partial<Task>) => Task;
  updateTask: (id: Id, data: Partial<Task>) => void;
  deleteTask: (id: Id) => void;
  moveTask: (taskId: Id, toColumnId: Id, toIndex?: number) => void;
};

const seed = () => ({
  projects: seedProjects,
  columns: seedColumns,
  tasks: seedTasks,
});

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (
      set: (fn: (state: ProjectsState) => ProjectsState | Partial<ProjectsState>) => void,
      get: () => ProjectsState
    ) => ({
      ...seed(),
  addProject: (data?: Partial<Project>) => {
        const newProject: Project = {
          id: generateId(),
          name: data?.name ?? "Nuevo Proyecto",
          description: data?.description ?? "",
          status: data?.status ?? false,
        };
        set((state: ProjectsState) => ({ projects: [...state.projects, newProject] }));
        return newProject;
      },
      updateProject: (id: Id, data: Partial<Project>) => {
        set((state: ProjectsState) => ({
          projects: state.projects.map((p: Project) => (p.id === id ? { ...p, ...data } : p)),
        }));
      },
      deleteProject: (id: Id) => {
        set((state: ProjectsState) => ({
          projects: state.projects.filter((p: Project) => p.id !== id),
          columns: state.columns.filter((c: Column) => c.projectId !== id),
          tasks: state.tasks.filter((t: Task) =>
            state.columns.find((c: Column) => c.id === t.columnId)?.projectId !== id
          ),
        }));
      },

      addColumn: (projectId: Id, title?: string) => {
        const col: Column = { id: generateId(), title: title ?? "Nueva columna", projectId };
        set((state: ProjectsState) => ({ columns: [...state.columns, col] }));
        return col;
      },
      updateColumn: (id: Id, data: Partial<Column>) => {
        set((state: ProjectsState) => ({
          columns: state.columns.map((c: Column) => (c.id === id ? { ...c, ...data } : c)),
        }));
      },
      deleteColumn: (id: Id) => {
        set((state: ProjectsState) => ({
          columns: state.columns.filter((c: Column) => c.id !== id),
          tasks: state.tasks.filter((t: Task) => t.columnId !== id),
        }));
      },
      moveColumn: (fromIndex: number, toIndex: number) => {
        set((state: ProjectsState) => {
          const arr = [...state.columns];
          const [moved] = arr.splice(fromIndex, 1);
          arr.splice(toIndex, 0, moved);
          return { columns: arr };
        });
      },

      addTask: (columnId: Id, data?: Partial<Task>) => {
        const task: Task = {
          id: generateId(),
          columnId,
          name: data?.name ?? "Nueva tarea",
          description: data?.description ?? "",
          status: data?.status ?? false,
          deadline: data?.deadline,
          priority: data?.priority,
          type: data?.type,
          startTime: data?.startTime,
          endTime: data?.endTime,
        };
        set((state: ProjectsState) => ({ tasks: [...state.tasks, task] }));
        return task;
      },
      updateTask: (id: Id, data: Partial<Task>) => {
        set((state: ProjectsState) => ({
          tasks: state.tasks.map((t: Task) => (t.id === id ? { ...t, ...data } : t)),
        }));
      },
      deleteTask: (id: Id) => {
        set((state: ProjectsState) => ({ tasks: state.tasks.filter((t: Task) => t.id !== id) }));
      },
      moveTask: (taskId: Id, toColumnId: Id, toIndex?: number) => {
        set((state: ProjectsState) => {
          const tasks = [...state.tasks];
          const fromIndex = tasks.findIndex((t) => t.id === taskId);
          if (fromIndex === -1) return { tasks };
          tasks[fromIndex] = { ...tasks[fromIndex], columnId: toColumnId };
          if (typeof toIndex === "number") {
            const [moved] = tasks.splice(fromIndex, 1);
            tasks.splice(toIndex, 0, moved);
          }
          return { tasks };
        });
      },
    }),
    {
      name: "heztor-projects-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state: ProjectsState) => ({
        projects: state.projects,
        columns: state.columns,
        tasks: state.tasks,
      }),
      onRehydrateStorage: () => (state: ProjectsState | undefined) => {
        // seed only if empty
        if (state && state.projects.length === 0 && state.columns.length === 0 && state.tasks.length === 0) {
          const s = seed();
          state.projects = s.projects;
          state.columns = s.columns;
          state.tasks = s.tasks;
        }
      },
    }
  )
);
