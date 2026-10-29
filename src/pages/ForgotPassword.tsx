
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import ButtonUsable from "@/components/ui/Button";
import lav from "@/assets/lav.jpg";



export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
const [isLoading, setIsLoading] = useState(false);
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

  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    setError("Please enter your email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }
setIsLoading(true);
  try {
    const response = await fetch(
      "https://task-manager-app-e8pi.onrender.com/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to process your request."
      );
    }

    setSubmitted(true);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8"  style={{ backgroundImage: `url(${lav})` }}>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
     
<div className="mb-6">
        <p className="pb-3 text-center text-3xl font-bold text-gray-800">
           Forgot Password?
        </p>
        <p className=" text-center text-gray-500">
                  Enter your email address to request a password reset link.
        </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5"   noValidate
>
          <div>
            <label htmlFor="reset-email"   className="mb-1 block w-full text-left text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {error && (
            <p role="alert" className="pb-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {submitted && (
            <div className="mb-4">
            <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-purple-600">
              If an account exists for this email, password reset instructions will be sent.
            </p>
            </div>
          )}

          <ButtonUsable
            type="submit"
            content="Send Reset Link"
            // bgclr="bg-green-500"
            hoverBg="hover:bg-purple-500"
            disabled={isLoading || submitted}
          />

          <p className="text-center text-sm">
            <Link to="/login" className="font-semibold text-purple-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
