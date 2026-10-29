
import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import ButtonUsable from "@/components/ui/Button";
import {useNavigate} from 'react-router'
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);
 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSubmitted(false);

  if (!password || !confirmPassword) {
    setError("Please fill in both password fields.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!token) {
    setError("Invalid or missing password reset link.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to reset password.");
    }

    setSubmitted(true);
    setPassword("");
    setConfirmPassword("");
setTimeout(() => {
  navigate("/login", { replace: true });
}, 2000);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <p className="pb-3 text-center text-3xl font-bold text-gray-800">
            Reset Password
          </p>

          <p className="text-center text-gray-500">
            Enter your new password and confirm it below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block w-full text-left text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block w-full text-left text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {error && (
            <p role="alert" className="pb-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {submitted && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-purple-600">
              Validation successful.
            </p>
          )}

          <ButtonUsable
            type="submit"
            content="Reset Password"
            hoverBg="hover:bg-purple-500"
          />

          <p className="text-center text-sm">
            <Link
              to="/login"
              className="font-semibold text-purple-500 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
