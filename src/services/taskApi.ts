
import type { Task, TaskInput } from "@/types";
import { authFetch } from "./authApi";

const API_URL = "http://localhost:3000/tasks";

export async function getTasksApi(): Promise<Task[]> {
  const res = await authFetch(API_URL, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || `Failed to fetch tasks: ${res.status}`
    );
  }

  return data.map((task: Task & { _id?: string }) => ({
    ...task,
    id: task.id ?? task._id!,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }));
}

export async function saveTasksApi(task: TaskInput): Promise<Task> {
  const response = await authFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to save task: ${response.status}`
    );
  }

  console.log("Task saved successfully:", data);

  return {
    ...data,
    id: data.id ?? data._id,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function updateTasksApi(
  id: string,
  task: TaskInput
): Promise<Task> {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to update task: ${response.status}`
    );
  }

  console.log("Task updated successfully:", data);

  return {
    ...data,
    id: data.id ?? data._id,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function deleteTaskApi(id: string): Promise<void> {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let message = `Failed to delete task: ${response.status}`;

    try {
      const data = await response.json();
      message = data.message || message;
    } catch (error) {
  console.error("Delete task failed:", error);
  throw error;
}

    throw new Error(message);
  }
}
