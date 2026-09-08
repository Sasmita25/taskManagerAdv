import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import DashboardPage from './pages/DashboardPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
])
