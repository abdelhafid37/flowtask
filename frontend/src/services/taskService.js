import { getLocalToken } from "@/lib/storage";
import clientAPI from "./api";

const token = getLocalToken();
const Authorization = `Bearer ${token}`;

export async function getTasks() {
  try {
    const response = await clientAPI.get("/tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
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
    const response = await clientAPI.post("/tasks", {
      headers: {
        Authorization,
        body: data,
      },
    });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateTask(id, data) {
  try {
    const response = await clientAPI.put(`/tasks/${id}`, {
      headers: {
        Authorization,
        body: data,
      },
    });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteTask(id) {
  try {
    const response = await clientAPI.delete(`/tasks/${id}`, {
      headers: {
        Authorization,
      },
    });
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
