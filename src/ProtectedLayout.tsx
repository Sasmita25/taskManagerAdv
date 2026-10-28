
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import TaskProvider from "./contexts/TaskContext";
import { scheduleTokenExpiry } from "./utils/tokenExpiry";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");


useEffect(() => {
  if (!token) return;
  


console.log("Scheduling token expiry for token:", token);
  const cleanup = scheduleTokenExpiry(token);
console.log("Expiry scheduler called");
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
