import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import TaskCard from '@/components/ui/TaskCard'
import TaskOverviewChart from '@/components/ui/TaskOverviewChart'
import { tasks as initialTasks } from '@/data/tasks'
import ButtonUsable from '@/components/ui/Button'
import type { TaskStatus } from '@/types'
import {  useReducer,useContext } from 'react'
import { TaskContext } from '@/contexts/TaskContext'
import { taskReducer } from '@/reducers/taskReducer'
import { useNavigate } from 'react-router'
const STATUS_ORDER: TaskStatus[] = ['To Do', 'In Progress', 'Done']
const RECENT_TASKS_LIMIT = 3



const Dashboard = () => {

  const navigate=useNavigate();
const context = useContext(TaskContext)

if (!context) {
  throw new Error('Dashboard must be used inside TaskProvider')
}

const { tasks, dispatch } = context


  const counts = STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status).length
      return acc
    },
    {} as Record<TaskStatus, number>,
  )

  const recentTasks = [...tasks]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, RECENT_TASKS_LIMIT)

  return (

    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 text-left sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            An overview of your tasks and progress.
          </p>
        </div>
        <button className='cursor-pointer' onClick={() => navigate('/')}>Manage Tasks →</button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Tasks" value={tasks.length} accent="bg-purple-500" />
        <StatCard
          label="To Do"
          value={counts['To Do']}
          accent="bg-gray-400 dark:bg-gray-600"
        />
        <StatCard
          label="In Progress"
          value={counts['In Progress']}
          accent="bg-blue-500"
        />
        <StatCard label="Done" value={counts['Done']} accent="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Task Overview
          </h2>
          <TaskOverviewChart counts={counts} />
        </Card>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Recent Tasks
          </h2>
          {recentTasks.length === 0 ? (
            <Card className="flex min-h-[200px] flex-col items-center justify-center gap-2 border-dashed p-10 text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No tasks yet
              </p>
            </Card>
          ) : (
            recentTasks.slice(-3).map((task) => (
              <TaskCard
              id={task.id}
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
            ))
          )}
        </div>
      </div>
    </div>
   
  )
}

export default Dashboard
