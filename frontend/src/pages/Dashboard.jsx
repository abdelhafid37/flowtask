import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // console.log("mounted");
  }, []);

  async function createTask() {
    console.log("create");
    try {
    } catch (error) {}
  }

  async function updateTask() {
    console.log("updated");
    try {
    } catch (error) {}
  }

  async function deleteTask() {
    console.log("deleted");
    try {
    } catch (error) {}
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between gap-6 w-full">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Button onClick={null}>Create Task</Button>
        <TaskForm task={null} />
      </div>
      <div className="">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
