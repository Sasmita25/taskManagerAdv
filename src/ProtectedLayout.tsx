
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import TaskProvider from "./contexts/TaskContext";
import { scheduleTokenExpiry } from "./utils/tokenExpiry";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");


useEffect(() => {
  if (!token) return;
 
  const cleanup = scheduleTokenExpiry(token);

  return cleanup;
}, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
}
