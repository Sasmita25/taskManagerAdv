import type { Task } from '@/types'

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Physical Health',
    description: 'food habits need to be changed',
    status: 'To Do',
    priority: 'High',
    createdAt: new Date('2026-08-01'),
    updatedAt: new Date('2026-08-04'),
  },
  {
    id: '2',
    title: 'Health',
    description: 'To walk regularly',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2026-08-01'),
    updatedAt: new Date('2026-08-04'),
  },
  {
    id: '3',
    title: 'Mental Health',
    description: 'Meditate daily',
    status: 'To Do',
    priority: 'Low',
    createdAt: new Date('2026-08-01'),
    updatedAt: new Date('2026-08-04'),
  },
]
