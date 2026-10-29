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

  clearTokenExpiryTimer();

  const expiryTime = getTokenExpiryTime(token);


  if (expiryTime === null) {
    if (localStorage.getItem("token") === token) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return;
  }
  const remainingTime = expiryTime - Date.now();

  // Token expired
  if (remainingTime <= 0) {
    if (localStorage.getItem("token") === token) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return;
  }

  //  auto logout
  expiryTimer = window.setTimeout(() => {
    
    if (localStorage.getItem("token") !== token) {
      return;
    }

    localStorage.removeItem("token");

    window.location.replace("/login");
  }, remainingTime);
}