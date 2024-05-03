import { jwtDecode } from "jwt-decode";

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}
export async function registerOwner(username, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      password2: password2,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function authenticateOwner(username, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}
