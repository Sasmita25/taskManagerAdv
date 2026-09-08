import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './router.tsx'
import TaskProvider from './contexts/TaskContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
    <RouterProvider router={router} /> 
    </TaskProvider>
  </StrictMode>,
)
