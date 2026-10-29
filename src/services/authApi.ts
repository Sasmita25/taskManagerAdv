
const API_BASE_URL = "https://task-manager-app-e8pi.onrender.com/auth";


export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}


export async function loginUser(loginData: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await res.json();

  console.log("Login HTTP status:", res.status);
  console.log("Login response data:", data);

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}


export async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (response.status === 401 && token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  }

  return response;
}
