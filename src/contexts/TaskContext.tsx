import { createContext, useEffect } from "react";
import { taskReducer , type TaskAction } from "@/reducers/taskReducer";
import { tasks as initialTasks} from "@/data/tasks";
import type { Task, TaskInput } from "@/types";
import { useReducer } from "react";
import type { ReactNode } from "react";
import { getTasks } from "@/utils/taskStorage";
import { deleteTaskApi, getTasksApi, saveTasksApi, updateTasksApi } from "@/services/taskApi";


type TaskContextType = {
  tasks: Task[]
  dispatch: React.Dispatch<TaskAction>
  addTask: (task: TaskInput) => Promise<void>;
  updateTask: (id: string, task: TaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

type TaskProvideProps = {
  children:ReactNode
}


//context shares the current state and dispatch action 

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export default function TaskProvider ({children}:TaskProvideProps){

const [tasks, dispatch] = useReducer(taskReducer,initialTasks,() => {
  const getStoredTasks = getTasks();
     return getStoredTasks ?? initialTasks;
}
);

//fetch tasks from api and set the state
useEffect(()=>{

  const fetchTask = async () =>{

    try{
    const taskFromApi = await getTasksApi();
   
    if(taskFromApi){
      dispatch({type:"SET_TASKS",payload:taskFromApi})
    }else{
      dispatch({type:"SET_TASKS",payload:initialTasks})
    }
  }catch(error){
    console.error("Error fetching tasks from API:", error);
    
  }

}
  fetchTask();

},[])

//save tasks to api whenever tasks state changes
async function addTask(newTask: TaskInput) {
  try {
    const savedTask = await saveTasksApi(newTask);

    dispatch({
      type: "ADD_TASK",
      payload: savedTask,
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
}
//update tasks to api whenever tasks state changes
async function updateTask(id: string, updatedTask: TaskInput) {
  try {
    const updateTask = await updateTasksApi(id, updatedTask);
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: id,
        task: updateTask,
      },
    });
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}
//delete tasks to api whenever tasks state changes
async function deleteTask(id: string) {
  try {
    await deleteTaskApi(id);

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}
return(
  <TaskContext.Provider value={{tasks,dispatch,addTask,updateTask,deleteTask}}>
   {children}
  </TaskContext.Provider>
)}