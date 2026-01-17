import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createTask, deleteTask, getTasks, updateTask } from "@/services/taskService";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

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

  useEffect(() => {
    if (isOpen) setError("");
  }, [isOpen]);

  const visibleTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  return (
    <div className="container mx-auto py-4 px-10 md:px-6">
      <div className="flex items-center justify-between gap-6 w-full">
        <h2 className="">Tasks</h2>
        <Button
          onClick={() => {
            setSelectedTask(null);
            setIsOpen(true);
          }}
        >
          <PlusIcon className="md:hidden size-5" />
          <span className="hidden md:block">Create Task</span>
        </Button>
        <TaskForm error={error} task={selectedTask} open={isOpen} onOpenChange={setIsOpen} onSubmit={onSubmit} />
      </div>
      <div className="flex justify-end md:justify-start mt-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="transition-colors duration-150" onClick={() => setFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="transition-colors duration-150 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
              onClick={() => setFilter("pending")}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="transition-colors duration-150 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
              onClick={() => setFilter("in-progress")}
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="transition-colors duration-150 data-[state=active]:bg-green-500 data-[state=active]:text-white"
              onClick={() => setFilter("completed")}
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        {loading ? (
          <div className="min-h-svh w-full flex items-center justify-center">
            <div className="">
              <Spinner />
              <span>Loading...</span>
            </div>
          </div>
        ) : (
          <TaskList tasks={visibleTasks} setIsOpen={setIsOpen} setSelectedTask={setSelectedTask} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}
