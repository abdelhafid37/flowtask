import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { createTask, deleteTask, getTasks, updateTask } from "@/services/taskService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const allTasks = await getTasks();
        setTasks(allTasks);
      } catch (error) {
        toast.error(error.response?.data?.error || "Error getting all tasks!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSubmit(event, data) {
    event.preventDefault();

    if (!data.title) return setError("Title field required");

    if (selectedTask) {
      try {
        const updatedTask = await updateTask(selectedTask._id, data);
        setTasks((tasks) => tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        toast.success("Task updated successfully");
      } catch (error) {
        toast.error(error.response?.data?.error || "Error updating task");
      } finally {
        setIsOpen(false);
      }
    } else {
      try {
        const task = await createTask(data);
        toast.success("Task created successfully");
        setTasks([...tasks, task]);
      } catch (error) {
        toast.error(error.response?.data?.error || "Error creating task");
      } finally {
        setIsOpen(false);
      }
    }
  }

  async function onDelete(id) {
    try {
      const deletedTask = await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== deletedTask._id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting task");
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between gap-6 w-full">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Button
          onClick={() => {
            setIsOpen(true);
            setSelectedTask(null);
          }}
        >
          Create Task
        </Button>
        <TaskForm error={error} task={selectedTask} open={isOpen} onOpenChange={setIsOpen} onSubmit={onSubmit} />
      </div>
      <div>
        {loading ? (
          <div className="min-h-svh w-full flex items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <TaskList tasks={tasks} setIsOpen={setIsOpen} setSelectedTask={setSelectedTask} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}
