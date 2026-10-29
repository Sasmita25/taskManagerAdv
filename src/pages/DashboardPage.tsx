
import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import TaskCard from '@/components/ui/TaskCard'
import TaskOverviewChart from '@/components/ui/TaskOverviewChart'
import Navbar from './NavBar'
import type { TaskStatus } from '@/types'
import { useContext } from 'react'
import { TaskContext } from '@/contexts/TaskContext'
import { useNavigate } from 'react-router'

const STATUS_ORDER: TaskStatus[] = ['To Do', 'In Progress', 'Done']
const RECENT_TASKS_LIMIT = 3

const Dashboard = () => {
  const navigate = useNavigate()
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('Dashboard must be used inside TaskProvider')
  }

  const { tasks } = context

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
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 text-left text-gray-900 dark:text-gray-100 sm:px-6 sm:py-8">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="m-0 text-2xl font-semibold text-gray-900 dark:text-gray-50 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            An overview of your tasks and progress.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          onClick={() => navigate('/tasks')}
        >
          Manage Tasks <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Task statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          accent="bg-purple-500"
        />

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

        <StatCard
          label="Done"
          value={counts['Done']}
          accent="bg-green-500"
        />
      </div>

      {/* Task overview and recent tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Overview graph: show only when tasks exist */}
        {tasks.length > 0 && (
          <Card className="flex flex-col gap-4 border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Task Overview
            </h2>

            <TaskOverviewChart counts={counts} />
          </Card>
        )}

        {/* Recent tasks */}
        <section className="flex min-w-0 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Recent Tasks
            </h2>

            {tasks.length > 0 && (
              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="cursor-pointer text-sm font-medium text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                View all →
              </button>
            )}
          </div>

          {recentTasks.length === 0 ? (
            <Card className="flex min-h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                <span className="text-2xl" aria-hidden="true">
                  ✓
                </span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                No tasks yet
              </h3>

              <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                Create your first task to organize your work and track your
                progress.
              </p>

              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="mt-1 cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Add Your First Task
              </button>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {recentTasks.map((task) => (
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
