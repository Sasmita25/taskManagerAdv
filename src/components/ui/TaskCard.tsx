import Card from '../ui/Card'

export type TaskStatus = 'To Do' | 'In Progress' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

type TaskCardProps = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

const STATUS_STYLES: Record<TaskStatus, string> = {
  'To Do': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  'In Progress':
    'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Done: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  Low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  Medium:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
}

export default function TaskCard({
  title,
  description,
  status,
  priority,
}: TaskCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Edit task"
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.5-9.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Delete task"
            className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m3 0-.867 12.142A2 2 0 0 1 15.138 21H8.862a2 2 0 0 1-1.995-1.858L6 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>

      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[priority]}`}
        >
          {priority}
        </span>
      </div>
    </Card>
  )
}
