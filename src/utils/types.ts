export type Id = string | number;

export type Priority = "Muy alta" | "Alta" | "Media" | "Baja";

export type Column = {
  id: Id;
  title: string;
  projectId?: Id;
};

export type Task = {
  id: Id;
  columnId: Id;

  name: string;
  description?: string;
  status: boolean;
  deadline?: string;
  priority?: Priority;
  type?: "Task" | "Event";
  startTime?: Date;
  endTime?: Date;
};

export type Project = {
  id: Id;
  name: string;
  description?: string;
  status: boolean;
};
/*
export type ProjectStatus = {
  id: id;
  name: string;
};

export type User = {
  id: id;
  name: string;
};

export type UserRole = {
  id: id;
  name: string;
};

export type ProjectUser = {
  id: id;
  project: Project;
  user: User;
  role: UserRole;
};

export type Task = {
  id: id;
  name: string;
  description?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
};
 */
