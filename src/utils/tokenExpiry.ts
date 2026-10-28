let expiryTimer: number | undefined;

export function getTokenExpiryTime(
  token: string
): number | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = JSON.parse(
      atob(base64)
    );

    if (typeof decodedPayload.exp !== "number") {
      return null;
    }

    return decodedPayload.exp * 1000;
  } catch {
    return null;
  }
}

export function clearTokenExpiryTimer() {
  if (expiryTimer !== undefined) {
    window.clearTimeout(expiryTimer);
    expiryTimer = undefined;
  }
}

export function scheduleTokenExpiry(token: string) {
  // Cancel any previously scheduled timer.
  clearTokenExpiryTimer();

  const expiryTime = getTokenExpiryTime(token);

  // Invalid token or missing expiry.
  if (expiryTime === null) {
    if (localStorage.getItem("token") === token) {
      localStorage.removeItem("token");
      localStorage.removeItem("tasks");
      window.location.replace("/login");
    }

    return;
  }

  // Calculate remaining time from the original expiry.
  const remainingTime = expiryTime - Date.now();

  // Token has already expired.
  if (remainingTime <= 0) {
    if (localStorage.getItem("token") === token) {
      localStorage.removeItem("token");
      localStorage.removeItem("tasks");
      window.location.replace("/login");
    }

    return;
  }

  // Schedule automatic logout.
  expiryTimer = window.setTimeout(() => {
    // Don't log out if a different token has been saved.
    if (localStorage.getItem("token") !== token) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("tasks");

    window.location.replace("/login");
  }, remainingTime);
}