
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import ButtonUsable from "@/components/ui/Button";
import {registerUser} from "@/services/authApi";
import lav from "@/assets/lav.jpg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);
const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();


  if (
    !trimmedName ||
    !trimmedEmail ||
    !password ||
    !confirmPassword
  ) {
    setError("Please fill in all fields.");
    return;
  }


  if (!/^[a-zA-Z ]+$/.test(trimmedName)) {
    setError("Name should contain only letters and spaces.");
    return;
  }

  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }

 
  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }


  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    setError("Password must contain at least one letter and one number.");
    return;
  }


  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
  
try {
  const result = await registerUser({
    name: trimmedName,
    email: trimmedEmail,
    password,
    confirmPassword,
  });

  console.log("Registration response:", result);
  alert(result.message || "Registration successful!");
  setTimeout(() => {
  navigate("/login", { replace: true });
}, 1500);
} catch (err) {
  console.error("Registration failed:", err);

  setError(
    err instanceof Error
      ? err.message
      : "Registration failed. Please try again."
  );
}

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-4"  style={{ backgroundImage: `url(${lav})` }}>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
<div className="mb-6">
        <p className="pb-3 text-center text-3xl font-bold text-gray-800">
          Create Account
        </p>
        <p className=" text-center text-gray-500">
          Get started with Task Manager
        </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label htmlFor="register-email"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label htmlFor="register-password"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex rounded-lg border border-gray-300 focus-within:border-purple-500">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                className="min-w-0 flex-1 rounded-l-lg px-4 py-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="px-3 text-sm font-medium text-purple-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {error && (
            <p role="alert" className="pb-2 text-sm text-red-600">
              {error}
            </p>
          )}
        <ButtonUsable
            type="submit"
            content="Create Account"
            hoverBg="hover:bg-purple-500"
        />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
