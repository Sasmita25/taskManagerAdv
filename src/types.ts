export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export type TaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type Task = TaskInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};