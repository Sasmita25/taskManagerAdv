
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import ButtonUsable from "@/components/ui/Button";
import {loginUser} from "@/services/authApi";
import {scheduleTokenExpiry} from "@/utils/tokenExpiry";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const trimmedEmail = email.trim();

  // 1. Required-field validation
  if (!trimmedEmail || !password) {
    setError("Please enter your email and password.");
    return;
  }

  // 2. Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }
try{
 const result = await loginUser({
    email: trimmedEmail,
    password})
    localStorage.setItem("token", result.token);
    scheduleTokenExpiry(result.token);
  console.log("Login successful:", result);
  alert("Login successful!");
  console.log("Token saved:", !!localStorage.getItem("token"));
}catch(err){
  console.error("Login failed:", err);
  setError("Login failed. Please try again.");
  
}
 

};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-6">
        <p className="pb-3 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </p>
        <p className=" text-center text-gray-500">
          Get started with Task Manager
        </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
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
            <label htmlFor="password"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
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
            // bgclr="bg-green-500"
            hoverBg="hover:bg-purple-500"
          />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-purple-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
