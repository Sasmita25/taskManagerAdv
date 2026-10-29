
import { useNavigate } from "react-router";
import { LogOut, CheckCheck } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  let userName = "User";

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      userName =
        user.name ||
        user.username ||
        user.email?.split("@")[0] ||
        "User";
    }
  } catch {
    userName = "User";
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full rounded-xl border border-gray-200 bg-white/95 text-gray-900 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 dark:text-gray-100 dark:shadow-none">
      <nav className="flex w-full items-center justify-between gap-3 p-3 sm:px-4">
        {/* Logo and Greeting */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to dashboard"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
            <CheckCheck size={23} />
          </span>

          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100">
              Task Manager
            </span>

            <span className="max-w-48 truncate text-xs text-gray-500 dark:text-gray-400 sm:max-w-64">
              Hello, {userName}! 👋
            </span>
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-900 dark:hover:bg-red-950 dark:hover:text-red-400 dark:focus:ring-offset-gray-900"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </nav>
    </header>
  );
}
