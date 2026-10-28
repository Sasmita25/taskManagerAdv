
import { createBrowserRouter, Navigate } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./ProtectedLayout";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/tasks",
            element: <App />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
