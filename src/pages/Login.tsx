
import { useState, useEffect ,type FormEvent } from "react";
import { Link ,useNavigate} from "react-router";
import ButtonUsable from "@/components/ui/Button";
import {loginUser} from "@/services/authApi";
import {scheduleTokenExpiry} from "@/utils/tokenExpiry";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);
 const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const trimmedEmail = email.trim();

  if (!trimmedEmail || !password) {
    setError("Please enter your email and password.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }
 setIsLoading(true);

const minimumLoaderTime = delay(1500);

try {
  const result = await loginUser({
    email: trimmedEmail,
    password,
  });

  localStorage.setItem("token", result.token);
  scheduleTokenExpiry(result.token);

  await minimumLoaderTime;
  navigate("/dashboard");
} catch (err) {
  await minimumLoaderTime;
  console.error("Login failed:", err);
  setError("Login failed. Please try again.");
} finally {
  setIsLoading(false);
}

};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
    {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          <p className="text-sm font-medium text-gray-700">
            Signing you in...
          </p>
        </div>
      </div>
    )}

    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-6">
        <p className="pb-3 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </p>
        <p className="text-center text-gray-500">
          Get started with Task Manager
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block w-full text-left text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block w-full text-left text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex rounded-lg border border-gray-300 focus-within:border-green-500">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="min-w-0 flex-1 rounded-l-lg px-4 py-3 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 text-sm font-medium text-purple-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-purple-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p role="alert" className="pb-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <ButtonUsable
          type="submit"
          content="Login"
          hoverBg="hover:bg-purple-500"
          disabled={isLoading}
        />

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-purple-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
);

}
