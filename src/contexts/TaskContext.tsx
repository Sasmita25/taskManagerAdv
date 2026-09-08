import { createContext, useEffect } from "react";
import { taskReducer , type TaskAction } from "@/reducers/taskReducer";
import { tasks as initialTasks} from "@/data/tasks";
import type { Task } from "@/types";
import { useReducer } from "react";
import type { ReactNode } from "react";
import { getTasks, saveTasks } from "@/utils/taskStorage";
type TaskContextType = {
  tasks: Task[]
  dispatch: React.Dispatch<TaskAction>
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
useEffect(()=>{
saveTasks(tasks)
},[tasks])
return(
  <TaskContext.Provider value={{tasks,dispatch}}>
   {children}
  </TaskContext.Provider>
)
}