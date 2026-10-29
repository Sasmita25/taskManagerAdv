import type { Task } from "@/types"
export type TaskAction =
   {
    type:"SET_TASKS",
    payload:Task[]
   }
  | {
      type: "ADD_TASK"
      payload: Task
    }
  | {
      type: "UPDATE_TASK"
      payload: {
        id: string
        task: Task
      }
    }
  | {
      type: "DELETE_TASK"
      payload: string
    }

export function taskReducer(state:Task[],action:TaskAction){
  console.log("taskReducer called with action:", state, action.payload);
switch(action.type){
  case "SET_TASKS":
    return action.payload
   case "ADD_TASK":
    return [...state, action.payload]
    case "UPDATE_TASK":
  return state.map((task) =>
    task.id === action.payload.id
      ? {
          ...action.payload.task,
          updatedAt: new Date(),
        }
      : task
  )
   case "DELETE_TASK":
        return state.filter((task) => task.id !== action.payload )
         default:
      return state

}}