import type { Task } from "@/types"
export type TaskAction =
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
switch(action.type){
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