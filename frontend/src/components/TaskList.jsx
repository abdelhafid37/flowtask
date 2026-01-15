import { PencilLine } from "lucide-react";
import React from "react";
import TaskItem from "./TaskItem";
import { mockData } from "@/lib/mock";

export default function TaskList(props) {
  const { tasks: _, updateTask, deleteTask } = props;
  const tasks = [...mockData];

  if (tasks instanceof Array && tasks.length > 0) {
    return (
      <div className="w-full grid grid-cols-3 gap-6 py-6">
        {tasks.map(function (task, i) {
          return <TaskItem task={task} onEdit={updateTask} onDelete={deleteTask} key={i} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-6 w-full min-h-svh">
        <PencilLine />
        <span>No tasks yet, try create your first task.</span>
      </div>
    );
  }
}
