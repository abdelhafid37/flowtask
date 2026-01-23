export function getLocalToken() {
  return localStorage.getItem("token");
}

export function getLocalUser() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
}

export function saveTokenLocaly(token) {
  localStorage.setItem("token", token);
}

export function saveUserLocaly(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearLocal(value) {
  if (typeof value !== "string") return;
  localStorage.removeItem(value);
}
