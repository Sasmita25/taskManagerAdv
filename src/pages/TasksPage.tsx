import SearchBar from '../components/ui/SearchBar'
import FilterDropdown from '../components/ui/FilterDropdown'
import Card from '../components/ui/Card'
import TaskCard from '@/components/ui/TaskCard'
import ButtonUsable from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { TaskContext } from '@/contexts/TaskContext'
import { Modal } from '@/components/ui/Modal'
import TaskForm  from '@/components/ui/TaskForm'
import { DeleteCard } from '@/components/ui/DeleteCard'
import Toast from '@/components/ui/Toast'
const STATUS_OPTIONS = ['All','To Do', 'In Progress', 'Done']
const PRIORITY_OPTIONS = ['All','Low', 'Medium', 'High']
const TasksPage = () => {
  const [search, setSearch] = useState('');
  const [status,setStatus] = useState('');
  const [priority,setPriority]= useState('');
  const searchVal=search.toLowerCase().trim();
  const context=useContext(TaskContext);
  if (!context) {
  throw new Error('Dashboard must be used inside TaskProvider')
}
const [id,setId]=useState('');
const { tasks, dispatch } = context
const [isEditMode,setIsEditMode]=useState(false);
const [showModal,setShowModal]=useState(false);
const [showDeleteModal,setShowDeleteModal]=useState(false);
const [toast, setToast] = useState("")
  useEffect(() => {
  if (!toast) return

  const timer = setTimeout(() => {
    setToast("")
  }, 2000)

  return () => clearTimeout(timer)
}, [toast])
  const filData = tasks.filter((task) => {
  const matchesSearch =
    searchVal === "" ||
    task.title.toLowerCase().includes(searchVal.toLowerCase()) ||
    task.description.toLowerCase().includes(searchVal.toLowerCase());

  const matchesStatus =
    status === "All"  || status === "" || task.status === status;
  const matchesPriority =
    priority === "All" || priority === "" || task.priority === priority;
  return matchesSearch && matchesStatus && matchesPriority;
});
const handleEditTask = (taskId: string) => {
  setId(taskId)
  setIsEditMode(true)
  setShowModal(true)
}

const handleDeleteTask = (taskId : string) => {
  setId(taskId)
  setShowDeleteModal(true)
}
const handleNewTask = () => {
  setId('')
  setIsEditMode(false)
  setShowModal(true)
}
useEffect(()=>console.log(id,"id"))
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 text-left sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Tasks
        </h1>
      
        <ButtonUsable content="New Task"   func={handleNewTask}/>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar placeholder="Search tasks..." value={search} onChange={(e)=>{
          setSearch(e.target.value);
          console.log(e.target.value,": Value updated")
        }}/>
        <FilterDropdown label="Status" value={status} options={STATUS_OPTIONS} onChange={(e)=>{
          setStatus(e.target.value);
          
          }}/>
        <FilterDropdown label="Priority" value={priority} options={PRIORITY_OPTIONS} onChange={(e)=>{
          setPriority(e.target.value);
          
          }}/>
          <button
  onClick={() => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  }}
  className="cursor-pointer"
>
  Clear Filters
</button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filData.length} of {tasks.length} results
      </p>

      {filData.length === 0 && (
        <Card className="flex min-h-[320px] flex-col items-center justify-center gap-2 border-dashed p-10 text-center">
          <svg
            className="h-8 w-8 text-gray-300 dark:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l4.414 4.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            No tasks found
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {searchVal === ''
              ? 'No tasks have been added yet.'
              : 'No tasks match your search.'}
          </p>
        </Card>
      )}
     {filData.map((data)=> <TaskCard
  id={data.id}
        title={data.title}
        description={data.description}
        status={data.status}
        priority={data.priority}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
     onOpen={() => handleEditTask(data.id)}
     onDelete ={()=>handleDeleteTask(data.id)}
      />)}

      {toast && (
 
    <Toast message={toast}/>
 
)}
     {showModal && 
     
     <Modal onClose={()=>{
      setShowModal(!showModal);
      if(isEditMode){
                  setIsEditMode(false);
            }
      }} 
      heading={id ? "UPDATE TASK" : "CREATE TASK"}>
        
      <TaskForm  
      dispatch={dispatch} 
      onClose={()=>{
      setShowModal(!showModal);
      if(isEditMode){
            setIsEditMode(false);
      }}} 
      id={id}
      tasks={tasks}
      onSuccess={() =>
      setToast(`Task ${id ? "updated" : "created"} successfully`)}
      />
      </Modal>}

   {showDeleteModal && <Modal onClose={()=>{
      setShowDeleteModal(!showDeleteModal);}}
      
      heading="DELETE TASK">
      <DeleteCard 
      onClose={()=>{
      setShowDeleteModal(!showDeleteModal);}}
      onDelete={()=>{
        dispatch({type:"DELETE_TASK",payload:id})
      setShowDeleteModal(!showDeleteModal);}}
    
      
      />

        </Modal>}
    </div>
  )
}

export default TasksPage
