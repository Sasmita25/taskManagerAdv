import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import ButtonUsable from "./Button";
import type { Task, TaskInput, TaskPriority, TaskStatus } from "@/types";
type TaskFormArg = {
    addTask: (task: TaskInput) => Promise<void>
    updateTask: (id: string, task: TaskInput) => Promise<void>
    id?:string
    tasks: Task[]
    onClose : () => void
    onSuccess: () => void
}
export default function TaskForm({addTask,updateTask,id,tasks,onClose,onSuccess}:TaskFormArg){
    const [formData,setFormData]=useState<TaskInput>({title:"",description:"",  status: "To Do",
  priority: "Low" 
    })
           
   
    useEffect(()=>{
        
       if(id){
          const data = tasks.find((value) => value.id === id);
          if(data)
            setFormData(data);
       } 
    },[id,tasks])
      
    return (
            <form onSubmit={(e)=>{
                e.preventDefault();
              if(id) {
               updateTask(id,formData)

            }else{
                addTask(formData)
            }
                onSuccess();
 
           onClose();
        }
        }
          
            >
       <div className="flex flex-col gap-4">
   
        <Input heading="Title" onChange={(e)=>{
           
            setFormData({...formData,title:e.target.value}
           
            )}} value={formData.title}/>
        <TextArea heading="Description" onChange={(e)=>{
          
            setFormData({...formData,description:e.target.value}
           
            )}}
            value={formData.description}/>
        <Select heading="Status" options={["To Do","In Progress","Done" ]} onChange={(e)=>{
           
            setFormData({...formData,status:e.target.value as TaskStatus}
           
            )}}
            value={formData.status}/>
        <Select heading="Priority" options={["Low","Medium","High" ]} onChange={(e)=>{
         
            setFormData({...formData,priority:e.target.value as TaskPriority}
           
            )}}
            value={formData.priority}/>
    <ButtonUsable type="submit" content={id ? "Update" : "Create"}/>
        </div>
            </form>

    )
}