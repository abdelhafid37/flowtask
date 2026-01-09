function getLocalStorage() {
  return {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };
}

function saveLocalStorage(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function removeLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export { getLocalStorage, saveLocalStorage, removeLocalStorage };
