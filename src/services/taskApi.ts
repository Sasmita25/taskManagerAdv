
import type { Task, TaskInput } from "@/types";

const API_URL = "http://localhost:3000/tasks";

export async function getTasksApi(): Promise<Task[]> {
  const response = await fetch(API_URL, {
    headers: {
      "x-api-key": "your-long-random-test-key",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const data: Task[] = await response.json();

  return data.map((task) => ({
    ...task,
    id: task.id ?? (task as Task & { _id?: string })._id!,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }));
}


//post request to api to save tasks

export async function saveTasksApi(task:TaskInput):Promise<Task>{
   try{
    const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": "your-long-random-test-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
})
    })
    if(!response.ok){
        throw new Error(`Failed to save task: ${response.status}`);
    }
  const data = await response.json();
  console.log("Task saved successfully:", data);

  return {
    ...data,
    id: data.id ?? data._id,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };

   }catch(err){
    return Promise.reject(err);
   }
   
}

export async function updateTasksApi(id:String,task:TaskInput):Promise<Task>{
 
   try{
        
    const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "x-api-key": "your-long-random-test-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
})
    })
    if(!response.ok){
        throw new Error(`Failed to update task: ${response.status}`);
    }
  const data = await response.json();
  console.log("Task updated successfully:", data);

  return {
    ...data,
    id: data.id ?? data._id,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };

   }catch(err){
    return Promise.reject(err);
   }
   
}

export async function deleteTaskApi(id: string): Promise<void> {
    console.log(id,"delete id")
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "x-api-key": "your-long-random-test-key",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.status}`);
  }
}