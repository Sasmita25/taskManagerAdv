
import { createContext, useEffect, useState, useReducer } from "react";
import { taskReducer } from "@/reducers/taskReducer";
import { tasks as initialTasks } from "@/data/tasks";
import type { Task, TaskInput } from "@/types";
import type { ReactNode } from "react";
import {
  deleteTaskApi,
  getTasksApi,
  saveTasksApi,
  updateTasksApi,
} from "@/services/taskApi";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: TaskInput) => Promise<void>;
  updateTask: (id: string, task: TaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  mutationError: string | null;
  clearMutationError: () => void;
};

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export default function TaskProvider({ children }: TaskProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
function clearMutationError() {
  setMutationError(null);
}
  // Fetch tasks from the API when the provider mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const tasksFromApi = await getTasksApi();

        dispatch({
          type: "SET_TASKS",
          payload: tasksFromApi,
        });
      } catch (err) {
        console.error("Error fetching tasks from API:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create a task
  async function addTask(newTask: TaskInput): Promise<void> {
    setMutationError(null);

    try {
      const savedTask = await saveTasksApi(newTask);

      dispatch({
        type: "ADD_TASK",
        payload: savedTask,
      });
    } catch (err) {
      console.error("Failed to create task:", err);
      setMutationError("Failed to create task. Please try again.");
      throw err;
    }
  }

  // Update a task
  async function updateTask(
    id: string,
    updatedTask: TaskInput
  ): Promise<void> {
    setMutationError(null);

    try {
      const updatedTaskFromApi = await updateTasksApi(id, updatedTask);

      dispatch({
        type: "UPDATE_TASK",
        payload: {
          id,
          task: updatedTaskFromApi,
        },
      });
    } catch (err) {
      console.error("Failed to update task:", err);
      setMutationError("Failed to update task. Please try again.");
      throw err;
    }
  }

  // Delete a task
  async function deleteTask(id: string): Promise<void> {
    setMutationError(null);

    try {
      
      await deleteTaskApi(id);

      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    } catch (err) {
      console.error("Failed to delete task:", err);
      setMutationError("Failed to delete task. Please try again.");
      throw err;
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        isLoading,
        error,
        mutationError,
        clearMutationError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
