import { PencilLine } from "lucide-react";
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList(props) {
  const { tasks, setIsOpen, setSelectedTask, onDelete, submitting } = props;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 w-full py-36">
        <PencilLine />
        <span>No tasks here, try create your first task.</span>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {tasks.map(function (task) {
        return (
          <TaskItem
            key={task._id}
            task={task}
            setIsOpen={setIsOpen}
            setSelectedTask={setSelectedTask}
            onDelete={onDelete}
            submitting={submitting}
          />
        );
      })}
    </div>
  );
}
