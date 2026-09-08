//localstorage
import  {type Task } from "@/types"
const TASK_STORAGE_KEY ="tasks"

export const saveTasks  = (tasks:Task[]) => {
       localStorage.setItem(TASK_STORAGE_KEY,JSON.stringify(tasks))
}

export const getTasks = (): Task[] | null => {
  const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);

  if (!storedTasks) {
    return null;
  }
try{


  const tasks: Task[] = JSON.parse(storedTasks);

  return tasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }));
}catch(err){
        console.error("Failed to load tasks:", err);
    return null;
}
};