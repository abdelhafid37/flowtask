import { getLocalToken } from "@/lib/storage";
import clientAPI from "./api";

function authHeaders() {
  const token = getLocalToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getTasks() {
  try {
    const response = await clientAPI.get("/tasks", {
      headers: authHeaders(),
    });
    const tasks = response.data;
    return tasks;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createTask(data) {
  try {
    const response = await clientAPI.post("/tasks", data, { headers: authHeaders() });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateTask(id, data) {
  try {
    const response = await clientAPI.put(`/tasks/${id}`, data, { headers: authHeaders() });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteTask(id) {
  try {
    const response = await clientAPI.delete(`/tasks/${id}`, { headers: authHeaders() });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
