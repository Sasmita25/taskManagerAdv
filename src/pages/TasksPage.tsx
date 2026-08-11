import SearchBar from '../components/ui/SearchBar'
import FilterDropdown from '../components/ui/FilterDropdown'
import Card from '../components/ui/Card'
import TaskCard from '@/components/ui/TaskCard'
import ButtonUsable from '@/components/ui/Button'
import { useState } from 'react'
type TaskCard_Datatype = {
        title:string,
        description:string,
        status:'To Do' | 'In Progress' | 'Done',
        priority:'Low' | 'Medium' | 'High',
        createdAt:Date,
        updatedAt:Date
}
const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done']
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High']
const TaskCard_Data : TaskCard_Datatype[]= [{
        title:"Physical Health",
        description:"food habits need to be changed",
        status:"To Do",
        priority:"High",
        createdAt:new Date('2026-08-01'),
        updatedAt:new Date('2026-08-04')
},{
        title:"Health",
        description:"To walk regularly",
        status:"To Do",
        priority:"High",
        createdAt:new Date('2026-08-01'),
        updatedAt:new Date('2026-08-04')
},{
        title:"Mental Health",
        description:"Meditate daily",
        status:"To Do",
        priority:"High",
        createdAt:new Date('2026-08-01'),
        updatedAt:new Date('2026-08-04')
}]
const TasksPage = () => {
  const [search, setSearch] = useState('');

const searchVal=search.toLowerCase().trim();
  const filData= searchVal === '' ? TaskCard_Data : TaskCard_Data.filter((task) => task.description.toLowerCase().includes(searchVal) || task.title.toLowerCase().includes(searchVal));
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 text-left sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Tasks
        </h1>
      
        <ButtonUsable content="New Task"/>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar placeholder="Search tasks..." value={search} onChange={(e)=>{
          setSearch(e.target.value);
          console.log(e.target.value,": Value updated")
        }}/>
        <FilterDropdown label="Status" options={STATUS_OPTIONS} />
        <FilterDropdown label="Priority" options={PRIORITY_OPTIONS} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filData.length} of {TaskCard_Data.length} results
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
     {filData.map((data,i)=> <TaskCard
        key={i}
        title={data.title}
        description={data.description}
        status={data.status}
        priority={data.priority}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
      />)}
      
      
    </div>
  )
}

export default TasksPage
